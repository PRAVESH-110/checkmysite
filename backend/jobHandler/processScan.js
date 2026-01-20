import { Scan } from "../model/model.scan.js";
import homepageAnalyzer from "../analyzers/homepageAnalyzer.js";
import computeScore from "../scoring/computeScore.js";

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

    // 2️⃣ Fetch website HTML safely
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(scan.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "WebolutionBot/1.0"
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL (${response.status})`);
    }

    const html = await response.text();

    // 3️⃣ Analyze homepage
    const analysis = homepageAnalyzer(html);

    // 4️⃣ Compute score
    const score = computeScore(analysis);

    // 5️⃣ Save results
    await Scan.findByIdAndUpdate(scanId, {
      status: "completed",
      score,
      issues: analysis.issues,
      signals: analysis.signals,
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
