import React, { useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getMentorByParam, mentorPublicPath } from "../mentors.js";
import { setPageMeta, personJsonLd } from "../siteMeta.js";
import PageSkeleton from "../components/SkeletonLoaders.jsx";

const MentorProfile = lazy(() => import("../MentorProfile.jsx"));

export default function MentorDetailPage() {
  const { slug } = useParams();
  const mentor = getMentorByParam(slug);

  useEffect(() => {
    if (mentor) {
      const path = mentorPublicPath(mentor);
      const title = `${mentor.name} — Ayurveda Mentor Profile · AYURDISHA`;
      const description = `${mentor.name}${mentor.designation ? ` (${mentor.designation})` : ""} — tentative mentor for the 11th World Ayurveda Congress 2026.`;
      
      setPageMeta({
        title,
        description,
        path,
        personLd: personJsonLd(mentor, path),
      });
    } else {
      setPageMeta({
        title: "Mentor Not Found · AYURDISHA",
        description: "The requested mentor profile is not listed in the current WAC roster.",
        path: `/mentors/${slug || ""}`,
      });
    }
  }, [mentor, slug]);

  return (
    <div className="aym-page aym-py-8">
      <div className="aym-container">
        <Suspense fallback={<PageSkeleton />}>
          <MentorProfile mentorId={slug} />
        </Suspense>
      </div>
    </div>
  );
}
