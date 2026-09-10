/**
 * Issued WAC registration numbers for the 11th World Ayurveda Congress,
 * Bhubaneswar 2026. Sequential, zero-padded, assigned by the hall — never typed.
 *
 * Display pattern: 11WAC/2026/NNNN  (4 digits until 9999, then 5–6).
 */
export const WAC_REG_DISPLAY = "11WAC/2026/NNNN";
export const K_WAC_SEQ = "aym:meta:wac-seq";
export const WAC_SEQ_DOC = "wac-seq";

export function formatIssuedWac(seq) {
  const n = Math.max(1, Math.floor(Number(seq) || 0));
  const width = n >= 100000 ? 6 : n >= 10000 ? 5 : 4;
  return `11WAC/2026/${String(n).padStart(width, "0")}`;
}

export function bumpWacCounterInDb(db, name = WAC_SEQ_DOC) {
  const key = name === WAC_SEQ_DOC ? K_WAC_SEQ : `aym:meta:${name}`;
  const cur = db[key] && typeof db[key] === "object" ? db[key] : { last: 0 };
  const last = Number(cur.last);
  const next = (Number.isFinite(last) ? last : 0) + 1;
  db[key] = { last: next, updatedAt: Date.now() };
  return next;
}
