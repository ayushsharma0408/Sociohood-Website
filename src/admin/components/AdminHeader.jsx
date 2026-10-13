
import { LogOut, Menu, X } from "lucide-react";
import useAdminLogout from "../auth/useAdminLogout.js";
import { getCurrentUser } from "../services/authService.js";

const AdminHeader = ({ title, sidebarOpen, onToggleSidebar }) => {
  const handleLogout = useAdminLogout();
  const user = getCurrentUser();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-menu-toggle"
          onClick={onToggleSidebar}
          aria-label={
            sidebarOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={sidebarOpen}
          aria-controls="admin-sidebar"
        >
          {sidebarOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <h1 className="admin-header-title">{title}</h1>
      </div>

      <div className="admin-header-meta">
        {user?.email ? (
          <span className="admin-header-user" title={user.email}>
            {user.email}
          </span>
        ) : null}

        <button
          type="button"
          className="admin-header-logout"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut size={16} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
