import { useEffect } from "react";
import { useCmsContent } from "../hooks/useCmsContent.js";
import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import CaseStudyDetail from "../components/case-studies/CaseStudyDetail.jsx";
import ContentNotFound from "../components/common/ContentNotFound.jsx";
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  toCaseStudyCard,
} from "../admin/services/caseStudiesService.js";

const CaseStudyDetailPage = () => {
  useCmsContent();
  const { slug } = useParams();
  const found = getCaseStudyBySlug(slug);
  const study = found?.status === "published" ? found : null;
  const related = getRelatedCaseStudies(slug, 3).map((item, index) =>
    toCaseStudyCard(item, index)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (study) {
      document.title = `${study.metaTitle || study.title} | SocioHood Case Studies`;
    }
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, [study]);

  if (!study) {
    return (
      <ContentNotFound
        eyebrow="CASE STUDIES"
        title="Case study not found."
        description="This case study is unavailable, unpublished, or the link is incorrect."
        backTo="/case-studies"
        backLabel="Back to case studies"
      />
    );
  }

  return (
    <>
      <Navbar />
      <CaseStudyDetail study={toCaseStudyCard(study)} related={related} />
      <FooterSection />
    </>
  );
};

export default CaseStudyDetailPage;
