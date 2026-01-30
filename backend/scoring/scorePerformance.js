import { SCORE_BUDGET } from './constants.js';

export function scorePerformance(perf) {
    let score = SCORE_BUDGET.performance;
    const issues = [];

    if (!perf) {
        issues.push({
            category: 'Performance',
            severity: 'high',
            reason: 'Performance data unavailable',
            evidence: 'Lighthouse scan failed or timed out'
        });
        return { score: 0, issues };
    }

    // LCP
    if (perf.lcp > 4000) {
        score -= 10;
        issues.push({
            category: 'Performance',
            severity: 'high',
            reason: 'Slow Largest Contentful Paint (LCP)',
            evidence: `LCP is ${Math.round(perf.lcp)}ms (Target: <2500ms)`
        });
    } else if (perf.lcp > 2500) {
        score -= 5;
        issues.push({
            category: 'Performance',
            severity: 'medium',
            reason: 'Needs improvement: Largest Contentful Paint',
            evidence: `LCP is ${Math.round(perf.lcp)}ms`
        });
    }

    // CLS
    if (perf.cls > 0.25) {
        score -= 5;
        issues.push({
            category: 'Performance',
            severity: 'high',
            reason: 'High Cumulative Layout Shift (CLS)',
            evidence: `CLS is ${perf.cls.toFixed(3)} (Target: <0.1)`
        });
    } else if (perf.cls > 0.1) {
        score -= 2; // Minor penalty
        issues.push({
            category: 'Performance',
            severity: 'medium',
            reason: 'Needs improvement: Cumulative Layout Shift',
            evidence: `CLS is ${perf.cls.toFixed(3)}`
        });
    }

    // TBT
    if (perf.tbt > 600) {
        score -= 5;
        issues.push({
            category: 'Performance',
            severity: 'high',
            reason: 'High Total Blocking Time',
            evidence: `TBT is ${Math.round(perf.tbt)}ms (Target: <200ms)`
        });
    } else if (perf.tbt > 300) {
        score -= 2;
    }

    return { score: Math.max(score, 0), issues };
}
