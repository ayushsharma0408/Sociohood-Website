/**
 * Admin authentication service — single place for the backend developer to replace.
 *
 * Current behavior: temporary frontend UI session only (see ../auth/devSession.js).
 * This is NOT secure authentication.
 *
 * Replace the method bodies below with real API calls:
 *   POST /api/admin/auth/login
 *   POST /api/admin/auth/logout
 *   GET  /api/admin/auth/me
 *
 * Keep these function names/signatures stable so UI call sites stay unchanged.
 */

import {
  clearDevSession,
  readDevSession,
  writeDevSession,
} from "../auth/devSession.js";

/**
 * Sign in.
 *
 * @param {{ email: string, password?: string }} credentials
 * @returns {Promise<{ email: string, loggedInAt: string }>}
 */
export const login = async (credentials) => {
  const { email, password } = credentials;
  // TODO(backend):
  // const response = await fetch("/api/admin/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!response.ok) throw new Error("Invalid credentials");
  // const data = await response.json();
  // // Store only token/session returned by the API — never the password.
  // return data.user;

  // TEMPORARY (remove when backend is connected):
  // Password is accepted for future API wiring but never persisted or checked.
  void password;
  return writeDevSession({ email });
};

/**
 * Sign out.
 */
export const logout = async () => {
  // TODO(backend):
  // await fetch("/api/admin/auth/logout", {
  //   method: "POST",
  //   credentials: "include",
  // });
  // Also clear any token the frontend stores after real auth lands.

  // TEMPORARY (remove when backend is connected):
  clearDevSession();
};

/**
 * Current admin user for the UI, or null if none.
 *
 * @returns {{ email: string, loggedInAt: string } | null}
 */
export const getCurrentUser = () => {
  // TODO(backend):
  // Prefer validating a server session/token (GET /api/admin/auth/me).
  // Return null when the session is missing or invalid.

  // TEMPORARY (remove when backend is connected):
  return readDevSession();
};

/**
 * Frontend route-guard helper only.
 * Not a security boundary — the backend must enforce access.
 */
export const isAuthenticated = () => Boolean(getCurrentUser());
