import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  CASE_STUDY_CATEGORIES,
  archiveCaseStudy,
  deleteCaseStudy,
  getCaseStudies,
  publishCaseStudy,
} from "../services/caseStudiesService.js";

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

const AdminCaseStudies = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState(() => getCaseStudies());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const refresh = () => setStudies(getCaseStudies());

  const categories = useMemo(() => {
    const fromData = studies.map((study) => study.category).filter(Boolean);
    return [...new Set([...CASE_STUDY_CATEGORIES, ...fromData])];
  }, [studies]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return studies.filter((study) => {
      const matchesStatus =
        statusFilter === "All" || study.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || study.category === categoryFilter;
      const matchesSearch =
        !query ||
        study.title.toLowerCase().includes(query) ||
        study.client.toLowerCase().includes(query) ||
        study.category.toLowerCase().includes(query) ||
        study.slug.toLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [studies, search, statusFilter, categoryFilter]);

  const handleDelete = (study) => {
    const confirmed = window.confirm(
      `Delete “${study.title}”? This only removes it from local CMS data.`
    );
    if (!confirmed) return;
    try {
      deleteCaseStudy(study.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not delete this case study.");
    }
  };

  const handlePublish = (study) => {
    try {
      publishCaseStudy(study.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not publish this case study.");
    }
  };

  const handleArchive = (study) => {
    try {
      archiveCaseStudy(study.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not archive this case study.");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Case Studies</h2>
          <p className="admin-page-subtext">
            Manage website case studies through the CMS service layer.
          </p>
        </div>
        <Link
          to="/admin/case-studies/new"
          className="admin-btn admin-btn-primary"
        >
          <Plus size={16} aria-hidden="true" />
          <span>Add Case Study</span>
        </Link>
      </div>

      <div className="admin-filters">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <span className="admin-sr-only">Search case studies</span>
          <input
            type="search"
            placeholder="Search case studies..."
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
          <p className="admin-empty">No case studies match your filters.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-actions">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Client</th>
                  <th scope="col">Category</th>
                  <th scope="col">Metric</th>
                  <th scope="col">Status</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((study) => (
                  <tr key={study.id}>
                    <td data-label="Title">
                      <span className="admin-table-primary">{study.title}</span>
                    </td>
                    <td data-label="Client">{study.client}</td>
                    <td data-label="Category">{study.category}</td>
                    <td data-label="Metric">
                      <span className="admin-table-primary">{study.metric}</span>
                      {study.metricLabel ? (
                        <span className="admin-table-secondary">
                          {study.metricLabel}
                        </span>
                      ) : null}
                    </td>
                    <td data-label="Status">
                      <span className={`admin-status ${statusClass(study.status)}`}>
                        {formatStatus(study.status)}
                      </span>
                    </td>
                    <td data-label="Updated">{formatDate(study.updatedAt)}</td>
                    <td data-label="Actions">
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            navigate(`/admin/case-studies/${study.id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            navigate(`/admin/case-studies/${study.id}/preview`)
                          }
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handlePublish(study)}
                          disabled={study.status === "published"}
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleArchive(study)}
                          disabled={study.status === "archived"}
                        >
                          Archive
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn is-danger"
                          onClick={() => handleDelete(study)}
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

export default AdminCaseStudies;
