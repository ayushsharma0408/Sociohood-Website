import { Link } from "react-router-dom";
import {
  getFeaturedCaseStudies,
  toCaseStudyCard,
} from "../../admin/services/caseStudiesService.js";
import { HOMEPAGE_CASE_STUDY_COUNT } from "../../constants/homepage.js";
import { useCmsContent } from "../../hooks/useCmsContent.js";
import Reveal from "../common/Reveal.jsx";

const StoriesSection = () => {
  useCmsContent();
  const featured = getFeaturedCaseStudies(HOMEPAGE_CASE_STUDY_COUNT).map(
    (study, index) => toCaseStudyCard(study, index)
  );

  return (
    <Reveal as="section" className="stories-section" id="case-studies">
      <div className="section-top">
        <div>
          <div className="eyebrow blue">CASE STUDIES</div>
          <h2>
            The difference is
            <br />
            in the details.
          </h2>
        </div>
        <div>
          <p>
            See how ownership, service deadlines and closure become part of a
            connected operational process.
          </p>
          <Link to="/case-studies" className="text-button">
            View all case studies <span>+</span>
          </Link>
        </div>
      </div>
      <div className="story-grid">
        {featured.map((item, index) => (
          <Link
            key={item.id}
            to={item.href || `/case-studies/${item.slug}`}
            className={`story-card story-${index} reveal is-visible`}
          >
            <span className="story-index">
              {item.index} / {item.category}
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
        ))}
      </div>
    </Reveal>
  );
};

export default StoriesSection;
