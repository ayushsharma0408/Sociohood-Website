/**
 * @deprecated Public blog content now comes from the shared CMS service.
 * Prefer importing from ../admin/services/blogsService.js
 */
export {
  getPublishedBlogs,
  getPublishedBlogBySlug as getBlogBySlug,
  getPublishedBlogCategories as getBlogCategories,
  getFeaturedBlogs,
  getRelatedBlogs,
  toBlogCard,
} from "../admin/services/blogsService.js";
