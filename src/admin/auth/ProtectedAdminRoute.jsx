import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/authService.js";

/**
 * Frontend route protection for all admin pages except /admin/login.
 *
 * Flow today (temporary):
 *   no UI session → redirect to /admin/login
 *   UI session present → render nested admin routes
 *
 * This is NOT production security. The backend must enforce auth later.
 *
 * TODO(backend): Replace isAuthenticated() with a real session/token check
 * (cookie, bearer token, or GET /api/admin/auth/me).
 */
const ProtectedAdminRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
