/**
 * AYURDISHA Podcast — recorded mentor conversations from the hall.
 *
 * Staff can paste a talk on the live Podcast tab (Staff → Add talk) without a
 * deploy; that list is stored in Firestore via podcastsList / podcastsSave.
 *
 * This file is the seed / fallback. Leave PODCASTS empty until talks exist.
 * Optional: uncomment the example, fill videoUrl, and redeploy.
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   mentorName: string,
 *   description: string,
 *   videoUrl: string,
 *   thumbnail?: string
 * }} PodcastTalk
 */

/** @type {PodcastTalk[]} */
export const PODCASTS = [
  // {
  //   id: "talk-example",
  //   title: "After BAMS — a conversation from the hall",
  //   mentorName: "Mentor name",
  //   description: "A recorded round-table from the AYURDISHA podcast corner.",
  //   videoUrl: "https://www.youtube.com/watch?v=xxxxxxxxxxx",
  //   thumbnail: "",
  // },
];

const YT_ID = /^[a-zA-Z0-9_-]{6,20}$/;

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Classify a pasted video URL for in-page watch.
 * YouTube → embed, Vimeo → embed, .mp4 → HTML5, otherwise a Watch link.
 */
export function parseVideo(url) {
  const raw = String(url || "").trim();
  if (!raw) return { kind: "none" };
  if (/\.mp4(?:[?#]|$)/i.test(raw) && /^https?:\/\//i.test(raw)) {
    return { kind: "mp4", src: raw };
  }
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "youtu.be") {
      const id = (u.pathname.split("/").filter(Boolean)[0] || "").split("?")[0];
      if (YT_ID.test(id)) return { kind: "youtube", id };
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      let id = u.searchParams.get("v") || "";
      if (!id) {
        const parts = u.pathname.split("/").filter(Boolean);
        if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live" || parts[0] === "v") {
          id = parts[1] || "";
        }
      }
      id = String(id).split("&")[0];
      if (YT_ID.test(id)) return { kind: "youtube", id };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = host === "player.vimeo.com" && parts[0] === "video" ? parts[1] : parts.find(p => /^\d+$/.test(p));
      if (id && /^\d+$/.test(id)) return { kind: "vimeo", id };
    }
  } catch { /* fall through */ }
  if (/^https?:\/\//i.test(raw)) return { kind: "link", href: raw };
  return { kind: "none" };
}

export function youtubeThumb(id) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

export function talkThumbnail(talk) {
  const custom = String(talk?.thumbnail || "").trim();
  if (custom && /^https?:\/\//i.test(custom)) return custom;
  const parsed = parseVideo(talk?.videoUrl);
  if (parsed.kind === "youtube") return youtubeThumb(parsed.id);
  return "";
}

export function mergePodcasts(seed, stored) {
  const seedList = Array.isArray(seed) ? seed.filter(t => t && t.id) : [];
  const storedList = Array.isArray(stored?.talks)
    ? stored.talks.filter(t => t && t.id)
    : (Array.isArray(stored) ? stored.filter(t => t && t.id) : []);
  if (!storedList.length) return seedList;
  const storedIds = new Set(storedList.map(t => t.id));
  const extras = seedList.filter(t => !storedIds.has(t.id));
  return [...storedList, ...extras];
}

export function hostLabel(url) {
  const host = hostOf(url);
  if (!host) return "Watch";
  if (host.includes("youtu")) return "YouTube";
  if (host.includes("vimeo")) return "Vimeo";
  if (/\.mp4(?:[?#]|$)/i.test(url)) return "Video";
  return host;
}
