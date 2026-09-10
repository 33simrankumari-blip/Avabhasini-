import React from "react";
import { PrivacyPage, TermsPage, DisclaimerPage } from "../LegalPages.jsx";

export function PrivacyRoute() {
  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <PrivacyPage />
      </div>
    </div>
  );
}

export function TermsRoute() {
  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <TermsPage />
      </div>
    </div>
  );
}

export function DisclaimerRoute() {
  return (
    <div className="aym-page aym-py-12">
      <div className="aym-container aym-max-w-4xl">
        <DisclaimerPage />
      </div>
    </div>
  );
}
