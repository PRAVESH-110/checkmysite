import * as cheerio from "cheerio";

function advancedAnalyzer(html) {
    if (!html || typeof html !== "string") {
        return { cta: null, trust: null, mobile: null, forms: null, signals: {} };
    }

    const $ = cheerio.load(html);

    /* -------------------------
       ADVANCED SIGNALS EXTRACTION
    ------------------------- */
    const titleText = $("title").text().trim();
    const metaDescription = $('meta[name="description"]').attr("content")?.trim();
    const h1Elements = $("h1");
    const h1Count = h1Elements.length;

    const CTA_KEYWORDS = ["buy", "sign up", "signup", "get started", "get", "start", "contact", "book", "join", "subscribe"];
    const hasButtonCTA = $("button").length > 0;
    const hasLinkCTA = $("a").toArray().some((el) => {
        const text = $(el).text().toLowerCase().trim();
        return CTA_KEYWORDS.some((keyword) => text.includes(keyword));
    });
    const hasCTA = hasButtonCTA || hasLinkCTA;

    const hasForm = $("form").length > 0;
    const hasImages = $("img").length > 0;
    const hasAltText = hasImages && $("img").toArray().some((img) => $(img).attr("alt")?.trim());
    const hasViewportMeta = !!$('meta[name="viewport"]').attr("content");
    const hasFavicon = $('link[rel="icon"]').length > 0 || $('link[rel="shortcut icon"]').length > 0;

    // Raw Signals (for Legacy Compatibility & DB)
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

    // Structured Categories for Advanced Scorer
    const cta = {
        total: (hasButtonCTA ? 1 : 0) + (hasLinkCTA ? 1 : 0),
        hasCTA,
        texts: []
    };

    const trust = {
        hasTitle: signals.hasTitle,
        hasMetaDescription: signals.hasMetaDescription,
        hasH1: signals.hasH1,
        hasFavicon: signals.hasFavicon,
        hasImages: signals.hasImages,
        hasAltText: signals.hasAltText
    };

    const mobile = { hasViewportMeta: signals.hasViewportMeta };
    const forms = { hasForm: signals.hasForm };

    return { cta, trust, mobile, forms, signals };
}

export default advancedAnalyzer;
