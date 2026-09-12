import React, { useCallback, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Lock, Unlock, Search, Ticket, Send, ShieldCheck } from "lucide-react";
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

export default function AppHeader({ staff, onStaffClick, onGoTab }) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const menuId = useId();
  const location = useLocation();

  const close = useCallback(() => setOpen(false), []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/mentors", label: "Mentors" },
    { to: "/programs", label: "Programme" },
    { to: "/events", label: "Event" },
    { to: "/resources", label: "Resources" },
    { to: "/contact", label: "Contact" },
  ];

  function isActive(path) {
    if (path === "/") return location.pathname === "/" && (!location.hash || location.hash === "#intro");
    return location.pathname.startsWith(path);
  }

  const handleTrackClick = (e) => {
    if (onGoTab) {
      onGoTab("track");
    }
  };

  const handleStaffWorkspaceClick = () => {
    if (staff && onGoTab) {
      onGoTab("staff");
    } else if (onStaffClick) {
      onStaffClick();
    }
  };

  return (
    <>
      <header className="aym-top">
        <div className="aym-top-inner">
          <div className="aym-brand-row">
            <Link to="/" className="aym-brand-btn" aria-label="AYURDISHA Home">
              <span className="aym-eyebrow aym-brand-kicker">11th World Ayurveda Congress · Bhubaneswar 2026</span>
              <span className="aym-display aym-wordmark">AYURDISHA</span>
              <span className="aym-mcg">
                <span>Meet</span><span>Connect</span><span>Grow</span>
              </span>
            </Link>

            <nav className="aym-main-nav" aria-label="Primary Navigation">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`aym-nav-link ${isActive(item.to) ? "aym-nav-link-active" : ""}`}
                  aria-current={isActive(item.to) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="aym-top-actions">
              <button
                type="button"
                className="aym-btn aym-btn-ghost aym-search-trigger"
                onClick={() => setShowSearch(true)}
                aria-label="Search site content"
              >
                <Search size={18} aria-hidden="true" />
                <span className="aym-desktop-only">Search</span>
              </button>

              <Link
                to={{ pathname: "/", hash: "#track" }}
                onClick={handleTrackClick}
                className="aym-btn aym-btn-secondary aym-desktop-only aym-track-btn"
                aria-label="Track My Answer"
              >
                <Ticket size={15} aria-hidden="true" style={{ marginRight: 6 }} />
                <span>Track My Answer</span>
              </Link>

              <Link
                to={{ pathname: "/", hash: "#ask" }}
                className="aym-btn aym-btn-primary aym-desktop-only"
              >
                <Send size={15} aria-hidden="true" style={{ marginRight: 6 }} />
                <span>Ask a Question</span>
              </Link>

              {onStaffClick && (
                <button
                  type="button"
                  className={`aym-btn aym-staff-chip ${staff ? "aym-staff-chip-active" : ""}`}
                  onClick={staff ? handleStaffWorkspaceClick : onStaffClick}
                  aria-label={staff ? "Open Staff Portal" : "Enter staff login"}
                  title={staff ? "Authenticated Staff Portal" : "Staff Login"}
                >
                  {staff ? <ShieldCheck size={15} aria-hidden="true" /> : <Lock size={14} aria-hidden="true" />}
                  <span className="aym-desktop-only">{staff ? "Staff Portal" : "Staff"}</span>
                </button>
              )}

              <button
                type="button"
                className="aym-menu-btn"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen(o => !o)}
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              >
                {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <NavDrawer open={open} onClose={close} labelledBy={menuId} title="Navigation Menu">
          <nav className="aym-drawer-nav" aria-label="Mobile Navigation">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`aym-drawer-link ${isActive(item.to) ? "aym-drawer-link-on" : ""}`}
                aria-current={isActive(item.to) ? "page" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="aym-drawer-actions">
              <Link
                to={{ pathname: "/", hash: "#track" }}
                className="aym-drawer-link aym-drawer-track"
                onClick={(e) => { handleTrackClick(e); close(); }}
              >
                <Ticket size={18} aria-hidden="true" style={{ marginRight: 8 }} />
                <span>Track My Answer</span>
              </Link>
              
              <Link
                to={{ pathname: "/", hash: "#ask" }}
                className="aym-drawer-link aym-drawer-cta"
                onClick={close}
              >
                <Send size={18} aria-hidden="true" style={{ marginRight: 8 }} />
                <span>Ask a Question</span>
              </Link>

              {onStaffClick && (
                <button
                  type="button"
                  className="aym-drawer-link aym-drawer-staff"
                  onClick={() => {
                    close();
                    if (staff) handleStaffWorkspaceClick();
                    else onStaffClick();
                  }}
                >
                  {staff ? <ShieldCheck size={18} aria-hidden="true" style={{ marginRight: 8 }} /> : <Lock size={18} aria-hidden="true" style={{ marginRight: 8 }} />}
                  <span>{staff ? "Staff Portal (Active)" : "Staff Login"}</span>
                </button>
              )}
            </div>
          </nav>
        </NavDrawer>
      </header>

      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}
    </>
  );
}
