/**
 * Frontend-only CMS client/deployment store.
 * Consumed via ../services/clientsService.js — UI should not import this file directly.
 *
 * Known SocioHood deployment names are included for UI testing.
 * Additional entries are clearly marked demo/sample organizations.
 *
 * No backend exists. Edits persist in this browser only (localStorage) and are
 * not shared across visitors or devices.
 * TODO(backend): Replace with GET/POST/PUT/DELETE /clients.
 */
import {
  bindStorageReload,
  commitCollection,
  readStoredCollection,
} from "./browserContentStore.js";

const CLIENT_STORAGE_KEY = "sociohood.cms.clients.v1";

const LOGO_TATA = "/brand/tata.svg";
const LOGO_SOCIOHOOD = "/brand/sociohood-dark.svg";
const LOGO_PLACEHOLDER = "/brand/sociohood-dark.svg";

const seedClients = [
  {
    id: "client-tata-township",
    name: "TATA MOTORS",
    logo: LOGO_TATA,
    website: "https://www.tatamotors.com",
    description: "Township",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "client-tata-pune",
    name: "TATA MOTORS",
    logo: LOGO_TATA,
    website: "https://www.tatamotors.com",
    description: "Pune",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "client-tata-jamshedpur",
    name: "TATA MOTORS",
    logo: LOGO_TATA,
    website: "https://www.tatamotors.com",
    description: "Jamshedpur",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "client-simpark",
    name: "SIMPARK",
    logo: "/brand/simpark.png",
    website: "",
    description: "Infrastructure",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "client-apex",
    name: "Apex Industrial Group",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample industrial organization for frontend CMS testing.",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "client-metro",
    name: "Metro Township Services",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample township services organization for frontend CMS testing.",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "client-northstar",
    name: "Northstar Manufacturing",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample manufacturing organization for frontend CMS testing.",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "client-unity",
    name: "Unity Infrastructure",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample infrastructure organization for frontend CMS testing.",
    displayOrder: 8,
    isActive: true,
  },
  {
    id: "client-prime",
    name: "Prime Industrial Campus",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample industrial campus for frontend CMS testing.",
    displayOrder: 9,
    isActive: true,
  },
  {
    id: "client-eastern",
    name: "Eastern Operations Group",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample operations group for frontend CMS testing.",
    displayOrder: 10,
    isActive: false,
  },
  {
    id: "client-vertex",
    name: "Vertex Facilities",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample facilities organization for frontend CMS testing.",
    displayOrder: 11,
    isActive: true,
  },
  {
    id: "client-demo-campus",
    name: "Demo Institutional Campus",
    logo: LOGO_PLACEHOLDER,
    website: "",
    description: "Demo/sample institutional campus for frontend CMS testing.",
    displayOrder: 12,
    isActive: true,
  },
];

/** @type {typeof seedClients} */
let clients = (
  readStoredCollection(CLIENT_STORAGE_KEY) ?? seedClients.map((item) => ({ ...item }))
).map((item) => ({ ...item }));

const commitClients = (next) => {
  commitCollection(clients, next, CLIENT_STORAGE_KEY, (value) => {
    clients = value;
  });
};

bindStorageReload(CLIENT_STORAGE_KEY, (next) => {
  clients = next.map((item) => ({ ...item }));
});

export const emptyClientForm = () => ({
  name: "",
  logo: "",
  website: "",
  description: "",
  displayOrder: String((clients.length || 0) + 1),
  isActive: true,
});

export const getClients = () =>
  clients
    .map((item) => ({ ...item }))
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getClientById = (id) => {
  const item = clients.find((client) => client.id === id);
  return item ? { ...item } : null;
};

const normalizePayload = (payload) => {
  const order = Number.parseInt(String(payload.displayOrder), 10);
  const isActive =
    typeof payload.isActive === "boolean"
      ? payload.isActive
      : String(payload.status || "").toLowerCase() !== "inactive";

  return {
    name: String(payload.name || "").trim(),
    logo: String(payload.logo || "").trim(),
    website: String(payload.website || "").trim(),
    description: String(payload.description || "").trim(),
    displayOrder: Number.isFinite(order) && order > 0 ? order : 1,
    isActive,
  };
};

export const createClient = (payload) => {
  const client = {
    id: `client-${Date.now()}`,
    ...normalizePayload(payload),
  };
  commitClients([client, ...clients]);
  return { ...client };
};

export const updateClient = (id, payload) => {
  const index = clients.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const next = {
    ...clients[index],
    ...normalizePayload({ ...clients[index], ...payload }),
  };

  commitClients(clients.map((item, i) => (i === index ? next : item)));
  return { ...next };
};

export const deleteClient = (id) => {
  const exists = clients.some((item) => item.id === id);
  if (!exists) return false;
  commitClients(clients.filter((item) => item.id !== id));
  return true;
};

export const toggleClientStatus = (id) => {
  const client = getClientById(id);
  if (!client) return null;
  return updateClient(id, { ...client, isActive: !client.isActive });
};
