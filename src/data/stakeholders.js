import { misProductStates, productStates } from "./productStates.js";

export const stakeholders = [
  {
    id: "management",
    label: "Management",
    title: "See what needs your attention.",
    description:
      "Admins have mobile-app access alongside the web console. The web view shown here brings status counts, search, filters and complaint records together.",
    deviceLabel: "WEB CONSOLE · Management",
    image: "/product/admin-complaints.webp",
    alt: "Admin complaint management console",
    orientation: "landscape",
    spotlights: productStates,
  },
  {
    id: "users",
    label: "Users",
    title: "Raise it. Follow it. Confirm it.",
    description:
      "Residents and employees can see their own complaint status, deadlines and details on mobile.",
    deviceLabel: "MOBILE APP · Users",
    image: "/product/user-complaints.webp",
    alt: "User complaint list on mobile",
    orientation: "portrait",
    spotlights: null,
  },
  {
    id: "vendors",
    label: "Vendors",
    title: "Know what is assigned to you.",
    description:
      "Assigned complaints carry category and location details for the team doing the work.",
    deviceLabel: "MOBILE APP · Vendors",
    image: "/product/vendor-complaints.webp",
    alt: "Vendor assigned complaint list on mobile",
    orientation: "portrait",
    spotlights: null,
  },
  {
    id: "mis-analytics",
    label: "MIS analytics",
    title: "Review the pattern, not just the ticket.",
    description:
      "Within and beyond SLA views connect performance to category, sub-category, sector and month.",
    deviceLabel: "WEB CONSOLE · MIS analytics",
    image: "/product/sla-analytics.webp",
    alt: "Complaint and SLA analytics dashboard",
    orientation: "landscape",
    spotlights: misProductStates,
  },
];
