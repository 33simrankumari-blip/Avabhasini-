import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { programPublicPath } from "../data/programs.js";

export default function ProgramCard({ program, index = 0 }) {
  if (!program) return null;

  return (
    <article 
      className="aym-card aym-program-card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.04}s` }}
    >
      <div className="aym-card-header">
        <span className="aym-badge aym-badge-gold">{program.code}</span>
        <span className="aym-card-tag"><BookOpen size={14} aria-hidden="true" /> Track</span>
      </div>

      <div className="aym-card-body">
        <h3 className="aym-card-title">
          <Link to={programPublicPath(program)} className="aym-card-title-link">
            {program.title}
          </Link>
        </h3>
        <p className="aym-card-description">{program.tagline}</p>
        
        {program.sections && program.sections[1] && (
          <div className="aym-card-sublist">
            <span className="aym-card-subhead">Opportunities include:</span>
            <ul className="aym-card-bullet-preview">
              {program.sections[1].bullets.slice(0, 2).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="aym-card-footer">
        <Link to={programPublicPath(program)} className="aym-btn aym-btn-outline aym-btn-sm">
          Explore Track <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
