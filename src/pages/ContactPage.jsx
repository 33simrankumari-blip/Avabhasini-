import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageMeta } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function ContactPage() {
  useEffect(() => {
    setPageMeta({
      title: "Contact · AYURDISHA · WAC 2026",
      description: "Reach the AYURDISHA Meet the Mentors desk through Register and Ask Desk at the 11th World Ayurveda Congress.",
      path: "/contact",
    });
  }, []);

  return (
    <main className="aym-page aym-py-12" id="main">
      <div className="aym-container aym-max-w-4xl">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <header className="aym-page-head">
          <p className="aym-eyebrow">Meet the Mentors desk</p>
          <h1 className="aym-display">Contact</h1>
          <p>
            AYURDISHA does not publish a public inbox on this site. Delegates use the hall:
            register with a real email, then file one career question at the Ask Desk.
            Staff enter through the Staff control with a PIN.
          </p>
        </header>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          <Link to="/#register" className="aym-btn aym-btn-primary">Register</Link>
          <Link to="/#ask" className="aym-btn aym-btn-gold">Ask Desk</Link>
          <Link to="/#track" className="aym-btn aym-btn-ghost">Track my answer</Link>
        </div>
      </div>
    </main>
  );
}
