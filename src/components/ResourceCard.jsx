import React from "react";
import { Link } from "react-router-dom";
import { Mic, FileText, ArrowRight, User } from "lucide-react";
import { resourcePublicPath } from "../data/resources.js";

export default function ResourceCard({ resource, index = 0 }) {
  if (!resource) return null;

  const isPodcast = resource.type === "podcast";

  return (
    <article 
      className="aym-card aym-resource-card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.04}s` }}
    >
      <div className="aym-card-header">
        <span className={`aym-badge ${isPodcast ? "aym-badge-maroon" : "aym-badge-gold"}`}>
          {isPodcast ? <Mic size={13} aria-hidden="true" /> : <FileText size={13} aria-hidden="true" />}
          {resource.category}
        </span>
        {resource.trackCode && (
          <span className="aym-card-track-tag">Track {resource.trackCode}</span>
        )}
      </div>

      <div className="aym-card-body">
        <h3 className="aym-card-title">
          <Link to={resourcePublicPath(resource)} className="aym-card-title-link">
            {resource.title}
          </Link>
        </h3>
        <p className="aym-card-description">{resource.description}</p>
        
        {resource.author && (
          <div className="aym-card-author">
            <User size={14} aria-hidden="true" />
            <span>{resource.author}</span>
          </div>
        )}
      </div>

      <div className="aym-card-footer">
        <Link to={resourcePublicPath(resource)} className="aym-btn aym-btn-outline aym-btn-sm">
          {isPodcast ? "Listen / Watch" : "Read Guide"} <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
