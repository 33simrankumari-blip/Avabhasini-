import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  if (!items || !items.length) return null;

  return (
    <nav className="aym-crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} aria-current={isLast ? "page" : undefined}>
              <ChevronRight size={13} className="aym-crumb-sep" aria-hidden="true" />
              {isLast || !it.path ? (
                <span>{it.name}</span>
              ) : (
                <Link to={it.path}>{it.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
