import React, { useCallback, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Lock, Unlock, Search } from "lucide-react";
import useFocusTrap from "./useFocusTrap.js";
import GlobalSearch from "./components/GlobalSearch.jsx";

export function NavDrawer({
  open,
  onClose,
  labelledBy,
  children,
  title = "Menu",
}) {
  const panelRef = useRef(null);
  useFocusTrap(open, panelRef, onClose);

  if (!open) return null;
  return (
    <div className="aym-drawer-root">
      <button
        type="button"
        className="aym-drawer-backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="aym-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        <div className="aym-drawer-head">
          <h2 id={labelledBy} className="aym-drawer-title">{title}</h2>
          <button type="button" className="aym-drawer-close" onClick={onClose} aria-label="Close menu">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="aym-drawer-body">{children}</div>
      </div>
    </div>
  );
}

export function LandingHeader(props) {
  return <AppHeader {...props} />;
}

export function SimpleHeader(props) {
  return <AppHeader {...props} />;
}

export default function AppHeader({ staff, onStaffClick, tab, onGoTab, brandToIntro }) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const menuId = useId();
  const location = useLocation();
  const close = useCallback(() => setOpen(false), []);

  const links = [
    { kind: "path", to: "/", label: "Home", match: () => location.pathname === "/" && (!location.hash || location.hash === "#intro") && tab === "intro" },
    { kind: "tab", id: "hall", label: "Hall" },
    { kind: "path", to: "/mentors", label: "Mentors", match: () => location.pathname.startsWith("/mentors") },
    { kind: "path", to: "/about", label: "About", match: () => location.pathname === "/about" },
    { kind: "path", to: "/contact", label: "Contact", match: () => location.pathname === "/contact" },
  ];

  function isActive(item) {
    if (item.kind === "tab") return tab === item.id;
    return item.match ? item.match() : location.pathname.startsWith(item.to);
  }

  function go(id) {
    onGoTab?.(id);
    close();
  }

  return (
    <>
      <header className="aym-top">
        <div className="aym-top-inner">
          <div className="aym-brand-row">
            <Link
              to="/"
              className="aym-brand-btn"
              aria-label="AYURDISHA home"
              onClick={() => brandToIntro?.()}
            >
              <span className="aym-eyebrow aym-brand-kicker">World Ayurveda Foundation · WAC 2026</span>
              <span className="aym-display aym-wordmark">AYURDISHA</span>
              <span className="aym-mcg">
                <span>Meet</span><span>Connect</span><span>Grow</span>
              </span>
            </Link>

            <nav className="aym-main-nav" aria-label="Primary">
              {links.map(item => (
                item.kind === "path" ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`aym-nav-link ${isActive(item) ? "aym-nav-link-active" : ""}`}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    className={`aym-nav-link ${isActive(item) ? "aym-nav-link-active" : ""}`}
                    aria-current={isActive(item) ? "page" : undefined}
                    onClick={() => go(item.id)}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            <div className="aym-top-actions">
              <button
                type="button"
                className="aym-btn aym-btn-ghost aym-search-trigger"
                onClick={() => setShowSearch(true)}
                aria-label="Search mentors"
              >
                <Search size={18} aria-hidden="true" />
              </button>
              <button type="button" className="aym-btn aym-btn-ghost aym-desktop-only" onClick={() => go("track")}>
                Track
              </button>
              <button type="button" className="aym-btn aym-btn-primary aym-desktop-only" onClick={() => go("register")}>
                Register
              </button>
              {onStaffClick && (
                <button
                  type="button"
                  className="aym-btn aym-staff-chip"
                  onClick={onStaffClick}
                  aria-label={staff ? "Leave staff mode" : "Staff login"}
                >
                  {staff ? <Unlock size={14} aria-hidden="true" /> : <Lock size={14} aria-hidden="true" />}
                </button>
              )}
              <button
                type="button"
                className="aym-menu-btn"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen(o => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <NavDrawer open={open} onClose={close} labelledBy={menuId} title="Menu">
          <nav className="aym-drawer-nav" aria-label="Mobile">
            {links.map(item => (
              item.kind === "path" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`aym-drawer-link ${isActive(item) ? "aym-drawer-link-on" : ""}`}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  className={`aym-drawer-link ${isActive(item) ? "aym-drawer-link-on" : ""}`}
                  onClick={() => go(item.id)}
                >
                  {item.label}
                </button>
              )
            ))}
            <button type="button" className="aym-drawer-link" onClick={() => go("track")}>Track my answer</button>
            <button type="button" className="aym-drawer-link aym-drawer-cta" onClick={() => go("register")}>Register</button>
            <button type="button" className="aym-drawer-link" onClick={() => go("ask")}>Ask Desk</button>
          </nav>
        </NavDrawer>
      </header>
      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}
    </>
  );
}
