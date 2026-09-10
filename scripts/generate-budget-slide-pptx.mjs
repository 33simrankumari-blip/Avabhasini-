#!/usr/bin/env node
/**
 * Single-slide infrastructure budget for committee.
 * Usage: node scripts/generate-budget-slide-pptx.mjs
 */
import path from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '../public/docs/AYURDISHA-BUDGET-SLIDE.pptx');

const C = {
  forestDeep: '0F2A1F',
  forest: '1B4332',
  gold: 'D4A84B',
  oak: 'C4A484',
  cream: 'F5EBE0',
  ink: '1A2E24',
  muted: '5C6B62',
  white: 'FFFFFF',
};

const rows = [
  ['A. Cloud & Infrastructure', '₹26,361', false],
  ['B. Software Engineering & Web Development', '₹30,000', false],
  ['C. Technical Assurance (congress-week)', '₹3,639', false],
  ['Phase 1 Total', '₹60,000', true],
  ['Phase 2 — Personnel & Operations', '₹29,000', false],
  ['Contingency Reserve', '₹11,000', false],
  ['GRAND TOTAL (Recommended)', '₹1,00,000', true],
];

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'AYURDISHA Technical Team';
pptx.title = 'Infrastructure Budget — AYURDISHA';

const slide = pptx.addSlide();
slide.background = { color: C.forestDeep };

slide.addShape('rect', {
  x: 0,
  y: 0,
  w: '100%',
  h: 0.12,
  fill: { color: C.gold },
  line: { color: C.gold, width: 0 },
});

slide.addText('INFRASTRUCTURE BUDGET', {
  x: 0.5,
  y: 0.35,
  w: 12.3,
  h: 0.28,
  fontSize: 10,
  bold: true,
  color: C.oak,
  charSpacing: 5,
});

slide.addText('AYURDISHA — Meet the Mentors', {
  x: 0.5,
  y: 0.65,
  w: 12.3,
  h: 0.55,
  fontSize: 28,
  bold: true,
  color: C.white,
  fontFace: 'Georgia',
});

slide.addText('11th World Ayurveda Congress · Bhubaneswar 2026 · World Ayurveda Foundation', {
  x: 0.5,
  y: 1.2,
  w: 12.3,
  h: 0.35,
  fontSize: 11,
  color: C.cream,
});

const tableRows = [
  [
    { text: 'Line item', options: { bold: true, color: C.white, fill: { color: C.forest } } },
    { text: 'Amount (INR)', options: { bold: true, color: C.white, fill: { color: C.forest }, align: 'right' } },
  ],
  ...rows.map(([label, amt, bold]) => [
    {
      text: label,
      options: {
        bold,
        color: bold ? C.forestDeep : C.ink,
        fill: { color: bold ? C.gold : C.white },
        fontSize: bold ? 12 : 11,
      },
    },
    {
      text: amt,
      options: {
        bold,
        color: bold ? C.forestDeep : C.ink,
        fill: { color: bold ? C.gold : C.white },
        align: 'right',
        fontSize: bold ? 12 : 11,
      },
    },
  ]),
];

slide.addTable(tableRows, {
  x: 0.5,
  y: 1.75,
  w: 12.3,
  colW: [9.2, 3.1],
  border: { type: 'solid', color: C.oak, pt: 0.5 },
  fontSize: 11,
  fontFace: 'Arial',
});

slide.addText(
  'Includes: Firebase Blaze · Vercel Pro · Gemini API · Resend OTP · Domain ayurdisha.ai via GoDaddy (₹4,761/yr) · Full-stack web development · On-call support',
  {
    x: 0.5,
    y: 5.55,
    w: 12.3,
    h: 0.45,
    fontSize: 9,
    color: C.cream,
    valign: 'top',
  }
);

slide.addText('Scenarios:  Minimum ₹75,000   ·   Recommended ₹1,00,000   ·   Maximum ₹1,25,000', {
  x: 0.5,
  y: 6.05,
  w: 12.3,
  h: 0.35,
  fontSize: 10,
  bold: true,
  color: C.gold,
});

slide.addText('Full detail: ayushmarg.vercel.app/docs/INFRASTRUCTURE-BUDGET.pdf', {
  x: 0.5,
  y: 6.45,
  w: 12.3,
  h: 0.3,
  fontSize: 8,
  color: C.oak,
});

await pptx.writeFile({ fileName: outPath });
console.log('PPTX written to:', outPath);
