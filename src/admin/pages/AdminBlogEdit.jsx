import { Link, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm.jsx";
import { getBlog, updateBlog } from "../services/blogsService.js";

const AdminBlogEdit = () => {
  const { id } = useParams();
  const blog = getBlog(id);

  if (!blog) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Edit Blog</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">Blog not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/blogs">Back to blogs</Link>
          </p>
        </div>
      </main>
    );
  }

  const handleSave = async (payload) => {
    updateBlog(id, payload);
  };

  return (
    <main className="admin-page">
      <div className="admin-page-toolbar">
        <div>
          <h2 className="admin-page-heading">Edit Blog</h2>
          <p className="admin-page-subtext">
            Update “{blog.title}”. Changes stay in local mock data until an API is
            connected.
          </p>
        </div>
        <Link
          to={`/admin/blogs/${blog.id}/preview`}
          className="admin-btn admin-btn-secondary"
        >
          Preview
        </Link>
      </div>
      <div className="admin-panel admin-panel-form">
        <BlogForm
          mode="edit"
          initialValues={blog}
          onSaveDraft={handleSave}
          onPublish={(payload) =>
            handleSave({ ...payload, status: "published" })
          }
        />
      </div>
    </main>
  );
};

export default AdminBlogEdit;
