import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isBlankContent } from "../../utils/blogHtml.js";
import RichTextEditor from "./RichTextEditor.jsx";
import {
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_STATUSES,
  emptyCaseStudyForm,
  makeSlugFromTitle,
} from "../services/caseStudiesService.js";

const storedHtml = (value) => (isBlankContent(value) ? "" : value);

const CaseStudyForm = ({
  initialValues,
  mode = "create",
  onSaveDraft,
  onPublish,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues || emptyCaseStudyForm());
  const [errors, setErrors] = useState({});
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setValues(initialValues || emptyCaseStudyForm());
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
    if (!values.client.trim()) next.client = "Please enter a client.";
    if (!values.category.trim()) next.category = "Please select a category.";
    if (!values.description.trim()) {
      next.description = "Please enter a description.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (status) => {
    if (submitting || !validate()) return;

    setSubmitting(status);
    setSaveError("");
    try {
      const payload = {
        ...values,
        status,
        challenge: storedHtml(values.challenge),
        solution: storedHtml(values.solution),
        results: storedHtml(values.results),
      };
      if (status === "draft") {
        await onSaveDraft(payload);
      } else {
        await onPublish(payload);
      }
      navigate("/admin/case-studies");
    } catch (error) {
      setSaveError(error?.message || "Could not save this case study.");
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
          <label htmlFor="cs-title">Title</label>
          <input
            id="cs-title"
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Enter case study title"
            disabled={Boolean(submitting)}
          />
          {errors.title ? <p className="admin-field-error">{errors.title}</p> : null}
        </div>

        <div className={`admin-field${errors.slug ? " has-error" : ""}`}>
          <label htmlFor="cs-slug">Slug</label>
          <input
            id="cs-slug"
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", event.target.value);
            }}
            placeholder="url-friendly-slug"
            disabled={Boolean(submitting)}
          />
          {errors.slug ? <p className="admin-field-error">{errors.slug}</p> : null}
        </div>

        <div className={`admin-field${errors.client ? " has-error" : ""}`}>
          <label htmlFor="cs-client">Client</label>
          <input
            id="cs-client"
            value={values.client}
            onChange={(event) => updateField("client", event.target.value)}
            placeholder="Client name"
            disabled={Boolean(submitting)}
          />
          {errors.client ? (
            <p className="admin-field-error">{errors.client}</p>
          ) : null}
        </div>

        <div className={`admin-field${errors.category ? " has-error" : ""}`}>
          <label htmlFor="cs-category">Category</label>
          <select
            id="cs-category"
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
            disabled={Boolean(submitting)}
          >
            {CASE_STUDY_CATEGORIES.map((category) => (
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
          <label htmlFor="cs-metric">Metric</label>
          <input
            id="cs-metric"
            value={values.metric}
            onChange={(event) => updateField("metric", event.target.value)}
            placeholder="e.g. 100%"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="cs-metric-label">Metric Label</label>
          <input
            id="cs-metric-label"
            value={values.metricLabel}
            onChange={(event) => updateField("metricLabel", event.target.value)}
            placeholder="e.g. SLA monitored"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="cs-status">Status</label>
          <select
            id="cs-status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value)}
            disabled={Boolean(submitting)}
          >
            {CASE_STUDY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-field">
          <label htmlFor="cs-video-url">Video URL</label>
          <input
            id="cs-video-url"
            value={values.videoUrl}
            onChange={(event) => updateField("videoUrl", event.target.value)}
            placeholder="https://..."
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="cs-hero-image">Hero Image</label>
          <input
            id="cs-hero-image"
            value={values.heroImage}
            onChange={(event) => updateField("heroImage", event.target.value)}
            placeholder="Image URL (upload later via API)"
            disabled={Boolean(submitting)}
          />
        </div>

        <div
          className={`admin-field admin-field-full${
            errors.description ? " has-error" : ""
          }`}
        >
          <label htmlFor="cs-description">Description</label>
          <textarea
            id="cs-description"
            rows={3}
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Short summary for listings"
            disabled={Boolean(submitting)}
          />
          {errors.description ? (
            <p className="admin-field-error">{errors.description}</p>
          ) : null}
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="cs-challenge">Challenge</label>
          <RichTextEditor
            id="cs-challenge"
            value={values.challenge}
            onChange={(html) => updateField("challenge", html)}
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="cs-solution">Solution</label>
          <RichTextEditor
            id="cs-solution"
            value={values.solution}
            onChange={(html) => updateField("solution", html)}
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="cs-results">Results</label>
          <RichTextEditor
            id="cs-results"
            value={values.results}
            onChange={(html) => updateField("results", html)}
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="cs-meta-title">Meta Title</label>
          <input
            id="cs-meta-title"
            value={values.metaTitle}
            onChange={(event) => updateField("metaTitle", event.target.value)}
            placeholder="SEO title"
            disabled={Boolean(submitting)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="cs-meta-description">Meta Description</label>
          <input
            id="cs-meta-description"
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
          onClick={() => navigate("/admin/case-studies")}
          disabled={Boolean(submitting)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CaseStudyForm;
