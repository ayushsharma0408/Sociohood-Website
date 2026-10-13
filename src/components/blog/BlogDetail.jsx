import { Link } from "react-router-dom";
import Reveal from "../common/Reveal.jsx";
import BlogCta from "./BlogCta.jsx";
import InsightCard from "./InsightCard.jsx";
import { sanitizeBlogHtml } from "../../utils/blogHtml.js";

const formatPublishedDate = (value) => {
  if (!value) return null;
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const BlogDetail = ({ blog, related = [] }) => {
  const publishedLabel = formatPublishedDate(blog.publishedAt || blog.date);
  const metaBits = [
    blog.category,
    blog.readTime,
    blog.author,
    publishedLabel,
  ].filter(Boolean);

  return (
    <main className="blog-page">
      <Reveal as="section" className="page-hero">
        <div className="eyebrow blue">{blog.category || "THE SOCIOHOOD BLOG"}</div>
        <h1>{blog.title}</h1>
        <p>{metaBits.join(" · ")}</p>
        <Link
          to="/blog"
          className="text-button"
          style={{ marginTop: 18, display: "inline-flex" }}
        >
          Back to Blog <span>+</span>
        </Link>
      </Reveal>

      <Reveal as="section" className="blog-section">
        <article
          className="blog-article"
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          <div className={`article-art ${blog.artClass || "art-0"}`}>
            <span>{blog.eyebrow || blog.title}</span>
            <small>{blog.artSmall || blog.readTime}</small>
          </div>

          {blog.featuredImage ? (
            <div style={{ margin: "0 0 28px" }}>
              <img
                src={blog.featuredImage}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid #e1e8f4",
                  display: "block",
                }}
              />
            </div>
          ) : null}

          {blog.excerpt ? (
            <p
              style={{
                color: "#596a85",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              {blog.excerpt}
            </p>
          ) : null}

          <div
            className="blog-article-body"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content) }}
          />
        </article>
      </Reveal>

      {related.length > 0 ? (
        <Reveal as="section" className="blog-section">
          <div className="section-top">
            <div>
              <div className="eyebrow blue">RELATED</div>
              <h2>
                More from
                <br />
                the blog.
              </h2>
            </div>
            <Link to="/blog" className="text-button">
              Back to Insights <span>+</span>
            </Link>
          </div>
          <div className="blog-grid">
            {related.map((item, index) => (
              <InsightCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </Reveal>
      ) : null}

      <BlogCta />
    </main>
  );
};

export default BlogDetail;
