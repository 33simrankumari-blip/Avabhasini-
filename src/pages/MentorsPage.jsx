import React, { useEffect, lazy, Suspense } from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PageSkeleton from "../components/SkeletonLoaders.jsx";
import { setPageMeta } from "../siteMeta.js";

const MentorsDirectory = lazy(() => import("../MentorsDirectory.jsx"));

export default function MentorsPage() {
  useEffect(() => {
    setPageMeta({
      title: "Ayurveda Mentors & Experts Roster · AYURDISHA · WAC 2026",
      description: "Meet the 23 tentative mentors for the 11th World Ayurveda Congress, Bhubaneswar 2026. Vice Chancellors, directors, CCRAS researchers, and clinical specialists.",
      path: "/mentors",
    });
  }, []);

  return (
    <div className="aym-page aym-py-8">
      <div className="aym-container">
        <Breadcrumbs items={[{ name: "Mentors Directory" }]} />
        <Suspense fallback={<PageSkeleton />}>
          <MentorsDirectory />
        </Suspense>
      </div>
    </div>
  );
}
