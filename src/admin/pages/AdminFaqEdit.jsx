import { Link, useParams } from "react-router-dom";
import FaqForm from "../components/FaqForm.jsx";
import { getFaq, updateFaq } from "../services/faqsService.js";

const AdminFaqEdit = () => {
  const { id } = useParams();
  const faq = getFaq(id);

  if (!faq) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Edit FAQ</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">FAQ not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/faqs">Back to FAQs</Link>
          </p>
        </div>
      </main>
    );
  }

  const handleSave = async (payload) => {
    updateFaq(id, payload);
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Edit FAQ</h2>
          <p className="admin-page-subtext">
            Update “{faq.question}”. Changes stay in local mock data until an API
            is connected.
          </p>
        </div>
      </div>
      <div className="admin-panel admin-panel-form">
        <FaqForm
          mode="edit"
          initialValues={faq}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminFaqEdit;
