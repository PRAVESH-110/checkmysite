import { SCORE_BUDGET } from './constants.js';

export function scoreTrust(trust) {
    let score = SCORE_BUDGET.trust;
    const issues = [];

    if (!trust) return { score: 0, issues };

    if (!trust.hasFavicon) {
        score -= 5;
        issues.push({
            category: 'Trust',
            severity: 'low',
            reason: 'Missing Favicon',
            evidence: 'No favicon link tag found.'
        });
    }

    if (!trust.hasImages) {
        score -= 5;
        issues.push({
            category: 'Trust',
            severity: 'medium',
            reason: 'No images found',
            evidence: 'Visual content improves trust and engagement.'
        });
    }

    if (trust.hasImages && !trust.hasAltText) {
        score -= 5;
        issues.push({
            category: 'Trust',
            severity: 'medium',
            reason: 'Images missing Alt Text',
            evidence: 'Accessible images build trust and help SEO.'
        });
    }

    return { score: Math.max(score, 0), issues };
}
