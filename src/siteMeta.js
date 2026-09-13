/** Site-wide SEO helpers for the Vite SPA (document.head + JSON-LD). */

export const SITE_ORIGIN = "https://ayushmarg.vercel.app";
export const SITE_NAME = "AYURDISHA";

export function getPageTitle(title) {
  return `${title} · ${SITE_NAME}`;
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AYURDISHA",
    alternateName: ["AyushMarg", "Meet the Mentors"],
    url: SITE_ORIGIN,
    description:
      "Digital Meet the Mentors hall of the 11th World Ayurveda Congress, Bhubaneswar 2026 — career guidance for BAMS mentees.",
    parentOrganization: {
      "@type": "Organization",
      name: "World Ayurveda Foundation",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AYURDISHA",
    url: SITE_ORIGIN,
    description:
      "Walk into the digital Meet the Mentors hall of the 11th World Ayurveda Congress. Register, receive your WAC number, and a mentor answers.",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

export function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "11th World Ayurveda Congress",
    startDate: "2026-12-11",
    endDate: "2026-12-13",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Bhubaneswar",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "World Ayurveda Foundation",
    },
    description: "Meet the Mentors hall (AYURDISHA) at the 11th World Ayurveda Congress, Bhubaneswar.",
  };
}

export function breadcrumbJsonLd(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${SITE_ORIGIN}${it.path}`,
    })),
  };
}

export function faqJsonLd(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personJsonLd(mentor, path) {
  if (!mentor) return null;
  const url = `${SITE_ORIGIN}${path}`;
  const description = [mentor.designation, mentor.affiliation, mentor.bio]
    .map(s => String(s || "").trim())
    .filter(Boolean)
    .join(" — ");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mentor.name,
    url,
    jobTitle: String(mentor.designation || "").trim() || undefined,
    affiliation: String(mentor.affiliation || "").trim()
      ? { "@type": "Organization", name: mentor.affiliation }
      : undefined,
    knowsAbout: String(mentor.expertise || "").trim() || "Ayurveda",
    description: description || `${mentor.name} — tentative mentor, AYURDISHA Meet the Mentors, WAC 2026.`,
  };
}

function upsertMeta(attr, key, content) {
  if (content == null || content === "") return;
  const safe = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(key) : key.replace(/"/g, "");
  let el = document.head.querySelector(`meta[${attr}="${safe}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function setPageMeta({
  title,
  description,
  path = "/",
  image,
  type = "website",
  jsonLd,
  personLd,
  breadcrumbLd,
  robots,
}) {
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
  const img = image || `${SITE_ORIGIN}/assets/hall-photo.png`;
  document.title = title;
  upsertMeta("name", "description", description);
  upsertLink("canonical", url);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:image", img);
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", img);
  if (robots) upsertMeta("name", "robots", robots);
  upsertJsonLd("aym-ld-org", orgJsonLd());
  upsertJsonLd("aym-ld-website", websiteJsonLd());
  upsertJsonLd("aym-ld-event", eventJsonLd());
  upsertJsonLd("aym-ld-page", jsonLd || null);
  upsertJsonLd("aym-ld-person", personLd || null);
  upsertJsonLd("aym-ld-crumbs", breadcrumbLd || null);
}
