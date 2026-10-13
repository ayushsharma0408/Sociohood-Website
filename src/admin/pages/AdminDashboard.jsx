import { Link } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Building2,
  FileCheck2,
  Plus,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentBlogs,
  getRecentCaseStudies,
} from "../data/mockDashboard.js";

const statusClass = (status) =>
  String(status || "").toLowerCase() === "published"
    ? "is-published"
    : "is-draft";

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const AdminDashboard = () => {
  const dashboardStats = getDashboardStats();
  const recentBlogs = getRecentBlogs();
  const recentCaseStudies = getRecentCaseStudies();

  const stats = [
    {
      label: "Total Blogs",
      value: dashboardStats.totalBlogs,
      icon: BookOpen,
    },
    {
      label: "Published Blogs",
      value: dashboardStats.publishedBlogs,
      icon: FileCheck2,
    },
    {
      label: "Case Studies",
      value: dashboardStats.totalCaseStudies,
      icon: Briefcase,
    },
    {
      label: "Clients",
      value: dashboardStats.totalClients,
      icon: Building2,
    },
  ];

  const quickActions = [
    { to: "/admin/blogs/new", label: "Add Blog" },
    { to: "/admin/case-studies/new", label: "Add Case Study" },
    { to: "/admin/clients/new", label: "Add Client" },
  ];

  return (
    <main className="admin-page">
      <header className="admin-dashboard-header">
        <h2 className="admin-page-heading">Welcome back, Admin</h2>
        <p className="admin-page-subtext">
          
        </p>
      </header>

      <section className="admin-section" aria-labelledby="content-stats-heading">
        <div className="admin-section-heading">
          <h3 id="content-stats-heading">Content Statistics</h3>
        </div>
        <div className="admin-stats-grid">
          {stats.map(({ label, value, icon: Icon }) => (
            <article key={label} className="admin-stat-card">
              <div className="admin-stat-top">
                <p className="admin-stat-label">{label}</p>
                <span className="admin-stat-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
              </div>
              <p className="admin-stat-value">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-panels-grid" aria-label="Recent content">
        <article className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">Recent Blogs</h3>
            <Link to="/admin/blogs" className="admin-panel-link">
              View all
            </Link>
          </div>
          {recentBlogs.length === 0 ? (
            <p className="admin-empty">No blogs yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBlogs.map((blog) => (
                    <tr key={blog.id}>
                      <td data-label="Title">
                        <span className="admin-table-primary">{blog.title}</span>
                      </td>
                      <td data-label="Category">{blog.category}</td>
                      <td data-label="Status">
                        <span className={`admin-status ${statusClass(blog.status)}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td data-label="Updated">{formatDate(blog.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">Recent Case Studies</h3>
            <Link to="/admin/case-studies" className="admin-panel-link">
              View all
            </Link>
          </div>
          {recentCaseStudies.length === 0 ? (
            <p className="admin-empty">No case studies yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Client</th>
                    <th scope="col">Status</th>
                    <th scope="col">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCaseStudies.map((study) => (
                    <tr key={study.id}>
                      <td data-label="Title">
                        <span className="admin-table-primary">{study.title}</span>
                      </td>
                      <td data-label="Client">{study.client}</td>
                      <td data-label="Status">
                        <span className={`admin-status ${statusClass(study.status)}`}>
                          {study.status}
                        </span>
                      </td>
                      <td data-label="Updated">{formatDate(study.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>

      <section className="admin-section" aria-labelledby="quick-actions-heading">
        <div className="admin-section-heading">
          <h3 id="quick-actions-heading">Quick Actions</h3>
        </div>
        <div className="admin-quick-actions">
          {quickActions.map(({ to, label }) => (
            <Link key={to} to={to} className="admin-quick-action">
              <Plus size={16} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
