// worker/services/runLighthouse.ts
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import config from '../lighthouse.config.js';

export async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox'],
    logLevel: 'error',
    cleanup: false // Windows-safe
  });

  try {
    const result = await lighthouse(
      url,
      { port: chrome.port, logLevel: 'error' },
      config
    );

    const audits = result.lhr.audits;

    return {
      lcp: audits['largest-contentful-paint']?.numericValue ?? null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      tbt: audits['total-blocking-time']?.numericValue ?? null,
      fcp: audits['first-contentful-paint']?.numericValue ?? null
    };
  } finally {
    await chrome.kill();
  }
}
