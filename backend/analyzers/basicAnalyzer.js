import * as cheerio from "cheerio";

function basicAnalyzer(html) {
    if (!html || typeof html !== "string") {
        return {
            signals: {},
            issues: ["Invalid or empty HTML"],
        };
    }

    const $ = cheerio.load(html);

    /* -------------------------
       BASIC CONTENT SIGNALS
    ------------------------- */

    const titleText = $("title").text().trim();
    const metaDescription = $('meta[name="description"]').attr("content")?.trim();
    const h1Elements = $("h1");
    const h1Count = h1Elements.length;

    /* -------------------------
       CTA DETECTION
    ------------------------- */
    const CTA_KEYWORDS = ["buy", "sign up", "signup", "get started", "get", "start", "contact", "join"];

    const hasButtonCTA = $("button").length > 0;
    const hasLinkCTA = $("a").toArray().some((el) => {
        const text = $(el).text().toLowerCase().trim();
        return CTA_KEYWORDS.some((keyword) => text.includes(keyword));
    });
    const hasCTA = hasButtonCTA || hasLinkCTA;

    /* -------------------------
       UX / TRUST SIGNALS
    ------------------------- */
    const hasForm = $("form").length > 0;
    const hasImages = $("img").length > 0;
    const hasAltText = hasImages && $("img").toArray().some((img) => $(img).attr("alt")?.trim());
    const hasViewportMeta = !!$('meta[name="viewport"]').attr("content");
    const hasFavicon = $('link[rel="icon"]').length > 0 || $('link[rel="shortcut icon"]').length > 0;

    const signals = {
        hasTitle: titleText.length > 0,
        titleLength: titleText.length,
        hasMetaDescription: !!metaDescription,
        metaDescriptionLength: metaDescription?.length || 0,
        hasH1: h1Count > 0,
        multipleH1s: h1Count > 1,
        hasCTA,
        hasForm,
        hasImages,
        hasAltText,
        hasViewportMeta,
        hasFavicon,
    };

    /* -------------------------
       ISSUES GENERATION
    ------------------------- */
    const issues = [];

    if (!signals.hasTitle) issues.push("Missing <title> tag");
    else if (signals.titleLength < 10 || signals.titleLength > 70) issues.push("Title length is not optimal (10–70 characters)");

    if (!signals.hasMetaDescription) issues.push("Missing meta description");
    else if (signals.metaDescriptionLength < 50 || signals.metaDescriptionLength > 160) issues.push("Meta description length is not optimal (50–160 chars)");

    if (!signals.hasH1) issues.push("Missing primary <h1> heading");
    if (signals.multipleH1s) issues.push("Multiple <h1> tags found");
    if (!signals.hasCTA) issues.push("No clear call-to-action detected");
    if (!signals.hasViewportMeta) issues.push("Missing viewport meta tag (mobile issue)");
    if (!signals.hasImages) issues.push("No images found");
    if (signals.hasImages && !signals.hasAltText) issues.push("Images missing alt text");
    if (!signals.hasFavicon) issues.push("Missing favicon");

    return { signals, issues };
}

export default basicAnalyzer;
