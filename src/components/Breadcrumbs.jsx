import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({
  items = [],
  backTo,
  backLabel,
  className = "",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`aym-breadcrumbs-wrapper ${className}`}>
      <div className="aym-breadcrumbs-bar">
        {(backTo || backLabel) && (
          <button
            type="button"
            className="aym-btn aym-btn-ghost aym-btn-sm aym-back-btn"
            onClick={handleBack}
            aria-label={backLabel || "Go back to previous page"}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>{backLabel || "Back"}</span>
          </button>
        )}

        {items.length > 0 && (
          <nav className="aym-breadcrumbs-nav" aria-label="Breadcrumb">
            <ol className="aym-breadcrumbs-list">
              <li className="aym-breadcrumb-item">
                <Link to="/" className="aym-breadcrumb-link" aria-label="Home">
                  <Home size={13} aria-hidden="true" />
                  <span className="aym-desktop-only">Home</span>
                </Link>
              </li>
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <li key={idx} className="aym-breadcrumb-item">
                    <ChevronRight size={13} className="aym-breadcrumb-sep" aria-hidden="true" />
                    {isLast || !item.to ? (
                      <span className="aym-breadcrumb-current" aria-current="page">
                        {item.label}
                      </span>
                    ) : (
                      <Link to={item.to} className="aym-breadcrumb-link">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
}
