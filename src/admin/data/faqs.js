/**
 * Frontend-only CMS FAQ store.
 * Consumed via ../services/faqsService.js — UI should not import this file directly.
 *
 * No backend exists. Edits persist in this browser only (localStorage) and are
 * not shared across visitors or devices. Seeds load only when nothing is saved.
 *
 * TODO(backend): Replace with GET/POST/PUT/DELETE /faqs API calls.
 */
import {
  bindStorageReload,
  commitCollection,
  readStoredCollection,
} from "./browserContentStore.js";

const STORAGE_KEY = "sociohood_admin_faqs_v1";

const seedFaqs = [
  {
    id: "start-complaint",
    question: "Can we start with complaint management?",
    answer:
      "Yes. Start with complaint management for your plant, township or campus. We agree the roles, routing, deadlines and implementation scope for your organisation.",
    category: "",
    displayOrder: 1,
    status: "published",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "adapt-process",
    question: "Can SocioHood adapt to an existing process?",
    answer:
      "Yes. We discuss your roles, location hierarchy, routing, deadlines and approvals before defining the configuration.",
    category: "",
    displayOrder: 2,
    status: "published",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "custom-software",
    question: "Can we discuss a custom software project?",
    answer:
      "Yes. Our custom software offering covers business applications and operational requirements that need a dedicated solution.",
    category: "",
    displayOrder: 3,
    status: "published",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "book-demo",
    question: "What happens when we book a demo?",
    answer:
      "Request a walkthrough focused on your complaint process. Your preferred time needs confirmation. You can also generate 24-hour credentials for a separate sample workspace.",
    category: "",
    displayOrder: 4,
    status: "published",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "implementation",
    question: "How do we plan implementation?",
    answer:
      "We begin with workflow discovery, agree the scope and configuration, validate real use cases, and plan onboarding and support.",
    category: "",
    displayOrder: 5,
    status: "published",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
];

const nowIso = () => new Date().toISOString();

const normalizeStatus = (status) => {
  const value = String(status || "draft").toLowerCase();
  if (value === "published" || value === "archived") return value;
  return "draft";
};

const normalizeFaq = (faq) => ({
  id: String(faq.id || ""),
  question: String(faq.question || "").trim(),
  answer: String(faq.answer || "").trim(),
  category: String(faq.category || "").trim(),
  displayOrder: Number.isFinite(Number(faq.displayOrder))
    ? Number(faq.displayOrder)
    : 0,
  status: normalizeStatus(faq.status),
  createdAt: faq.createdAt || nowIso(),
  updatedAt: faq.updatedAt || nowIso(),
});

const storedFaqs = readStoredCollection(STORAGE_KEY);

/** @type {ReturnType<typeof normalizeFaq>[]} */
let faqs = (storedFaqs === undefined ? seedFaqs : storedFaqs).map(normalizeFaq);

const commitFaqs = (next) => {
  commitCollection(faqs, next, STORAGE_KEY, (value) => {
    faqs = value;
  });
};

bindStorageReload(STORAGE_KEY, (next) => {
  faqs = next.map(normalizeFaq);
});

export const FAQ_STATUSES = ["published", "draft", "archived"];

export const FAQ_CATEGORIES = [
  "General",
  "Product",
  "Implementation",
  "Demo",
  "Custom Software",
];

export const nextDisplayOrder = () => {
  if (faqs.length === 0) return 1;
  return Math.max(...faqs.map((faq) => Number(faq.displayOrder) || 0)) + 1;
};

export const emptyFaqForm = () => ({
  question: "",
  answer: "",
  category: "",
  displayOrder: nextDisplayOrder(),
  status: "draft",
});

export const getFaqs = () =>
  faqs
    .map((faq) => ({ ...faq }))
    .sort(
      (a, b) =>
        (a.displayOrder || 0) - (b.displayOrder || 0) ||
        String(a.question).localeCompare(String(b.question))
    );

export const getFaqById = (id) => {
  const faq = faqs.find((item) => item.id === id);
  return faq ? { ...faq } : null;
};

export const createFaq = (payload) => {
  const now = nowIso();
  const status = normalizeStatus(payload.status);
  const faq = normalizeFaq({
    id: `faq-${Date.now()}`,
    question: payload.question,
    answer: payload.answer,
    category: payload.category,
    displayOrder:
      payload.displayOrder === "" || payload.displayOrder == null
        ? nextDisplayOrder()
        : payload.displayOrder,
    status,
    createdAt: now,
    updatedAt: now,
  });

  commitFaqs([...faqs, faq]);
  return { ...faq };
};

export const updateFaq = (id, payload) => {
  const index = faqs.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const previous = faqs[index];
  const next = normalizeFaq({
    ...previous,
    question: payload.question ?? previous.question,
    answer: payload.answer ?? previous.answer,
    category: payload.category ?? previous.category,
    displayOrder:
      payload.displayOrder === "" || payload.displayOrder == null
        ? previous.displayOrder
        : payload.displayOrder,
    status: payload.status ?? previous.status,
    createdAt: previous.createdAt,
    updatedAt: nowIso(),
  });

  commitFaqs(faqs.map((item, i) => (i === index ? next : item)));
  return { ...next };
};

export const deleteFaq = (id) => {
  const exists = faqs.some((item) => item.id === id);
  if (!exists) return false;
  commitFaqs(faqs.filter((item) => item.id !== id));
  return true;
};

export const publishFaq = (id) => {
  const faq = getFaqById(id);
  if (!faq) return null;
  return updateFaq(id, { ...faq, status: "published" });
};

export const unpublishFaq = (id) => {
  const faq = getFaqById(id);
  if (!faq) return null;
  return updateFaq(id, { ...faq, status: "draft" });
};

export const archiveFaq = (id) => {
  const faq = getFaqById(id);
  if (!faq) return null;
  return updateFaq(id, { ...faq, status: "archived" });
};
