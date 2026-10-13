import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  BLOG_CATEGORIES,
  archiveBlog,
  deleteBlog,
  getBlogs,
  publishBlog,
} from "../services/blogsService.js";

const statusClass = (status) => {
  const value = String(status || "").toLowerCase();
  if (value === "published") return "is-published";
  if (value === "archived") return "is-archived";
  return "is-draft";
};

const formatStatus = (status) => {
  const value = String(status || "draft");
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatDate = (value) => {
  if (!value) return "—";
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

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(() => getBlogs());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const refresh = () => setBlogs(getBlogs());

  const categories = useMemo(() => {
    const fromData = blogs.map((blog) => blog.category).filter(Boolean);
    return [...new Set([...BLOG_CATEGORIES, ...fromData])];
  }, [blogs]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesStatus =
        statusFilter === "All" || blog.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || blog.category === categoryFilter;
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [blogs, search, statusFilter, categoryFilter]);

  const handleDelete = (blog) => {
    const confirmed = window.confirm(
      `Delete “${blog.title}”? This only removes it from local CMS data.`
    );
    if (!confirmed) return;
    try {
      deleteBlog(blog.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not delete this blog.");
    }
  };

  const handlePublish = (blog) => {
    try {
      publishBlog(blog.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not publish this blog.");
    }
  };

  const handleArchive = (blog) => {
    try {
      archiveBlog(blog.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not archive this blog.");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Blogs</h2>
          <p className="admin-page-subtext">
            Manage website blog posts through the CMS service layer.
          </p>
        </div>
        <Link to="/admin/blogs/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          <span>Add Blog</span>
        </Link>
      </div>

      <div className="admin-filters">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <span className="admin-sr-only">Search blogs</span>
          <input
            type="search"
            placeholder="Search blogs..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="admin-select">
          <span className="admin-sr-only">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="admin-select">
          <span className="admin-sr-only">Filter by category</span>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="admin-panel">
        {filtered.length === 0 ? (
          <p className="admin-empty">No blogs match your filters.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-actions">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Published</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((blog) => (
                  <tr key={blog.id}>
                    <td data-label="Title">
                      <span className="admin-table-primary">{blog.title}</span>
                    </td>
                    <td data-label="Category">{blog.category}</td>
                    <td data-label="Status">
                      <span className={`admin-status ${statusClass(blog.status)}`}>
                        {formatStatus(blog.status)}
                      </span>
                    </td>
                    <td data-label="Published">{formatDate(blog.publishedAt)}</td>
                    <td data-label="Updated">{formatDate(blog.updatedAt)}</td>
                    <td data-label="Actions">
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => navigate(`/admin/blogs/${blog.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            navigate(`/admin/blogs/${blog.id}/preview`)
                          }
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handlePublish(blog)}
                          disabled={blog.status === "published"}
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleArchive(blog)}
                          disabled={blog.status === "archived"}
                        >
                          Archive
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn is-danger"
                          onClick={() => handleDelete(blog)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminBlogs;
