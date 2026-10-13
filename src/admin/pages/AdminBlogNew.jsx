import BlogForm from "../components/BlogForm.jsx";
import { createBlog, emptyBlogForm } from "../services/blogsService.js";

const AdminBlogNew = () => {
  const handleSave = async (payload) => {
    createBlog(payload);
  };

  return (
    <main className="admin-page">
      <h2 className="admin-page-heading">Add Blog</h2>
      <p className="admin-page-subtext">
        Create a new blog post. Saved to local mock data only.
      </p>
      <div className="admin-panel admin-panel-form">
        <BlogForm
          mode="create"
          initialValues={emptyBlogForm()}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminBlogNew;
