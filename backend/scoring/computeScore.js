import { scorePerformance } from './scorePerformance.js';
import { scoreCTA } from './scoreCTA.js';
import { scoreTrust } from './scoreTrust.js';
import { scoreMobile } from './scoreMobile.js';

function computeScore(analysis) {
  let totalScore = 0;
  let allIssues = [];

  // Performance
  const perf = scorePerformance(analysis.performance);
  totalScore += perf.score;
  allIssues.push(...perf.issues);

  // CTA
  const cta = scoreCTA(analysis.cta);
  totalScore += cta.score;
  allIssues.push(...cta.issues);

  // Trust
  const trust = scoreTrust(analysis.trust);
  totalScore += trust.score;
  allIssues.push(...trust.issues);

  // Mobile
  const mobile = scoreMobile(analysis.mobile);
  totalScore += mobile.score;
  allIssues.push(...mobile.issues);

  // Return structured result
  // Note: The previous logic expected just a number. 
  // We need to verify if the caller (processScan) expects just a number or an object.
  // processScan expects `score`. It also handles `issues` separately.
  // I will attach `issues` to the return value, and update processScan to use them.
  return {
    score: Math.round(totalScore),
    issues: allIssues
  };
}

export default computeScore;