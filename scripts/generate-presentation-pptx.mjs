#!/usr/bin/env node
/**
 * Generate AYURDISHA-PRESENTATION.pptx from committee slide content.
 * Usage: node scripts/generate-presentation-pptx.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'public/docs/AYURDISHA-PRESENTATION.pptx');
const imgDir = path.join(root, 'public/docs/budget');

// Brand colours (no # prefix for pptxgenjs)
const C = {
  forestDeep: '0F2A1F',
  forest: '1B4332',
  forestMid: '2D6A4F',
  cream: 'F5EBE0',
  sand: 'EDE4D4',
  gold: 'D4A84B',
  oak: 'C4A484',
  ink: '1A2E24',
  muted: '5C6B62',
  white: 'FFFEFB',
};

const TOTAL_SLIDES = 16;

function img(name) {
  const p = path.join(imgDir, name);
  if (!fs.existsSync(p)) {
    console.warn('Warning: image not found:', p);
    return null;
  }
  return p;
}

function addFooter(slide, label, num, dark = false) {
  slide.addShape('line', {
    x: 0.6,
    y: 6.85,
    w: 12.1,
    h: 0,
    line: { color: dark ? 'FFFFFF' : C.muted, width: 0.5, transparency: dark ? 70 : 50 },
  });
  slide.addText(label, {
    x: 0.6,
    y: 6.95,
    w: 8,
    h: 0.35,
    fontSize: 8,
    color: dark ? C.oak : C.muted,
    charSpacing: 2,
  });
  slide.addText(`${num} / ${TOTAL_SLIDES}`, {
    x: 11.2,
    y: 6.95,
    w: 1.5,
    h: 0.35,
    fontSize: 8,
    color: dark ? C.oak : C.muted,
    align: 'right',
    charSpacing: 2,
  });
}

function addHeader(slide, eyebrow, title, dark = false) {
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.6,
    y: 0.45,
    w: 12,
    h: 0.3,
    fontSize: 9,
    bold: true,
    color: dark ? C.oak : C.gold,
    charSpacing: 4,
  });
  slide.addText(title, {
    x: 0.6,
    y: 0.8,
    w: 12,
    h: 0.7,
    fontSize: 32,
    bold: true,
    color: dark ? C.white : C.forestDeep,
    fontFace: 'Georgia',
  });
  slide.addShape('rect', {
    x: 0.6,
    y: 1.55,
    w: 0.75,
    h: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold, width: 0 },
  });
}

function addBullets(slide, items, opts = {}) {
  const {
    x = 0.6,
    y = 1.9,
    w = 12,
    h = 4.5,
    fontSize = 16,
    color = C.ink,
    dark = false,
  } = opts;

  const rows = items.map((item) => ({
    text: item,
    options: {
      bullet: { code: '2022', color: dark ? C.oak : C.gold },
      breakLine: true,
      paraSpaceAfter: 10,
    },
  }));

  slide.addText(rows, {
    x,
    y,
    w,
    h,
    fontSize,
    color: dark ? C.white : color,
    valign: 'top',
  });
}

function addTable(slide, headers, rows, opts = {}) {
  const { x = 0.6, y = 2.0, w = 12, colW, fontSize = 11 } = opts;

  const headerRow = headers.map((h) => ({
    text: h,
    options: {
      fill: { color: C.forestDeep },
      color: C.white,
      bold: true,
      fontSize: fontSize - 1,
      align: 'left',
      valign: 'middle',
    },
  }));

  const dataRows = rows.map((row, ri) =>
    row.map((cell, ci) => {
      const isHighlight = row._highlight;
      const text = typeof cell === 'object' ? cell.text : cell;
      const bold = typeof cell === 'object' ? cell.bold : isHighlight;
      return {
        text: String(text),
        options: {
          fill: { color: isHighlight ? 'F0E4C8' : ri % 2 === 0 ? C.cream : 'FAF5EE' },
          color: ci > 0 && /₹/.test(String(text)) ? C.forest : C.ink,
          bold: !!bold,
          fontSize,
          align: 'left',
          valign: 'middle',
        },
      };
    })
  );

  slide.addTable([headerRow, ...dataRows], {
    x,
    y,
    w,
    colW,
    border: { type: 'solid', color: 'D9CBB8', pt: 0.5 },
    rowH: 0.38,
  });
}

function lightSlide(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.cream };
  return slide;
}

function darkSlide(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.forestDeep };
  return slide;
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'AYURDISHA Technical Team';
  pptx.title = 'AYURDISHA — Meet the Mentors · Committee Presentation';
  pptx.subject = '11th World Ayurveda Congress · Bhubaneswar 2026';

  // ── 1. Title ──────────────────────────────────────────────────────────
  {
    const slide = darkSlide(pptx);
    addHeader(slide, 'World Ayurveda Foundation', 'AYURDISHA', true);
    slide.addText('Meet the Mentors · Experience Zone', {
      x: 0.6,
      y: 1.75,
      w: 11,
      h: 0.55,
      fontSize: 20,
      color: C.sand,
    });
    slide.addText('11th World Ayurveda Congress · Bhubaneswar 2026', {
      x: 0.6,
      y: 2.6,
      w: 11,
      h: 0.5,
      fontSize: 16,
      color: C.gold,
      fontFace: 'Georgia',
    });
    slide.addText('COMMITTEE PRESENTATION · SEPTEMBER 2026', {
      x: 0.6,
      y: 6.2,
      w: 11,
      h: 0.35,
      fontSize: 10,
      color: C.oak,
      charSpacing: 3,
    });
    addFooter(slide, 'AYURDISHA', 1, true);
  }

  // ── 2. What is AYURDISHA? ─────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Overview', 'What is AYURDISHA?');
    addBullets(slide, [
      'A digital hall for BAMS mentees at the 11th World Ayurveda Congress — register once, return anytime with your delegate number.',
      'Mentor Q&A — submit focused career questions, track answers, and read published guidance from experienced practitioners.',
      'An integrated congress experience zone connecting delegates, mentors, and organisers before, during, and after the event.',
    ]);
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 2);
  }

  // ── 3. Who is it for? ─────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Audience', 'Who is it for?');
    addBullets(slide, [
      'BAMS students & delegates — register with email OTP, receive a 6-digit delegate number, ask career questions, and follow ticket status.',
      'Mentors — answer curated question clusters; published responses appear on the Stage and Board for all delegates.',
      'Staff & organisers — curation desk, insights dashboard, mentor packs, and delegate lists for real-time congress coordination.',
    ]);
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 3);
  }

  // ── 4. Workflow ───────────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Journey', 'How it works');

    const steps = [
      { num: '1', label: 'Register', desc: 'Email OTP → delegate number' },
      { num: '2', label: 'Enter the Hall', desc: 'Explore zones & mentors' },
      { num: '3', label: 'Ask Desk', desc: 'Submit career question' },
      { num: '4', label: 'Track', desc: 'Follow ticket status' },
      { num: '5', label: 'Knowledge', desc: 'Career guidance by theme' },
      { num: '6', label: 'Stage / Board', desc: 'Published mentor answers' },
    ];

    const stepW = 1.75;
    const gap = 0.15;
    const startX = 0.55;
    const stepY = 2.0;

    steps.forEach((s, i) => {
      const x = startX + i * (stepW + gap);
      slide.addShape('roundRect', {
        x,
        y: stepY,
        w: stepW,
        h: 1.35,
        fill: { color: C.white },
        line: { color: 'D9CBB8', width: 0.75 },
        rectRadius: 0.08,
      });
      slide.addText(s.num, {
        x,
        y: stepY + 0.12,
        w: stepW,
        h: 0.4,
        fontSize: 20,
        bold: true,
        color: C.gold,
        align: 'center',
        fontFace: 'Georgia',
      });
      slide.addText(s.label, {
        x: x + 0.05,
        y: stepY + 0.5,
        w: stepW - 0.1,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: C.forestDeep,
        align: 'center',
      });
      slide.addText(s.desc, {
        x: x + 0.05,
        y: stepY + 0.78,
        w: stepW - 0.1,
        h: 0.45,
        fontSize: 8,
        color: C.muted,
        align: 'center',
        valign: 'top',
      });
      if (i < steps.length - 1) {
        slide.addText('→', {
          x: x + stepW,
          y: stepY + 0.45,
          w: gap,
          h: 0.4,
          fontSize: 12,
          bold: true,
          color: C.gold,
          align: 'center',
        });
      }
    });

    slide.addShape('rect', {
      x: 0.6,
      y: 3.65,
      w: 0.06,
      h: 0.7,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });
    slide.addShape('roundRect', {
      x: 0.6,
      y: 3.65,
      w: 12,
      h: 0.7,
      fill: { color: C.forest, transparency: 92 },
      line: { color: C.forest, width: 0 },
      rectRadius: 0.05,
    });
    slide.addText('STAFF WORKFLOW', {
      x: 0.85,
      y: 3.72,
      w: 5,
      h: 0.25,
      fontSize: 8,
      bold: true,
      color: C.forest,
      charSpacing: 3,
    });
    slide.addText('Curation → Merge similar questions → Mentor answers → Publish to hall & Track', {
      x: 0.85,
      y: 3.98,
      w: 11.5,
      h: 0.3,
      fontSize: 12,
      color: C.ink,
    });
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 4);
  }

  // ── 5. Digital Hall ───────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Experience Zone', 'The Digital Hall');
    addBullets(
      slide,
      [
        'Central navigation hub for the congress experience zone.',
        'Mentor clusters organised by career theme — PG, clinic, research, service, and more.',
        'Quick access to Ask Desk, Knowledge, Track, Stage, and Opportunity Exchange.',
      ],
      { x: 0.6, y: 1.9, w: 5.8, h: 4.5, fontSize: 14 }
    );
    const hallImg = img('app-hall.png');
    if (hallImg) {
      slide.addImage({ path: hallImg, x: 6.6, y: 1.85, w: 6.1, h: 4.6, rounding: true });
    }
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 5);
  }

  // ── 6. Registration & Ask Desk ────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Delegate journey', 'Registration & Ask Desk');
    addBullets(
      slide,
      [
        'Register with institutional email — OTP verification ensures one delegate per person.',
        'Receive a permanent 6-digit delegate number for all future visits.',
        'Ask Desk — one focused career question per submission; option to merge similar questions for broader hall answers.',
      ],
      { x: 0.6, y: 1.9, w: 5.8, h: 4.5, fontSize: 14 }
    );
    const landingImg = img('app-landing.png');
    if (landingImg) {
      slide.addImage({ path: landingImg, x: 6.6, y: 1.85, w: 6.1, h: 4.6, rounding: true });
    }
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 6);
  }

  // ── 7. Knowledge Hub ──────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Career guidance', 'Knowledge Hub');
    addBullets(
      slide,
      [
        'Themed career pods — PG admission, private practice, research, AYUSH service, start-ups, and international pathways.',
        'Curated guidance articles, journal references, and evidence summaries for each theme.',
        'Delegates read evidence first, then submit personal questions at the Ask Desk for mentor answers.',
      ],
      { x: 0.6, y: 1.9, w: 5.8, h: 4.5, fontSize: 14 }
    );
    const knowledgeImg = img('app-knowledge.png');
    if (knowledgeImg) {
      slide.addImage({ path: knowledgeImg, x: 6.6, y: 1.85, w: 6.1, h: 4.6, rounding: true });
    }
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 7);
  }

  // ── 8. Staff Tools ────────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Operations', 'Staff Tools');
    addBullets(slide, [
      'Curation desk — review incoming questions, merge similar submissions, assign to mentor clusters, and publish answers.',
      'Insights dashboard — real-time delegate counts, question volume, and theme distribution during congress.',
      'Mentor pack — export curated question batches for offline mentor review and bulk answer import.',
      'Delegate list — searchable registry with registration status, ticket tracking, and in-person shortlist flags.',
    ]);
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 8);
  }

  // ── 9. Opportunity Exchange & Track ───────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Engagement', 'Opportunity Exchange & Track');
    addBullets(slide, [
      'Opportunity Exchange — congress announcements, fellowships, internships, and career openings shared with registered delegates.',
      'Track my answer — delegates enter their 6-digit number to check ticket status and read mentor responses.',
      'Stage & Board — published hall answers visible to all; shortlisted mentees may be invited for in-person sessions.',
      'Delegates not shortlisted remain fully connected — same Track page, same delegate number, same hall on any device.',
    ]);
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 9);
  }

  // ── 10. Technology ────────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Platform', 'Technology');
    addBullets(slide, [
      'Serverless architecture — Google Cloud Firestore for data, Vercel for hosting and API functions; no dedicated servers.',
      'Secure OTP registration — transactional email verification with signed HttpOnly session cookies.',
      'Multi-staff coordination — real-time Firestore sync for curation desk, insights, and delegate management.',
      'Production-ready — security rules, App Check, monitoring, and congress-week on-call support planned.',
    ]);
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 10);
  }

  // ── 11. Domain ────────────────────────────────────────────────────────
  {
    const slide = darkSlide(pptx);
    addHeader(slide, 'Web presence', 'Domain — ayurdisha.ai', true);
    addBullets(
      slide,
      [
        'Official congress domain registered via GoDaddy.',
        'ayurdisha.ai — first year: ₹4,761 (registrar quote on file).',
        'DNS cutover planned from preview deployment to production domain before congress.',
        'SSL certificate included; CDN via Vercel for global delegate access.',
      ],
      { x: 0.6, y: 1.9, w: 5.8, h: 4.5, fontSize: 14, dark: true }
    );
    const domainImg = img('domain-ayurdisha-ai.jpg');
    if (domainImg) {
      slide.addImage({ path: domainImg, x: 6.6, y: 1.85, w: 6.1, h: 4.6, rounding: true });
    }
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 11, true);
  }

  // ── 12. Budget Overview ───────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Investment', 'Budget Summary — Overview');

    slide.addShape('roundRect', {
      x: 0.6,
      y: 1.75,
      w: 6.5,
      h: 0.65,
      fill: { color: C.forestDeep },
      line: { color: C.forestDeep, width: 0 },
      rectRadius: 0.08,
    });
    slide.addText('Total Allocation: ₹1,00,000 (~$1,176 USD)', {
      x: 0.6,
      y: 1.82,
      w: 6.5,
      h: 0.55,
      fontSize: 16,
      bold: true,
      color: C.gold,
      align: 'center',
      fontFace: 'Georgia',
    });

    const rows = [
      ['Minimum', '₹40,000', '₹24,000', '₹11,000', '₹75,000'],
      [{ text: 'Recommended ★', bold: true }, '₹60,000', '₹29,000', '₹11,000', '₹1,00,000'],
      ['Maximum', '₹88,000', '₹30,000', '₹12,000', '₹1,25,000'],
    ];
    rows[1]._highlight = true;

    addTable(
      slide,
      ['Scenario', 'Phase 1', 'Phase 2', 'Contingency', 'Total (INR)'],
      rows,
      { y: 2.6, colW: [2.4, 1.8, 1.8, 1.8, 2.0] }
    );

    slide.addText(
      'Phase 1: Technical infrastructure & platform development · Phase 2: Personnel & operational support',
      { x: 0.6, y: 5.5, w: 12, h: 0.4, fontSize: 11, color: C.muted }
    );
    addFooter(slide, 'AYURDISHA · Budget', 12);
  }

  // ── 13. Phase 1 Breakdown ─────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Phase 1 — ₹60,000', 'Technical Infrastructure & Development');

    const rows = [
      ['A', 'Cloud & Infrastructure — Firebase, Vercel, email, domain, SSL, security', '₹26,361'],
      ['B', 'Software Engineering & Web Development — design, build, test, deploy', '₹30,000'],
      ['C', 'Technical Assurance — congress-week monitoring, on-call, hotfix buffer', '₹3,639'],
      [{ text: 'Phase 1 Total (A + B + C)', bold: true }, '', '₹60,000'],
    ];
    rows[3]._highlight = true;

    addTable(slide, ['', 'Category', 'Amount (INR)'], rows, {
      y: 2.0,
      colW: [0.6, 8.4, 2.2],
      fontSize: 12,
    });
    addFooter(slide, 'AYURDISHA · Budget', 13);
  }

  // ── 14. Phase 2 + Key Items ───────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Phase 2 + Key Items', 'Personnel, Contingency & Line Items');

    const leftRows = [
      ['Phase 2 — Personnel & operations', '₹29,000'],
      ['Contingency reserve', '₹11,000'],
      [{ text: 'Recommended total', bold: true }, '₹1,00,000'],
    ];
    leftRows[2]._highlight = true;

    addTable(slide, ['Item', 'Amount'], leftRows, {
      x: 0.6,
      y: 2.0,
      w: 5.8,
      colW: [3.8, 1.6],
      fontSize: 11,
    });

    const rightRows = [
      ['Domain — ayurdisha.ai (GoDaddy, 1st year)', '₹4,761'],
      ['Software engineering fee', '₹30,000'],
      ['Firebase Blaze (Firestore)', '₹5,500'],
      ['Vercel Pro — hosting & API', '₹7,500'],
      ['Resend / SendGrid — OTP email', '₹1,800'],
    ];

    addTable(slide, ['Key line items', 'Amount'], rightRows, {
      x: 6.7,
      y: 2.0,
      w: 6.0,
      colW: [4.2, 1.4],
      fontSize: 10,
    });

    slide.addText('Full itemised budget: /docs/INFRASTRUCTURE-BUDGET.pdf', {
      x: 0.6,
      y: 5.2,
      w: 12,
      h: 0.35,
      fontSize: 11,
      color: C.muted,
    });
    addFooter(slide, 'AYURDISHA · Budget', 14);
  }

  // ── 15. Live Demo ─────────────────────────────────────────────────────
  {
    const slide = lightSlide(pptx);
    addHeader(slide, 'Demonstration', 'Live Demo');

    slide.addShape('roundRect', {
      x: 1.5,
      y: 2.8,
      w: 10.3,
      h: 1.1,
      fill: { color: C.forestDeep },
      line: { color: C.gold, width: 1.5 },
      rectRadius: 0.1,
    });
    slide.addText('https://ayushmarg.vercel.app', {
      x: 1.5,
      y: 2.95,
      w: 10.3,
      h: 0.85,
      fontSize: 28,
      bold: true,
      color: C.gold,
      align: 'center',
      fontFace: 'Georgia',
      hyperlink: { url: 'https://ayushmarg.vercel.app', tooltip: 'Open live demo' },
    });
    slide.addText('Production preview — register, explore the hall, and try Ask Desk', {
      x: 0.6,
      y: 4.1,
      w: 12,
      h: 0.4,
      fontSize: 14,
      color: C.muted,
      align: 'center',
    });
    slide.addText('Scan or visit for live demonstration', {
      x: 0.6,
      y: 4.65,
      w: 12,
      h: 0.35,
      fontSize: 13,
      bold: true,
      color: C.forest,
      align: 'center',
    });
    slide.addText('Planned production domain: ayurdisha.ai', {
      x: 0.6,
      y: 5.15,
      w: 12,
      h: 0.35,
      fontSize: 13,
      color: C.muted,
      align: 'center',
    });
    addFooter(slide, 'AYURDISHA · Meet the Mentors', 15);
  }

  // ── 16. Thank You ─────────────────────────────────────────────────────
  {
    const slide = darkSlide(pptx);
    slide.addText('Thank You', {
      x: 0.6,
      y: 2.2,
      w: 12.1,
      h: 1.0,
      fontSize: 48,
      bold: true,
      color: C.white,
      align: 'center',
      fontFace: 'Georgia',
    });
    slide.addShape('rect', {
      x: 6.2,
      y: 3.35,
      w: 0.75,
      h: 0.04,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });
    slide.addText('World Ayurveda Foundation', {
      x: 0.6,
      y: 3.65,
      w: 12.1,
      h: 0.45,
      fontSize: 16,
      color: C.sand,
      align: 'center',
    });
    slide.addText('AYURDISHA Technical Team', {
      x: 0.6,
      y: 4.15,
      w: 12.1,
      h: 0.45,
      fontSize: 16,
      color: C.sand,
      align: 'center',
    });
    slide.addText('Questions?', {
      x: 0.6,
      y: 5.2,
      w: 12.1,
      h: 0.5,
      fontSize: 22,
      color: C.gold,
      align: 'center',
      fontFace: 'Georgia',
    });
    addFooter(slide, '11th World Ayurveda Congress · Bhubaneswar 2026', 16, true);
  }

  await pptx.writeFile({ fileName: outPath });

  if (!fs.existsSync(outPath)) {
    console.error('PPTX was not created at:', outPath);
    process.exit(1);
  }

  const stats = fs.statSync(outPath);
  if (stats.size < 50 * 1024) {
    console.error(`PPTX too small (${stats.size} bytes) — expected > 50 KB`);
    process.exit(1);
  }

  console.log('PPTX written to:', outPath);
  console.log('PPTX size:', Math.round(stats.size / 1024), 'KB');
  console.log('Slides:', TOTAL_SLIDES);
  console.log('Download URL: https://ayushmarg.vercel.app/docs/AYURDISHA-PRESENTATION.pptx');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
