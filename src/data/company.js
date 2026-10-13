import {
  getActiveClients,
  getFeaturedClients,
  toClientCard,
} from "../admin/services/clientsService.js";
import { HOMEPAGE_CLIENT_COUNT } from "../constants/homepage.js";

const toDeployment = (client) => {
  const card = toClientCard(client);
  return {
    id: card.id,
    logo: card.logo,
    logoAlt: card.logoAlt || card.name,
    name: card.name,
    location: card.description || card.location,
    website: card.website || "",
    className: card.className || "",
  };
};

/**
 * Company / About page — same featured client wall as homepage,
 * plus "Explore all clients" for the full active list.
 */
export const getDeployments = () =>
  getFeaturedClients(HOMEPAGE_CLIENT_COUNT).map(toDeployment);

/** Full active client list (used by /clients). */
export const getAllActiveDeployments = () =>
  getActiveClients().map(toDeployment);

/** @deprecated Prefer getDeployments() so admin status changes apply in-session. */
export const deployments = getDeployments();

export const principles = [
  {
    index: "01",
    title: "Understand the work.",
    description: "Begin with the people, responsibilities and process.",
  },
  {
    index: "02",
    title: "Design for use.",
    description: "Make the next action clear for each stakeholder.",
  },
  {
    index: "03",
    title: "Build with accountability.",
    description: "Connect actions, deadlines and outcomes in a shared record.",
  },
];

export const companyExperience =
  "SocioHood grew from community and township digitisation into a configurable operational platform. The Tata Motors Jamshedpur township experience shaped the complaint lifecycle, vendor workflows and resident communication. Plant requirements added more detailed roles, priority handling and operational controls.";

export const incubation = {
  eyebrow: "INCUBATION & SUPPORT",
  heading: "Part of India’s innovation ecosystem.",
  paragraphs: [
    "SocioHood is incubated at the Indian Statistical Institute, Kolkata through IDEAS-TIH and backed by the Department of Science & Technology, Government of India, through this ecosystem.",
    "IDEAS-TIH was established at ISI Kolkata under the National Mission on Interdisciplinary Cyber-Physical Systems of DST.",
  ],
  ctaLabel: "Learn about IDEAS-TIH",
  ctaHref: "https://www.ideas-tih.org/about-us",
  addressLabel: "Incubator address",
  address:
    "IDEAS-Technology Innovation Hub, 6th Floor, R. A. Fisher Bhavan, Indian Statistical Institute, 203 Barrackpore Trunk Road, Kolkata 700108, West Bengal, India.",
};
