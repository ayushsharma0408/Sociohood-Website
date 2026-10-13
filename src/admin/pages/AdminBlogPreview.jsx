import { Link, useParams } from "react-router-dom";
import AdminPreviewChrome from "../components/AdminPreviewChrome.jsx";
import { getBlog } from "../services/blogsService.js";
import { sanitizeBlogHtml } from "../../utils/blogHtml.js";

const artClassFromId = (id) => {
  if (id === "roi") return "art-1";
  if (id === "plant-township") return "art-2";
  return "art-0";
};

const AdminBlogPreview = () => {
  const { id } = useParams();
  const blog = getBlog(id);

  if (!blog) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Blog preview</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">Blog not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/blogs">Back to blogs</Link>
          </p>
        </div>
      </main>
    );
  }

  const html = sanitizeBlogHtml(blog.content);

  return (
    <AdminPreviewChrome
      contentType="Blog"
      status={blog.status}
      backToListTo="/admin/blogs"
      backToListLabel="Back to list"
      backToEditorTo={`/admin/blogs/${blog.id}/edit`}
    >
      <div className="blog-page admin-preview-surface">
        <section className="page-hero">
          <div className="eyebrow blue">THE SOCIOHOOD BLOG</div>
          <h1>{blog.title}</h1>
          <p>
            {blog.category}
            {blog.readTime ? ` · ${blog.readTime}` : ""}
            {blog.author ? ` · ${blog.author}` : ""}
          </p>
        </section>

        <section className="blog-section admin-preview-article-wrap">
          <article className="blog-article admin-preview-article">
            <div className={`article-art ${artClassFromId(blog.id)}`}>
              <span>{blog.category}</span>
              <small>{blog.readTime || "Article"}</small>
            </div>

            {blog.featuredImage ? (
              <div className="admin-preview-hero-media">
                <img src={blog.featuredImage} alt="" />
              </div>
            ) : null}

            {blog.excerpt ? <p className="admin-preview-excerpt">{blog.excerpt}</p> : null}

            <div
              className="admin-preview-body blog-article-body"
              dangerouslySetInnerHTML={{
                __html: html || "<p>No content yet.</p>",
              }}
            />
          </article>
        </section>
      </div>
    </AdminPreviewChrome>
  );
};

export default AdminBlogPreview;
