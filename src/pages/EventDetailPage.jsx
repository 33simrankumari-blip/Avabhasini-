import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventBySlug } from "../data/events.js";
import { setPageMeta, breadcrumbJsonLd } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { getMentorById, mentorPublicPath, mentorInitials, mentorPortraitUrl } from "../mentors.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  useEffect(() => {
    if (event) {
      setPageMeta({
        title: `${event.title} · WAC 2026 Session · AYURDISHA`,
        description: event.description,
        path: event.path,
        breadcrumbLd: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: event.date, path: event.path }
        ]),
      });
    }
  }, [event]);

  if (!event) return <NotFoundPage message="The requested Congress session could not be found." />;

  const mentors = (event.mentorsInvolved || []).map(getMentorById).filter(Boolean);

  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <Breadcrumbs 
          items={[
            { name: "Events", path: "/events" },
            { name: event.date }
          ]} 
        />

        <header className="aym-page-header">
          <div className="aym-flex-align-center aym-gap-3 aym-mb-3">
            <span className="aym-badge aym-badge-green">{event.category}</span>
            <span className="aym-eyebrow">WAC 2026 BHUBANESWAR</span>
          </div>
          <h1 className="aym-display">{event.title}</h1>
          <p className="aym-lead">{event.description}</p>
        </header>

        <div className="aym-card aym-mb-8">
          <div className="aym-card-body">
            <div className="aym-grid-3">
              <div className="aym-card-meta-item">
                <Calendar size={18} className="aym-text-maroon" aria-hidden="true" />
                <div>
                  <strong>Date</strong>
                  <div>{event.date}</div>
                </div>
              </div>
              <div className="aym-card-meta-item">
                <Clock size={18} className="aym-text-maroon" aria-hidden="true" />
                <div>
                  <strong>Timing</strong>
                  <div>{event.time}</div>
                </div>
              </div>
              <div className="aym-card-meta-item">
                <MapPin size={18} className="aym-text-maroon" aria-hidden="true" />
                <div>
                  <strong>Location</strong>
                  <div>{event.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {event.highlights && (
          <section className="aym-mb-8">
            <h2 className="aym-h2 aym-mb-4">Session Highlights & Focus Areas</h2>
            <ul className="aym-bullet-list">
              {event.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        {mentors.length > 0 && (
          <section className="aym-mb-8">
            <h2 className="aym-h2 aym-mb-4">Mentors Present at This Session</h2>
            <div className="aym-grid-2">
              {mentors.map(m => {
                const portrait = mentorPortraitUrl(m);
                const initials = mentorInitials(m.name);
                return (
                  <div key={m.id} className="aym-flex-align-center aym-gap-4 aym-card aym-p-4">
                    <div className="aym-mentor-avatar">
                      {portrait ? <img src={portrait} alt={`Portrait of ${m.name}`} width={56} height={56} /> : <span aria-hidden="true">{initials}</span>}
                    </div>
                    <div>
                      <h3 className="aym-h4">
                        <Link to={mentorPublicPath(m)} className="aym-card-title-link">{m.name}</Link>
                      </h3>
                      <p className="aym-text-sm aym-text-muted">{m.designation || "Ayurveda Specialist"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="aym-callout-box">
          <h3>Participate in the Digital Hall</h3>
          <p>Register online to submit your question and track your answer ticket for this session.</p>
          <div className="aym-mt-4">
            <Link to={{ pathname: "/", hash: "#register" }} className="aym-btn aym-btn-primary">
              Register for Hall & Ask Desk <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
