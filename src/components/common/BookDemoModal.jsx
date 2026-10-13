import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { useBookDemo } from "../../context/BookDemoContext.jsx";
import PhoneInput from "./PhoneInput.jsx";
import { DEFAULT_COUNTRY_CODE } from "../../data/countryCodes.js";
import { buildFullPhoneNumber, validatePhoneFields } from "../../utils/phone.js";
import { normalizeEmail, validateWorkEmail } from "../../utils/formValidation.js";

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  propertyType: "Industrial plant",
  scale: "",
  slot: "",
  details: "",
};

const PROPERTY_TYPES = [
  "Industrial plant",
  "Township",
  "Institutional campus",
  "Other",
];

const getMinSlot = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) errors.name = "Please enter your name.";

  const emailError = validateWorkEmail(form.email);
  if (emailError) errors.email = emailError;

  if (!form.company.trim()) errors.company = "Please enter your company.";

  const phoneError = validatePhoneFields(form.countryCode, form.phone);
  if (phoneError) errors.phone = phoneError;

  if (!form.propertyType) errors.propertyType = "Please select a property type.";
  if (!form.scale.trim()) errors.scale = "Please enter approximate users.";
  if (!form.slot) errors.slot = "Please choose a preferred date and time.";

  return errors;
};

const BookDemoModal = () => {
  const { isOpen, closeBookDemo } = useBookDemo();
  const titleId = useId();
  const panelRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [minSlot, setMinSlot] = useState(getMinSlot);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
      setSubmitted(false);
      setErrors({});
      setForm(INITIAL_FORM);
      setMinSlot(getMinSlot());
      return undefined;
    }

    if (!visible) return undefined;

    setClosing(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 240);

    return () => window.clearTimeout(timer);
  }, [isOpen, visible]);

  useEffect(() => {
    if (!visible || closing) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeBookDemo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, closing, closeBookDemo]);

  if (!visible) return null;

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));

    if (name === "email") {
      if (errors.email && !validateWorkEmail(value)) {
        setErrors((current) => {
          const next = { ...current };
          delete next.email;
          return next;
        });
      }
      return;
    }

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const handleEmailBlur = () => {
    const emailError = validateWorkEmail(form.email);
    setErrors((current) => {
      if (emailError) return { ...current, email: emailError };
      if (!current.email) return current;
      const next = { ...current };
      delete next.email;
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      window.localStorage.setItem(
        "sociohood-demo-enquiry",
        JSON.stringify({
          ...form,
          email: normalizeEmail(form.email),
          contactNumber: buildFullPhoneNumber(form.countryCode, form.phone),
          interest: "Complaint Management",
          submittedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage failures; enquiry still shows success locally.
    }

    setSubmitted(true);
  };

  const backdropClass = `book-demo-backdrop${closing ? " is-closing" : " is-open"}`;
  const panelClass = `book-demo-modal${closing ? " is-closing" : " is-open"}`;

  return (
    <div
      className={backdropClass}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeBookDemo();
      }}
    >
      <section
        ref={panelRef}
        className={panelClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="book-demo-close"
          aria-label="Close dialog"
          onClick={closeBookDemo}
        >
          <X size={20} strokeWidth={2} />
        </button>

        {submitted ? (
          <div className="book-demo-success">
            <div className="eyebrow blue">REQUEST RECEIVED</div>
            <h2 id={titleId}>Thanks. We’ve received your demo request and will confirm the preferred time with you.</h2>
            <button type="button" className="primary" onClick={closeBookDemo}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="eyebrow blue">LET’S TALK OPERATIONS</div>
            <h2 id={titleId}>Book a complaint-management demo.</h2>
            <p>
              Choose a preferred time for a 30-minute discussion. Your time is a request, subject to
              confirmation.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label>
                  Your name
                  <input
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? <span className="field-error">{errors.name}</span> : null}
                </label>
                <label>
                  Work email
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    onBlur={handleEmailBlur}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <span className="field-error">{errors.email}</span> : null}
                </label>
              </div>

              <label>
                Company
                <input
                  name="company"
                  required
                  maxLength={200}
                  autoComplete="organization"
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  aria-invalid={Boolean(errors.company)}
                />
                {errors.company ? <span className="field-error">{errors.company}</span> : null}
              </label>

              <label>
                Contact number
                <PhoneInput
                  countryCode={form.countryCode}
                  phoneNumber={form.phone}
                  onCountryCodeChange={(value) => updateField("countryCode", value)}
                  onPhoneNumberChange={(value) => updateField("phone", value)}
                  invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
              </label>

              <div className="form-grid">
                <label>
                  Property type
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={(event) => updateField("propertyType", event.target.value)}
                    aria-invalid={Boolean(errors.propertyType)}
                  >
                    {PROPERTY_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType ? (
                    <span className="field-error">{errors.propertyType}</span>
                  ) : null}
                </label>
                <label>
                  Approximate users
                  <input
                    name="scale"
                    required
                    maxLength={100}
                    placeholder="e.g. 500 employees"
                    value={form.scale}
                    onChange={(event) => updateField("scale", event.target.value)}
                    aria-invalid={Boolean(errors.scale)}
                  />
                  {errors.scale ? <span className="field-error">{errors.scale}</span> : null}
                </label>
              </div>

              <label>
                Preferred date & time (your local timezone)
                <input
                  name="slot"
                  type="datetime-local"
                  required
                  min={minSlot}
                  value={form.slot}
                  onChange={(event) => updateField("slot", event.target.value)}
                  aria-invalid={Boolean(errors.slot)}
                />
                {errors.slot ? <span className="field-error">{errors.slot}</span> : null}
              </label>

              <label>
                Anything we should know?
                <textarea
                  name="details"
                  rows={3}
                  maxLength={3000}
                  value={form.details}
                  onChange={(event) => updateField("details", event.target.value)}
                />
              </label>

              <small className="form-note">
                Your details are saved for this enquiry. No email or calendar invitation is sent
                automatically.
              </small>

              <button type="submit" className="primary">
                Request demo
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default BookDemoModal;
