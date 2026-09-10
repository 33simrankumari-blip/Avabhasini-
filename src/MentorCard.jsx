import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  mentorInitials,
  mentorAffiliationSnippet,
  mentorPortraitUrl,
  mentorPublicPath,
} from "./mentors.js";

export default function MentorCard({ mentor, index = 0 }) {
  const designation = String(mentor.designation || "").trim();
  const affiliation = mentorAffiliationSnippet(mentor.affiliation, 96);
  const initials = mentorInitials(mentor.name);
  const portrait = mentorPortraitUrl(mentor);

  return (
    <article
      className="aym-mentor-card"
      style={{ animationDelay: `${Math.min(index, 16) * 0.035}s` }}
    >
      <div className="aym-mentor-card-top">
        <div className="aym-mentor-avatar">
          {portrait ? (
            <img 
              src={portrait} 
              alt={`Portrait of ${mentor.name}`} 
              width={72} 
              height={72} 
              loading="lazy" 
              decoding="async" 
            />
          ) : (
            <span aria-hidden="true">{initials}</span>
          )}
        </div>
      </div>

      <div className="aym-mentor-body">
        <h3 className="aym-mentor-name">
          <Link to={mentorPublicPath(mentor)} className="aym-mentor-name-link">
            {mentor.name}
          </Link>
        </h3>
        {designation ? (
          <p className="aym-mentor-role">{designation}</p>
        ) : (
          <p className="aym-mentor-role aym-mentor-role-soft">Details to follow</p>
        )}
        {affiliation && <p className="aym-mentor-affiliation">{affiliation}</p>}
      </div>

      <div className="aym-mentor-card-actions">
        <Link
          to={mentorPublicPath(mentor)}
          className="aym-btn aym-mentor-card-cta"
          aria-label={`View profile of ${mentor.name}`}
        >
          View profile <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
