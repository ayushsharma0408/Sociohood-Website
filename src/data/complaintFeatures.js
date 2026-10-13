export const complaintFeatures = [
  {
    id: "reporting",
    index: "01",
    title: "Reporting & onboarding",
    description:
      "Capture complaint details, images and location. Plant onboarding supports employee details and approval.",
  },
  {
    id: "assignment",
    index: "02",
    title: "Automatic assignment",
    description:
      "Automatically assign complaints to vendors through configured category and sub-category mappings.",
  },
  {
    id: "priority",
    index: "03",
    title: "Priority complaints",
    description:
      "Define priority at sub-category level with dedicated visibility and stronger alerts.",
  },
  {
    id: "sla",
    index: "04",
    title: "SLA & automatic escalation",
    description:
      "Monitor deadlines. As the deadline approaches, the configured rules automatically escalate the complaint and notify the vendor.",
  },
  {
    id: "closure",
    index: "05",
    title: "Verified closure & feedback",
    description:
      "Use complaint-specific OTP and complaint records. The Tata Motors workflow requires post-closure feedback before a user can raise the next complaint.",
  },
  {
    id: "jmr",
    index: "06",
    title: "Job Measurement Report review",
    description:
      "After closure and feedback, the vendor submits the JMR. The admin approves or denies the report.",
  },
  {
    id: "mis",
    index: "07",
    title: "MIS & analytics",
    description:
      "Review SLA-wise, category-wise and vendor-wise performance, recurring locations and peak complaint times.",
  },
  {
    id: "preventive",
    index: "08",
    title: "Preventive work",
    description:
      "Generate scheduled complaints for agreed recurring tasks such as LUX checks and tree trimming.",
  },
];

export const complaintRoles = [
  {
    id: "employee",
    title: "Employee / resident",
    description: "Report, track, confirm closure and provide feedback.",
  },
  {
    id: "admin",
    title: "Admin / management",
    description:
      "Monitor ownership, deadlines and escalations. Admins approve or deny submitted JMRs.",
  },
  {
    id: "vendor",
    title: "Vendor / sub-vendor",
    description:
      "Act on assigned complaints and resolve the issue. The vendor submits the JMR after closure and feedback.",
  },
];

export const complaintUseCase = {
  label: "A typical use case",
  body: "A complaint is raised and automatically assigned to its mapped vendor. The vendor resolves the problem, the complaint is closed and feedback is submitted. The vendor submits the Job Measurement Report for admin approval or denial. If escalation is needed as the deadline approaches, the complaint escalates and the vendor is notified automatically before resolution.",
};

export const complaintDetailNote =
  "Capabilities shown describe documented workflows. Final scope, availability, configuration and implementation are agreed for each organisation.";
