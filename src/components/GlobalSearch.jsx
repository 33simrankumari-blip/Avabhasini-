import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, User } from "lucide-react";
import { MENTORS, mentorsWithNames, mentorPublicPath } from "../mentors.js";

export default function GlobalSearch({ placeholder = "Search mentors…", onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const mentors = useMemo(() => mentorsWithNames(MENTORS), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return mentors
      .filter(m => [m.name, m.designation, m.affiliation, m.expertise, m.bio]
        .some(f => String(f || "").toLowerCase().includes(q)))
      .slice(0, 8);
  }, [query, mentors]);

  return (
    <div className="aym-search-modal-backdrop" onClick={onClose}>
      <div
        className="aym-search-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search mentors"
      >
        <div className="aym-search-bar-row">
          <Search size={20} className="aym-search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className="aym-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search mentors"
          />
          {query ? (
            <button type="button" className="aym-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={18} aria-hidden="true" />
            </button>
          ) : null}
          {onClose && (
            <button type="button" className="aym-btn aym-btn-ghost aym-btn-sm" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
        <div className="aym-search-results">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="aym-search-empty">No mentors match that search. Try another name or institute.</p>
          )}
          {results.map(m => (
            <Link
              key={m.id || m.name}
              to={mentorPublicPath(m)}
              className="aym-search-hit"
              onClick={onClose}
            >
              <User size={16} aria-hidden="true" />
              <span>
                <strong>{m.name}</strong>
                <span>{m.designation}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
