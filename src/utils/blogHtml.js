import DOMPurify from "dompurify";

const HTML_TAG = /<\/?(p|h[1-6]|ul|ol|li|table|thead|tbody|tr|td|th|img|a|strong|em|br|blockquote|div)\b/i;

let hooksReady = false;

const ensureSanitizeHooks = () => {
  if (hooksReady || typeof window === "undefined") return;
  hooksReady = true;

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      if (/^\s*javascript:/i.test(href)) node.removeAttribute("href");
      node.setAttribute("rel", "noopener noreferrer");
    }

    if (node.tagName === "IMG") {
      const src = node.getAttribute("src") || "";
      if (!/^(https?:\/\/|\/)/i.test(src)) node.removeAttribute("src");
    }
  });
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const looksLikeHtml = (value) => HTML_TAG.test(String(value || ""));

/** Keep older plain-text posts readable as paragraphs. */
export const plainTextToHtml = (value) =>
  String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

export const contentToHtml = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  return looksLikeHtml(source) ? source : plainTextToHtml(source);
};

export const isBlankContent = (value) => {
  const text = contentToHtml(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return !text;
};

export const sanitizeBlogHtml = (value) => {
  ensureSanitizeHooks();
  return DOMPurify.sanitize(contentToHtml(value), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "form",
      "input",
      "button",
      "link",
      "meta",
      "svg",
      "math",
    ],
    FORBID_ATTR: ["style", "srcset"],
  });
};
