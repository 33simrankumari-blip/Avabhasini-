import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MENTORS, mentorsWithNames } from "./mentors.js";
import MentorCard from "./MentorCard.jsx";

export default function MentorsDirectory() {
  const [query, setQuery] = useState("");
  const named = useMemo(() => mentorsWithNames(MENTORS), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return named;
    return named.filter(m => {
      const hay = [m.name, m.designation, m.affiliation, m.expertise, m.bio, m.credentials]
        .map(s => String(s || "").toLowerCase())
        .join(" ");
      return hay.includes(q);
    });
  }, [named, query]);

  return (
    <div className="aym-mentors">
      <header className="aym-mentors-hero" aria-labelledby="mentors-hero-title">
        <div className="aym-mentors-hero-bg" aria-hidden="true" />
        <div className="aym-mentors-hero-veil" aria-hidden="true" />
        <div className="aym-mentors-botanical" aria-hidden="true" />
        <svg className="aym-mentors-hero-pattern" aria-hidden="true" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="aym-leaf-tile" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 4c6 8 7 16 0 28C13 20 12 12 20 4Z" fill="none" stroke="rgba(232,201,122,.22)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#aym-leaf-tile)" />
        </svg>
        <div className="aym-mentors-hero-copy">
          <p className="aym-eyebrow">AYURDISHA · WAC Bhubaneswar 2026</p>
          <h1 id="mentors-hero-title" className="aym-display">Meet the Mentors</h1>
          <div className="aym-mentors-hero-rule" aria-hidden="true" />
          <p>Career guides for BAMS mentees at the 11th World Ayurveda Congress. Tentative roster — names from WAC Meet the Mentors slides.</p>
          <div className="aym-mentors-hero-meta">
            <span className="aym-mentors-stat">
              <strong>{named.length}</strong>
              {named.length === 1 ? " mentor" : " mentors"}
            </span>
            <span className="aym-mentors-stat-sep" aria-hidden="true">·</span>
            <span className="aym-mentors-stat-soft">Tentative WAC roster</span>
          </div>
        </div>
      </header>

      <section className="aym-mentors-directory" id="mentor-directory" aria-labelledby="mentor-directory-title">
        <h2 id="mentor-directory-title" className="aym-visually-hidden">Mentor directory</h2>

        <div className="aym-mentors-toolbar">
          <form
            className="aym-mentors-search"
            role="search"
            onSubmit={e => e.preventDefault()}
          >
            <label className="aym-visually-hidden" htmlFor="mentor-search">
              Search mentors by name, designation, or affiliation
            </label>
            <Search size={18} aria-hidden="true" />
            <input
              id="mentor-search"
              className="aym-input"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, designation, or affiliation"
              autoComplete="off"
            />
          </form>
          <p className="aym-mentors-count" aria-live="polite">
            <span className="aym-mentors-count-badge">{filtered.length}</span>
            {query.trim() ? `of ${named.length}` : named.length === 1 ? "mentor" : "mentors"}
          </p>
        </div>

        <div className="aym-mentors-grid">
          {filtered.map((m, i) => (
            <MentorCard key={m.id} mentor={m} index={i} />
          ))}
          {!filtered.length && (
            <p className="aym-mentors-empty" role="status">
              No mentors match{query.trim() ? ` “${query.trim()}”` : ""}.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
