import * as cheerio from "cheerio";

function homepageAnalyzer(html) {
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
     CTA DETECTION (DETERMINISTIC)
  ------------------------- */

  const CTA_KEYWORDS = [
    "buy",
    "sign up",
    "signup",
    "get started",
    "get",
    "start",
    "contact",
    "book",
    "join",
    "subscribe",
  ];

  const hasButtonCTA = $("button").length > 0;

  const hasLinkCTA = $("a")
    .toArray()
    .some((el) => {
      const text = $(el).text().toLowerCase().trim();
      return CTA_KEYWORDS.some((keyword) => text.includes(keyword));
    });

  const hasCTA = hasButtonCTA || hasLinkCTA;

  /* -------------------------
     UX / TRUST SIGNALS
  ------------------------- */

  const hasForm = $("form").length > 0;

  const hasImages = $("img").length > 0;

  const hasAltText =
    $("img").length > 0 &&
    $("img")
      .toArray()
      .some((img) => $(img).attr("alt")?.trim());

  const hasViewportMeta = !!$('meta[name="viewport"]').attr("content");

  const hasFavicon =
    $('link[rel="icon"]').length > 0 ||
    $('link[rel="shortcut icon"]').length > 0;

  /* -------------------------
     SIGNALS (FACTS)
  ------------------------- */

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
     GROUPING FOR SCORER
  ------------------------- */

  const cta = {
    total: (hasButtonCTA ? 1 : 0) + (hasLinkCTA ? 1 : 0), // Basic count
    hasCTA,
    // aboveFold: ... (requires Playwright/rendering, ignoring for Cheerio)
    texts: [] // Populate with actual text if needed
  };

  const trust = {
    hasTitle: signals.hasTitle,
    hasMetaDescription: signals.hasMetaDescription,
    hasH1: signals.hasH1,
    hasFavicon: signals.hasFavicon,
    hasImages: signals.hasImages,
    hasAltText: signals.hasAltText
  };

  const mobile = {
    hasViewportMeta: signals.hasViewportMeta
  };

  const forms = {
    hasForm: signals.hasForm
  };

  return {
    cta,
    trust,
    mobile,
    forms,
    signals // Keep original signals for legacy or DB visibility if needed
  };
}

export default homepageAnalyzer;