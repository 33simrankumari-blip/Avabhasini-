import React from "react";
import { SearchX, RefreshCw } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  message = "Try clearing filters or adjusting your search term.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="aym-empty-state" role="status" aria-live="polite">
      <div className="aym-empty-icon">
        <SearchX size={36} aria-hidden="true" />
      </div>
      <h3 className="aym-empty-title">{title}</h3>
      <p className="aym-empty-message">{message}</p>
      {onAction && actionLabel && (
        <button type="button" className="aym-btn aym-btn-outline aym-btn-sm" onClick={onAction}>
          <RefreshCw size={14} aria-hidden="true" /> {actionLabel}
        </button>
      )}
    </div>
  );
}
