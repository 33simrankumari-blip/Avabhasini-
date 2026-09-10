import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getResourceBySlug } from "../data/resources.js";
import { parseVideo } from "../podcasts.js";
import { setPageMeta, breadcrumbJsonLd } from "../siteMeta.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { Mic, FileText, User, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ResourceDetailPage() {
  const { slug } = useParams();
  const resource = getResourceBySlug(slug);

  useEffect(() => {
    if (resource) {
      setPageMeta({
        title: `${resource.title} · AYURDISHA Resource`,
        description: resource.description,
        path: resource.path,
        breadcrumbLd: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: resource.category, path: resource.path }
        ]),
      });
    }
  }, [resource]);

  if (!resource) return <NotFoundPage message="The requested resource could not be found." />;

  const isPodcast = resource.type === "podcast";
  const parsedVideo = isPodcast ? parseVideo(resource.videoUrl) : null;

  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <Breadcrumbs 
          items={[
            { name: "Resources", path: "/resources" },
            { name: resource.category }
          ]} 
        />

        <header className="aym-page-header">
          <div className="aym-flex-align-center aym-gap-3 aym-mb-3">
            <span className={`aym-badge ${isPodcast ? "aym-badge-maroon" : "aym-badge-gold"}`}>
              {isPodcast ? <Mic size={14} aria-hidden="true" /> : <FileText size={14} aria-hidden="true" />}
              {resource.category}
            </span>
            {resource.author && (
              <span className="aym-text-sm aym-text-muted aym-flex-align-center aym-gap-1">
                <User size={14} aria-hidden="true" /> {resource.author}
              </span>
            )}
          </div>
          <h1 className="aym-display">{resource.title}</h1>
          <p className="aym-lead">{resource.description}</p>
        </header>

        {isPodcast && parsedVideo && (
          <div className="aym-media-container aym-mb-8">
            {parsedVideo.kind === "youtube" && (
              <div className="aym-embed-responsive">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${parsedVideo.id}`}
                  title={resource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {parsedVideo.kind === "vimeo" && (
              <div className="aym-embed-responsive">
                <iframe
                  src={`https://player.vimeo.com/video/${parsedVideo.id}`}
                  title={resource.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {parsedVideo.kind === "mp4" && (
              <video controls className="aym-video-player">
                <source src={parsedVideo.src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            )}
            {parsedVideo.kind === "link" && (
              <div className="aym-callout-box">
                <p>Watch or listen to this talk on the external platform:</p>
                <a href={parsedVideo.href} target="_blank" rel="noopener noreferrer" className="aym-btn aym-btn-primary aym-mt-2">
                  Open Video Stream <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        )}

        {resource.contentSections && (
          <div className="aym-prose aym-mb-8">
            {resource.contentSections.map((sec, i) => (
              <section key={i} className="aym-program-section-card aym-mb-6">
                <h2 className="aym-h3 aym-mb-3">{sec.title}</h2>
                <ul className="aym-bullet-list">
                  {sec.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {resource.references && resource.references.length > 0 && (
          <section className="aym-program-section-card aym-bg-surface aym-mb-8">
            <h2 className="aym-h3 aym-mb-4">Official References</h2>
            <ul className="aym-ref-list">
              {resource.references.map((ref, i) => (
                <li key={i}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="aym-ref-link">
                    {ref.label} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="aym-callout-box">
          <h3>Need Further Guidance?</h3>
          <p>Submit your question to the Ask Desk for personalized mentor feedback.</p>
          <div className="aym-mt-4">
            <Link to={{ pathname: "/", hash: "#ask" }} className="aym-btn aym-btn-primary">
              Ask a Mentor <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
