#!/usr/bin/env node
/** Build-time public sitemap for the Vite SPA (staff hashes excluded). */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MENTORS, mentorPublicPath, mentorsWithNames } from "../src/mentors.js";
import { getAllPrograms } from "../src/data/programs.js";
import { getAllEvents } from "../src/data/events.js";
import { getAllResources } from "../src/data/resources.js";

const ORIGIN = "https://ayushmarg.vercel.app";
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "public", "sitemap.xml");

const staticPaths = [
  "/", 
  "/about", 
  "/mentors", 
  "/programs", 
  "/events", 
  "/resources", 
  "/contact", 
  "/privacy", 
  "/terms", 
  "/disclaimer"
];

const mentorPaths = mentorsWithNames(MENTORS).map(m => mentorPublicPath(m));
const programPaths = getAllPrograms().map(p => p.path);
const eventPaths = getAllEvents().map(e => e.path);
const resourcePaths = getAllResources().map(r => r.path);

const allPaths = [
  ...staticPaths,
  ...mentorPaths,
  ...programPaths,
  ...eventPaths,
  ...resourcePaths
];

const urls = allPaths.map(path => {
  const loc = `${ORIGIN}${path === "/" ? "/" : path}`;
  const lastmod = new Date().toISOString().slice(0, 10);
  let priority = "0.5";
  if (path === "/") priority = "1.0";
  else if (path === "/mentors" || path === "/programs" || path === "/events" || path === "/resources") priority = "0.9";
  else if (path.startsWith("/mentors/") || path.startsWith("/programs/")) priority = "0.8";

  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(out, xml);
console.log(`Wrote ${out} (${allPaths.length} URLs)`);
