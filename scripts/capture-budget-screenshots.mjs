#!/usr/bin/env node
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, '../public/docs/budget');
const base = 'https://ayushmarg.vercel.app';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto(`${base}/#intro`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.screenshot({ path: path.join(out, 'app-landing.png') });

await page.goto(`${base}/#pods`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.screenshot({ path: path.join(out, 'app-knowledge.png') });

await page.goto(`${base}/#hall`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.screenshot({ path: path.join(out, 'app-hall.png') });

await page.goto(`${base}/#intro`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.click('.aym-gemini-promo-btn');
await page.waitForSelector('.aym-gemini-modal', { timeout: 10000 });
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: path.join(out, 'app-gemini.png') });

await browser.close();
console.log('Screenshots saved to', out);
