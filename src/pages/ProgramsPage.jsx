import React, { useEffect, useState, useMemo } from "react";
import { setPageMeta } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProgramCard from "../components/ProgramCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getAllPrograms } from "../data/programs.js";
import { Search } from "lucide-react";

export default function ProgramsPage() {
  const [query, setQuery] = useState("");
  const programs = useMemo(() => getAllPrograms(), []);

  useEffect(() => {
    setPageMeta({
      title: "Ayurveda Career & Academic Programs (10 Core Tracks) · AYURDISHA",
      description: "Explore 10 national AYURDISHA career tracks after BAMS — Clinical Practice, PG Entrance, Research, Entrepreneurship, Manufacturing, Export, and Public Health.",
      path: "/programs",
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return programs;
    return programs.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.code.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q)
    );
  }, [programs, query]);

  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container">
        <Breadcrumbs items={[{ name: "Career Programs & Tracks" }]} />

        <header className="aym-page-header">
          <p className="aym-eyebrow">10 NATIONAL AYURDISHA THEMES</p>
          <h1 className="aym-display">Ayurveda Career Pathways & Programs</h1>
          <p className="aym-lead">
            Structured roadmaps covering clinical practice, academic progression, research funding, manufacturing licenses, and global mobility after BAMS.
          </p>
        </header>

        <div className="aym-toolbar aym-mb-8">
          <div className="aym-search-box">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              className="aym-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tracks by keyword (e.g. Clinical, PG, Research, Export)..."
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState 
            title="No tracks matched your search"
            message={`No career tracks matched "${query}". Try searching for 'Clinical', 'PG', 'Research', or 'Public Health'.`}
            actionLabel="Clear search"
            onAction={() => setQuery("")}
          />
        ) : (
          <div className="aym-grid-3">
            {filtered.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
