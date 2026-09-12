import React from "react";
import { Layers, BookOpen, Map, FileSpreadsheet, LogOut, ShieldCheck, CheckCircle2 } from "lucide-react";
import ActionCard from "./ActionCard.jsx";

export default function StaffWorkspace({ onGoTab, onLogout, questionsCount = 0, clustersCount = 0 }) {
  const actions = [
    {
      id: "curate",
      title: "Curation Desk",
      description: "Review, merge, and organize submitted student & delegate questions into thematic groups for mentor response.",
      icon: Layers,
      buttonText: "Open Curation Desk",
      badgeText: "Core Workspace",
    },
    {
      id: "board",
      title: "Open Theme Stage",
      description: "Access published stage questions and two-chair mentor answer letters left for the Ayurveda community.",
      icon: BookOpen,
      buttonText: "Open Theme Stage",
      badgeText: "Stage & Answers",
    },
    {
      id: "insights",
      title: "Insights",
      description: "View thematic distribution summaries, briefing boards, and delegate query analytics across career tracks.",
      icon: Map,
      buttonText: "Open Insights",
      badgeText: "Analytics & Briefings",
    },
    {
      id: "pack",
      title: "Mentor Pack",
      description: "Access mentor-related briefing documents, customized question exports, and mentor guidance materials.",
      icon: FileSpreadsheet,
      buttonText: "Open Mentor Pack",
      badgeText: "Mentor Resources",
    },
  ];

  return (
    <div className="aym-staff-workspace-container">
      <div className="aym-staff-workspace-hero">
        <div className="aym-staff-workspace-hero-inner">
          <div className="aym-eyebrow aym-eyebrow-staff">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Authority Staff Access · 11th World Ayurveda Congress</span>
          </div>
          <h1 className="aym-display aym-staff-workspace-title">Staff Curation & Management Portal</h1>
          <p className="aym-staff-workspace-lead">
            Welcome to the official AYUSHMARG staff workspace. Manage submitted delegate questions, curate theme stage discussions, prepare mentor briefing packs, and track career track insights.
          </p>

          <div className="aym-staff-workspace-meta-bar">
            <div className="aym-staff-meta-pill">
              <CheckCircle2 size={14} className="aym-text-gold" aria-hidden="true" />
              <span>Session Authenticated</span>
            </div>
            {questionsCount > 0 && (
              <div className="aym-staff-meta-pill">
                <span>{questionsCount} Submitted Questions</span>
              </div>
            )}
            {clustersCount > 0 && (
              <div className="aym-staff-meta-pill">
                <span>{clustersCount} Curated Groups</span>
              </div>
            )}
            <button
              type="button"
              className="aym-btn aym-btn-ghost aym-btn-sm aym-staff-logout-btn"
              onClick={onLogout}
            >
              <LogOut size={14} aria-hidden="true" />
              <span>Exit Staff Session</span>
            </button>
          </div>
        </div>
      </div>

      <div className="aym-staff-actions-grid">
        {actions.map((act) => (
          <ActionCard
            key={act.id}
            title={act.title}
            description={act.description}
            icon={act.icon}
            buttonText={act.buttonText}
            badgeText={act.badgeText}
            onClick={() => onGoTab(act.id)}
          />
        ))}
      </div>
    </div>
  );
}
