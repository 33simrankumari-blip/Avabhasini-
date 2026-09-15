import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, MapPin, Stethoscope } from "lucide-react";
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
      className="aym-mentor-card-premium"
      style={{ animationDelay: `${Math.min(index, 16) * 0.035}s` }}
    >
      <div className="aym-mentor-card-top-premium">
        <div className="aym-mentor-avatar-container">
          {portrait ? (
            <img 
              src={portrait} 
              alt={`Portrait of ${mentor.name}`} 
              width={80} 
              height={80} 
              className="aym-mentor-avatar-img"
              loading="lazy" 
              decoding="async" 
            />
          ) : (
            <span className="aym-mentor-avatar-initials" aria-hidden="true">{initials}</span>
          )}
        </div>
        
        {mentor.expertise && (
          <span className="aym-mentor-badge-specialty">
            <Stethoscope size={12} aria-hidden="true" />
            <span>{mentor.expertise.split(";")[0].split("(")[0].trim()}</span>
          </span>
        )}
      </div>

      <div className="aym-mentor-body-premium">
        <h3 className="aym-mentor-name-premium">
          <Link to={mentorPublicPath(mentor)} className="aym-mentor-name-link-premium">
            {mentor.name}
          </Link>
        </h3>
        
        {designation ? (
          <p className="aym-mentor-role-premium">
            <Award size={14} className="aym-icon-role" aria-hidden="true" />
            <span>{designation}</span>
          </p>
        ) : (
          <p className="aym-mentor-role-premium aym-mentor-role-soft">
            <Award size={14} className="aym-icon-role" aria-hidden="true" />
            <span>Academic Mentor</span>
          </p>
        )}
        
        {affiliation ? (
          <p className="aym-mentor-affiliation-premium">
            <MapPin size={14} className="aym-icon-pin" aria-hidden="true" />
            <span>{affiliation}</span>
          </p>
        ) : (
          <p className="aym-mentor-affiliation-premium aym-mentor-affiliation-soft">
            <MapPin size={14} className="aym-icon-pin" aria-hidden="true" />
            <span>Faculty Roster · WAC 2026</span>
          </p>
        )}
      </div>

      <div className="aym-mentor-card-actions-premium">
        <Link
          to={mentorPublicPath(mentor)}
          className="aym-btn aym-mentor-card-cta-premium"
          aria-label={`View profile of ${mentor.name}`}
        >
          <span>View Profile</span> 
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
