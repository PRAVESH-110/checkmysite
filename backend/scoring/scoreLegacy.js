function scoreLegacy(analysis) {
    let score = 100;
    if (analysis && analysis.issues) {
        score -= analysis.issues.length * 10;
    }
    return Math.max(score, 0);
}

export default scoreLegacy;
