/**
 * Case studies service — UI should call these methods only.
 *
 * Currently backed by local CMS mock data (../data/caseStudies.js).
 * Do NOT make network requests here.
 *
 * TODO(backend): Replace each method body with real API calls, e.g.
 *   GET    /api/case-studies
 *   GET    /api/case-studies/:id
 *   GET    /api/case-studies?slug=
 *   POST   /api/case-studies
 *   PUT    /api/case-studies/:id
 *   DELETE /api/case-studies/:id
 *   PATCH  /api/case-studies/:id/publish
 *   PATCH  /api/case-studies/:id/archive
 */

import {
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_STATUSES,
  archiveCaseStudy as dataArchiveCaseStudy,
  createCaseStudy as dataCreateCaseStudy,
  deleteCaseStudy as dataDeleteCaseStudy,
  emptyCaseStudyForm,
  getCaseStudies as dataGetCaseStudies,
  getCaseStudyById as dataGetCaseStudyById,
  getCaseStudyBySlug as dataGetCaseStudyBySlug,
  makeSlugFromTitle,
  publishCaseStudy as dataPublishCaseStudy,
  updateCaseStudy as dataUpdateCaseStudy,
} from "../data/caseStudies.js";

export {
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_STATUSES,
  emptyCaseStudyForm,
  makeSlugFromTitle,
};

export const LAUNCH_YOUTUBE_ID = "JTWoddFgz5w";

export const getCaseStudies = () => dataGetCaseStudies();

export const getCaseStudy = (id) => dataGetCaseStudyById(id);

export const getCaseStudyBySlug = (slug) => dataGetCaseStudyBySlug(slug);

/** Public site: published case studies only, newest first. */
export const getPublishedCaseStudies = () =>
  dataGetCaseStudies()
    .filter((study) => study.status === "published")
    .sort((a, b) =>
      String(b.publishedAt || b.updatedAt || "").localeCompare(
        String(a.publishedAt || a.updatedAt || "")
      )
    );

/**
 * Homepage featured preview — published + featured, in index order.
 * Falls back to the first N published items if none are marked featured.
 */
export const getFeaturedCaseStudies = (limit = 3) => {
  const published = dataGetCaseStudies().filter(
    (study) => study.status === "published"
  );
  const featured = published
    .filter((study) => study.featured)
    .sort((a, b) => String(a.index || "").localeCompare(String(b.index || "")))
    .slice(0, limit);

  if (featured.length > 0) return featured;
  return published.slice(0, limit);
};

/** Public site: published case study by slug, or null. */
export const getPublishedCaseStudyBySlug = (slug) => {
  const study = dataGetCaseStudyBySlug(slug);
  if (!study || study.status !== "published") return null;
  return study;
};

/** Public site: related published case studies for a detail page. */
export const getRelatedCaseStudies = (slug, limit = 3) => {
  const current = getPublishedCaseStudyBySlug(slug);
  const others = getPublishedCaseStudies().filter(
    (study) => study.slug !== slug
  );

  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter(
    (study) => study.category === current.category
  );
  const rest = others.filter((study) => study.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
};

/** Card presentation helpers for existing SocioHood case study UI. */
export const toCaseStudyCard = (study, index = 0) => {
  const padded = String(index + 1).padStart(2, "0");
  return {
    ...study,
    href: `/case-studies/${study.slug}`,
    index: study.index || padded,
  };
};

export const youtubeIdFromUrl = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "") || null;
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
};

export const createCaseStudy = (data) => dataCreateCaseStudy(data);

export const updateCaseStudy = (id, data) => dataUpdateCaseStudy(id, data);

export const deleteCaseStudy = (id) => dataDeleteCaseStudy(id);

export const publishCaseStudy = (id) => dataPublishCaseStudy(id);

export const archiveCaseStudy = (id) => dataArchiveCaseStudy(id);
