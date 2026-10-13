import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  deleteClient,
  getClients,
  toggleClientStatus,
} from "../services/clientsService.js";

const statusClass = (isActive) => (isActive ? "is-published" : "is-draft");

const AdminClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState(() => getClients());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const refresh = () => setClients(getClients());

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && client.isActive) ||
        (statusFilter === "Inactive" && !client.isActive);
      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        client.website.toLowerCase().includes(query) ||
        client.description.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  const handleDelete = (client) => {
    const confirmed = window.confirm(
      `Delete “${client.name}”? This only removes it from local CMS data.`
    );
    if (!confirmed) return;
    try {
      deleteClient(client.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not delete this client.");
    }
  };

  const handleToggle = (client) => {
    try {
      toggleClientStatus(client.id);
      refresh();
    } catch (error) {
      window.alert(error?.message || "Could not update this client.");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Clients</h2>
          <p className="admin-page-subtext">
            Manage client logos and listings through the CMS service layer.
          </p>
        </div>
        <Link to="/admin/clients/new" className="admin-btn admin-btn-primary">
          <Plus size={16} aria-hidden="true" />
          <span>Add Client</span>
        </Link>
      </div>

      <div className="admin-filters">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <span className="admin-sr-only">Search clients</span>
          <input
            type="search"
            placeholder="Search clients..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>

      <div className="admin-panel">
        {filtered.length === 0 ? (
          <p className="admin-empty">No clients match your filters.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-actions">
              <thead>
                <tr>
                  <th scope="col">Logo</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Website</th>
                  <th scope="col">Status</th>
                  <th scope="col">Display Order</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id}>
                    <td data-label="Logo">
                      <div className="admin-client-logo">
                        {client.logo ? (
                          <img src={client.logo} alt="" />
                        ) : (
                          <span>—</span>
                        )}
                      </div>
                    </td>
                    <td data-label="Client Name">
                      <span className="admin-table-primary">{client.name}</span>
                      {client.description ? (
                        <span className="admin-table-secondary">
                          {client.description}
                        </span>
                      ) : null}
                    </td>
                    <td data-label="Website">
                      {client.website ? (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-table-link"
                        >
                          {client.website.replace(/^https?:\/\//i, "")}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`admin-status ${statusClass(client.isActive)}`}
                      >
                        {client.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td data-label="Display Order">{client.displayOrder}</td>
                    <td data-label="Actions">
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            navigate(`/admin/clients/${client.id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleToggle(client)}
                        >
                          {client.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn is-danger"
                          onClick={() => handleDelete(client)}
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

export default AdminClients;
