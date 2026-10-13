import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BLOG_CATEGORIES,
  BLOG_STATUSES,
  emptyBlogForm,
  makeSlugFromTitle,
} from "../services/blogsService.js";
import { isBlankContent } from "../../utils/blogHtml.js";
import RichTextEditor from "./RichTextEditor.jsx";

const BlogForm = ({
  initialValues,
  mode = "create",
  onSaveDraft,
  onPublish,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues || emptyBlogForm());
  const [errors, setErrors] = useState({});
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setValues(initialValues || emptyBlogForm());
    setSlugTouched(mode === "edit");
    setErrors({});
  }, [initialValues, mode]);

  const updateField = (field, value) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !slugTouched) {
        next.slug = makeSlugFromTitle(value);
      }
      return next;
    });
    setErrors((prev) => {
      if (!prev[field] && !(field === "title" && prev.slug)) return prev;
      const next = { ...prev };
      delete next[field];
      if (field === "title") delete next.slug;
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = "Please enter a title.";
    if (!values.slug.trim()) next.slug = "Please enter a slug.";
    if (!values.category.trim()) next.category = "Please select a category.";
    if (!values.excerpt.trim()) next.excerpt = "Please enter an excerpt.";
    if (isBlankContent(values.content)) next.content = "Please enter content.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (status) => {
    if (submitting || !validate()) return;

    setSubmitting(status);
    setSaveError("");
    try {
      const payload = { ...values, status };
      if (status === "draft") {
        await onSaveDraft(payload);
      } else {
        await onPublish(payload);
      }
      navigate("/admin/blogs");
    } catch (error) {
      setSaveError(error?.message || "Could not save this blog.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <form
      className="admin-form"
      onSubmit={(event) => event.preventDefault()}
      noValidate
    >
      <div className="admin-form-grid">
        <div className={`admin-field${errors.title ? " has-error" : ""}`}>
          <label htmlFor="blog-title">Title</label>
          <input
            id="blog-title"
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Enter blog title"
            disabled={Boolean(submitting)}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title ? <p className="admin-field-error">{errors.title}</p> : null}
        </div>

        <div className={`admin-field${errors.slug ? " has-error" : ""}`}>
          <label htmlFor="blog-slug">Slug</label>
          <input
            id="blog-slug"
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", event.target.value);
            }}
            placeholder="url-friendly-slug"
            disabled={Boolean(submitting)}
            aria-invalid={Boolean(errors.slug)}
          />
          {errors.slug ? <p className="admin-field-error">{errors.slug}</p> : null}
        </div>

        <div className={`admin-field${errors.category ? " has-error" : ""}`}>
          <label htmlFor="blog-category">Category</label>
          <select
            id="blog-category"
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
            disabled={Boolean(submitting)}
          >
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className="admin-field-error">{errors.category}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="blog-read-time">Read time</label>
          <input
            id="blog-read-time"
            value={values.readTime}
            onChange={(event) => updateField("readTime", event.target.value)}
            placeholder="e.g. 4 min read"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="blog-author">Author</label>
          <input
            id="blog-author"
            value={values.author}
            onChange={(event) => updateField("author", event.target.value)}
            placeholder="Author name"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="blog-status">Status</label>
          <select
            id="blog-status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value)}
            disabled={Boolean(submitting)}
          >
            {BLOG_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="blog-featured-image">Featured image</label>
          <input
            id="blog-featured-image"
            value={values.featuredImage}
            onChange={(event) => updateField("featuredImage", event.target.value)}
            placeholder="Image URL (upload later via API)"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className={`admin-field admin-field-full${errors.excerpt ? " has-error" : ""}`}>
          <label htmlFor="blog-excerpt">Excerpt</label>
          <textarea
            id="blog-excerpt"
            rows={3}
            value={values.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
            placeholder="Short summary shown in listings"
            disabled={Boolean(submitting)}
          />
          {errors.excerpt ? (
            <p className="admin-field-error">{errors.excerpt}</p>
          ) : null}
        </div>

        <div className={`admin-field admin-field-full${errors.content ? " has-error" : ""}`}>
          <label htmlFor="blog-content">Content</label>
          <RichTextEditor
            id="blog-content"
            value={values.content}
            onChange={(html) => updateField("content", html)}
            disabled={Boolean(submitting)}
            invalid={Boolean(errors.content)}
          />
          {errors.content ? (
            <p className="admin-field-error">{errors.content}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="blog-meta-title">Meta title</label>
          <input
            id="blog-meta-title"
            value={values.metaTitle}
            onChange={(event) => updateField("metaTitle", event.target.value)}
            placeholder="SEO title"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="blog-meta-description">Meta description</label>
          <input
            id="blog-meta-description"
            value={values.metaDescription}
            onChange={(event) =>
              updateField("metaDescription", event.target.value)
            }
            placeholder="SEO description"
            disabled={Boolean(submitting)}
          />
        </div>
      </div>

      {saveError ? <p className="admin-field-error">{saveError}</p> : null}

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={() => submit("draft")}
          disabled={Boolean(submitting)}
        >
          {submitting === "draft" ? "Saving…" : "Save Draft"}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => submit("published")}
          disabled={Boolean(submitting)}
        >
          {submitting === "published" ? "Publishing…" : "Publish"}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => navigate("/admin/blogs")}
          disabled={Boolean(submitting)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
