import { useEffect } from "react";
import { useCmsContent } from "../hooks/useCmsContent.js";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import BlogHero from "../components/blog/BlogHero.jsx";
import InsightGrid from "../components/blog/InsightGrid.jsx";
import BlogCta from "../components/blog/BlogCta.jsx";
import {
  getFeaturedBlogs,
  getPublishedBlogs,
  toBlogCard,
} from "../admin/services/blogsService.js";
import { HOMEPAGE_BLOG_COUNT } from "../constants/homepage.js";

const Blog = () => {
  useCmsContent();
  const featured = getFeaturedBlogs(HOMEPAGE_BLOG_COUNT);
  const featuredIds = new Set(featured.map((blog) => blog.id));
  const rest = getPublishedBlogs().filter((blog) => !featuredIds.has(blog.id));
  const published = [...featured, ...rest].map((blog, index) =>
    toBlogCard(blog, index)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | SocioHood";
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <BlogHero />
        <InsightGrid
          items={published}
          expandable
          showCategoryFilter
        />
        <BlogCta />
      </main>
      <FooterSection />
    </>
  );
};

export default Blog;
