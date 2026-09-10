#!/usr/bin/env node
/**
 * One-time (idempotent) migration: Vercel Blob live-store → Firestore.
 *
 * Requires:
 *   BLOB_READ_WRITE_TOKEN  — read ayurdisha/live-store.json
 *   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *     (or FIREBASE_SERVICE_ACCOUNT_JSON / GOOGLE_APPLICATION_CREDENTIALS)
 *
 * Usage (from ayurmarg-preview/):
 *   node scripts/migrate-blob-to-firestore.js
 *   node scripts/migrate-blob-to-firestore.js --dry-run
 */
import { blobTokenPresent, createBlobStore } from "../server/blobStore.js";
import {
  createFirestoreStore,
  resolveFirebaseCreds,
  K_Q,
  K_CLUSTERS,
  K_CONFIG,
  K_WAC_RESULTS,
} from "../server/store.js";
import { K_USER, K_EMAIL, K_REGNO } from "../server/register.js";

const DRY_RUN = process.argv.includes("--dry-run");
const BATCH = 16;

function classifyKey(key) {
  if (key.startsWith(K_Q)) return "questions";
  if (key.startsWith(K_USER)) return "users";
  if (key.startsWith(K_EMAIL)) return "emailIndex";
  if (key.startsWith(K_REGNO)) return "regNoIndex";
  if (key.startsWith("aym:sess:")) return "sessions";
  if (key === K_CLUSTERS) return "clusters";
  if (key === K_CONFIG) return "config";
  if (key === K_WAC_RESULTS) return "wacResults";
  if (key.startsWith("aym:")) return "kv";
  return "other";
}

async function main() {
  const creds = resolveFirebaseCreds();
  if (!creds) {
    console.error("[migrate] Firebase credentials missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.");
    process.exit(1);
  }
  if (!blobTokenPresent()) {
    console.error("[migrate] BLOB_READ_WRITE_TOKEN missing. Cannot read ayurdisha/live-store.json.");
    process.exit(1);
  }

  console.log(`[migrate] Source: Vercel Blob (ayurdisha/live-store.json)`);
  console.log(`[migrate] Target: Firestore project ${creds.projectId}${DRY_RUN ? " (DRY RUN)" : ""}`);

  const blob = createBlobStore();
  const firestore = await createFirestoreStore(creds);

  let snapshot;
  try {
    snapshot = await blob.snapshot();
  } catch (err) {
    console.error("[migrate] Blob read failed:", err && err.message ? err.message : err);
    process.exit(1);
  }

  const keys = Object.keys(snapshot || {}).filter(k => k !== "__rev");
  if (!keys.length) {
    console.log("[migrate] Blob store is empty — nothing to migrate.");
    process.exit(0);
  }

  const counts = {};
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < keys.length; i += BATCH) {
    const slice = keys.slice(i, i + BATCH);
    await Promise.all(slice.map(async key => {
      const val = snapshot[key];
      if (val === undefined) {
        skipped += 1;
        return;
      }
      const bucket = classifyKey(key);
      counts[bucket] = (counts[bucket] || 0) + 1;
      if (!DRY_RUN) {
        await firestore.set(key, val);
        written += 1;
      }
    }));
    process.stdout.write(`\r[migrate] ${Math.min(i + BATCH, keys.length)}/${keys.length} keys…`);
  }
  process.stdout.write("\n");

  console.log("[migrate] Summary:");
  console.log(`  Total keys in blob: ${keys.length}`);
  for (const [bucket, n] of Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${bucket}: ${n}`);
  }
  if (DRY_RUN) {
    console.log("[migrate] Dry run complete — no writes performed. Re-run without --dry-run to migrate.");
  } else {
    console.log(`[migrate] Wrote ${written} keys to Firestore (${skipped} skipped).`);
    console.log("[migrate] Next: deploy with Firebase env vars on Vercel, then ping /api/aym-store — expect backend: \"firestore\".");
  }
}

main().catch(err => {
  console.error("[migrate] Failed:", err && err.message ? err.message : err);
  process.exit(1);
});
