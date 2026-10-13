/** Personal / free mailbox providers blocked for business enquiry forms. */
export const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.es",
  "yahoo.it",
  "yahoo.ca",
  "yahoo.com.au",
  "ymail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.es",
  "hotmail.it",
  "hotmail.ca",
  "hotmail.com.au",
  "outlook.com",
  "outlook.co.uk",
  "outlook.fr",
  "outlook.de",
  "outlook.es",
  "outlook.it",
  "live.com",
  "live.co.uk",
  "live.fr",
  "live.de",
  "live.nl",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "aol.co.uk",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "gmx.de",
  "mail.com",
  "email.com",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
  "zohomail.com",
  "mail.ru",
  "inbox.com",
  "fastmail.com",
  "fastmail.fm",
  "tutanota.com",
  "tuta.io",
  "hey.com",
  "qq.com",
  "163.com",
  "126.com",
  "rediffmail.com",
];

const PERSONAL_DOMAIN_SET = new Set(PERSONAL_EMAIL_DOMAINS.map((domain) => domain.toLowerCase()));

/** Lightweight syntax check — not overly strict for legitimate business addresses. */
const BASIC_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WORK_EMAIL_ERROR = "Please enter your work email address.";

export const normalizeEmail = (email = "") => email.trim();

export const getEmailDomain = (email = "") => {
  const normalized = normalizeEmail(email).toLowerCase();
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex < 0) return "";
  return normalized.slice(atIndex + 1);
};

export const isPersonalEmailDomain = (domain = "") => {
  const normalized = domain.trim().toLowerCase();
  if (!normalized) return false;
  if (PERSONAL_DOMAIN_SET.has(normalized)) return true;
  // Catch regional subdomains such as mail.yahoo.com when listed as yahoo.com
  return [...PERSONAL_DOMAIN_SET].some(
    (blocked) => normalized === blocked || normalized.endsWith(`.${blocked}`)
  );
};

export const isWorkEmail = (email = "") => {
  const normalized = normalizeEmail(email);
  if (!normalized || !BASIC_EMAIL_PATTERN.test(normalized)) return false;

  const domain = getEmailDomain(normalized);
  if (!domain || domain.includes("..") || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  if (isPersonalEmailDomain(domain)) return false;
  return true;
};

/** Returns an error message, or "" when the work email is valid. */
export const validateWorkEmail = (email = "") => {
  if (!normalizeEmail(email)) return WORK_EMAIL_ERROR;
  if (!isWorkEmail(email)) return WORK_EMAIL_ERROR;
  return "";
};
