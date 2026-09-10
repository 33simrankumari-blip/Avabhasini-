import React from "react";
import { Link } from "react-router-dom";

const MAIN_NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About AYURDISHA" },
  { to: "/mentors", label: "Mentors Directory" },
  { to: "/programs", label: "10 Career Tracks" },
  { to: "/events", label: "Congress Sessions" },
  { to: "/resources", label: "Podcasts & Guides" },
  { to: "/contact", label: "Contact & Support" },
];

const HALL_LINKS = [
  { to: "/", hash: "#ask", label: "Ask Desk" },
  { to: "/", hash: "#track", label: "Track My Answer" },
  { to: "/", hash: "#register", label: "Delegate Register" },
  { to: "/", hash: "#board", label: "Open Theme Stage" },
  { to: "/", hash: "#pods", label: "Knowledge Pods" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter({ onStaff, variant = "app" }) {
  return (
    <footer className={variant === "land" ? "aym-footer aym-footer-land" : "aym-footer"}>
      <div className="aym-footer-inner">
        <div className="aym-footer-brand">
          <p className="aym-wordmark aym-footer-wordmark">AYURDISHA</p>
          <p>Meet the Mentors hall · 11th World Ayurveda Congress · Bhubaneswar 2026</p>
          <p>World Ayurveda Foundation initiative for BAMS mentees, postgraduates, and practitioners.</p>
          <p>Career guidance platform — not medical advice.</p>
        </div>
        
        <nav className="aym-footer-nav" aria-label="Explore Footer Links">
          <p className="aym-eyebrow">Navigation</p>
          <ul>
            {MAIN_NAV_LINKS.map(l => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="aym-footer-nav" aria-label="Digital Hall Features">
          <p className="aym-eyebrow">Ask Desk & Hall</p>
          <ul>
            {HALL_LINKS.map(l => (
              <li key={l.label}>
                <Link to={{ pathname: l.to, hash: l.hash }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="aym-footer-nav" aria-label="Legal & Policies">
          <p className="aym-eyebrow">Legal</p>
          <ul>
            {LEGAL_LINKS.map(l => (
              <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
          {onStaff && (
            <button type="button" className="aym-land-staff aym-mt-3" onClick={onStaff}>Staff Desk</button>
          )}
        </nav>
      </div>
      
      <div className="aym-footer-bottom">
        <p className="aym-footer-copy">
          © 2026 AYURDISHA · 11th World Ayurveda Congress, Bhubaneswar 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
