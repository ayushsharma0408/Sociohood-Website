/**
 * Clients service — UI should call these methods only.
 *
 * Currently backed by local CMS mock data (../data/clients.js).
 * Do NOT make network requests here.
 *
 * TODO(backend): Replace each method body with real API calls, e.g.
 *   GET    /api/clients
 *   GET    /api/clients/:id
 *   POST   /api/clients
 *   PUT    /api/clients/:id
 *   DELETE /api/clients/:id
 *   PATCH  /api/clients/:id/status
 */

import {
  createClient as dataCreateClient,
  deleteClient as dataDeleteClient,
  emptyClientForm,
  getClientById as dataGetClientById,
  getClients as dataGetClients,
  toggleClientStatus as dataToggleClientStatus,
  updateClient as dataUpdateClient,
} from "../data/clients.js";

/** @deprecated Prefer isActive boolean on client records. Kept for existing admin selects. */
export const CLIENT_STATUSES = ["Active", "Inactive"];

export { emptyClientForm };

export const getClients = () => dataGetClients();

export const getClient = (id) => dataGetClientById(id);

/** Public site: active clients only, sorted by displayOrder. */
export const getActiveClients = () =>
  dataGetClients()
    .filter((client) => client.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

/**
 * Homepage / company featured strip.
 * First N active clients. Prefer HOMEPAGE_CLIENT_COUNT from constants/homepage.js.
 */
export const getFeaturedClients = (limit = 4) =>
  getActiveClients().slice(0, limit);

/** Presentation helpers for existing SocioHood client-wall UI. */
export const toClientCard = (client) => {
  const name = String(client.name || "");
  const isSimpark = /simpark/i.test(name);
  return {
    ...client,
    logoAlt: client.logoAlt || name,
    location: client.location || client.description || "",
    className: client.className || (isSimpark ? "simpark" : ""),
  };
};

export const createClient = (data) => dataCreateClient(data);

export const updateClient = (id, data) => dataUpdateClient(id, data);

export const deleteClient = (id) => dataDeleteClient(id);

export const toggleClientStatus = (id) => dataToggleClientStatus(id);
