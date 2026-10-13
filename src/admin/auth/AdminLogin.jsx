import { useEffect, useId, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Logo from "../../components/common/Logo.jsx";
import { getCurrentUser, login } from "../services/authService.js";
import "../styles/admin.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminLogin = () => {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Sign in | SocioHood Admin";
    emailRef.current?.focus();

    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  // Already has a temporary UI session → go to dashboard.
  if (getCurrentUser()) {
    return <Navigate to="/admin" replace />;
  }

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};

    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!emailPattern.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!password) {
      next.password = "Please enter your password.";
    }

    setErrors(next);
    return next;
  };

  const focusFirstError = (nextErrors) => {
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.password) {
      passwordRef.current?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Placeholder only — no network call, no credential check.
      // Password is passed for future API wiring but never stored.
      await login({
        email: email.trim(),
        password,
      });

      navigate("/admin", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  const emailErrorId = `${emailId}-error`;
  const passwordErrorId = `${passwordId}-error`;

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-banner">
          <Logo link={false} />
        </div>

        <div className="admin-login-body">
          <div className="admin-login-intro">
            <p className="admin-login-eyebrow">SocioHood</p>
            <h1>Welcome back</h1>
            <p className="admin-login-subtitle">
              Sign in to manage your website content.
            </p>
            <p className="admin-login-portal">Admin Portal</p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={submitting}
          >
            <div className={`admin-field${errors.email ? " has-error" : ""}`}>
              <label htmlFor={emailId}>Email</label>
              <input
                ref={emailRef}
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Enter your email"
                value={email}
                disabled={submitting}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearFieldError("email");
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? emailErrorId : undefined}
              />
              {errors.email ? (
                <p id={emailErrorId} className="admin-field-error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className={`admin-field${errors.password ? " has-error" : ""}`}>
              <label htmlFor={passwordId}>Password</label>
              <div className="admin-password-wrap">
                <input
                  ref={passwordRef}
                  id={passwordId}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  disabled={submitting}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearFieldError("password");
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? passwordErrorId : undefined}
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  disabled={submitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p id={passwordErrorId} className="admin-field-error" role="alert">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="admin-login-actions">
              <button
                type="submit"
                className="admin-login-submit"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? (
                  <>
                    <LoaderCircle
                      className="admin-login-spinner"
                      size={18}
                      aria-hidden="true"
                    />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

              <button
                type="button"
                className="admin-login-forgot"
                disabled
                title="Coming soon"
              >
                Forgot password?
              </button>
            </div>
          </form>

          <p className="admin-login-note">
            Frontend placeholder only — credentials are not verified yet.{" "}
            <Link to="/">Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
