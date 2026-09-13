import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter({ onStaff, variant = "app" }) {
  return (
    <footer className={variant === "land" ? "aym-footer aym-footer-land" : "aym-footer"}>
      <div className="aym-footer-inner">
        <div className="aym-footer-brand">
          <p className="aym-wordmark aym-footer-wordmark">AYURDISHA</p>
          <p>Digital Meet the Mentors hall of the 11th World Ayurveda Congress, Bhubaneswar, 11–13 December 2026.</p>
          <p>An initiative of the World Ayurveda Foundation. Career guidance for BAMS mentees — not medical advice.</p>
        </div>
        <nav className="aym-footer-nav" aria-label="Site">
          <p className="aym-eyebrow">Site</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#hall">Hall</Link></li>
            <li><Link to="/mentors">Mentors</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav className="aym-footer-nav" aria-label="Delegates">
          <p className="aym-eyebrow">Delegates</p>
          <ul>
            <li><Link to="/#register">Register</Link></li>
            <li><Link to="/#ask">Ask Desk</Link></li>
            <li><Link to="/#track">Track my answer</Link></li>
            <li><Link to="/#board">Open theme stage</Link></li>
          </ul>
        </nav>
        <nav className="aym-footer-nav" aria-label="Legal">
          <p className="aym-eyebrow">Legal</p>
          <ul>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
          {onStaff && (
            <button type="button" className="aym-land-staff aym-mt-3" onClick={onStaff}>Staff</button>
          )}
        </nav>
      </div>
      <div className="aym-footer-bottom">
        <p className="aym-footer-copy">© 2026 AYURDISHA · 11th World Ayurveda Congress, Bhubaneswar.</p>
      </div>
    </footer>
  );
}
