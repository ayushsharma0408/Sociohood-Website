/**
 * Same-browser content store for the frontend CMS.
 *
 * There is no backend API or database in this project. This keeps admin edits
 * in localStorage so a refresh in the same browser can read them back.
 * It is not shared across visitors, devices, or browsers.
 *
 * TODO(backend): replace read/write with the real API. Do not treat this as production storage.
 */

const listeners = new Set();

export const notifyContentChange = () => {
  listeners.forEach((listener) => listener());
};

export const subscribeContentChange = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const storageAvailable = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

/** undefined = nothing saved yet. An array, including [], is saved data. */
export const readStoredCollection = (key) => {
  if (!storageAvailable()) return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return undefined;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
};

export const writeStoredCollection = (key, items) => {
  if (!storageAvailable()) {
    throw new Error(
      "Content could not be saved because browser storage is unavailable."
    );
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    throw new Error(
      "Content could not be saved in this browser. Storage may be full or blocked. Nothing was changed."
    );
  }

  notifyContentChange();
};

export const bindStorageReload = (key, apply) => {
  if (typeof window === "undefined") return;
  window.addEventListener("storage", (event) => {
    if (event.key !== key) return;
    const next = readStoredCollection(key);
    if (next === undefined) return;
    apply(next);
    notifyContentChange();
  });
};

export const commitCollection = (current, next, key, assign) => {
  assign(next);
  try {
    writeStoredCollection(key, next);
  } catch (error) {
    assign(current);
    throw error;
  }
};
