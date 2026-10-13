/**
 * Backwards-compatible export for older imports.
 * Prefer importing from ../admin/services/blogsService.js
 */
export {
  getPublishedBlogs,
  getFeaturedBlogs as insights,
} from "./blogs.js";
