import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Trash2 } from "lucide-react";
import {
  CLIENT_STATUSES,
  emptyClientForm,
} from "../services/clientsService.js";

const ClientForm = ({
  initialValues,
  mode = "create",
  onSave,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [values, setValues] = useState(initialValues || emptyClientForm());
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  useEffect(() => {
    setValues(initialValues || emptyClientForm());
    setErrors({});
    setLogoFileName("");
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
    if (!values.name.trim()) next.name = "Please enter a client name.";
    if (!values.logo.trim()) next.logo = "Please add a logo preview.";

    const order = Number.parseInt(String(values.displayOrder), 10);
    if (!Number.isFinite(order) || order < 1) {
      next.displayOrder = "Please enter a display order of 1 or higher.";
    }

    if (values.website.trim()) {
      try {
        // Allow relative or absolute; only validate absolute-looking URLs.
        if (/^https?:\/\//i.test(values.website.trim())) {
          // eslint-disable-next-line no-new
          new URL(values.website.trim());
        }
      } catch {
        next.website = "Please enter a valid website URL.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogoSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please choose an image file for the logo.",
      }));
      event.target.value = "";
      return;
    }

    // Local preview only — no upload.
    const reader = new FileReader();
    reader.onload = () => {
      updateField("logo", String(reader.result || ""));
      setLogoFileName(file.name);
    };
    reader.onerror = () => {
      setErrors((prev) => ({
        ...prev,
        logo: "Could not read that image file.",
      }));
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    updateField("logo", "");
    setLogoFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting || !validate()) return;

    setSubmitting(true);
    setSaveError("");
    try {
      await onSave(values);
      navigate("/admin/clients");
    } catch (error) {
      setSaveError(error?.message || "Could not save this client.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <div className="admin-form-grid">
        <div className={`admin-field${errors.name ? " has-error" : ""}`}>
          <label htmlFor="client-name">Client Name</label>
          <input
            id="client-name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Enter client name"
            disabled={submitting}
          />
          {errors.name ? <p className="admin-field-error">{errors.name}</p> : null}
        </div>

        <div className="admin-field">
          <label htmlFor="client-website">Website</label>
          <input
            id="client-website"
            type="url"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
            placeholder="https://example.com"
            disabled={submitting}
            aria-invalid={Boolean(errors.website)}
          />
          {errors.website ? (
            <p className="admin-field-error">{errors.website}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="client-display-order">Display Order</label>
          <input
            id="client-display-order"
            type="number"
            min="1"
            step="1"
            value={values.displayOrder}
            onChange={(event) => updateField("displayOrder", event.target.value)}
            disabled={submitting}
            aria-invalid={Boolean(errors.displayOrder)}
          />
          {errors.displayOrder ? (
            <p className="admin-field-error">{errors.displayOrder}</p>
          ) : null}
        </div>

        <div className="admin-field">
          <label htmlFor="client-status">Status</label>
          <select
            id="client-status"
            value={values.isActive ? "Active" : "Inactive"}
            onChange={(event) =>
              updateField("isActive", event.target.value === "Active")
            }
            disabled={submitting}
          >
            {CLIENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`admin-field admin-field-full${
            errors.logo ? " has-error" : ""
          }`}
        >
          <span className="admin-field-label" id="client-logo-label">
            Logo
          </span>
          <div
            className="admin-logo-picker"
            role="group"
            aria-labelledby="client-logo-label"
          >
            <div className="admin-logo-preview">
              {values.logo ? (
                <img src={values.logo} alt="" />
              ) : (
                <span className="admin-logo-placeholder">No logo</span>
              )}
            </div>
            <div className="admin-logo-controls">
              <input
                ref={fileInputRef}
                id="client-logo"
                type="file"
                accept="image/*"
                className="admin-sr-only"
                onChange={handleLogoSelect}
                disabled={submitting}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={submitting}
              >
                <ImagePlus size={16} aria-hidden="true" />
                <span>{values.logo ? "Change logo" : "Select logo"}</span>
              </button>
              {values.logo ? (
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost"
                  onClick={clearLogo}
                  disabled={submitting}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  <span>Remove</span>
                </button>
              ) : null}
              <p className="admin-logo-hint">
                Local preview only — nothing is uploaded.
                {logoFileName ? ` Selected: ${logoFileName}` : ""}
              </p>
            </div>
          </div>
          {errors.logo ? <p className="admin-field-error">{errors.logo}</p> : null}
        </div>

        <div className="admin-field admin-field-full">
          <label htmlFor="client-description">Description</label>
          <textarea
            id="client-description"
            rows={4}
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Optional short description"
            disabled={submitting}
          />
        </div>
      </div>

      {saveError ? <p className="admin-field-error">{saveError}</p> : null}

      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={submitting}
        >
          {submitting ? "Saving…" : mode === "edit" ? "Save changes" : "Save client"}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => navigate("/admin/clients")}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
