const AdminPageShell = ({ title, description, children }) => (
  <main className="admin-page">
    <h2 className="admin-page-heading">{title}</h2>
    {description ? <p className="admin-page-subtext">{description}</p> : null}
    {children || (
      <div className="admin-panel admin-placeholder">
        <p className="admin-empty">
          This page is ready for content. CRUD will be added later.
        </p>
      </div>
    )}
  </main>
);

export default AdminPageShell;
