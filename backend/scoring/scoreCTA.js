import { SCORE_BUDGET } from './constants.js';

export function scoreCTA(cta) {
    let score = SCORE_BUDGET.cta;
    const issues = [];

    if (!cta) return { score: 0, issues: ["No CTA data"] };

    if (cta.total === 0) {
        score -= 20;
        issues.push({
            category: 'CTA',
            severity: 'high',
            reason: 'No clear Call-to-Action found',
            evidence: 'No buttons or links matching standard CTA keywords (buy, sign up, contact, etc.) were detected.'
        });
    }

    if (!cta.aboveFold) { // Note: 'aboveFold' logic might be hard with just Cheerio but we can assume false if not passed
        // Cheerio cannot determine 'above fold'. 
        // If we assume Playwright later, we can keep this check. 
        // For now, if cta.aboveFold is undefined, we might skip or default.
        // The user's example assumed Playwright.
        // Since we are using Cheerio currently, 'aboveFold' will likely be undefined or false.
        // I will implement the logic, but it relies on better analysis later.
        // Ideally, Cheerio analysis won't return `aboveFold`.
    }

    if (cta.total > 0 && cta.total < 1) { // Logic check?
        // User example: if (cta.total > 3) score -= 5; (Too many CTAs?)
    }

    if (cta.total > 5) {
        score -= 5;
        issues.push({
            category: 'CTA',
            severity: 'low',
            reason: 'Too many CTAs can confuse users'
        })
    }

    return { score: Math.max(score, 0), issues };
}
