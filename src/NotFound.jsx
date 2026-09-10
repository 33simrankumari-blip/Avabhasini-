import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageMeta } from "./siteMeta.js";

export default function NotFound() {
  useEffect(() => {
    setPageMeta({
      title: "Page not found · AYURDISHA",
      description: "That address is not a page in the AYURDISHA Meet the Mentors hall.",
      path: "/404",
    });
  }, []);

  return (
    <main className="aym-legal aym-notfound" id="main">
      <p className="aym-eyebrow">11th World Ayurveda Congress · Bhubaneswar 2026</p>
      <h1 className="aym-display">This door is not on the hall map</h1>
      <p>
        The page you asked for is not part of AYURDISHA. Use the hall, register, or the mentor roster.
      </p>
      <div className="aym-notfound-actions">
        <Link className="aym-btn aym-btn-primary" to={{ pathname: "/", hash: "#hall" }}>Enter the hall</Link>
        <Link className="aym-btn aym-btn-ghost" to="/">Home</Link>
        <Link className="aym-btn aym-btn-ghost" to="/mentors">Mentors</Link>
      </div>
    </main>
  );
}
