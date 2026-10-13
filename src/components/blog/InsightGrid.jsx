import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFeaturedBlogs,
  getPublishedBlogCategories,
  getPublishedBlogs,
  toBlogCard,
} from "../../admin/services/blogsService.js";
import { HOMEPAGE_BLOG_COUNT } from "../../constants/homepage.js";
import Reveal from "../common/Reveal.jsx";
import InsightCard from "./InsightCard.jsx";

const INITIAL_COUNT = HOMEPAGE_BLOG_COUNT;

const buildOrderedPublished = () => {
  const featured = getFeaturedBlogs(INITIAL_COUNT).map((blog, index) =>
    toBlogCard(blog, index)
  );
  const featuredIds = new Set(featured.map((item) => item.id));
  const rest = getPublishedBlogs()
    .filter((blog) => !featuredIds.has(blog.id))
    .map((blog, index) => toBlogCard(blog, featured.length + index));

  return [...featured, ...rest];
};

const InsightGrid = ({
  items,
  showCategoryFilter = false,
  exploreAction,
  exploreTo = "/blog",
  exploreLabel = "Explore the blog",
  /** When true: Explore expands remaining posts on this page (no navigation). */
  expandable = false,
}) => {
  const allItems = useMemo(
    () => items || buildOrderedPublished(),
    [items]
  );
  const categories = useMemo(
    () =>
      items && items.length
        ? [...new Set(items.map((item) => item.category).filter(Boolean))]
        : getPublishedBlogCategories(),
    [items]
  );

  const [showAll, setShowAll] = useState(false);
  const [category, setCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (!showAll || category === "All") return allItems;
    return allItems.filter((item) => item.category === category);
  }, [allItems, category, showAll]);

  const visibleItems =
    expandable && !showAll
      ? filteredItems.slice(0, INITIAL_COUNT)
      : filteredItems;

  const hasMore = expandable && allItems.length > INITIAL_COUNT;

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      setCategory("All");
      window.requestAnimationFrame(() => {
        document
          .getElementById("blog")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    setShowAll(true);
  };

  const handleExplore = (event) => {
    if (!exploreAction) return;
    event.preventDefault();
    exploreAction();
  };

  return (
    <Reveal as="section" className="blog-section" id="blog">
      <div className="section-top">
        <Reveal animation="fade-up" delay={0}>
          <div className="eyebrow blue">THE SOCIOHOOD BLOG</div>
          <h2>
            Ideas grounded
            <br />
            in operations.
          </h2>
        </Reveal>
        <Reveal animation="fade-up" delay={80}>
          {expandable && hasMore ? (
            <button
              type="button"
              className="text-button"
              onClick={handleToggle}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>
                  Show less <span>−</span>
                </>
              ) : (
                <>
                  Explore the blog <span>+</span>
                </>
              )}
            </button>
          ) : null}
          {!expandable && exploreAction ? (
            <a href="#blog" className="text-button" onClick={handleExplore}>
              {exploreLabel} <span>+</span>
            </a>
          ) : null}
          {!expandable && !exploreAction ? (
            <Link to={exploreTo} className="text-button">
              {exploreLabel} <span>+</span>
            </Link>
          ) : null}
        </Reveal>
      </div>

      {showCategoryFilter && showAll ? (
        <div
          className="blog-category-filter"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {["All", ...categories].map((entry) => (
            <button
              key={entry}
              type="button"
              className={category === entry ? "primary" : "light-secondary"}
              onClick={() => setCategory(entry)}
              style={{ minHeight: 40, padding: "8px 14px", fontSize: "0.85rem" }}
            >
              {entry}
            </button>
          ))}
        </div>
      ) : null}

      <div className="blog-grid">
        {visibleItems.map((item, index) => {
          const isNewlyRevealed =
            expandable && showAll && index >= INITIAL_COUNT;
          const shouldAnimate =
            !expandable || index < INITIAL_COUNT || isNewlyRevealed;

          return (
            <InsightCard
              key={item.id}
              item={item}
              index={index}
              animate={shouldAnimate}
              animationDelay={
                isNewlyRevealed
                  ? (index - INITIAL_COUNT) * 70
                  : 100 + index * 100
              }
            />
          );
        })}
      </div>
    </Reveal>
  );
};

export default InsightGrid;
