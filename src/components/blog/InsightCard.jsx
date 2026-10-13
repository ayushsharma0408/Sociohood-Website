import { Link } from "react-router-dom";
import Reveal from "../common/Reveal.jsx";

const InsightCard = ({
  item,
  index = 0,
  animate = true,
  animationDelay,
}) => {
  const card = (
    <Link
      to={item.href || `/blog/${item.slug}`}
      className={`blog-card${animate ? "" : " reveal is-visible"}`}
    >
      <div className={`article-art ${item.artClass || `art-${index % 3}`}`}>
        <span>{item.eyebrow || item.title}</span>
        <small>{item.artSmall || item.readTime}</small>
      </div>
      <div className="blog-content">
        <span>
          {item.category}
          {item.readTime ? ` · ${item.readTime}` : ""}
        </span>
        <h3>{item.title}</h3>
        <p>{item.excerpt || item.description}</p>
        <b>Read article +</b>
      </div>
    </Link>
  );

  if (!animate) return card;

  return (
    <Reveal
      animation="fade-up"
      delay={
        animationDelay != null ? animationDelay : 100 + index * 100
      }
    >
      {card}
    </Reveal>
  );
};

export default InsightCard;
