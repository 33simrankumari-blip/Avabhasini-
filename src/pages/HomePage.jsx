import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Users, BookOpen, Calendar, HelpCircle, ShieldCheck, 
  Sparkles, CheckCircle2, Award, FileText, ChevronRight, MessageSquare
} from "lucide-react";
import { MENTORS, mentorsWithNames, mentorPublicPath, mentorInitials, mentorPortraitUrl } from "../mentors.js";
import { getAllPrograms } from "../data/programs.js";
import { getAllEvents } from "../data/events.js";
import { getAllResources } from "../data/resources.js";
import ProgramCard from "../components/ProgramCard.jsx";
import EventCard from "../components/EventCard.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import { setPageMeta, faqJsonLd } from "../siteMeta.js";

export default function HomePage() {
  const FAQS = [
    {
      q: "What is AYURDISHA?",
      a: "AYURDISHA is the digital Meet the Mentors hall of the 11th World Ayurveda Congress (Bhubaneswar 2026). It connects BAMS students, interns, postgraduates, and practitioners with senior Ayurveda academicians, researchers, and clinicians.",
    },
    {
      q: "How do I ask a mentor a career question?",
      a: "Click 'Ask a Mentor' to register with your email and state. You will receive an official ticket ID to track your question. Experienced mentors read and answer submitted questions.",
    },
    {
      q: "Is there any fee to use AYURDISHA?",
      a: "No, AYURDISHA is a free career guidance initiative supported by the World Ayurveda Foundation for all BAMS students and practitioners.",
    },
    {
      q: "What career tracks are covered?",
      a: "AYURDISHA covers 10 national tracks including Clinical Practice & Integrative Care, Academics & PG Entrance, Research & Evidence, Entrepreneurship, Manufacturing & GMP, Export & Global Trade, and Public Health.",
    },
  ];

  useEffect(() => {
    setPageMeta({
      title: "AYURDISHA · Ayurveda Education, Mentors & Career Guidance · WAC 2026",
      description: "Digital Meet the Mentors hall of the 11th World Ayurveda Congress, Bhubaneswar 2026. Learn from experienced practitioners, explore 10 career tracks, and submit career questions.",
      path: "/",
      jsonLd: faqJsonLd(FAQS),
    });
  }, []);

  const featuredMentors = mentorsWithNames(MENTORS).slice(0, 6);
  const featuredPrograms = getAllPrograms().slice(0, 3);
  const upcomingEvents = getAllEvents().slice(0, 2);
  const featuredResources = getAllResources().slice(0, 3);

  return (
    <div className="aym-homepage">
      {/* HERO SECTION */}
      <section className="aym-hero-section" aria-labelledby="hero-title">
        <div className="aym-hero-bg-pattern" aria-hidden="true" />
        <div className="aym-container aym-hero-container">
          <div className="aym-hero-badge">
            <Sparkles size={15} aria-hidden="true" />
            <span>11th World Ayurveda Congress · Bhubaneswar 2026</span>
          </div>

          <h1 id="hero-title" className="aym-display aym-hero-h1">
            Learn Ayurveda & Shape Your Career from Experienced Practitioners
          </h1>

          <p className="aym-hero-lead">
            The official digital Meet the Mentors hall for BAMS students, postgraduates, and practitioners. Receive authentic guidance on PG branches, clinical setup, research grants, and global practice.
          </p>

          <div className="aym-hero-cta-group">
            <Link to={{ pathname: "/", hash: "#ask" }} className="aym-btn aym-btn-primary aym-btn-lg">
              Ask a Mentor <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/mentors" className="aym-btn aym-btn-secondary aym-btn-lg">
              Explore Mentors
            </Link>
            <Link to="/programs" className="aym-btn aym-btn-outline aym-btn-lg">
              Browse 10 Tracks
            </Link>
          </div>

          {/* TRUST / CREDIBILITY BAR */}
          <div className="aym-hero-trust-bar">
            <div className="aym-trust-item">
              <Award size={20} aria-hidden="true" />
              <div>
                <strong>23+ Senior Mentors</strong>
                <span>Vice Chancellors, Directors, CCRAS & AIIA Leaders</span>
              </div>
            </div>
            <div className="aym-trust-item">
              <BookOpen size={20} aria-hidden="true" />
              <div>
                <strong>10 Career Tracks</strong>
                <span>Clinical, PG, Research, Start-ups, Global Trade</span>
              </div>
            </div>
            <div className="aym-trust-item">
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <strong>Official WAC Platform</strong>
                <span>World Ayurveda Foundation Initiative</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE OFFERINGS */}
      <section className="aym-section aym-bg-surface" aria-labelledby="offerings-title">
        <div className="aym-container">
          <div className="aym-section-header aym-text-center">
            <p className="aym-eyebrow">AUTHENTIC GUIDANCE</p>
            <h2 id="offerings-title" className="aym-display">How AYURDISHA Empowers Your Journey</h2>
            <p className="aym-section-lead">A structured ecosystem designed to answer your post-BAMS questions with clarity.</p>
          </div>

          <div className="aym-grid-3">
            <div className="aym-feature-card">
              <div className="aym-feature-icon"><MessageSquare size={24} aria-hidden="true" /></div>
              <h3>Ask Desk & Ticket Tracking</h3>
              <p>Submit your career question directly. Track your response using your unique WAC ticket number.</p>
              <Link to={{ pathname: "/", hash: "#ask" }} className="aym-feature-link">
                Submit Question <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="aym-feature-card">
              <div className="aym-feature-icon"><Users size={24} aria-hidden="true" /></div>
              <h3>Verified Mentor Roster</h3>
              <p>Connect with renowned professors, directors of research councils, and clinical specialists.</p>
              <Link to="/mentors" className="aym-feature-link">
                Meet the Mentors <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="aym-feature-card">
              <div className="aym-feature-icon"><BookOpen size={24} aria-hidden="true" /></div>
              <h3>10 Specialized Career Tracks</h3>
              <p>Explore detailed guides on hospital posts, private clinics, PG entrance, regulatory affairs, and export.</p>
              <Link to="/programs" className="aym-feature-link">
                Explore All Tracks <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED MENTORS PREVIEW */}
      <section className="aym-section" aria-labelledby="home-mentors-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">MEET THE MENTORS</p>
              <h2 id="home-mentors-title" className="aym-display">Learn from Industry Leaders</h2>
              <p className="aym-section-lead">Distinguished experts guiding the next generation of Ayurveda practitioners.</p>
            </div>
            <Link to="/mentors" className="aym-btn aym-btn-outline">
              View All 23 Mentors <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-mentors-grid">
            {featuredMentors.map((m, i) => {
              const portrait = mentorPortraitUrl(m);
              const initials = mentorInitials(m.name);
              return (
                <article key={m.id} className="aym-mentor-card">
                  <div className="aym-mentor-card-top">
                    <div className="aym-mentor-avatar">
                      {portrait ? (
                        <img src={portrait} alt={`Portrait of ${m.name}`} width={72} height={72} loading="lazy" />
                      ) : (
                        <span aria-hidden="true">{initials}</span>
                      )}
                    </div>
                  </div>
                  <div className="aym-mentor-body">
                    <h3 className="aym-mentor-name">
                      <Link to={mentorPublicPath(m)} className="aym-mentor-name-link">{m.name}</Link>
                    </h3>
                    <p className="aym-mentor-role">{m.designation || "Distinguished Mentor"}</p>
                    {m.expertise && <p className="aym-mentor-affiliation">Specialty: {m.expertise}</p>}
                  </div>
                  <div className="aym-mentor-card-actions">
                    <Link to={mentorPublicPath(m)} className="aym-btn aym-mentor-card-cta" aria-label={`View profile of ${m.name}`}>
                      View Profile <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS / TRACKS */}
      <section className="aym-section aym-bg-surface" aria-labelledby="home-programs-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">CAREER PATHWAYS</p>
              <h2 id="home-programs-title" className="aym-display">Explore Core Career Tracks</h2>
              <p className="aym-section-lead">Comprehensive roadmaps for every stage after BAMS graduation.</p>
            </div>
            <Link to="/programs" className="aym-btn aym-btn-outline">
              View All 10 Tracks <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-grid-3">
            {featuredPrograms.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS PREVIEW */}
      <section className="aym-section" aria-labelledby="home-events-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">WAC 2026 SESSIONS</p>
              <h2 id="home-events-title" className="aym-display">Congress Hall Sessions</h2>
              <p className="aym-section-lead">Join live guider visits and panel discussions in Bhubaneswar.</p>
            </div>
            <Link to="/events" className="aym-btn aym-btn-outline">
              View Event Schedule <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-grid-2">
            {upcomingEvents.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED RESOURCES & PODCASTS */}
      <section className="aym-section aym-bg-surface" aria-labelledby="home-resources-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">KNOWLEDGE BASE</p>
              <h2 id="home-resources-title" className="aym-display">Podcasts & Career Guides</h2>
              <p className="aym-section-lead">Listen to recorded mentor talks and read actionable career briefs.</p>
            </div>
            <Link to="/resources" className="aym-btn aym-btn-outline">
              Browse Resources <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-grid-3">
            {featuredResources.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="aym-section" aria-labelledby="faq-title">
        <div className="aym-container aym-max-w-4xl">
          <div className="aym-section-header aym-text-center">
            <p className="aym-eyebrow">QUESTIONS & ANSWERS</p>
            <h2 id="faq-title" className="aym-display">Frequently Asked Questions</h2>
          </div>

          <div className="aym-faq-list">
            {FAQS.map((faq, i) => (
              <details key={i} className="aym-faq-item">
                <summary className="aym-faq-question">
                  <span>{faq.q}</span>
                </summary>
                <div className="aym-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="aym-cta-banner">
        <div className="aym-container aym-cta-container">
          <h2 className="aym-display aym-cta-title">Ready to Ask a Mentor Your Career Question?</h2>
          <p className="aym-cta-lead">
            Register for the 11th World Ayurveda Congress digital hall and receive personalized guidance.
          </p>
          <div className="aym-cta-actions">
            <Link to={{ pathname: "/", hash: "#ask" }} className="aym-btn aym-btn-primary aym-btn-lg">
              Ask a Mentor Now <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/mentors" className="aym-btn aym-btn-ghost-light aym-btn-lg">
              Explore Mentor Roster
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
