export function scoreBasic(analysis) {
    const issues = [];
    const signals = analysis.signals; // Use the raw signals preserved in analysis

    if (!signals) return { score: 0, issues: ["Analysis failed"] };

    // Re-implementing the legacy logic
    if (!signals.hasTitle) {
        issues.push({ category: "SEO", severity: "high", reason: "Missing <title> tag" });
    } else if (signals.titleLength < 10 || signals.titleLength > 70) {
        issues.push({ category: "SEO", severity: "medium", reason: "Title length is not optimal (10–70 characters)" });
    }

    if (!signals.hasMetaDescription) {
        issues.push({ category: "SEO", severity: "high", reason: "Missing meta description" });
    } else if (signals.metaDescriptionLength < 50 || signals.metaDescriptionLength > 160) {
        issues.push({ category: "SEO", severity: "medium", reason: "Meta description length is not optimal (50–160 characters)" });
    }

    if (!signals.hasH1) {
        issues.push({ category: "SEO", severity: "high", reason: "Missing primary <h1> heading" });
    }

    if (signals.multipleH1s) {
        issues.push({ category: "SEO", severity: "medium", reason: "Multiple <h1> tags found" });
    }

    if (!signals.hasCTA) {
        issues.push({ category: "Conversion", severity: "high", reason: "No clear call-to-action detected" });
    }

    if (!signals.hasViewportMeta) {
        issues.push({ category: "Mobile", severity: "critical", reason: "Missing viewport meta tag" });
    }

    if (!signals.hasImages) {
        issues.push({ category: "UX", severity: "medium", reason: "No images found" });
    }

    if (signals.hasImages && !signals.hasAltText) {
        issues.push({ category: "Accessibility", severity: "medium", reason: "Images missing alt text" });
    }

    if (!signals.hasFavicon) {
        issues.push({ category: "Trust", severity: "low", reason: "Missing favicon" });
    }

    // Basic Score Calculation: 100 - (10 per issue)
    let score = 100;
    score -= issues.length * 10;
    score = Math.max(score, 0);

    return { score, issues };
}
