/**
 * @deprecated Import from ./caseStudies.js (via services) instead.
 * Kept as a thin re-export so older paths do not break during migration.
 */
import {
  archiveCaseStudy,
  getCaseStudyById,
  publishCaseStudy,
  updateCaseStudy,
} from "./caseStudies.js";

export {
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_STATUSES,
  archiveCaseStudy,
  createCaseStudy,
  deleteCaseStudy,
  emptyCaseStudyForm,
  getCaseStudies,
  getCaseStudyById,
  getCaseStudyBySlug,
  makeSlugFromTitle,
  publishCaseStudy,
  updateCaseStudy,
} from "./caseStudies.js";

/** @deprecated Use publishCaseStudy / archiveCaseStudy / updateCaseStudy. */
export const setCaseStudyStatus = (id, status) => {
  const value = String(status || "").toLowerCase();
  if (value === "published") return publishCaseStudy(id);
  if (value === "archived") return archiveCaseStudy(id);
  const study = getCaseStudyById(id);
  if (!study) return null;
  return updateCaseStudy(id, { ...study, status: "draft" });
};
