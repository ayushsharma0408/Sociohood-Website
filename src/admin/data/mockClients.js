/**
 * @deprecated Import from ./clients.js (via services) instead.
 * Kept as a thin re-export so older paths do not break during migration.
 */
export {
  createClient,
  deleteClient,
  emptyClientForm,
  getClientById,
  getClients,
  toggleClientStatus,
  updateClient,
} from "./clients.js";

/** @deprecated Prefer isActive on client records. */
export const CLIENT_STATUSES = ["Active", "Inactive"];
