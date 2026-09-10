import React from "react";

export function MentorCardSkeleton() {
  return (
    <div className="aym-mentor-card aym-skeleton-card" aria-hidden="true">
      <div className="aym-mentor-card-top">
        <div className="aym-skeleton aym-skeleton-avatar" />
      </div>
      <div className="aym-mentor-body">
        <div className="aym-skeleton aym-skeleton-line aym-w-70" />
        <div className="aym-skeleton aym-skeleton-line aym-w-50" />
        <div className="aym-skeleton aym-skeleton-line aym-w-90" />
      </div>
      <div className="aym-mentor-card-actions">
        <div className="aym-skeleton aym-skeleton-btn" />
      </div>
    </div>
  );
}

export function ProgramCardSkeleton() {
  return (
    <div className="aym-card aym-skeleton-card" aria-hidden="true">
      <div className="aym-card-header">
        <div className="aym-skeleton aym-skeleton-badge" />
      </div>
      <div className="aym-card-body">
        <div className="aym-skeleton aym-skeleton-line aym-w-80" />
        <div className="aym-skeleton aym-skeleton-line aym-w-100" />
        <div className="aym-skeleton aym-skeleton-line aym-w-60" />
      </div>
      <div className="aym-card-footer">
        <div className="aym-skeleton aym-skeleton-btn" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="aym-container aym-py-12" aria-hidden="true">
      <div className="aym-skeleton aym-skeleton-title aym-w-40" />
      <div className="aym-skeleton aym-skeleton-line aym-w-70 aym-mb-8" />
      <div className="aym-grid-3">
        <ProgramCardSkeleton />
        <ProgramCardSkeleton />
        <ProgramCardSkeleton />
      </div>
    </div>
  );
}

export default PageSkeleton;
