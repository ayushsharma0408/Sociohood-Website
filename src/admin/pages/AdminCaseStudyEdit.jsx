import { Link, useParams } from "react-router-dom";
import CaseStudyForm from "../components/CaseStudyForm.jsx";
import {
  getCaseStudy,
  updateCaseStudy,
} from "../services/caseStudiesService.js";

const AdminCaseStudyEdit = () => {
  const { id } = useParams();
  const study = getCaseStudy(id);

  if (!study) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Edit Case Study</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">Case study not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/case-studies">Back to case studies</Link>
          </p>
        </div>
      </main>
    );
  }

  const handleSave = async (payload) => {
    updateCaseStudy(id, payload);
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Edit Case Study</h2>
          <p className="admin-page-subtext">
            Update “{study.title}”. Changes stay in local mock data until an API is
            connected.
          </p>
        </div>
        <Link
          to={`/admin/case-studies/${study.id}/preview`}
          className="admin-btn admin-btn-secondary"
        >
          Preview
        </Link>
      </div>
      <div className="admin-panel admin-panel-form">
        <CaseStudyForm
          mode="edit"
          initialValues={study}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminCaseStudyEdit;
