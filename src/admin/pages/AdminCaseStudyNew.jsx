import CaseStudyForm from "../components/CaseStudyForm.jsx";
import {
  createCaseStudy,
  emptyCaseStudyForm,
} from "../services/caseStudiesService.js";

const AdminCaseStudyNew = () => {
  const handleSave = async (payload) => {
    createCaseStudy(payload);
  };

  return (
    <main className="admin-page">
      <h2 className="admin-page-heading">Add Case Study</h2>
      <p className="admin-page-subtext">
        Create a new case study. Saved to local mock data only.
      </p>
      <div className="admin-panel admin-panel-form">
        <CaseStudyForm
          mode="create"
          initialValues={emptyCaseStudyForm()}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminCaseStudyNew;
