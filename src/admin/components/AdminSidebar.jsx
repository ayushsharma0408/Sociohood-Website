import { NavLink, useLocation } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Building2,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Logo from "../../components/common/Logo.jsx";
import useAdminLogout from "../auth/useAdminLogout.js";

const contentLinks = [
  { to: "/admin/blogs", label: "Blogs", icon: BookOpen, match: "/admin/blogs" },
  {
    to: "/admin/case-studies",
    label: "Case Studies",
    icon: Briefcase,
    match: "/admin/case-studies",
  },
  {
    to: "/admin/clients",
    label: "Clients",
    icon: Building2,
    match: "/admin/clients",
  },
  {
    to: "/admin/faqs",
    label: "FAQ Management",
    icon: CircleHelp,
    match: "/admin/faqs",
  },
];

const AdminSidebar = ({ onNavigate }) => {
  const location = useLocation();
  const handleLogout = useAdminLogout();
  const isSectionActive = (match) => location.pathname.startsWith(match);

  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <NavLink to="/admin" className="admin-sidebar-brand" onClick={onNavigate} end>
        <div>
          <Logo link={false} />
          <p className="admin-sidebar-eyebrow">Admin</p>
        </div>
      </NavLink>

      <nav className="admin-sidebar-nav">
        <div className="admin-nav-group">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link${isActive ? " is-active" : ""}`
            }
            onClick={onNavigate}
          >
            <LayoutDashboard size={18} aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="admin-nav-group">
          <p className="admin-nav-label">Content</p>
          {contentLinks.map(({ to, label, icon: Icon, match }) => (
            <NavLink
              key={to}
              to={to}
              className={() =>
                `admin-nav-link${isSectionActive(match) ? " is-active" : ""}`
              }
              onClick={onNavigate}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <button
          type="button"
          className="admin-nav-link is-disabled"
          disabled
          aria-disabled="true"
          title="Coming soon"
        >
          <Settings size={18} aria-hidden="true" />
          <span>Settings</span>
        </button>
        <button
          type="button"
          className="admin-nav-link"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
