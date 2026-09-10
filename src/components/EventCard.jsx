import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { eventPublicPath } from "../data/events.js";

export default function EventCard({ event, index = 0 }) {
  if (!event) return null;

  return (
    <article 
      className="aym-card aym-event-card"
      style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
    >
      <div className="aym-card-header">
        <span className="aym-badge aym-badge-green">{event.category}</span>
        <span className="aym-event-date-chip">
          <Calendar size={13} aria-hidden="true" /> {event.date}
        </span>
      </div>

      <div className="aym-card-body">
        <h3 className="aym-card-title">
          <Link to={eventPublicPath(event)} className="aym-card-title-link">
            {event.title}
          </Link>
        </h3>
        <p className="aym-card-description">{event.description}</p>
        
        <div className="aym-card-meta-list">
          <div className="aym-card-meta-item">
            <Clock size={14} aria-hidden="true" />
            <span>{event.time}</span>
          </div>
          <div className="aym-card-meta-item">
            <MapPin size={14} aria-hidden="true" />
            <span className="aym-truncate">{event.location}</span>
          </div>
        </div>
      </div>

      <div className="aym-card-footer">
        <Link to={eventPublicPath(event)} className="aym-btn aym-btn-primary aym-btn-sm">
          View Session Details <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
