import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProgramBySlug } from "../data/programs.js";
import { setPageMeta, breadcrumbJsonLd } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { ArrowRight, BookOpen, ExternalLink, CheckCircle2, AlertTriangle, IndianRupee, HelpCircle } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const program = getProgramBySlug(slug);

  useEffect(() => {
    if (program) {
      setPageMeta({
        title: `[${program.code}] ${program.title} — Career Track · AYURDISHA`,
        description: program.tagline,
        path: program.path,
        breadcrumbLd: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: `Track ${program.code}`, path: program.path }
        ]),
      });
    }
  }, [program]);

  if (!program) return <NotFoundPage message="The requested career track does not exist." />;

  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <Breadcrumbs 
          items={[
            { name: "Programs & Tracks", path: "/programs" },
            { name: `Track ${program.code}` }
          ]} 
        />

        <header className="aym-page-header">
          <div className="aym-flex-align-center aym-gap-3 aym-mb-3">
            <span className="aym-badge aym-badge-gold">{program.code}</span>
            <span className="aym-eyebrow">NATIONAL CAREER PATHWAY</span>
          </div>
          <h1 className="aym-display">{program.title}</h1>
          <p className="aym-lead">{program.tagline}</p>
        </header>

        <div className="aym-program-sections">
          {program.sections.map((sec, idx) => {
            const isOpp = sec.title.includes("opportunities");
            const isChal = sec.title.includes("Challenges");
            const isInc = sec.title.includes("Income");

            return (
              <section key={idx} className="aym-program-section-card">
                <div className="aym-flex-align-center aym-gap-3 aym-mb-4">
                  {isOpp && <CheckCircle2 className="aym-text-green" size={22} aria-hidden="true" />}
                  {isChal && <AlertTriangle className="aym-text-warning" size={22} aria-hidden="true" />}
                  {isInc && <IndianRupee className="aym-text-gold" size={22} aria-hidden="true" />}
                  {!isOpp && !isChal && !isInc && <BookOpen className="aym-text-maroon" size={22} aria-hidden="true" />}
                  <h2 className="aym-h2">{sec.title}</h2>
                </div>

                <ul className="aym-bullet-list">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            );
          })}

          {program.references && program.references.length > 0 && (
            <section className="aym-program-section-card aym-bg-surface">
              <h2 className="aym-h3 aym-mb-4">Official References & Publications</h2>
              <ul className="aym-ref-list">
                {program.references.map((ref, i) => (
                  <li key={i}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="aym-ref-link">
                      {ref.label} <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="aym-callout-box aym-mt-8">
            <h3 className="aym-flex-align-center aym-gap-2">
              <HelpCircle className="aym-text-maroon" size={20} aria-hidden="true" /> Have a Specific Question About {program.title}?
            </h3>
            <p>Submit your question to the AYURDISHA Ask Desk and receive guidance from experienced mentors.</p>
            <div className="aym-mt-4">
              <Link to={{ pathname: "/", hash: "#ask" }} className="aym-btn aym-btn-primary">
                Ask a Mentor About Track {program.code} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
