import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Users, ShieldCheck, Award } from "lucide-react";
import { MENTORS, mentorsWithNames } from "./mentors.js";
import MentorCard from "./MentorCard.jsx";

export default function MentorsDirectory() {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const named = useMemo(() => mentorsWithNames(MENTORS), []);

  const domains = [
    "All",
    "Clinical Practice",
    "Academics & Samhita",
    "Research & Evidence",
    "Pharmacology & GMP"
  ];

  function getMentorDomain(m) {
    const exp = String(m.expertise || "").toLowerCase();
    const des = String(m.designation || "").toLowerCase();
    const aff = String(m.affiliation || "").toLowerCase();
    const bio = String(m.bio || "").toLowerCase();
    
    const combined = `${exp} ${des} ${aff} ${bio}`;
    
    if (combined.includes("rasa shastra") || combined.includes("bhaishajya") || combined.includes("dravyaguna") || combined.includes("pharmacology") || combined.includes("gmp") || combined.includes("plant science")) {
      return "Pharmacology & GMP";
    }
    if (combined.includes("research") || combined.includes("ccras") || combined.includes("evidence") || combined.includes("clinical trials") || combined.includes("policy") || combined.includes("who")) {
      return "Research & Evidence";
    }
    if (combined.includes("samhita") || combined.includes("siddhant") || combined.includes("teaching") || combined.includes("professor") || combined.includes("education") || combined.includes("vice chancellor") || combined.includes("academic")) {
      return "Academics & Samhita";
    }
    if (combined.includes("kayachikitsa") || combined.includes("shalya") || combined.includes("panchakarma") || combined.includes("clinical") || combined.includes("consultant") || combined.includes("shalakya") || combined.includes("kaumarbhritya") || combined.includes("nadi") || combined.includes("chikitsa") || combined.includes("practice")) {
      return "Clinical Practice";
    }
    
    // Fallback based on expertise being empty but generally clinical
    return "Clinical Practice";
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return named.filter(m => {
      // 1. Filter by Domain
      if (selectedDomain !== "All") {
        const domain = getMentorDomain(m);
        if (domain !== selectedDomain) return false;
      }
      
      // 2. Filter by search query
      if (q) {
        const hay = [m.name, m.designation, m.affiliation, m.expertise, m.bio, m.credentials]
          .map(s => String(s || "").toLowerCase())
          .join(" ");
        if (!hay.includes(q)) return false;
      }
      
      return true;
    });
  }, [named, query, selectedDomain]);

  return (
    <div className="aym-mentors">
      {/* Premium Hero Banner */}
      <header className="aym-mentors-hero-premium" aria-labelledby="mentors-hero-title">
        <div className="aym-mentors-hero-bg-premium" aria-hidden="true" />
        <div className="aym-mentors-hero-veil-premium" aria-hidden="true" />
        <div className="aym-mentors-botanical-premium" aria-hidden="true" />
        <svg className="aym-mentors-hero-pattern-premium" aria-hidden="true" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="aym-leaf-tile-premium" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 4c6 8 7 16 0 28C13 20 12 12 20 4Z" fill="none" stroke="rgba(232,201,122,.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#aym-leaf-tile-premium)" />
        </svg>
        <div className="aym-mentors-hero-copy-premium">
          <p className="aym-eyebrow-premium">AYURDISHA · WAC Bhubaneswar 2026</p>
          <h1 id="mentors-hero-title" className="aym-display-premium">Meet the Mentors</h1>
          <div className="aym-mentors-hero-rule-premium" aria-hidden="true" />
          <p className="aym-mentors-hero-lead-premium">
            Career guides and distinguished leaders of the 11th World Ayurveda Congress. Learn from experienced clinicians, researchers, and academic specialists.
          </p>
          <div className="aym-mentors-hero-meta-premium">
            <span className="aym-mentors-stat-premium">
              <Users size={16} aria-hidden="true" />
              <strong>{named.length}</strong>
              <span>Registered Mentors</span>
            </span>
            <span className="aym-mentors-stat-sep-premium" aria-hidden="true">·</span>
            <span className="aym-mentors-stat-soft-premium">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Tentative WAC Roster</span>
            </span>
          </div>
        </div>
      </header>

      {/* Directory Section */}
      <section className="aym-mentors-directory-premium aym-py-12" id="mentor-directory" aria-labelledby="mentor-directory-title">
        <div className="aym-container">
          <h2 id="mentor-directory-title" className="aym-visually-hidden">Mentor directory</h2>

          {/* Search & Filter Toolbar Layout */}
          <div className="aym-mentors-toolbar-premium aym-mb-10">
            {/* Search Form */}
            <form
              className="aym-mentors-search-premium"
              role="search"
              onSubmit={e => e.preventDefault()}
            >
              <label className="aym-visually-hidden" htmlFor="mentor-search">
                Search mentors by name, designation, or affiliation
              </label>
              <Search size={18} className="aym-search-icon" aria-hidden="true" />
              <input
                id="mentor-search"
                className="aym-input-premium"
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search mentors by name, specialty, or institution..."
                autoComplete="off"
              />
            </form>

            {/* Specialty / Domain Filter Chips */}
            <div className="aym-filter-chips-container" role="tablist" aria-label="Filter mentors by specialty domain">
              <div className="aym-filter-chips-label">
                <SlidersHorizontal size={14} aria-hidden="true" />
                <span>Filter by Field:</span>
              </div>
              <div className="aym-filter-chips">
                {domains.map((dom) => (
                  <button
                    key={dom}
                    role="tab"
                    aria-selected={selectedDomain === dom}
                    className={`aym-filter-chip ${selectedDomain === dom ? "active" : ""}`}
                    onClick={() => setSelectedDomain(dom)}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Metadata */}
          <div className="aym-results-meta aym-mb-6" aria-live="polite">
            <span className="aym-results-count">
              Showing <strong>{filtered.length}</strong> of <strong>{named.length}</strong> Mentors
            </span>
            {(selectedDomain !== "All" || query.trim() !== "") && (
              <button 
                className="aym-btn-clear-filter" 
                onClick={() => { setSelectedDomain("All"); setQuery(""); }}
              >
                Reset filter criteria
              </button>
            )}
          </div>

          {/* Mentors Grid */}
          <div className="aym-mentors-grid-premium">
            {filtered.map((m, i) => (
              <MentorCard key={m.id} mentor={m} index={i} />
            ))}
            {!filtered.length && (
              <div className="aym-mentors-empty-container" role="status">
                <p className="aym-mentors-empty">
                  No mentors match your selected filters and query: “{query.trim()}”.
                </p>
                <button 
                  className="aym-btn aym-btn-primary aym-mt-4"
                  onClick={() => { setSelectedDomain("All"); setQuery(""); }}
                >
                  Clear Search & Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
