import React from "react";
import { Feather, Sparkles, BookOpen, Layers, Award, FileText, CheckCircle2 } from "lucide-react";

function splitProse(text) {
  const raw = String(text || "").replace(/\r\n/g, "\n").trim();
  if (!raw) return [];
  const blocks = raw.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);
  return blocks.length ? blocks : [raw];
}

function presentMentorName(name) {
  const by = String(name || "").trim();
  if (!by || by.length < 2) return "";
  if (/^[.\-_,/\s]+$/.test(by)) return "";
  return by;
}

function LetterExtras({ actions, mistake, resources }) {
  const acts = (actions || []).map(a => String(a || "").trim()).filter(Boolean);
  const res = (resources || []).map(r => String(r || "").trim()).filter(Boolean);
  const note = String(mistake || "").trim();
  if (!acts.length && !note && !res.length) return null;
  return (
    <div className="aym-letter-extras-premium">
      {acts.length > 0 && (
        <div className="aym-letter-extra-premium">
          <div className="aym-eyebrow-premium">
            <CheckCircle2 size={13} className="aym-extra-icon-green" aria-hidden="true" />
            <span>Recommended Next Steps</span>
          </div>
          <ol className="aym-letter-list-premium">
            {acts.map((a, i) => <li key={i}>{a}</li>)}
          </ol>
        </div>
      )}
      
      {note ? (
        <div className="aym-letter-mistake-premium">
          <div className="aym-eyebrow-premium aym-text-warn">
            <Award size={13} className="aym-extra-icon-gold" aria-hidden="true" />
            <span>Crucial Mistake to Avoid</span>
          </div>
          <p className="aym-letter-mistake-text-premium">{note}</p>
        </div>
      ) : null}
      
      {res.length > 0 && (
        <div className="aym-letter-extra-premium">
          <div className="aym-eyebrow-premium">
            <FileText size={13} className="aym-extra-icon-blue" aria-hidden="true" />
            <span>Official References & Material</span>
          </div>
          <ul className="aym-letter-list-premium">
            {res.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function MentorAnswerLetter({
  variant = "personal",
  eyebrow,
  title = "Mentor’s answer",
  kicker,
  mentorName,
  body,
  actions,
  mistake,
  resources,
}) {
  const paragraphs = splitProse(body);
  if (!paragraphs.length) return null;
  const by = presentMentorName(mentorName);
  
  const isHall = variant === "hall";
  const defaultEyebrow = isHall ? "WAC Shared Stage Answer" : "Personal Mentorship Letter";
  const eye = String(eyebrow || defaultEyebrow);
  
  return (
    <article className={`aym-letter-premium ${isHall ? "aym-letter-premium-hall" : "aym-letter-premium-personal"}`} aria-label={title}>
      {/* Visual Seal Indicator on the Side/Top */}
      <div className="aym-letter-seal-premium" aria-hidden="true">
        {isHall ? (
          <Sparkles size={16} strokeWidth={2} />
        ) : (
          <Feather size={16} strokeWidth={2} />
        )}
      </div>

      <div className="aym-letter-top-premium">
        <div className="aym-letter-badge-row-premium">
          <span className={`aym-letter-type-badge ${isHall ? "badge-hall" : "badge-personal"}`}>
            {isHall ? <Layers size={12} aria-hidden="true" /> : <Feather size={12} aria-hidden="true" />}
            <span>{isHall ? "Shared Joint Guidance" : "Direct Individual Letter"}</span>
          </span>
          <span className="aym-letter-eye-premium">{eye}</span>
        </div>
        
        <h3 className="aym-letter-title-premium">{title}</h3>
        
        {kicker ? (
          <p className="aym-letter-kicker-premium">
            <b>Re:</b> {kicker}
          </p>
        ) : null}
        
        {by ? (
          <p className="aym-letter-byline-premium">
            <span>Authored by:</span> <strong>{by}</strong>
          </p>
        ) : null}
      </div>

      <div className="aym-letter-rule-premium" aria-hidden="true" />

      <div className="aym-letter-prose-premium">
        {paragraphs.map((p, i) => (
          <p key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</p>
        ))}
      </div>

      <LetterExtras actions={actions} mistake={mistake} resources={resources} />

      <footer className="aym-letter-sign-premium">
        <div className="aym-letter-sign-branding">
          <strong>AYURDISHA</strong>
          <span>11th World Ayurveda Congress · Bhubaneswar</span>
        </div>
        <div className="aym-letter-sign-signature">
          {by ? (
            <span className="aym-sig-text">{by}</span>
          ) : (
            <span className="aym-sig-text">Hall Desk Editor</span>
          )}
        </div>
      </footer>
    </article>
  );
}

export function trackStatusOf(s) {
  const c = s && s.cluster;
  const merged = Boolean(c && String(c.answer || "").trim());
  const individual = Boolean(String(s && s.individualAnswer || "").trim());
  const published = merged && String(c.status || "").toLowerCase() === "published";
  if (published) return { label: "On the stage", tone: "green" };
  if (merged || individual) return { label: "Answered", tone: "green" };
  if (c) return { label: "With mentor", tone: "gold" };
  return { label: "Received", tone: "grey" };
}
