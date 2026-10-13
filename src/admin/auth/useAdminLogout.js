import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";

/**
 * Shared logout action for Admin sidebar / header.
 * Clears the temporary UI session and returns to /admin/login.
 */
const useAdminLogout = () => {
  const navigate = useNavigate();

  return async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };
};

export default useAdminLogout;
