import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FAQ_CATEGORIES,
  FAQ_STATUSES,
  emptyFaqForm,
} from "../services/faqsService.js";

const FaqForm = ({
  initialValues,
  mode = "create",
  onSaveDraft,
  onPublish,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues || emptyFaqForm());
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setValues(initialValues || emptyFaqForm());
    setErrors({});
  }, [initialValues, mode]);

  const updateField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!String(values.question || "").trim()) {
      next.question = "Please enter a question.";
    }
    if (!String(values.answer || "").trim()) {
      next.answer = "Please enter an answer.";
    }
    const order = Number(values.displayOrder);
    if (!Number.isFinite(order)) {
      next.displayOrder = "Please enter a display order.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (intent) => {
    if (submitting || !validate()) return;

    const status =
      intent === "published"
        ? "published"
        : values.status === "archived"
          ? "archived"
          : "draft";

    setSubmitting(intent);
    setSaveError("");
    try {
      const payload = {
        ...values,
        question: String(values.question || "").trim(),
        answer: String(values.answer || "").trim(),
        category: String(values.category || "").trim(),
        displayOrder: Number(values.displayOrder),
        status,
      };
      if (status === "published") {
        await onPublish(payload);
      } else {
        await onSaveDraft(payload);
      }
      navigate("/admin/faqs");
    } catch (error) {
      setSaveError(error?.message || "Could not save this FAQ.");
    } finally {
      setSubmitting(null);
    }
  };

  const publishLabel =
    mode === "edit" && values.status === "published"
      ? "Save Changes"
      : "Publish";

  return (
    <form
      className="admin-form"
      onSubmit={(event) => event.preventDefault()}
      noValidate
    >
      <div className="admin-form-grid">
        <div
          className={`admin-field admin-field-full${errors.question ? " has-error" : ""}`}
        >
          <label htmlFor="faq-question">Question</label>
          <input
            id="faq-question"
            value={values.question}
            onChange={(event) => updateField("question", event.target.value)}
            placeholder="Enter the FAQ question"
            disabled={Boolean(submitting)}
            aria-invalid={Boolean(errors.question)}
          />
          {errors.question ? (
            <p className="admin-field-error">{errors.question}</p>
          ) : null}
        </div>

        <div
          className={`admin-field admin-field-full${errors.answer ? " has-error" : ""}`}
        >
          <label htmlFor="faq-answer">Answer</label>
          <textarea
            id="faq-answer"
            rows={6}
            value={values.answer}
            onChange={(event) => updateField("answer", event.target.value)}
            placeholder="Enter the FAQ answer"
            disabled={Boolean(submitting)}
            aria-invalid={Boolean(errors.answer)}
          />
          {errors.answer ? (
            <p className="admin-field-error">{errors.answer}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="faq-category">Category</label>
          <input
            id="faq-category"
            list="faq-category-options"
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="Optional category"
            disabled={Boolean(submitting)}
          />
          <datalist id="faq-category-options">
            {FAQ_CATEGORIES.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>

        <div className={`admin-field${errors.displayOrder ? " has-error" : ""}`}>
          <label htmlFor="faq-display-order">Display order</label>
          <input
            id="faq-display-order"
            type="number"
            min={1}
            step={1}
            value={values.displayOrder}
            onChange={(event) => updateField("displayOrder", event.target.value)}
            disabled={Boolean(submitting)}
            aria-invalid={Boolean(errors.displayOrder)}
          />
          {errors.displayOrder ? (
            <p className="admin-field-error">{errors.displayOrder}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="faq-status">Status</label>
          <select
            id="faq-status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value)}
            disabled={Boolean(submitting)}
          >
            {FAQ_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
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
          {submitting === "published" ? "Saving…" : publishLabel}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => navigate("/admin/faqs")}
          disabled={Boolean(submitting)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FaqForm;
