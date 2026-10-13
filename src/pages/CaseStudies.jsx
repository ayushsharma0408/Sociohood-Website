import { useEffect } from "react";
import { useCmsContent } from "../hooks/useCmsContent.js";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import CaseStudiesHero from "../components/case-studies/CaseStudiesHero.jsx";
import CaseStudyGrid from "../components/case-studies/CaseStudyGrid.jsx";
import CaseStudiesLaunch from "../components/case-studies/CaseStudiesLaunch.jsx";
import CaseStudiesCta from "../components/case-studies/CaseStudiesCta.jsx";
import {
  getFeaturedCaseStudies,
  getPublishedCaseStudies,
  toCaseStudyCard,
} from "../admin/services/caseStudiesService.js";
import { HOMEPAGE_CASE_STUDY_COUNT } from "../constants/homepage.js";

const CaseStudies = () => {
  useCmsContent();
  const featured = getFeaturedCaseStudies(HOMEPAGE_CASE_STUDY_COUNT);
  const featuredIds = new Set(featured.map((study) => study.id));
  const rest = getPublishedCaseStudies().filter(
    (study) => !featuredIds.has(study.id)
  );
  const published = [...featured, ...rest].map((study, index) =>
    toCaseStudyCard(study, index)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Case studies | SocioHood";
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="case-studies-page">
        <CaseStudiesHero />
        <CaseStudyGrid items={published} expandable showViewAll={false} />
        <CaseStudiesLaunch />
        <CaseStudiesCta />
      </main>
      <FooterSection />
    </>
  );
};

export default CaseStudies;
