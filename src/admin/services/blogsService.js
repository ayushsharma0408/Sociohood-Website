/**
 * Blogs service — UI should call these methods only.
 *
 * Currently backed by local CMS mock data (../data/blogs.js).
 * Do NOT make network requests here.
 *
 * TODO(backend): Replace each method body with real API calls, e.g.
 *   GET    /api/blogs
 *   GET    /api/blogs/:id
 *   GET    /api/blogs?slug=
 *   POST   /api/blogs
 *   PUT    /api/blogs/:id
 *   DELETE /api/blogs/:id
 *   PATCH  /api/blogs/:id/publish
 *   PATCH  /api/blogs/:id/archive
 */

import {
  BLOG_CATEGORIES,
  BLOG_STATUSES,
  archiveBlog as dataArchiveBlog,
  createBlog as dataCreateBlog,
  deleteBlog as dataDeleteBlog,
  emptyBlogForm,
  getBlogById as dataGetBlogById,
  getBlogBySlug as dataGetBlogBySlug,
  getBlogs as dataGetBlogs,
  makeSlugFromTitle,
  publishBlog as dataPublishBlog,
  updateBlog as dataUpdateBlog,
} from "../data/blogs.js";

export { BLOG_CATEGORIES, BLOG_STATUSES, emptyBlogForm, makeSlugFromTitle };

export const getBlogs = () => dataGetBlogs();

export const getBlog = (id) => dataGetBlogById(id);

export const getBlogBySlug = (slug) => dataGetBlogBySlug(slug);

/** Public site: published blogs only, newest first. */
export const getPublishedBlogs = () =>
  dataGetBlogs()
    .filter((blog) => blog.status === "published")
    .sort((a, b) =>
      String(b.publishedAt || b.updatedAt || "").localeCompare(
        String(a.publishedAt || a.updatedAt || "")
      )
    );

/**
 * Featured preview (homepage + /blog initial view).
 * Published + featured, in featuredOrder. Falls back to first N published.
 */
export const getFeaturedBlogs = (limit = 3) => {
  const published = dataGetBlogs().filter((blog) => blog.status === "published");
  const featured = published
    .filter((blog) => blog.featured)
    .sort(
      (a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0)
    )
    .slice(0, limit);

  if (featured.length > 0) return featured;
  return published.slice(0, limit);
};

/** Public site: published blog by slug, or null. */
export const getPublishedBlogBySlug = (slug) => {
  const blog = dataGetBlogBySlug(slug);
  if (!blog || blog.status !== "published") return null;
  return blog;
};

/** Public site: related published blogs for a detail page. */
export const getRelatedBlogs = (slug, limit = 3) => {
  const current = getPublishedBlogBySlug(slug);
  const others = getPublishedBlogs().filter((blog) => blog.slug !== slug);

  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter(
    (blog) => blog.category === current.category
  );
  const rest = others.filter((blog) => blog.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
};

/** Card presentation helpers for existing SocioHood blog UI. */
export const toBlogCard = (blog, index = 0) => ({
  ...blog,
  href: `/blog/${blog.slug}`,
  artClass: blog.artClass || `art-${index % 3}`,
  eyebrow: blog.eyebrow || blog.title,
  artSmall: blog.artSmall || blog.readTime || blog.category,
  description: blog.excerpt || blog.description || "",
});

export const getPublishedBlogCategories = () => [
  ...new Set(getPublishedBlogs().map((blog) => blog.category).filter(Boolean)),
];

export const createBlog = (data) => dataCreateBlog(data);

export const updateBlog = (id, data) => dataUpdateBlog(id, data);

export const deleteBlog = (id) => dataDeleteBlog(id);

export const publishBlog = (id) => dataPublishBlog(id);

export const archiveBlog = (id) => dataArchiveBlog(id);
