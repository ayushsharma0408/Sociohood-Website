import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { useCustomSoftware } from "../../context/BookDemoContext.jsx";
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
  requirement: "",
};

const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) errors.name = "Please enter your name.";

  const emailError = validateWorkEmail(form.email);
  if (emailError) errors.email = emailError;

  if (!form.company.trim()) errors.company = "Please enter your company.";

  const phoneError = validatePhoneFields(form.countryCode, form.phone);
  if (phoneError) errors.phone = phoneError;

  if (!form.requirement.trim()) {
    errors.requirement = "Please describe your requirement.";
  }

  return errors;
};

const CustomSoftwareModal = () => {
  const { isOpen, closeCustomSoftware } = useCustomSoftware();
  const titleId = useId();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
      setSubmitted(false);
      setErrors({});
      setForm(INITIAL_FORM);
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
      if (event.key === "Escape") closeCustomSoftware();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, closing, closeCustomSoftware]);

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
        "sociohood-custom-software-enquiry",
        JSON.stringify({
          ...form,
          email: normalizeEmail(form.email),
          contactNumber: buildFullPhoneNumber(form.countryCode, form.phone),
          interest: "Custom software",
          submittedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage failures; enquiry still shows success locally.
    }

    setSubmitted(true);
  };

  const backdropClass = `book-demo-backdrop custom-software-backdrop${
    closing ? " is-closing" : " is-open"
  }`;
  const panelClass = `book-demo-modal custom-software-modal${
    closing ? " is-closing" : " is-open"
  }`;

  return (
    <div
      className={backdropClass}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeCustomSoftware();
      }}
    >
      <section
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
          onClick={closeCustomSoftware}
        >
          <X size={20} strokeWidth={2} />
        </button>

        {submitted ? (
          <div className="book-demo-success">
            <div className="eyebrow blue">PROJECT BRIEF RECEIVED</div>
            <h2 id={titleId}>Thanks for getting in touch.</h2>
            <p>
              We’ve received your project brief and will get back to you to discuss your
              requirements.
            </p>
            <button type="button" className="primary" onClick={closeCustomSoftware}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="eyebrow blue">CUSTOM SOFTWARE</div>
            <h2 id={titleId}>What do you want to build?</h2>
            <p>Tell us a little about your business need.</p>

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

              <label>
                Your requirement
                <textarea
                  name="requirement"
                  required
                  rows={4}
                  maxLength={3000}
                  value={form.requirement}
                  onChange={(event) => updateField("requirement", event.target.value)}
                  aria-invalid={Boolean(errors.requirement)}
                />
                {errors.requirement ? (
                  <span className="field-error">{errors.requirement}</span>
                ) : null}
              </label>

              <small className="form-note">
                Your details are saved for this enquiry. No email or calendar invitation is sent
                automatically.
              </small>

              <button type="submit" className="primary custom-software-submit">
                Submit project brief
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default CustomSoftwareModal;
