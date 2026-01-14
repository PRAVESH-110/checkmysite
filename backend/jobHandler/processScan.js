import { Scan } from "../model/model.scan.js";
import homepageAnalyzer from "../analyzers/homepageAnalyzer.js";
import computeScore from "../scoring/computeScore.js";

async function processScan(scanId) {
  try {
    // 1️⃣ Mark scan as running
    await Scan.findByIdAndUpdate(scanId, {
      status: "running"
    });

    // 2️⃣ Fetch scan
    const scan = await Scan.findById(scanId);
    if (!scan) return;

    // 3️⃣ Fetch website HTML
    const response = await fetch(scan.url, {
      method: "GET",
      redirect: "follow",
      timeout: 15000
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();

    // 4️⃣ Analyze homepage
    const analysis = homepageAnalyzer(html);

    // 5️⃣ Compute score
    const score = computeScore(analysis);

    // 6️⃣ Save results
    await Scan.findByIdAndUpdate(scanId, {
      status: "completed",
      score,
      issues: analysis.issues,
      signals: analysis.signals,
      completedAt: new Date()
    });

  } catch (err) {
    console.error("Scan failed:", err.message);

    // 7️⃣ Mark scan as failed
    await Scan.findByIdAndUpdate(scanId, {
      status: "failed",
      error: err.message
    });
  }
}

export default processScan;
