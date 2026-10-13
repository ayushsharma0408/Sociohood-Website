import FaqForm from "../components/FaqForm.jsx";
import { createFaq, emptyFaqForm } from "../services/faqsService.js";

const AdminFaqNew = () => {
  const handleSave = async (payload) => {
    createFaq(payload);
  };

  return (
    <main className="admin-page">
      <h2 className="admin-page-heading">Add FAQ</h2>
      <p className="admin-page-subtext">
        Create a new homepage FAQ. Saved to local mock data only.
      </p>
      <div className="admin-panel admin-panel-form">
        <FaqForm
          mode="create"
          initialValues={emptyFaqForm()}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminFaqNew;
