import { Link } from "react-router-dom";

const AdminPreviewChrome = ({
  contentType,
  status,
  backToListTo,
  backToListLabel = "Back to list",
  backToEditorTo,
  children,
}) => (
  <div className="admin-preview">
    <div className="admin-preview-bar" role="region" aria-label="Preview controls">
      <div className="admin-preview-bar-copy">
        <span className="admin-preview-badge">Preview</span>
        <p>
          {contentType} preview · local mock data only · not published
          {status ? ` · ${status}` : ""}
        </p>
      </div>
      <div className="admin-preview-bar-actions">
        {backToEditorTo ? (
          <Link to={backToEditorTo} className="admin-btn admin-btn-secondary">
            Back to editor
          </Link>
        ) : null}
        <Link to={backToListTo} className="admin-btn admin-btn-ghost">
          {backToListLabel}
        </Link>
      </div>
    </div>
    <div className="admin-preview-stage">{children}</div>
  </div>
);

export default AdminPreviewChrome;
