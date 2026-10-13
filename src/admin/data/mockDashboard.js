/**
 * Admin dashboard aggregates — derived from the same CMS service data.
 * Replace with GET /api/admin/dashboard when a backend exists.
 */

import { getBlogs } from "../services/blogsService.js";
import { getCaseStudies } from "../services/caseStudiesService.js";
import { getClients } from "../services/clientsService.js";

const byUpdatedDesc = (a, b) =>
  String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));

export const getDashboardStats = () => {
  const blogs = getBlogs();
  const caseStudies = getCaseStudies();
  const clients = getClients();

  return {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter((blog) => blog.status === "published").length,
    totalCaseStudies: caseStudies.length,
    totalClients: clients.length,
  };
};

export const getRecentBlogs = (limit = 3) =>
  getBlogs()
    .slice()
    .sort(byUpdatedDesc)
    .slice(0, limit)
    .map((blog) => ({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      status: blog.status,
      updatedAt: blog.updatedAt,
    }));

export const getRecentCaseStudies = (limit = 3) =>
  getCaseStudies()
    .slice()
    .sort(byUpdatedDesc)
    .slice(0, limit)
    .map((study) => ({
      id: study.id,
      title: study.title,
      client: study.client,
      status: study.status,
      updatedAt: study.updatedAt,
    }));

/** @deprecated Prefer getDashboardStats / getRecentBlogs / getRecentCaseStudies. */
export const dashboardStats = getDashboardStats();
export const recentBlogs = getRecentBlogs();
export const recentCaseStudies = getRecentCaseStudies();
