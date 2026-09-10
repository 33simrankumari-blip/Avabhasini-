/**
 * AYURDISHA Career & Academic Programs Data Architecture
 * Standardized data and helper functions for 10 core national Ayurveda tracks (T01–T10).
 */

import { POD_KNOWLEDGE } from "../podKnowledge.js";

/** Convert track name or code to a URL-friendly slug */
export function programSlug(program) {
  if (!program) return "";
  const code = String(program.code || "").toLowerCase();
  const nameSlug = String(program.title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${code}-${nameSlug}`;
}

export function programPublicPath(program) {
  if (!program) return "/programs";
  return `/programs/${programSlug(program)}`;
}

/** Get all 10 programs */
export function getAllPrograms() {
  return POD_KNOWLEDGE.map(p => ({
    ...p,
    slug: programSlug(p),
    path: programPublicPath(p),
  }));
}

/** Find program by slug or code */
export function getProgramBySlug(slug) {
  if (!slug) return null;
  const clean = decodeURIComponent(slug).toLowerCase().trim();
  const programs = getAllPrograms();
  
  return programs.find(p => 
    p.slug.toLowerCase() === clean || 
    p.code.toLowerCase() === clean ||
    p.slug.startsWith(clean)
  ) || null;
}

export function getProgramByCode(code) {
  if (!code) return null;
  const clean = String(code).toUpperCase().trim();
  return getAllPrograms().find(p => p.code === clean) || null;
}

export default getAllPrograms;
