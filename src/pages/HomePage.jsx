import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Users, BookOpen, Calendar, HelpCircle, ShieldCheck, 
  Sparkles, CheckCircle2, Award, FileText, ChevronRight, MessageSquare,
  Compass, Stethoscope, Microscope, Building2, Globe2, Briefcase, GraduationCap,
  Layers, Send, Ticket
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
      a: "AYURDISHA is the official digital Meet the Mentors hall of the 11th World Ayurveda Congress (Bhubaneswar 2026). It connects BAMS students, interns, postgraduates, and practitioners with senior Ayurveda academicians, researchers, and clinicians.",
    },
    {
      q: "How do I ask a mentor a career question?",
      a: "Click 'Ask a Mentor' to register with your details and state. You will receive an official ticket ID to track your question as it is curated and answered by experienced mentors.",
    },
    {
      q: "Is there any fee to use AYURDISHA?",
      a: "No, AYURDISHA is a free institutional guidance initiative supported by the World Ayurveda Foundation for all BAMS students, scholars, and practitioners.",
    },
    {
      q: "What career tracks are covered?",
      a: "AYURDISHA covers 10 national pathways including Clinical Practice & Integrative Care, Academics & PG Entrance, Research & Evidence, Entrepreneurship, Manufacturing & GMP, Export & Global Trade, and Public Health.",
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
  const featuredPrograms = getAllPrograms().slice(0, 6);
  const upcomingEvents = getAllEvents().slice(0, 2);
  const featuredResources = getAllResources().slice(0, 3);

  const careerTrackVisuals = [
    {
      id: "clinical-practice",
      title: "Clinical Practice & Integrative Care",
      desc: "Hospital posts, private OPD setup, Nadi Pariksha, Panchakarma centers, and integrative care models.",
      image: "/assets/ayurdisha-clinical.png",
      icon: Stethoscope,
      badge: "Clinical Track",
      link: "/programs/clinical-practice",
    },
    {
      id: "research-evidence",
      title: "Research, Evidence & Clinical Trials",
      desc: "CCRAS research fellowships, PhD pathways, clinical trials, phytomedicine research, and publication guidance.",
      image: "/assets/ayurdisha-research.png",
      icon: Microscope,
      badge: "Research Track",
      link: "/programs/research-evidence",
    },
    {
      id: "academics-teaching",
      title: "Academics, Teaching & PG Entrance",
      desc: "AIAPGET preparation, MD/MS branch selection, Assistant Professor posts, and institutional teaching careers.",
      image: "/assets/ayurdisha-hero.png",
      icon: GraduationCap,
      badge: "Academic Track",
      link: "/programs/academics-teaching",
    },
    {
      id: "global-trade",
      title: "Export, Global Trade & Practice Abroad",
      desc: "International licensing, WHO benchmarks, export regulations, global wellness centers, and practice in US/EU/UAE.",
      image: "/assets/hall-photo.png",
      icon: Globe2,
      badge: "Global Track",
      link: "/programs/global-trade",
    },
  ];

  return (
    <div className="aym-homepage">
      {/* HERO SECTION — SPLIT VISUAL HIERARCHY */}
      <section className="aym-hero-section" aria-labelledby="hero-title">
        <div className="aym-hero-bg-pattern" aria-hidden="true" />
        <div className="aym-container aym-hero-grid">
          <div className="aym-hero-content">
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
                <Send size={18} aria-hidden="true" />
                <span>Ask a Mentor</span>
              </Link>
              <Link to={{ pathname: "/", hash: "#track" }} className="aym-btn aym-btn-secondary aym-btn-lg aym-track-btn">
                <Ticket size={18} aria-hidden="true" />
                <span>Track My Answer</span>
              </Link>
              <Link to="/mentors" className="aym-btn aym-btn-outline aym-btn-lg">
                <span>Explore Mentors</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            {/* TRUST / CREDIBILITY BAR */}
            <div className="aym-hero-trust-bar">
              <div className="aym-trust-item">
                <Award size={20} className="aym-text-gold" aria-hidden="true" />
                <div>
                  <strong>23+ Senior Mentors</strong>
                  <span>Vice Chancellors, Directors & Leaders</span>
                </div>
              </div>
              <div className="aym-trust-item">
                <BookOpen size={20} className="aym-text-gold" aria-hidden="true" />
                <div>
                  <strong>10 Career Pathways</strong>
                  <span>Clinical, PG, Research & Global Practice</span>
                </div>
              </div>
              <div className="aym-trust-item">
                <ShieldCheck size={20} className="aym-text-gold" aria-hidden="true" />
                <div>
                  <strong>Official WAC Platform</strong>
                  <span>World Ayurveda Foundation Initiative</span>
                </div>
              </div>
            </div>
          </div>

          <div className="aym-hero-media">
            <div className="aym-hero-image-frame">
              <img 
                src="/assets/ayurdisha-hero.png" 
                alt="Senior Ayurveda Professor mentoring BAMS students at World Ayurveda Congress" 
                className="aym-hero-img"
                width={768}
                height={512}
                fetchPriority="high"
              />
              <div className="aym-hero-image-overlay">
                <span className="aym-hero-overlay-tag">
                  <ShieldCheck size={14} aria-hidden="true" />
                  Live Digital Hall · WAC Bhubaneswar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL STEP SEQUENCE: HOW AYURDISHA WORKS */}
      <section className="aym-section aym-bg-surface" aria-labelledby="how-it-works-title">
        <div className="aym-container">
          <div className="aym-section-header aym-text-center">
            <p className="aym-eyebrow">HOW IT WORKS</p>
            <h2 id="how-it-works-title" className="aym-display">Your Guided Pathway to Career Clarity</h2>
            <p className="aym-section-lead">A 3-step structured journey from submitting your ask to receiving published mentor answers.</p>
          </div>

          <div className="aym-grid-3 aym-steps-grid">
            <div className="aym-step-card">
              <div className="aym-step-num">01</div>
              <div className="aym-step-icon"><Send size={24} aria-hidden="true" /></div>
              <h3>1. Ask Your Question</h3>
              <p>Submit your career query regarding PG branches, clinical setup, or research grants at the digital Ask Desk.</p>
              <span className="aym-step-tag">Step 1 · Submit</span>
            </div>

            <div className="aym-step-card">
              <div className="aym-step-num">02</div>
              <div className="aym-step-icon"><Layers size={24} aria-hidden="true" /></div>
              <h3>2. Academic Curation</h3>
              <p>Senior academicians and desk curators review, cluster, and assign your question to domain experts.</p>
              <span className="aym-step-tag">Step 2 · Curate</span>
            </div>

            <div className="aym-step-card">
              <div className="aym-step-num">03</div>
              <div className="aym-step-icon"><BookOpen size={24} aria-hidden="true" /></div>
              <h3>3. Mentor Stage Letter</h3>
              <p>Mentors publish written answer letters on the Open Theme Stage and your ticket is updated.</p>
              <span className="aym-step-tag">Step 3 · Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10 VISUAL CAREER TRACKS HIGHLIGHT */}
      <section className="aym-section" aria-labelledby="home-tracks-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">CAREER PATHWAYS</p>
              <h2 id="home-tracks-title" className="aym-display">Explore 10 National Career Tracks</h2>
              <p className="aym-section-lead">Actionable roadmaps designed for BAMS graduates, postgraduates, and scholars.</p>
            </div>
            <Link to="/programs" className="aym-btn aym-btn-outline">
              <span>View All 10 Tracks</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-grid-2 aym-visual-tracks-grid">
            {careerTrackVisuals.map((track) => {
              const IconComponent = track.icon;
              return (
                <div key={track.id} className="aym-track-visual-card">
                  <div className="aym-track-card-img-wrap">
                    <img 
                      src={track.image} 
                      alt={track.title} 
                      className="aym-track-card-img"
                      loading="lazy"
                    />
                    <span className="aym-badge aym-badge-gold aym-track-card-badge">
                      {track.badge}
                    </span>
                  </div>
                  <div className="aym-track-card-content">
                    <div className="aym-track-card-icon">
                      <IconComponent size={20} aria-hidden="true" />
                    </div>
                    <h3 className="aym-track-card-title">{track.title}</h3>
                    <p className="aym-track-card-desc">{track.desc}</p>
                    <Link to={track.link} className="aym-btn aym-btn-ghost aym-track-card-cta">
                      <span>Explore Pathway</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED MENTORS PREVIEW */}
      <section className="aym-section aym-bg-surface" aria-labelledby="home-mentors-title">
        <div className="aym-container">
          <div className="aym-section-header-flex">
            <div>
              <p className="aym-eyebrow">MEET THE MENTORS</p>
              <h2 id="home-mentors-title" className="aym-display">Learn from Experienced Leaders</h2>
              <p className="aym-section-lead">Distinguished academicians and clinical specialists guiding BAMS mentees.</p>
            </div>
            <Link to="/mentors" className="aym-btn aym-btn-outline">
              <span>View All 23 Mentors</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="aym-mentors-grid">
            {featuredMentors.map((m) => {
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
                      <span>View Profile</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONGRESS HALL & PODCAST VISUAL SECTION */}
      <section className="aym-section" aria-labelledby="home-hall-title">
        <div className="aym-container">
          <div className="aym-grid-2 aym-hall-preview-grid">
            <div className="aym-hall-preview-media">
              <img 
                src="/assets/hall-photo.png" 
                alt="Meet the Mentors Digital Hall at World Ayurveda Congress" 
                className="aym-hall-img"
                loading="lazy"
              />
            </div>
            <div className="aym-hall-preview-content">
              <p className="aym-eyebrow">BHUBANESWAR HALL</p>
              <h2 id="home-hall-title" className="aym-display">The Digital Meet the Mentors Hall</h2>
              <p className="aym-hall-lead">
                Walk into the digital hall of the 11th World Ayurveda Congress. Access knowledge pods, podcast conversations, and published mentor stage letters.
              </p>
              <div className="aym-hall-features-list">
                <div className="aym-hall-feat-item">
                  <CheckCircle2 size={18} className="aym-text-gold" aria-hidden="true" />
                  <span>Knowledge Pods for 10 Career Pathways</span>
                </div>
                <div className="aym-hall-feat-item">
                  <CheckCircle2 size={18} className="aym-text-gold" aria-hidden="true" />
                  <span>Podcast Corner recorded sessions</span>
                </div>
                <div className="aym-hall-feat-item">
                  <CheckCircle2 size={18} className="aym-text-gold" aria-hidden="true" />
                  <span>Two-Chair Open Theme Stage records</span>
                </div>
              </div>
              <div className="aym-hall-cta-group">
                <Link to={{ pathname: "/", hash: "#board" }} className="aym-btn aym-btn-primary">
                  <span>Open Theme Stage</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/resources" className="aym-btn aym-btn-outline">
                  <span>Podcast Corner</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="aym-section aym-bg-surface" aria-labelledby="faq-title">
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
            Register for the 11th World Ayurveda Congress digital hall and receive authentic guidance.
          </p>
          <div className="aym-cta-actions">
            <Link to={{ pathname: "/", hash: "#ask" }} className="aym-btn aym-btn-primary aym-btn-lg">
              <Send size={18} aria-hidden="true" />
              <span>Ask a Mentor Now</span>
            </Link>
            <Link to={{ pathname: "/", hash: "#track" }} className="aym-btn aym-btn-ghost-light aym-btn-lg">
              <Ticket size={18} aria-hidden="true" />
              <span>Track My Answer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
