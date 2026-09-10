import React from "react";

export default function PageSkeleton({ label = "Loading" }) {
  return (
    <div className="aym-skeleton" role="status" aria-live="polite" aria-busy="true">
      <span className="aym-visually-hidden">{label}</span>
      <div className="aym-skeleton-hero" />
      <div className="aym-skeleton-line aym-skeleton-line-lg" />
      <div className="aym-skeleton-line" />
      <div className="aym-skeleton-line aym-skeleton-line-sm" />
      <div className="aym-skeleton-grid">
        <div className="aym-skeleton-card" />
        <div className="aym-skeleton-card" />
        <div className="aym-skeleton-card" />
      </div>
    </div>
  );
}
