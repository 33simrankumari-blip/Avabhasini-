#!/usr/bin/env node
/**
 * Regenerate INFRASTRUCTURE-BUDGET-PREMIUM.pdf from the HTML source.
 * Usage: node scripts/generate-budget-premium-pdf.mjs
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'public/docs/INFRASTRUCTURE-BUDGET-PREMIUM.html');
const pdfPath = path.join(root, 'public/docs/INFRASTRUCTURE-BUDGET-PREMIUM.pdf');

const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'google-chrome',
  'chromium',
];

let chrome = null;
for (const p of chromePaths) {
  if (p.includes('/')) {
    if (fs.existsSync(p)) {
      chrome = p;
      break;
    }
  } else if (spawnSync('which', [p], { encoding: 'utf8' }).status === 0) {
    chrome = p;
    break;
  }
}

if (!chrome) {
  console.error('Chrome/Chromium not found. Open public/docs/INFRASTRUCTURE-BUDGET-PREMIUM.html and print to PDF.');
  process.exit(1);
}

const fileUrl = `file://${htmlPath}`;

const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=20000',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${pdfPath}`,
    fileUrl,
  ],
  { encoding: 'utf8', timeout: 60000 }
);

if (result.status !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.status ?? 1);
}

if (!fs.existsSync(pdfPath)) {
  console.error('PDF was not created at:', pdfPath);
  process.exit(1);
}

const stats = fs.statSync(pdfPath);
console.log('PDF written to:', pdfPath);
console.log('PDF size:', Math.round(stats.size / 1024), 'KB');
