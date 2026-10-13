import { Link } from "react-router-dom";
import {
  getFeaturedBlogs,
  toBlogCard,
} from "../../admin/services/blogsService.js";
import { HOMEPAGE_BLOG_COUNT } from "../../constants/homepage.js";
import { useCmsContent } from "../../hooks/useCmsContent.js";
import Reveal from "../common/Reveal.jsx";

const BlogSection = () => {
  useCmsContent();
  const featured = getFeaturedBlogs(HOMEPAGE_BLOG_COUNT).map((blog, index) =>
    toBlogCard(blog, index)
  );

  return (
    <Reveal as="section" className="blog-section" id="blog">
      <div className="section-top">
        <div>
          <div className="eyebrow blue">THE SOCIOHOOD BLOG</div>
          <h2>
            Ideas grounded
            <br />
            in operations.
          </h2>
        </div>
        <Link to="/blog" className="text-button">
          Explore the blog <span>+</span>
        </Link>
      </div>
      <div className="blog-grid">
        {featured.map((item) => (
          <Link
            key={item.id}
            to={`/blog/${item.slug}`}
            className="blog-card reveal is-visible"
          >
            <div className={`article-art ${item.artClass}`}>
              <span>{item.eyebrow}</span>
              <small>{item.artSmall}</small>
            </div>
            <div className="blog-content">
              <span>
                {item.category} · {item.readTime}
              </span>
              <h3>{item.title}</h3>
              <p>{item.excerpt || item.description}</p>
              <b>Read article +</b>
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
};

export default BlogSection;
