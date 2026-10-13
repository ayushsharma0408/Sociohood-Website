/**
 * @deprecated Public case study content now comes from the shared CMS service.
 * Prefer importing from ../admin/services/caseStudiesService.js
 */
export {
  LAUNCH_YOUTUBE_ID,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug as getCaseStudyBySlug,
  getFeaturedCaseStudies,
  getRelatedCaseStudies,
  toCaseStudyCard,
} from "../admin/services/caseStudiesService.js";
