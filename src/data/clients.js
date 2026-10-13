/**
 * @deprecated Public client content now comes from the shared CMS service.
 * Prefer importing from ../admin/services/clientsService.js
 */
import {
  getActiveClients,
  getFeaturedClients,
  getClient,
  toClientCard,
} from "../admin/services/clientsService.js";

export {
  getActiveClients,
  getFeaturedClients,
  getClient as getClientById,
  toClientCard,
};
