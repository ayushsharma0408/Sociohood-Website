const adminConsoleImage = "/product/admin-complaints.webp";
const adminConsoleAlt =
  "Admin complaint console with status counts, filters and complaint records";

export const productStates = [
  {
    id: "status-overview",
    label: "Status overview",
    index: "01",
    title: "What is still open?",
    description: "Review all, unassigned, assigned, closed, cancelled and reopened complaints.",
    image: adminConsoleImage,
    alt: adminConsoleAlt,
    rect: {
      left: "5.54545%",
      top: "22.5256%",
      width: "75.1364%",
      height: "7.08191%",
    },
  },
  {
    id: "assigned-work",
    label: "Assigned work",
    index: "02",
    title: "Which complaints have been assigned?",
    description: "The assigned card shows the routed work in this workspace.",
    image: adminConsoleImage,
    alt: adminConsoleAlt,
    rect: {
      left: "30.6818%",
      top: "22.5256%",
      width: "12.0909%",
      height: "7.08191%",
    },
  },
  {
    id: "escalation",
    label: "Escalation",
    index: "03",
    title: "Which complaints need attention?",
    description: "Focus the review with the complete escalated-complaints control.",
    image: adminConsoleImage,
    alt: adminConsoleAlt,
    rect: {
      left: "18.2727%",
      top: "37.5427%",
      width: "15.8182%",
      height: "3.58362%",
    },
  },
  {
    id: "export",
    label: "Export",
    index: "04",
    title: "Take the complaint records into review.",
    description: "Download CSV records from the complaint console.",
    image: adminConsoleImage,
    alt: adminConsoleAlt,
    rect: {
      left: "37.2273%",
      top: "30.6314%",
      width: "11.5%",
      height: "5.6314%",
    },
  },
];

export const misProductStates = [
  {
    id: "filters",
    label: "Filters",
    index: "01",
    title: "Focus the performance review.",
    description: "Review by category, subcategory, sector, status, vendor and date range.",
    image: "/product/sla-analytics.webp",
    alt: "SLA performance dashboard",
    rect: {
      left: "5.59091%",
      top: "11.6992%",
      width: "54.6364%",
      height: "7.66017%",
    },
  },
  {
    id: "sla-performance",
    label: "SLA performance",
    index: "02",
    title: "Separate within-SLA and beyond-SLA work.",
    description: "These workspace KPIs distinguish monitoring from on-time completion.",
    image: "/product/sla-analytics.webp",
    alt: "SLA performance dashboard",
    rect: {
      left: "28.5455%",
      top: "20.4735%",
      width: "44.6364%",
      height: "4.52646%",
    },
  },
  {
    id: "category-analysis",
    label: "Category analysis",
    index: "03",
    title: "Find the pattern behind the number.",
    description: "Category, subcategory and sector tables connect the report to operations.",
    image: "/product/sla-analytics.webp",
    alt: "SLA performance dashboard",
    rect: {
      left: "5.59091%",
      top: "26.1838%",
      width: "93.5%",
      height: "24.0947%",
    },
  },
  {
    id: "monthly-trends",
    label: "Monthly trends",
    index: "04",
    title: "See complaint volume over time.",
    description: "Monthly reporting complements the complaint-detail records.",
    image: "/product/sla-analytics.webp",
    alt: "SLA performance dashboard",
    rect: {
      left: "5.54545%",
      top: "51.3928%",
      width: "46.6364%",
      height: "31.1978%",
    },
  },
];
