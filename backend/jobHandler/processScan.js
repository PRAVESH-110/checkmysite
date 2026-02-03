import { Scan } from "../model/model.scan.js";
import { User } from "../model/model.user.js";
import basicAnalyzer from "../analyzers/basicAnalyzer.js";
import advancedAnalyzer from "../analyzers/advancedAnalyzer.js";
import computeScore from "../scoring/computeScore.js";
import scoreLegacy from "../scoring/scoreLegacy.js";
import { runLighthouse } from "../workers/services/runLighthouse.js";

async function processScan(scanId) {
  let scan;

  try {
    // 1️⃣ Atomically fetch + mark running
    scan = await Scan.findByIdAndUpdate(
      scanId,
      { status: "running" },
      { new: true }
    );
    if (!scan) return;

    // Fetch user to determine plan
    let isPremium = false;
    if (scan.userId) {
      try {
        const user = await User.findById(scan.userId);
        isPremium = user && (user.plan === 'basic' || user.plan === 'pro');
      } catch (uErr) {
        console.warn("Could not fetch user for scan plan check:", uErr.message);
      }
    }

    // 2️⃣ Fetch website HTML safely
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(scan.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "chechmysiteBot/1.0"
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL (${response.status})`);
    }

    const html = await response.text();

    let score = 0;
    let issues = [];
    let savedSignals = {};

    if (isPremium) {
      // --- PREMIUM PATH (Lighthouse + Advanced Analysis) ---
      const analysis = advancedAnalyzer(html);

      // Run Lighthouse
      try {
        const lighthouseMetrics = await runLighthouse(scan.url);
        analysis.performance = lighthouseMetrics;
      } catch (lhError) {
        console.error("Lighthouse failed:", lhError);
        analysis.performance = null;
      }

      const result = computeScore(analysis);
      score = result.score;
      issues = result.issues;
      savedSignals = analysis; // Save the full structure

    } else {
      // --- FREE PATH (Basic Cheerio Analysis + Legacy Scoring) ---
      const analysis = basicAnalyzer(html);
      score = scoreLegacy(analysis);
      issues = analysis.issues; // Directly from analyzer
      savedSignals = analysis.signals; // Save just the flags (legacy format)
    }

    // 6️⃣ Save results
    await Scan.findByIdAndUpdate(scanId, {
      status: "completed",
      score,
      issues,
      signals: savedSignals,
      completedAt: new Date()
    });

  } catch (err) {
    console.error("Scan failed:", err.message);

    await Scan.findByIdAndUpdate(scanId, {
      status: "failed",
      errors: err.message
    });
  }
}

export default processScan;
