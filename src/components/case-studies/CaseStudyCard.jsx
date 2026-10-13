import { Link } from "react-router-dom";
import Reveal from "../common/Reveal.jsx";

const CaseStudyCard = ({
  item,
  index = 0,
  animate = true,
  animationDelay,
}) => {
  const card = (
    <Link
      to={item.href || `/case-studies/${item.slug}`}
      className={`story-card story-${index % 3}${animate ? "" : " reveal is-visible"}`}
    >
      <span className="story-index">
        {item.index || String(index + 1).padStart(2, "0")} / {item.category}
      </span>
      <div className="story-number">
        {item.metric}
        <small>{item.metricLabel}</small>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="story-link">
        Read the implementation story <span>+</span>
      </span>
    </Link>
  );

  if (!animate) return card;

  return (
    <Reveal
      animation="fade-up"
      delay={
        animationDelay != null ? animationDelay : 150 + index * 100
      }
    >
      {card}
    </Reveal>
  );
};

export default CaseStudyCard;
