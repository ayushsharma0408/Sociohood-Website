/**
 * @deprecated Import from ./blogs.js (via services) instead.
 * Kept as a thin re-export so older paths do not break during migration.
 */
export {
  BLOG_CATEGORIES,
  BLOG_STATUSES,
  archiveBlog,
  createBlog,
  deleteBlog,
  emptyBlogForm,
  getBlogById,
  getBlogBySlug,
  getBlogs,
  makeSlugFromTitle,
  publishBlog,
  updateBlog,
} from "./blogs.js";
