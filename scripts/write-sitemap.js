#!/usr/bin/env node
/** Build-time public sitemap for the Vite SPA (staff hashes excluded). */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MENTORS, mentorPublicPath, mentorsWithNames } from "../src/mentors.js";

const ORIGIN = "https://ayurdisha-d8xb0aegc-vishnukumar07042004-techs-projects.vercel.app";
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "public/sitemap.xml");

const staticPaths = [
  "/",
  "/about",
  "/mentors",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
];

const allPaths = [...staticPaths, ...mentorsWithNames(MENTORS).map(m => mentorPublicPath(m))];

const urls = allPaths.map(path => {
  const loc = `${ORIGIN}${path === "/" ? "/" : path}`;
  const lastmod = new Date().toISOString().slice(0, 10);
  let priority = "0.6";
  if (path === "/") priority = "1.0";
  else if (path === "/mentors") priority = "0.9";
  else if (path.startsWith("/mentors/")) priority = "0.7";
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(out, xml);
console.log(`Wrote ${out} (${allPaths.length} URLs)`);
