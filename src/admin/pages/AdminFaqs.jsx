import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  archiveFaq,
  deleteFaq,
  getFaqs,
  publishFaq,
  unpublishFaq,
} from "../services/faqsService.js";

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

const AdminFaqs = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState(() => getFaqs());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const refresh = () => setFaqs(getFaqs());

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesStatus =
        statusFilter === "All" || faq.status === statusFilter;
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [faqs, search, statusFilter]);

  const handleDelete = (faq) => {
    const confirmed = window.confirm(
      `Delete “${faq.question}”? This removes it from local CMS data.`
    );
    if (!confirmed) return;
    try {
      deleteFaq(faq.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not delete this FAQ.");
    }
  };

  const handlePublish = (faq) => {
    try {
      publishFaq(faq.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not publish this FAQ.");
    }
  };

  const handleUnpublish = (faq) => {
    try {
      unpublishFaq(faq.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not unpublish this FAQ.");
    }
  };

  const handleArchive = (faq) => {
    try {
      archiveFaq(faq.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not archive this FAQ.");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">FAQ Management</h2>
          <p className="admin-page-subtext">
            Manage homepage FAQ questions through the CMS service layer.
          </p>
        </div>
        <Link to="/admin/faqs/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          <span>Add FAQ</span>
        </Link>
      </div>

      <div className="admin-filters">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <span className="admin-sr-only">Search FAQs</span>
          <input
            type="search"
            placeholder="Search FAQs..."
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
      </div>

      <div className="admin-panel">
        {filtered.length === 0 ? (
          <p className="admin-empty">No FAQs match your filters.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-actions">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Category</th>
                  <th scope="col">Order</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((faq) => (
                  <tr key={faq.id}>
                    <td data-label="Question">
                      <span className="admin-table-primary">{faq.question}</span>
                    </td>
                    <td data-label="Category">{faq.category || "—"}</td>
                    <td data-label="Order">{faq.displayOrder}</td>
                    <td data-label="Status">
                      <span className={`admin-status ${statusClass(faq.status)}`}>
                        {formatStatus(faq.status)}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => navigate(`/admin/faqs/${faq.id}/edit`)}
                        >
                          Edit
                        </button>
                        {faq.status === "published" ? (
                          <button
                            type="button"
                            className="admin-link-btn"
                            onClick={() => handleUnpublish(faq)}
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-link-btn"
                            onClick={() => handlePublish(faq)}
                          >
                            Publish
                          </button>
                        )}
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleArchive(faq)}
                          disabled={faq.status === "archived"}
                        >
                          Archive
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn is-danger"
                          onClick={() => handleDelete(faq)}
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

export default AdminFaqs;
