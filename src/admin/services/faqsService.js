/**
 * FAQs service — UI should call these methods only.
 *
 * Currently backed by local CMS mock data + localStorage (../data/faqs.js).
 * Do NOT make network requests here.
 *
 * TODO(backend): Replace each method body with real API calls, e.g.
 *   GET    /api/faqs
 *   GET    /api/faqs/:id
 *   POST   /api/faqs
 *   PUT    /api/faqs/:id
 *   DELETE /api/faqs/:id
 *   PATCH  /api/faqs/:id/publish
 *   PATCH  /api/faqs/:id/unpublish
 *   PATCH  /api/faqs/:id/archive
 */

import {
  FAQ_CATEGORIES,
  FAQ_STATUSES,
  archiveFaq as dataArchiveFaq,
  createFaq as dataCreateFaq,
  deleteFaq as dataDeleteFaq,
  emptyFaqForm,
  getFaqById as dataGetFaqById,
  getFaqs as dataGetFaqs,
  nextDisplayOrder,
  publishFaq as dataPublishFaq,
  unpublishFaq as dataUnpublishFaq,
  updateFaq as dataUpdateFaq,
} from "../data/faqs.js";

export {
  FAQ_CATEGORIES,
  FAQ_STATUSES,
  emptyFaqForm,
  nextDisplayOrder,
};

export const getFaqs = () => dataGetFaqs();

export const getFaq = (id) => dataGetFaqById(id);

/** Public site: published FAQs only, sorted by display order. */
export const getPublishedFaqs = () =>
  dataGetFaqs()
    .filter((faq) => faq.status === "published")
    .sort(
      (a, b) =>
        (a.displayOrder || 0) - (b.displayOrder || 0) ||
        String(a.question).localeCompare(String(b.question))
    );

export const createFaq = (data) => dataCreateFaq(data);

export const updateFaq = (id, data) => dataUpdateFaq(id, data);

export const deleteFaq = (id) => dataDeleteFaq(id);

export const publishFaq = (id) => dataPublishFaq(id);

export const unpublishFaq = (id) => dataUnpublishFaq(id);

export const archiveFaq = (id) => dataArchiveFaq(id);
