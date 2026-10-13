import ClientForm from "../components/ClientForm.jsx";
import { createClient, emptyClientForm } from "../services/clientsService.js";

const AdminClientNew = () => {
  const handleSave = async (payload) => {
    createClient(payload);
  };

  return (
    <main className="admin-page">
      <h2 className="admin-page-heading">Add Client</h2>
      <p className="admin-page-subtext">
        Add a client logo and details. Saved to local mock data only.
      </p>
      <div className="admin-panel admin-panel-form">
        <ClientForm
          mode="create"
          initialValues={emptyClientForm()}
          onSave={handleSave}
        />
      </div>
    </main>
  );
};

export default AdminClientNew;
