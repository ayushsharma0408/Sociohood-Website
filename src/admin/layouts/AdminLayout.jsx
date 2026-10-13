import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader.jsx";
import AdminSidebar from "../components/AdminSidebar.jsx";
import "../styles/admin.css";

const resolveTitle = (pathname) => {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/blogs/new") return "Add Blog";
  if (/^\/admin\/blogs\/[^/]+\/edit$/.test(pathname)) return "Edit Blog";
  if (/^\/admin\/blogs\/[^/]+\/preview$/.test(pathname)) return "Blog Preview";
  if (pathname.startsWith("/admin/blogs")) return "Blogs";
  if (pathname === "/admin/case-studies/new") return "Add Case Study";
  if (/^\/admin\/case-studies\/[^/]+\/edit$/.test(pathname)) return "Edit Case Study";
  if (/^\/admin\/case-studies\/[^/]+\/preview$/.test(pathname)) return "Case Study Preview";
  if (pathname.startsWith("/admin/case-studies")) return "Case Studies";
  if (pathname === "/admin/clients/new") return "Add Client";
  if (/^\/admin\/clients\/[^/]+\/edit$/.test(pathname)) return "Edit Client";
  if (pathname.startsWith("/admin/clients")) return "Clients";
  return "Admin";
};

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = resolveTitle(location.pathname);

  useEffect(() => {
    document.title = `${title} | SocioHood Admin`;
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, [title]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className={`admin-app${sidebarOpen ? " is-sidebar-open" : ""}`}>
      <div
        className="admin-overlay"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div id="admin-sidebar">
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
      <div className="admin-shell">
        <AdminHeader
          title={title}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
