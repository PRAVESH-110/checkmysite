# CheckMySite

A full-stack auditing tool that scans websites to find design flaws and conversion blockers. It provides a deterministic score and a checklist of actionable fixes to improve user experience.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Analysis Engine:** Google Lighthouse & Custom Puppeteer scripts (Headless Chrome)
- **Payments:** Razorpay

## Features

- **Instant Scan:** Enter a URL to get a conversion score (0-100).
- **Deep Analysis:** Checks for mobile responsiveness, speed, and trust signals.
- **Actionable Fixes:** specific code-level suggestions to fix issues.
- **Reporting:** Download detailed PDF audits.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   ```

2. **Install Dependencies**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Environment Setup**
    Create `.env` files in both folders with your MongoDB URI, JWT secret, and Razorpay keys.

4. **Run Locally**
   Start both servers:
   ```bash
   # Terminal 1 (Backend)
   cd backend && npm run dev
   
   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```
