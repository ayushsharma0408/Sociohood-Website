/**
 * Frontend-only CMS case study store.
 * Consumed via ../services/caseStudiesService.js — UI should not import this file directly.
 *
 * Entries are DEMO / SAMPLE content for frontend CMS testing.
 * They are not claims about specific live customer results.
 *
 * No backend exists. Edits persist in this browser only (localStorage) and are
 * not shared across visitors or devices.
 * TODO(backend): Replace with GET/POST/PUT/DELETE /case-studies.
 */
import {
  bindStorageReload,
  commitCollection,
  readStoredCollection,
} from "./browserContentStore.js";

const CASE_STUDY_STORAGE_KEY = "sociohood.cms.caseStudies.v1";

const PLACEHOLDER_IMAGE = "";
const DEMO_VIDEO = "https://www.youtube.com/watch?v=JTWoddFgz5w";

const seedCaseStudies = [
  {
    id: "cs-sla-transparency",
    title: "From a deadline rule to a visible SLA record.",
    slug: "sla-transparency",
    index: "01",
    featured: true,
    client: "Tata Motors",
    category: "SLA TRANSPARENCY",
    metric: "100%",
    metricLabel: "SLA monitored",
    description:
      "How category-level configuration, escalation and MIS reporting connect in the Tata Motors complaint workflow.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Deadline rules existed in configuration, but teams needed a clearer operational view of what was being monitored across categories.",
    solution:
      "Category-level SLA setup, escalation visibility and MIS reporting were connected into one complaint workflow so monitoring coverage stayed visible in the record.",
    results:
      "SLA monitoring became reviewable as part of the complaint lifecycle rather than a separate reporting exercise.",
    videoUrl: DEMO_VIDEO,
    metaTitle: "SLA Transparency | SocioHood Case Study",
    metaDescription:
      "How category-level SLA configuration, escalation and MIS reporting connect in the complaint workflow.",
    status: "published",
    publishedAt: "2026-09-28T10:00:00.000Z",
    createdAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-28T10:00:00.000Z",
  },
  {
    id: "cs-closure-feedback",
    title: "Close the complaint. Keep the service feedback.",
    slug: "closure-feedback",
    index: "02",
    featured: true,
    client: "Tata Motors",
    category: "CLOSURE & FEEDBACK",
    metric: "97%",
    metricLabel: "Complaint closure rate",
    description:
      "How complaint-specific OTP and compulsory post-closure feedback connect completion with a record of the user’s experience.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Closure needed confirmation, and feedback had to remain attached to the completed complaint rather than living in a separate channel.",
    solution:
      "Verified closure and compulsory post-closure feedback were linked to the shared complaint record.",
    results:
      "Completion and service experience stayed connected in one operational trail.",
    videoUrl: "",
    metaTitle: "Closure & Feedback | SocioHood Case Study",
    metaDescription:
      "How verified closure and post-closure feedback connect to the complaint record.",
    status: "published",
    publishedAt: "2026-09-22T10:00:00.000Z",
    createdAt: "2026-09-15T09:00:00.000Z",
    updatedAt: "2026-09-22T10:00:00.000Z",
  },
  {
    id: "cs-ownership-scale",
    title: "One complaint record, across the people doing the work.",
    slug: "ownership-at-scale",
    index: "03",
    featured: true,
    client: "Tata Motors",
    category: "OWNERSHIP AT SCALE",
    metric: "1 lakh+",
    metricLabel: "Complaints raised",
    description:
      "Connecting users, administrators, vendors and management reporting across web and mobile in the Tata Motors ecosystem.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Multiple stakeholders needed ownership of the same complaint without fragmenting the record across tools.",
    solution:
      "Users, admins, vendors and management reporting were connected around one complaint workflow.",
    results:
      "Accountability stayed attached to a shared complaint record at scale.",
    videoUrl: "",
    metaTitle: "Ownership at Scale | SocioHood Case Study",
    metaDescription:
      "How one complaint record stays shared across users, admins, vendors and management.",
    status: "published",
    publishedAt: "2026-09-18T10:00:00.000Z",
    createdAt: "2026-09-10T09:00:00.000Z",
    updatedAt: "2026-09-18T10:00:00.000Z",
  },
  {
    id: "cs-township-operations",
    title: "Township complaint operations need location-aware routing.",
    slug: "township-complaint-operations",
    client: "Sample Township Deployment",
    category: "TOWNSHIP OPERATIONS",
    metric: "Mapped",
    metricLabel: "Locations & vendors",
    description:
      "Demo scenario: residential locations, amenity categories and vendor mappings guide township complaint routing.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Township complaints spanned housing blocks and amenities, but ownership was unclear once the issue left the first inbox.",
    solution:
      "Location and category configuration connected raisers to the right administrative and vendor paths.",
    results:
      "Demo outcome: township teams could review routing from the complaint itself instead of reconstructing it in chat.",
    videoUrl: "",
    metaTitle: "Township Complaint Operations | SocioHood (Demo)",
    metaDescription:
      "Demo case study: location-aware complaint routing for township operations.",
    status: "published",
    publishedAt: "2026-09-12T10:00:00.000Z",
    createdAt: "2026-09-05T09:00:00.000Z",
    updatedAt: "2026-09-12T10:00:00.000Z",
  },
  {
    id: "cs-vendor-response",
    title: "Vendor response becomes reviewable when assignment is shared.",
    slug: "vendor-response-management",
    client: "Sample Operations Site",
    category: "VENDOR MANAGEMENT",
    metric: "Shared",
    metricLabel: "Assignment trail",
    description:
      "Demo scenario: vendor assignment, attendance and resolution updates stay on the complaint record.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Vendor progress lived in calls and messages, leaving weak evidence for administrators and management.",
    solution:
      "Assigned vendors updated attendance and resolution inside the same complaint workflow.",
    results:
      "Demo outcome: response management became reviewable without rebuilding the trail manually.",
    videoUrl: "",
    metaTitle: "Vendor Response Management | SocioHood (Demo)",
    metaDescription:
      "Demo case study: shared vendor assignment and resolution on the complaint record.",
    status: "published",
    publishedAt: "2026-09-08T10:00:00.000Z",
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-08T10:00:00.000Z",
  },
  {
    id: "cs-preventive-maintenance",
    title: "Maintenance complaints still need accountable closure.",
    slug: "preventive-maintenance-workflow",
    client: "Demo Industrial Campus",
    category: "MAINTENANCE WORKFLOWS",
    metric: "Tracked",
    metricLabel: "Work to closure",
    description:
      "Demo scenario: maintenance-related complaints keep assignment, attendance and closure in one trail.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Maintenance work was discussed operationally, but complaint records did not always capture the full path to completion.",
    solution:
      "Assignment, resolution and verified closure remained connected so maintenance complaints could be reviewed as finished work.",
    results:
      "Demo outcome: teams could distinguish attended work from closed complaints without informal updates.",
    videoUrl: "",
    metaTitle: "Preventive Maintenance Workflow | SocioHood (Demo)",
    metaDescription:
      "Demo case study: accountable closure for maintenance-related complaints.",
    status: "published",
    publishedAt: "2026-09-02T10:00:00.000Z",
    createdAt: "2026-08-26T09:00:00.000Z",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "cs-employee-complaints",
    title: "Employee complaints need the same operational discipline.",
    slug: "employee-complaint-tracking",
    client: "Demo Institutional Campus",
    category: "EMPLOYEE OPERATIONS",
    metric: "One",
    metricLabel: "Shared record",
    description:
      "Demo scenario: employee-raised complaints follow ownership, deadlines and closure like any other service issue.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Employee issues were often tracked separately from the operational complaint process used elsewhere on site.",
    solution:
      "Employee complaints used the same ownership, deadline and closure controls with role-appropriate access.",
    results:
      "Demo outcome: employee service issues became reviewable beside other operational complaints.",
    videoUrl: "",
    metaTitle: "Employee Complaint Tracking | SocioHood (Demo)",
    metaDescription:
      "Demo case study: applying shared ownership and closure to employee complaints.",
    status: "published",
    publishedAt: "2026-08-28T10:00:00.000Z",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-28T10:00:00.000Z",
  },
  {
    id: "cs-deadline-visibility",
    title: "Service deadlines only manage work when people can see them.",
    slug: "service-deadline-visibility",
    client: "Sample Operations Site",
    category: "SLA TRANSPARENCY",
    metric: "Visible",
    metricLabel: "Deadline on record",
    description:
      "Demo scenario: service deadlines appear on the complaint for vendors, administrators and reviewers.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Policy deadlines existed, but day-to-day tools did not make approaching or missed windows obvious.",
    solution:
      "Category-level deadlines were surfaced on the complaint and in operational review views.",
    results:
      "Demo outcome: teams discussed progress against a shared deadline instead of reconstructing it later.",
    videoUrl: "",
    metaTitle: "Service Deadline Visibility | SocioHood (Demo)",
    metaDescription:
      "Demo case study: making service deadlines visible inside the complaint workflow.",
    status: "published",
    publishedAt: "2026-08-22T10:00:00.000Z",
    createdAt: "2026-08-15T09:00:00.000Z",
    updatedAt: "2026-08-22T10:00:00.000Z",
  },
  {
    id: "cs-management-mis",
    title: "Reporting is stronger when it reads from the complaint itself.",
    slug: "management-mis",
    client: "Sample demonstration",
    category: "MIS REPORTING",
    metric: "Shared",
    metricLabel: "Source record",
    description:
      "Demo scenario: MIS views summarise ownership, deadlines and closure from the same operational record.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Management reporting was assembled separately from day-to-day complaint handling, creating gaps between work and review.",
    solution:
      "Status counts, filters and exportable records were drawn from the connected complaint console.",
    results:
      "Demo outcome: review conversations started from the same source used by administrators and vendors.",
    videoUrl: "",
    metaTitle: "Management MIS | SocioHood (Demo)",
    metaDescription:
      "Demo case study: MIS reporting that reads from the live complaint record.",
    status: "published",
    publishedAt: "2026-08-16T10:00:00.000Z",
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
  },
  {
    id: "cs-escalation-management",
    title: "Escalation works better as a visible next step, not a surprise.",
    slug: "escalation-management",
    client: "Demo Industrial Campus",
    category: "ESCALATION",
    metric: "Timed",
    metricLabel: "Escalation path",
    description:
      "Demo scenario: escalation rules connect overdue work to the next accountable role without losing history.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Escalations happened through informal reminders, so ownership history was hard to reconstruct.",
    solution:
      "Configured escalation paths moved overdue complaints while preserving the prior assignment trail.",
    results:
      "Demo outcome: escalation became a reviewable step in the lifecycle instead of an undocumented chase.",
    videoUrl: "",
    metaTitle: "Escalation Management | SocioHood (Demo)",
    metaDescription:
      "Demo case study: visible escalation paths for overdue complaint work.",
    status: "published",
    publishedAt: "2026-08-10T10:00:00.000Z",
    createdAt: "2026-08-04T09:00:00.000Z",
    updatedAt: "2026-08-10T10:00:00.000Z",
  },
  {
    id: "cs-verified-closure",
    title: "Verified closure turns “done” into an auditable event.",
    slug: "verified-complaint-closure",
    client: "Sample Township Deployment",
    category: "CLOSURE & FEEDBACK",
    metric: "Confirmed",
    metricLabel: "Closure step",
    description:
      "Demo scenario: closure confirmation stays complaint-specific and reviewable after completion.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Status could be marked closed without a confirmation step tied to that complaint.",
    solution:
      "A verified closure step required confirmation before the complaint left the active queue.",
    results:
      "Demo outcome: closed items carried a clearer completion trail for later review.",
    videoUrl: "",
    metaTitle: "Verified Complaint Closure | SocioHood (Demo)",
    metaDescription:
      "Demo case study: complaint-specific verified closure for operational review.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-06T11:00:00.000Z",
  },
  {
    id: "cs-multi-team-routing",
    title: "Multi-team routing needs category and role clarity.",
    slug: "multi-team-complaint-routing",
    client: "Demo Industrial Campus",
    category: "WORKFLOW DESIGN",
    metric: "Routed",
    metricLabel: "By category & role",
    description:
      "Demo scenario: complaints move across teams using category rules without losing the original record.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Cross-team handoffs created duplicate tickets and unclear ownership between departments.",
    solution:
      "Routing rules kept one complaint object while changing the accountable team based on category and role.",
    results:
      "Demo outcome: handoffs remained visible on a single operational trail.",
    videoUrl: "",
    metaTitle: "Multi-Team Complaint Routing | SocioHood (Demo)",
    metaDescription:
      "Demo case study: category-based multi-team routing on one complaint record.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-07-28T09:00:00.000Z",
    updatedAt: "2026-08-02T11:00:00.000Z",
  },
  {
    id: "cs-operational-reporting",
    title: "Operational reporting should survive a drill-down.",
    slug: "operational-reporting",
    client: "Sample demonstration",
    category: "MIS REPORTING",
    metric: "Linked",
    metricLabel: "Summary ↔ record",
    description:
      "Demo scenario: summary counts remain useful because each figure can open the underlying complaints.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Summary reports could not be traced back to the complaints that produced the numbers.",
    solution:
      "Operational reporting views stayed linked to filtered complaint lists from the same store.",
    results:
      "Demo outcome: reviewers could move from a count to the actual records without a parallel export.",
    videoUrl: "",
    metaTitle: "Operational Reporting | SocioHood (Demo)",
    metaDescription:
      "Demo case study: complaint reporting that drills down to source records.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-07-22T09:00:00.000Z",
    updatedAt: "2026-07-28T11:00:00.000Z",
  },
  {
    id: "cs-feedback-improvement",
    title: "Feedback-driven improvement starts with attached comments.",
    slug: "feedback-driven-improvement",
    client: "Sample Township Deployment",
    category: "FEEDBACK",
    metric: "Attached",
    metricLabel: "Post-closure feedback",
    description:
      "Demo scenario: compulsory feedback after closure supports category and vendor review over time.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Service comments arrived through channels that were hard to connect to categories, vendors or timelines.",
    solution:
      "Post-closure feedback remained on the complaint and could be reviewed beside operational fields.",
    results:
      "Demo outcome: improvement discussions could reference feedback with full complaint context.",
    videoUrl: "",
    metaTitle: "Feedback-Driven Improvement | SocioHood (Demo)",
    metaDescription:
      "Demo case study: using attached post-closure feedback for operational improvement.",
    status: "archived",
    publishedAt: "2026-07-10T10:00:00.000Z",
    createdAt: "2026-07-05T09:00:00.000Z",
    updatedAt: "2026-07-20T11:00:00.000Z",
  },
  {
    id: "cs-connected-service",
    title: "Connected service operations keep roles aligned to one object.",
    slug: "connected-service-operations",
    client: "Sample demonstration",
    category: "CONNECTED OPERATIONS",
    metric: "Connected",
    metricLabel: "Roles on one record",
    description:
      "Demo scenario: raisers, admins, vendors and reviewers work from connected views of the same complaint.",
    heroImage: PLACEHOLDER_IMAGE,
    challenge:
      "Each stakeholder used a different fragment of the process, so the service story never stayed whole.",
    solution:
      "Connected views kept role-specific actions while referencing one complaint object end to end.",
    results:
      "Demo outcome: service operations became easier to explain because the trail no longer fragmented by role.",
    videoUrl: DEMO_VIDEO,
    metaTitle: "Connected Service Operations | SocioHood (Demo)",
    metaDescription:
      "Demo case study: aligning stakeholder roles around one connected complaint record.",
    status: "archived",
    publishedAt: "2026-07-01T10:00:00.000Z",
    createdAt: "2026-06-25T09:00:00.000Z",
    updatedAt: "2026-07-15T11:00:00.000Z",
  },
];

/** @type {typeof seedCaseStudies} */
let caseStudies = (
  readStoredCollection(CASE_STUDY_STORAGE_KEY) ??
  seedCaseStudies.map((item) => ({ ...item }))
).map((item) => ({ ...item }));

const commitCaseStudies = (next) => {
  commitCollection(caseStudies, next, CASE_STUDY_STORAGE_KEY, (value) => {
    caseStudies = value;
  });
};

bindStorageReload(CASE_STUDY_STORAGE_KEY, (next) => {
  caseStudies = next.map((item) => ({ ...item }));
});

const nowIso = () => new Date().toISOString();

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeStatus = (status) => {
  const value = String(status || "draft").toLowerCase();
  if (value === "published" || value === "archived") return value;
  return "draft";
};

export const CASE_STUDY_STATUSES = ["published", "draft", "archived"];

export const CASE_STUDY_CATEGORIES = [
  "SLA TRANSPARENCY",
  "CLOSURE & FEEDBACK",
  "OWNERSHIP AT SCALE",
  "TOWNSHIP OPERATIONS",
  "VENDOR MANAGEMENT",
  "MAINTENANCE WORKFLOWS",
  "EMPLOYEE OPERATIONS",
  "MIS REPORTING",
  "ESCALATION",
  "WORKFLOW DESIGN",
  "FEEDBACK",
  "CONNECTED OPERATIONS",
];

export const emptyCaseStudyForm = () => ({
  title: "",
  slug: "",
  client: "",
  category: CASE_STUDY_CATEGORIES[0],
  metric: "",
  metricLabel: "",
  description: "",
  heroImage: "",
  challenge: "",
  solution: "",
  results: "",
  videoUrl: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft",
});

export const getCaseStudies = () => caseStudies.map((item) => ({ ...item }));

export const getCaseStudyById = (id) => {
  const item = caseStudies.find((study) => study.id === id);
  return item ? { ...item } : null;
};

export const getCaseStudyBySlug = (slug) => {
  const item = caseStudies.find((study) => study.slug === slug);
  return item ? { ...item } : null;
};

const normalizePayload = (payload, previous = null) => {
  const status = normalizeStatus(payload.status ?? previous?.status);
  const now = nowIso();
  return {
    title: String(payload.title ?? previous?.title ?? "").trim(),
    slug: String(
      payload.slug || slugify(payload.title || previous?.title || "")
    ).trim(),
    client: String(payload.client ?? previous?.client ?? "").trim(),
    category: String(payload.category ?? previous?.category ?? "").trim(),
    metric: String(payload.metric ?? previous?.metric ?? "").trim(),
    metricLabel: String(payload.metricLabel ?? previous?.metricLabel ?? "").trim(),
    description: String(payload.description ?? previous?.description ?? "").trim(),
    heroImage: String(payload.heroImage ?? previous?.heroImage ?? "").trim(),
    challenge: String(payload.challenge ?? previous?.challenge ?? "").trim(),
    solution: String(payload.solution ?? previous?.solution ?? "").trim(),
    results: String(payload.results ?? previous?.results ?? "").trim(),
    videoUrl: String(payload.videoUrl ?? previous?.videoUrl ?? "").trim(),
    metaTitle: String(payload.metaTitle ?? previous?.metaTitle ?? "").trim(),
    metaDescription: String(
      payload.metaDescription ?? previous?.metaDescription ?? ""
    ).trim(),
    status,
    publishedAt:
      status === "published"
        ? previous?.publishedAt || now
        : previous?.publishedAt ?? null,
    updatedAt: now,
  };
};

export const createCaseStudy = (payload) => {
  const now = nowIso();
  const study = {
    id: `cs-${Date.now()}`,
    ...normalizePayload(payload),
    createdAt: now,
  };
  commitCaseStudies([study, ...caseStudies]);
  return { ...study };
};

export const updateCaseStudy = (id, payload) => {
  const index = caseStudies.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const previous = caseStudies[index];
  const next = {
    ...previous,
    ...normalizePayload(payload, previous),
  };

  commitCaseStudies(caseStudies.map((item, i) => (i === index ? next : item)));
  return { ...next };
};

export const deleteCaseStudy = (id) => {
  const exists = caseStudies.some((item) => item.id === id);
  if (!exists) return false;
  commitCaseStudies(caseStudies.filter((item) => item.id !== id));
  return true;
};

export const publishCaseStudy = (id) => {
  const study = getCaseStudyById(id);
  if (!study) return null;
  return updateCaseStudy(id, { ...study, status: "published" });
};

export const archiveCaseStudy = (id) => {
  const study = getCaseStudyById(id);
  if (!study) return null;
  return updateCaseStudy(id, { ...study, status: "archived" });
};

export const makeSlugFromTitle = slugify;
