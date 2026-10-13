const adminImage = "/product/admin-complaints.webp";
const adminAlt =
  "SocioHood admin complaint console with statuses, filters and complaint list";

export const complaintProductStates = [
  {
    id: "status-overview",
    label: "Status overview",
    index: "01",
    title: "What is still open?",
    description: "Review all, unassigned, assigned, closed, cancelled and reopened complaints.",
    image: adminImage,
    alt: adminAlt,
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
    image: adminImage,
    alt: adminAlt,
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
    image: adminImage,
    alt: adminAlt,
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
    image: adminImage,
    alt: adminAlt,
    rect: {
      left: "37.2273%",
      top: "30.6314%",
      width: "11.5%",
      height: "5.6314%",
    },
  },
];

export const complaintProductCaption =
  "Admin web console · workspace-specific figures. Ecosystem-level results are presented separately in our case studies.";
