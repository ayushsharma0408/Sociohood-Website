import { useEffect } from "react";
import { useCmsContent } from "../hooks/useCmsContent.js";
import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import BlogDetail from "../components/blog/BlogDetail.jsx";
import ContentNotFound from "../components/common/ContentNotFound.jsx";
import {
  getBlogBySlug,
  getRelatedBlogs,
  toBlogCard,
} from "../admin/services/blogsService.js";

const BlogDetailPage = () => {
  useCmsContent();
  const { slug } = useParams();
  const found = getBlogBySlug(slug);
  const blog = found?.status === "published" ? found : null;
  const related = getRelatedBlogs(slug, 3).map((item, index) =>
    toBlogCard(item, index)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (blog) {
      document.title = `${blog.metaTitle || blog.title} | SocioHood Blog`;
    }
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, [blog]);

  if (!blog) {
    return (
      <ContentNotFound
        eyebrow="BLOG"
        title="Article not found."
        description="This article is unavailable, unpublished, or the link is incorrect."
        backTo="/blog"
        backLabel="Back to Blog"
      />
    );
  }

  return (
    <>
      <Navbar />
      <BlogDetail blog={blog} related={related} />
      <FooterSection />
    </>
  );
};

export default BlogDetailPage;
