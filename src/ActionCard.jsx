import React from "react";
import { ArrowRight, Lock } from "lucide-react";

export default function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  buttonText = "Access Tool",
  badgeText = "Staff Tool",
  staffOnly = true,
  disabled = false,
}) {
  return (
    <div className="aym-card aym-action-card">
      <div className="aym-action-card-head">
        {Icon && (
          <div className="aym-action-card-icon-box">
            <Icon size={22} className="aym-action-card-icon" aria-hidden="true" />
          </div>
        )}
        <div className="aym-action-card-badges">
          {badgeText && (
            <span className="aym-badge aym-badge-gold">
              {staffOnly && <Lock size={12} style={{ marginRight: 4 }} aria-hidden="true" />}
              {badgeText}
            </span>
          )}
        </div>
      </div>

      <h3 className="aym-action-card-title">{title}</h3>
      <p className="aym-action-card-desc">{description}</p>

      <div className="aym-action-card-foot">
        <button
          type="button"
          className="aym-btn aym-btn-primary aym-action-card-btn"
          onClick={onClick}
          disabled={disabled}
        >
          <span>{buttonText}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
