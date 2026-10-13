/**
 * TEMPORARY frontend-only session store for admin UI development.
 *
 * ⚠️ This is NOT production security.
 * ⚠️ Delete or stop using this file when real backend authentication is connected.
 *
 * Future flow:
 *   Login form → Backend API → Success → Session/token → Admin dashboard
 *
 * Until then, this only keeps a lightweight UI marker so protected routes
 * can redirect between /admin/login and /admin during local testing.
 */

export const DEV_SESSION_KEY = "sociohood_admin_ui_session";

/**
 * @returns {{ email: string, loggedInAt: string } | null}
 */
export const readDevSession = () => {
  try {
    const raw = sessionStorage.getItem(DEV_SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    if (!session?.email || typeof session.email !== "string") return null;

    return {
      email: session.email,
      loggedInAt: session.loggedInAt || null,
    };
  } catch {
    sessionStorage.removeItem(DEV_SESSION_KEY);
    return null;
  }
};

/**
 * Persist a temporary UI session. Never stores passwords.
 *
 * @param {{ email: string }} user
 */
export const writeDevSession = ({ email }) => {
  const session = {
    email: email.trim(),
    loggedInAt: new Date().toISOString(),
  };

  sessionStorage.setItem(DEV_SESSION_KEY, JSON.stringify(session));
  return session;
};

export const clearDevSession = () => {
  sessionStorage.removeItem(DEV_SESSION_KEY);
};
