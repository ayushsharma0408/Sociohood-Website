/**
 * Frontend-only CMS blog store.
 * Consumed via ../services/blogsService.js — UI should not import this file directly.
 *
 * No backend exists. Edits persist in this browser only (localStorage) and are
 * not shared across visitors or devices.
 * TODO(backend): Replace with GET/POST/PUT/DELETE /blogs.
 */
import {
  bindStorageReload,
  commitCollection,
  readStoredCollection,
} from "./browserContentStore.js";

const BLOG_STORAGE_KEY = "sociohood.cms.blogs.v1";

const PLACEHOLDER_IMAGE = "";

const seedBlogs = [
  {
    id: "blog-sla-sla",
    title: "SLA ≠ SLA",
    slug: "sla-sla",
    category: "OPERATIONS",
    readTime: "4 min read",
    author: "SocioHood",
    featured: true,
    featuredOrder: 1,
    eyebrow: "SLA ≠ SLA",
    artSmall: "MONITORED / ACHIEVED",
    artClass: "art-0",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "SLA monitoring is not the same as SLA achievement. Confusing the two makes service reporting less useful—and less honest.",
    description: "SLA monitoring is not the same as SLA achievement.",
    content: `SLA monitoring asks whether deadlines are being tracked. SLA achievement asks whether those deadlines were met.

Those are related questions, but they are not the same. A workspace can monitor every complaint category and still miss deadlines. Reporting that says “100% SLA” without clarifying which meaning is intended creates false confidence.

In complaint operations, category-level configuration, escalation and MIS reporting should make both ideas visible: what is monitored, and what was achieved.

That distinction is operational, not semantic. It changes how administrators review work, how vendors are held accountable, and how management reads service health.`,
    metaTitle: "SLA ≠ SLA | SocioHood Blog",
    metaDescription:
      "Why SLA monitoring coverage is not the same as SLA achievement in complaint operations.",
    status: "published",
    publishedAt: "2026-09-12T10:00:00.000Z",
    createdAt: "2026-09-10T09:00:00.000Z",
    updatedAt: "2026-09-12T10:00:00.000Z",
  },
  {
    id: "blog-time-value",
    title: "TIME / VALUE",
    slug: "time-value",
    category: "BUSINESS VALUE",
    readTime: "5 min read",
    author: "SocioHood",
    featured: true,
    featuredOrder: 2,
    eyebrow: "TIME / VALUE",
    artSmall: "MEASURE WHAT MATTERS",
    artClass: "art-1",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "A practical approach to employee time, reporting effort and avoidable vendor payments—without inventing savings figures.",
    description: "How to measure complaint-management ROI without invented savings.",
    content: `Complaint-management ROI is often discussed in abstract savings. Useful measurement starts elsewhere: time spent chasing ownership, preparing reports, correcting incomplete closures, and repeating vendor conversations.

Those are observable effort costs. They do not require invented productivity percentages.

A practical ROI conversation should ask:
• How long does it take to find who owns an open complaint?
• How much reporting is rebuilt manually each week?
• Where do incomplete closures create rework?

When ownership, deadlines and closure sit in one record, those costs become easier to discuss honestly—without pretending the software guaranteed a fixed rupee return.`,
    metaTitle: "TIME / VALUE | SocioHood Blog",
    metaDescription:
      "How to discuss complaint-management value through operational effort, not invented savings.",
    status: "published",
    publishedAt: "2026-09-08T10:00:00.000Z",
    createdAt: "2026-09-06T09:00:00.000Z",
    updatedAt: "2026-09-08T10:00:00.000Z",
  },
  {
    id: "blog-plant-township",
    title: "PLANT ≠ TOWNSHIP",
    slug: "plant-township",
    category: "PRODUCT DESIGN",
    readTime: "4 min read",
    author: "SocioHood",
    featured: true,
    featuredOrder: 3,
    eyebrow: "PLANT ≠ TOWNSHIP",
    artSmall: "DESIGN FOR THE WORKFLOW",
    artClass: "art-2",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Locations, responsibilities, priority and access change how complaint software should work in a plant versus a township.",
    description: "Why a plant is not a township with a different name.",
    content: `A plant and a township can both raise complaints. That does not mean they share the same operating structure.

Plant environments often emphasise departments, priority handling, shift responsibilities and controlled access. Township environments often emphasise residential locations, amenity categories, vendor mappings and resident communication.

Treating one as a renamed version of the other leads to awkward configuration and unclear ownership. Product design should follow the workflow people already use—not force a single hierarchy onto every site.`,
    metaTitle: "PLANT ≠ TOWNSHIP | SocioHood Blog",
    metaDescription:
      "Why plant and township complaint workflows need different configuration and product design.",
    status: "published",
    publishedAt: "2026-09-02T10:00:00.000Z",
    createdAt: "2026-08-30T09:00:00.000Z",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "blog-complaint-accountability",
    title: "From complaint to accountability",
    slug: "from-complaint-to-accountability",
    category: "OPERATIONS",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "A complaint only becomes useful when ownership, action and closure stay attached to the same record.",
    description: "How a raised issue becomes an accountable operational trail.",
    content: `Raising a complaint is the start of work, not the proof that work happened.

Accountability appears when the same record shows who owns the issue, what action was taken, when deadlines apply, and how closure was confirmed. If those pieces live in chats, spreadsheets and memory, the complaint becomes a ticket without an operational trail.

Connected complaint software does not invent accountability. It makes the existing responsibilities visible enough to review.`,
    metaTitle: "From complaint to accountability | SocioHood Blog",
    metaDescription:
      "Why ownership, action and closure must stay attached to one complaint record.",
    status: "published",
    publishedAt: "2026-08-28T10:00:00.000Z",
    createdAt: "2026-08-26T09:00:00.000Z",
    updatedAt: "2026-08-28T10:00:00.000Z",
  },
  {
    id: "blog-ownership-matters",
    title: "Why ownership matters in operations",
    slug: "why-ownership-matters-in-operations",
    category: "OPERATIONS",
    readTime: "4 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "When several teams can touch a complaint, unclear ownership creates delay before any technical problem is solved.",
    description: "Clear ownership is the first operational control in complaint handling.",
    content: `Many complaint delays are not caused by missing tools. They are caused by missing ownership.

If residents, employees, vendors and administrators cannot see who is responsible next, the issue drifts. Escalation then becomes a substitute for clarity.

Ownership should be explicit at assignment, visible during progress, and still readable after closure. That is how operational teams reduce chasing without adding more status meetings.`,
    metaTitle: "Why ownership matters in operations | SocioHood Blog",
    metaDescription:
      "How explicit complaint ownership reduces delay across residents, employees, vendors and administrators.",
    status: "published",
    publishedAt: "2026-08-22T10:00:00.000Z",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-22T10:00:00.000Z",
  },
  {
    id: "blog-complaint-workflows",
    title: "Designing better complaint workflows",
    slug: "designing-better-complaint-workflows",
    category: "PRODUCT DESIGN",
    readTime: "6 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Good workflow design starts with the next action for each stakeholder, not with a longer form.",
    description: "Practical workflow design for complaint routing, action and closure.",
    content: `A complaint workflow is only as good as the next clear action it presents.

Users need a simple way to raise an issue with the right category and location. Vendors need assignment, attendance and resolution fields that match field work. Administrators need routing, deadlines and oversight without rebuilding reports by hand. Management needs review from the same source record.

Designing around those roles keeps software useful. Designing around generic ticket fields creates screens that look complete and still fail in daily operations.`,
    metaTitle: "Designing better complaint workflows | SocioHood Blog",
    metaDescription:
      "How to design complaint workflows around stakeholder actions instead of generic ticket fields.",
    status: "published",
    publishedAt: "2026-08-16T10:00:00.000Z",
    createdAt: "2026-08-14T09:00:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
  },
  {
    id: "blog-service-deadlines",
    title: "Making service deadlines visible",
    slug: "making-service-deadlines-visible",
    category: "OPERATIONS",
    readTime: "4 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "A deadline only manages work when it is visible to the people doing the work—and to the people reviewing it.",
    description: "Why SLA and service deadlines need to live inside the complaint record.",
    content: `Service deadlines often exist in policy documents long before they exist in daily tools.

When deadlines are hidden from vendors and administrators, escalation becomes reactive. When they are visible on the complaint itself, teams can discuss progress against a shared expectation.

Visibility does not automatically create achievement. It creates the conditions for honest review: which categories are monitored, which deadlines are approaching, and which items already missed the window.`,
    metaTitle: "Making service deadlines visible | SocioHood Blog",
    metaDescription:
      "How visible service deadlines improve complaint review without inventing achievement claims.",
    status: "published",
    publishedAt: "2026-08-10T10:00:00.000Z",
    createdAt: "2026-08-08T09:00:00.000Z",
    updatedAt: "2026-08-10T10:00:00.000Z",
  },
  {
    id: "blog-verified-closure",
    title: "What verified closure really means",
    slug: "what-verified-closure-really-means",
    category: "OPERATIONS",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Closure is not a status change. It is a confirmed end to the operational trail.",
    description: "Verified closure connects completion, confirmation and service feedback.",
    content: `Marking a complaint closed is easy. Verifying closure is harder—and more useful.

Verified closure usually needs a confirmation step that belongs to the complaint, not a side channel. In many SocioHood-style workflows, that includes a complaint-specific check and compulsory feedback after closure.

The point is not ceremony. The point is that “done” remains reviewable: who closed it, how confirmation happened, and what the user said about the service experience.`,
    metaTitle: "What verified closure really means | SocioHood Blog",
    metaDescription:
      "Why verified complaint closure needs confirmation and feedback attached to the same record.",
    status: "published",
    publishedAt: "2026-08-04T10:00:00.000Z",
    createdAt: "2026-08-02T09:00:00.000Z",
    updatedAt: "2026-08-04T10:00:00.000Z",
  },
  {
    id: "blog-complaint-data-decisions",
    title: "Turning complaint data into decisions",
    slug: "turning-complaint-data-into-decisions",
    category: "ANALYTICS",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "MIS is useful when it summarises the same complaint record teams already work in—not a parallel spreadsheet.",
    description: "How complaint analytics support operational decisions without parallel reporting.",
    content: `Complaint data becomes decision-ready when filters, counts and exports read from the live operational record.

If administrators work in one tool and management reviews another reconstruction, debates shift from service issues to data reconciliation. Connected MIS reporting reduces that gap.

Useful decision views include open ownership, deadline risk, category volume, vendor response patterns and closure quality. Those views should stay honest about what the system can know—and what still requires operational judgement.`,
    metaTitle: "Turning complaint data into decisions | SocioHood Blog",
    metaDescription:
      "How complaint MIS supports decisions when it reads from the same operational record.",
    status: "published",
    publishedAt: "2026-07-28T10:00:00.000Z",
    createdAt: "2026-07-26T09:00:00.000Z",
    updatedAt: "2026-07-28T10:00:00.000Z",
  },
  {
    id: "blog-vendor-accountability",
    title: "Vendor accountability without extra chasing",
    slug: "vendor-accountability-without-extra-chasing",
    category: "VENDOR MANAGEMENT",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Vendors perform better when assignment, attendance and resolution sit in the same place as the complaint.",
    description: "Reducing chase work by making vendor responsibilities visible on the complaint.",
    content: `Vendor chasing often starts when assignment details live outside the complaint.

Phone calls and chat messages may move work forward, but they leave a weak trail for review. When vendors see assigned complaints, update attendance and record resolution in one workflow, accountability becomes part of normal work.

That does not remove the need for relationships or escalation. It reduces avoidable follow-ups caused by missing context.`,
    metaTitle: "Vendor accountability without extra chasing | SocioHood Blog",
    metaDescription:
      "How shared complaint assignment and resolution reduce vendor chase work.",
    status: "published",
    publishedAt: "2026-07-20T10:00:00.000Z",
    createdAt: "2026-07-18T09:00:00.000Z",
    updatedAt: "2026-07-20T10:00:00.000Z",
  },
  {
    id: "blog-operational-dashboards",
    title: "Building better operational dashboards",
    slug: "building-better-operational-dashboards",
    category: "ANALYTICS",
    readTime: "4 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Dashboards should answer operational questions first: what is open, what is late, and what was closed properly.",
    description: "Dashboard design for complaint operations, not vanity metrics.",
    content: `Operational dashboards fail when they optimise for visual density instead of review questions.

Administrators usually need open workload, deadline risk and category pressure. Management usually needs trends that still link back to individual complaints. Vendors need their assigned queue, not a campus-wide collage of charts.

Build dashboards from the complaint lifecycle. If a metric cannot be traced to ownership, deadline or closure, question whether it belongs on the first screen.`,
    metaTitle: "Building better operational dashboards | SocioHood Blog",
    metaDescription:
      "How to design complaint dashboards around open work, deadlines and closure quality.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-07-12T09:00:00.000Z",
    updatedAt: "2026-07-14T11:00:00.000Z",
  },
  {
    id: "blog-feedback-workflow",
    title: "Why feedback belongs in the workflow",
    slug: "why-feedback-belongs-in-the-workflow",
    category: "FEEDBACK",
    readTime: "4 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Post-closure feedback is more useful when it stays attached to the complaint that was just completed.",
    description: "Feedback should close the loop on the same operational record.",
    content: `Feedback collected in a separate channel often loses the context that makes it actionable.

When compulsory post-closure feedback is part of the complaint workflow, service experience stays connected to category, vendor, location and timeline. Teams can review patterns without reconstructing which ticket the comment referred to.

Feedback is not a marketing afterthought in operations. It is evidence of how the service felt at the moment of completion.`,
    metaTitle: "Why feedback belongs in the workflow | SocioHood Blog",
    metaDescription:
      "Why post-closure complaint feedback should remain attached to the completed record.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-07-08T09:00:00.000Z",
    updatedAt: "2026-07-10T11:00:00.000Z",
  },
  {
    id: "blog-reporting-to-resolution",
    title: "From reporting to resolution",
    slug: "from-reporting-to-resolution",
    category: "OPERATIONS",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Reporting explains the backlog. Resolution changes it. Connected systems keep both honest.",
    description: "How complaint reporting should stay linked to actual resolution work.",
    content: `Teams sometimes invest heavily in reporting while resolution remains informal.

That split creates polished slides about an operation that still depends on memory. Better practice is simpler: report from the same record used to assign, escalate and close.

When MIS, vendor updates and closure confirmation share one object, reporting stops being a separate craft and becomes a view of resolution work.`,
    metaTitle: "From reporting to resolution | SocioHood Blog",
    metaDescription:
      "Why complaint reporting should read from the same record used for resolution.",
    status: "draft",
    publishedAt: null,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-07-05T11:00:00.000Z",
  },
  {
    id: "blog-operational-performance",
    title: "Measuring operational performance honestly",
    slug: "measuring-operational-performance-honestly",
    category: "BUSINESS VALUE",
    readTime: "5 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Honest performance measures separate monitoring coverage, achievement, closure quality and backlog risk.",
    description: "A clearer vocabulary for operational performance in complaint management.",
    content: `Operational performance is often flattened into a single percentage.

That habit hides important differences. Monitoring coverage is not achievement. Closure volume is not closure quality. Fast first response is not verified completion.

An honest review set keeps those measures separate, ties them to categories and owners, and resists invented savings language. Demo and sample reporting should be labelled as such until real deployment data is available.`,
    metaTitle: "Measuring operational performance honestly | SocioHood Blog",
    metaDescription:
      "How to separate monitoring, achievement, closure quality and backlog risk in complaint operations.",
    status: "archived",
    publishedAt: "2026-06-18T10:00:00.000Z",
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-06-25T11:00:00.000Z",
  },
  {
    id: "blog-software-real-work",
    title: "Designing software around real operational work",
    slug: "designing-software-around-real-operational-work",
    category: "PRODUCT DESIGN",
    readTime: "6 min read",
    author: "SocioHood",
    featuredImage: PLACEHOLDER_IMAGE,
    excerpt:
      "Digital transformation in plants and townships works better when software mirrors the people already doing the work.",
    description: "Operational software should follow real roles, not generic transformation slogans.",
    content: `Digital transformation fails quietly when software asks people to invent a new process before they can finish the current one.

In industrial plants and townships, complaint work already has roles: raisers, administrators, vendors, and reviewers. Software should make those roles clearer—routing, deadlines, attendance, closure and feedback—without inventing unsupported outcome claims.

Start with the complaint lifecycle. Extend later with adjacent modules. That order keeps digital change grounded in operational reality.`,
    metaTitle: "Designing software around real operational work | SocioHood Blog",
    metaDescription:
      "How operational software for plants and townships should follow real complaint roles and workflows.",
    status: "archived",
    publishedAt: "2026-06-10T10:00:00.000Z",
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-22T11:00:00.000Z",
  },
];

/** @type {typeof seedBlogs} */
let blogs = (
  readStoredCollection(BLOG_STORAGE_KEY) ?? seedBlogs.map((blog) => ({ ...blog }))
).map((blog) => ({ ...blog }));

const commitBlogs = (next) => {
  commitCollection(blogs, next, BLOG_STORAGE_KEY, (value) => {
    blogs = value;
  });
};

bindStorageReload(BLOG_STORAGE_KEY, (next) => {
  blogs = next.map((blog) => ({ ...blog }));
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

export const BLOG_STATUSES = ["published", "draft", "archived"];

export const BLOG_CATEGORIES = [
  "OPERATIONS",
  "BUSINESS VALUE",
  "PRODUCT DESIGN",
  "ANALYTICS",
  "VENDOR MANAGEMENT",
  "FEEDBACK",
];

export const emptyBlogForm = () => ({
  title: "",
  slug: "",
  category: BLOG_CATEGORIES[0],
  readTime: "",
  author: "SocioHood",
  featuredImage: "",
  excerpt: "",
  description: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft",
});

export const getBlogs = () => blogs.map((blog) => ({ ...blog }));

export const getBlogById = (id) => {
  const blog = blogs.find((item) => item.id === id);
  return blog ? { ...blog } : null;
};

export const getBlogBySlug = (slug) => {
  const blog = blogs.find((item) => item.slug === slug);
  return blog ? { ...blog } : null;
};

export const createBlog = (payload) => {
  const now = nowIso();
  const status = normalizeStatus(payload.status);
  const blog = {
    id: `blog-${Date.now()}`,
    title: String(payload.title || "").trim(),
    slug: (payload.slug || slugify(payload.title)).trim(),
    category: String(payload.category || "").trim(),
    readTime: String(payload.readTime || "").trim(),
    author: String(payload.author || "").trim(),
    featuredImage: String(payload.featuredImage || "").trim(),
    excerpt: String(payload.excerpt || "").trim(),
    description: String(payload.description || payload.excerpt || "").trim(),
    content: String(payload.content || "").trim(),
    metaTitle: String(payload.metaTitle || "").trim(),
    metaDescription: String(payload.metaDescription || "").trim(),
    status,
    publishedAt: status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
  };

  commitBlogs([blog, ...blogs]);
  return { ...blog };
};

export const updateBlog = (id, payload) => {
  const index = blogs.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const previous = blogs[index];
  const status = normalizeStatus(payload.status ?? previous.status);
  const now = nowIso();
  const next = {
    ...previous,
    title: String(payload.title ?? previous.title).trim(),
    slug: String(payload.slug || slugify(payload.title || previous.title)).trim(),
    category: String(payload.category ?? previous.category).trim(),
    readTime: String(payload.readTime ?? previous.readTime).trim(),
    author: String(payload.author ?? previous.author).trim(),
    featuredImage: String(payload.featuredImage ?? previous.featuredImage).trim(),
    excerpt: String(payload.excerpt ?? previous.excerpt).trim(),
    description: String(
      payload.description ?? previous.description ?? payload.excerpt ?? ""
    ).trim(),
    content: String(payload.content ?? previous.content).trim(),
    metaTitle: String(payload.metaTitle ?? previous.metaTitle).trim(),
    metaDescription: String(
      payload.metaDescription ?? previous.metaDescription
    ).trim(),
    status,
    publishedAt:
      status === "published"
        ? previous.publishedAt || now
        : status === "draft"
          ? previous.publishedAt
          : previous.publishedAt,
    updatedAt: now,
  };

  commitBlogs(blogs.map((item, i) => (i === index ? next : item)));
  return { ...next };
};

export const deleteBlog = (id) => {
  const exists = blogs.some((item) => item.id === id);
  if (!exists) return false;
  commitBlogs(blogs.filter((item) => item.id !== id));
  return true;
};

export const publishBlog = (id) => {
  const blog = getBlogById(id);
  if (!blog) return null;
  return updateBlog(id, { ...blog, status: "published" });
};

export const archiveBlog = (id) => {
  const blog = getBlogById(id);
  if (!blog) return null;
  return updateBlog(id, { ...blog, status: "archived" });
};

export const makeSlugFromTitle = slugify;
