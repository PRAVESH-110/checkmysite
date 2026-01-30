import { SCORE_BUDGET } from './constants.js';

export function scoreMobile(mobile) {
    let score = SCORE_BUDGET.mobile;
    const issues = [];

    if (!mobile) return { score: 0, issues };

    if (!mobile.hasViewportMeta) {
        score -= 15; // Heavy penalty
        issues.push({
            category: 'Mobile',
            severity: 'critical',
            reason: 'Not Mobile Responsive',
            evidence: 'Missing <meta name="viewport"> tag.'
        });
    }

    return { score: Math.max(score, 0), issues };
}
