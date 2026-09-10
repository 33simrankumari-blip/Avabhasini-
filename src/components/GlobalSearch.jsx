import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, User, BookOpen, Calendar, FileText, ArrowRight } from "lucide-react";
import { MENTORS, mentorsWithNames, mentorPublicPath } from "../mentors.js";
import { getAllPrograms } from "../data/programs.js";
import { getAllEvents } from "../data/events.js";
import { getAllResources } from "../data/resources.js";

export default function GlobalSearch({ placeholder = "Search mentors, programs, events, resources...", onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const mentors = useMemo(() => mentorsWithNames(MENTORS), []);
  const programs = useMemo(() => getAllPrograms(), []);
  const events = useMemo(() => getAllEvents(), []);
  const resources = useMemo(() => getAllResources(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return { mentors: [], programs: [], events: [], resources: [], count: 0 };

    const matchText = (...fields) => fields.some(f => String(f || "").toLowerCase().includes(q));

    const mHits = mentors.filter(m => matchText(m.name, m.designation, m.affiliation, m.expertise, m.bio));
    const pHits = programs.filter(p => matchText(p.title, p.tagline, p.code));
    const eHits = events.filter(e => matchText(e.title, e.description, e.location, e.category));
    const rHits = resources.filter(r => matchText(r.title, r.description, r.category, r.author));

    return {
      mentors: mHits.slice(0, 4),
      programs: pHits.slice(0, 4),
      events: eHits.slice(0, 4),
      resources: rHits.slice(0, 4),
      count: mHits.length + pHits.length + eHits.length + rHits.length,
    };
  }, [query, mentors, programs, events, resources]);

  return (
    <div className="aym-search-modal-backdrop" onClick={onClose}>
      <div 
        className="aym-search-modal" 
        onClick={e => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Global Content Search"
      >
        <div className="aym-search-bar-row">
          <Search size={20} className="aym-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="aym-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
            aria-label="Search mentors, programs, events, and resources"
          />
          {query && (
            <button type="button" className="aym-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={18} aria-hidden="true" />
            </button>
          )}
          {onClose && (
            <button type="button" className="aym-btn aym-btn-ghost aym-btn-sm" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>

        {query.trim().length >= 2 && (
          <div className="aym-search-results-area" aria-live="polite">
            {results.count === 0 ? (
              <div className="aym-search-empty">
                <p>No results matching <strong>"{query.trim()}"</strong></p>
                <p className="aym-search-empty-sub">Try searching for mentor names, PG branches, clinical practice, or WAC events.</p>
              </div>
            ) : (
              <div className="aym-search-groups">
                {results.mentors.length > 0 && (
                  <div className="aym-search-group">
                    <h4 className="aym-search-group-title"><User size={15} aria-hidden="true" /> Mentors ({results.mentors.length})</h4>
                    <div className="aym-search-items">
                      {results.mentors.map(m => (
                        <Link key={m.id} to={mentorPublicPath(m)} className="aym-search-item" onClick={onClose}>
                          <div>
                            <div className="aym-search-item-title">{m.name}</div>
                            <div className="aym-search-item-sub">{m.designation || m.affiliation || "Ayurveda Practitioner"}</div>
                          </div>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.programs.length > 0 && (
                  <div className="aym-search-group">
                    <h4 className="aym-search-group-title"><BookOpen size={15} aria-hidden="true" /> Career Tracks ({results.programs.length})</h4>
                    <div className="aym-search-items">
                      {results.programs.map(p => (
                        <Link key={p.id} to={p.path} className="aym-search-item" onClick={onClose}>
                          <div>
                            <div className="aym-search-item-title">[{p.code}] {p.title}</div>
                            <div className="aym-search-item-sub">{p.tagline}</div>
                          </div>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.events.length > 0 && (
                  <div className="aym-search-group">
                    <h4 className="aym-search-group-title"><Calendar size={15} aria-hidden="true" /> Events ({results.events.length})</h4>
                    <div className="aym-search-items">
                      {results.events.map(e => (
                        <Link key={e.id} to={e.path} className="aym-search-item" onClick={onClose}>
                          <div>
                            <div className="aym-search-item-title">{e.title}</div>
                            <div className="aym-search-item-sub">{e.date} · {e.location}</div>
                          </div>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {results.resources.length > 0 && (
                  <div className="aym-search-group">
                    <h4 className="aym-search-group-title"><FileText size={15} aria-hidden="true" /> Resources ({results.resources.length})</h4>
                    <div className="aym-search-items">
                      {results.resources.map(r => (
                        <Link key={r.id} to={r.path} className="aym-search-item" onClick={onClose}>
                          <div>
                            <div className="aym-search-item-title">{r.title}</div>
                            <div className="aym-search-item-sub">{r.category} · {r.author}</div>
                          </div>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
