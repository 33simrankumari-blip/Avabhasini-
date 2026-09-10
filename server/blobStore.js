import { put, list, get, BlobNotFoundError } from "@vercel/blob";
import { loadServerEnv } from "./env.js";
import { K_CLUSTERS, K_CLUSTERS_META, ClustersVersionConflictError } from "./store.js";
import { bumpWacCounterInDb, WAC_SEQ_DOC } from "./wacRegNo.js";

const K_Q = "aym:q:";

const BLOB_NAME = "ayurdisha/live-store.json";

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function questionsFromDb(db) {
  return Object.keys(db)
    .filter(k => k.startsWith(K_Q))
    .map(k => db[k])
    .filter(s => s && s.id);
}

function statsFromQuestions(questions) {
  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const cutoff14 = now - 14 * day;
  const byTheme = {};
  const byStage = {};
  const byState = {};
  let last14Days = 0;
  for (const s of questions) {
    const theme = s.theme || "Unknown";
    const stage = s.stage || "Unknown";
    const state = s.state || "Unknown";
    byTheme[theme] = (byTheme[theme] || 0) + 1;
    byStage[stage] = (byStage[stage] || 0) + 1;
    byState[state] = (byState[state] || 0) + 1;
    if ((s.createdAt || 0) >= cutoff14) last14Days += 1;
  }
  return { total: questions.length, last14Days, byTheme, byStage, byState, updatedAt: now };
}

function clustersMetaFromDb(db) {
  const val = db[K_CLUSTERS];
  const meta = db[K_CLUSTERS_META] || {};
  return {
    value: Array.isArray(val) ? val : [],
    version: meta.version || 1,
    updatedAt: meta.updatedAt || 0,
  };
}

function saveClustersInDb(db, clusters, expectedVersion) {
  const current = clustersMetaFromDb(db);
  if (expectedVersion != null && expectedVersion !== current.version) {
    throw new ClustersVersionConflictError(current.version);
  }
  const nextVersion = current.version + 1;
  const now = Date.now();
  db[K_CLUSTERS] = Array.isArray(clusters) ? clusters : [];
  db[K_CLUSTERS_META] = { version: nextVersion, updatedAt: now };
  return { clusters: db[K_CLUSTERS], version: nextVersion, updatedAt: now };
}

export function blobTokenPresent() {
  const env = loadServerEnv();
  const tok = String(env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  if (tok) process.env.BLOB_READ_WRITE_TOKEN = tok;
  return Boolean(tok);
}

export function createBlobStore() {
  let chain = Promise.resolve();
  const run = fn => {
    const next = chain.then(fn, fn);
    chain = next.catch(() => {});
    return next;
  };

  function blobAuthHeaders() {
    const tok = String(process.env.BLOB_READ_WRITE_TOKEN || "").trim();
    return tok ? { Authorization: `Bearer ${tok}` } : {};
  }

  function parseStoreJson(text) {
    if (!text) return {};
    try { return JSON.parse(text); }
    catch {
      throw new Error("AYURDISHA live store is not valid JSON.");
    }
  }

  function isMissingBlob(err) {
    if (!err) return false;
    if (err instanceof BlobNotFoundError || err.name === "BlobNotFoundError") return true;
    return /not found|404/i.test(String(err.message || err));
  }

  async function loadViaSdkGet() {
    const result = await get(BLOB_NAME, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return {};
    return parseStoreJson(await new Response(result.stream).text());
  }

  async function loadViaAuthedFetch() {
    const { blobs } = await list({ prefix: BLOB_NAME, limit: 5 });
    const hit = blobs.find(b => b.pathname === BLOB_NAME) || blobs[0];
    if (!hit) return {};
    const url = hit.downloadUrl || hit.url;
    const res = await fetch(url, {
      headers: blobAuthHeaders(),
      cache: "no-store",
    });
    if (res.status === 404) return {};
    if (!res.ok) {
      throw new Error(`Private blob read failed (${res.status}).`);
    }
    return parseStoreJson(await res.text());
  }

  async function load() {
    try {
      return await loadViaSdkGet();
    } catch (err) {
      if (isMissingBlob(err)) return {};
      try {
        return await loadViaAuthedFetch();
      } catch (err2) {
        if (isMissingBlob(err2)) return {};
        throw err2;
      }
    }
  }

  async function save(db) {
    await put(BLOB_NAME, JSON.stringify(db), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
    });
  }

  async function mutate(writer) {
    let lastErr;
    for (let i = 0; i < 6; i++) {
      try {
        const db = await load();
        const out = await writer(db) || db;
        out.__rev = Date.now();
        await save(out);
        return out;
      } catch (err) {
        if (err instanceof ClustersVersionConflictError) throw err;
        if (err && (err.code === 400 || err.code === 409)) throw err;
        lastErr = err;
        await sleep(40 * (i + 1));
      }
    }
    throw lastErr || new Error("Could not save AYURDISHA records.");
  }

  return {
    name: "blob",
    async get(key) {
      const db = await load();
      return key in db ? db[key] : null;
    },
    async exists(key) {
      const db = await load();
      return key in db;
    },
    async set(key, val) {
      await run(() => mutate(db => {
        db[key] = val;
        return db;
      }));
    },
    async merge(entries) {
      const patch = entries && typeof entries === "object" ? entries : {};
      await run(() => mutate(db => {
        for (const [k, v] of Object.entries(patch)) db[k] = v;
        return db;
      }));
    },
    async transact(writer) {
      return run(() => mutate(writer));
    },
    async incrementCounter(name = WAC_SEQ_DOC) {
      let next = 0;
      await this.transact(db => {
        next = bumpWacCounterInDb(db, name);
        return db;
      });
      return next;
    },
    async del(key) {
      await run(() => mutate(db => {
        delete db[key];
        return db;
      }));
    },
    async list(prefix = "") {
      const db = await load();
      return Object.keys(db).filter(k => k !== "__rev" && k.startsWith(prefix || ""));
    },
    async lookup(needle) {
      const db = await load();
      return questionsFromDb(db).filter(s =>
        String(s.ticket || "").toLowerCase() === needle ||
        String(s.email || "").toLowerCase() === needle
      );
    },
    async stats() {
      const db = await load();
      return statsFromQuestions(questionsFromDb(db));
    },
    async listQuestions() {
      return questionsFromDb(await load());
    },
    async snapshot() {
      const db = await load();
      return db;
    },
    async getClustersMeta() {
      return clustersMetaFromDb(await load());
    },
    async saveClusters(clusters, expectedVersion) {
      return run(async () => {
        let saved;
        await mutate(db => {
          saved = saveClustersInDb(db, clusters, expectedVersion);
          return db;
        });
        return saved;
      });
    },
  };
}
