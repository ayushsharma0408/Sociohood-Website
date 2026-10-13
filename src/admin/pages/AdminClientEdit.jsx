import { Link, useParams } from "react-router-dom";
import ClientForm from "../components/ClientForm.jsx";
import { getClient, updateClient } from "../services/clientsService.js";

const AdminClientEdit = () => {
  const { id } = useParams();
  const client = getClient(id);

  if (!client) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Edit Client</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">Client not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/clients">Back to clients</Link>
          </p>
        </div>
      </main>
    );
  }

  const handleSave = async (payload) => {
    updateClient(id, payload);
  };

  return (
    <main className="admin-page">
      <h2 className="admin-page-heading">Edit Client</h2>
      <p className="admin-page-subtext">
        Update “{client.name}”. Changes stay in local mock data until an API is
        connected.
      </p>
      <div className="admin-panel admin-panel-form">
        <ClientForm
          mode="edit"
          initialValues={{
            ...client,
            displayOrder: String(client.displayOrder),
          }}
          onSave={handleSave}
        />
      </div>
    </main>
  );
};

export default AdminClientEdit;
