// analyzers/homepageAnalyzer.js
import cheerio from "cheerio";

export default function homepageAnalyzer(html) {
  const $ = cheerio.load(html);

  const signals = {
    hasTitle: !!$("title").text(),
    hasMetaDescription: !!$('meta[name="description"]').attr("content"),
    hasH1: $("h1").length > 0,
    hasCTA: $("button, a").length > 0,
  };

  const issues = [];

  if (!signals.hasTitle) issues.push("Missing <title>");
  if (!signals.hasMetaDescription) issues.push("Missing meta description");
  if (!signals.hasH1) issues.push("Missing H1");
  if (!signals.hasCTA) issues.push("No clear CTA");

  return {
    signals,
    issues
  };
}
