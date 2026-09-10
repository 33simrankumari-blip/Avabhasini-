import React from "react";
import { Feather } from "lucide-react";

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
    <div className="aym-letter-extras">
      {acts.length > 0 && (
        <div className="aym-letter-extra">
          <div className="aym-eyebrow">Do these next</div>
          <ol>
            {acts.map((a, i) => <li key={i}>{a}</li>)}
          </ol>
        </div>
      )}
      {note ? (
        <div className="aym-letter-mistake">
          <div className="aym-eyebrow">Mistake to avoid</div>
          <p>{note}</p>
        </div>
      ) : null}
      {res.length > 0 && (
        <div className="aym-letter-extra">
          <div className="aym-eyebrow">Official resources</div>
          <ul>
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
  const eye = String(eyebrow || (variant === "hall" ? "From the hall" : "Written for you"));
  return (
    <article className={`aym-letter aym-letter-${variant}`} aria-label={title}>
      <div className="aym-letter-mark" aria-hidden="true">
        <Feather size={16} strokeWidth={1.75} />
      </div>
      <div className="aym-letter-top">
        <div className="aym-eyebrow aym-letter-eye">{eye}</div>
        <h3 className="aym-serif aym-letter-title">{title}</h3>
        {kicker ? <p className="aym-letter-kicker">{kicker}</p> : null}
        {by ? <p className="aym-letter-byline">Answered by <b>{by}</b></p> : null}
      </div>
      <div className="aym-letter-rule" aria-hidden="true" />
      <div className="aym-letter-prose">
        {paragraphs.map((p, i) => (
          <p key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</p>
        ))}
      </div>
      <LetterExtras actions={actions} mistake={mistake} resources={resources} />
      <footer className="aym-letter-sign">
        <span>AYURDISHA · Meet the Mentors</span>
        {by ? <span>{by}</span> : <span>Hall guidance</span>}
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
