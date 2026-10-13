import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFeaturedCaseStudies,
  getPublishedCaseStudies,
  toCaseStudyCard,
} from "../../admin/services/caseStudiesService.js";
import { HOMEPAGE_CASE_STUDY_COUNT } from "../../constants/homepage.js";
import Reveal from "../common/Reveal.jsx";
import CaseStudyCard from "./CaseStudyCard.jsx";

const INITIAL_COUNT = HOMEPAGE_CASE_STUDY_COUNT;

/**
 * Build list with featured trio first (01–03), then remaining published studies.
 */
const buildOrderedPublished = () => {
  const featured = getFeaturedCaseStudies(INITIAL_COUNT).map((study, index) =>
    toCaseStudyCard(study, index)
  );
  const featuredIds = new Set(featured.map((item) => item.id));
  const rest = getPublishedCaseStudies()
    .filter((study) => !featuredIds.has(study.id))
    .map((study, index) => toCaseStudyCard(study, featured.length + index));

  return [...featured, ...rest];
};

const CaseStudyGrid = ({
  items,
  showViewAll = true,
  viewAllTo = "/case-studies",
  /** When true: View all expands remaining cards on this page (no navigation). */
  expandable = false,
}) => {
  const allStudies = useMemo(
    () => items || buildOrderedPublished(),
    [items]
  );
  const [showAll, setShowAll] = useState(false);

  const visibleStudies =
    expandable && !showAll
      ? allStudies.slice(0, INITIAL_COUNT)
      : allStudies;

  const hasMore = expandable && allStudies.length > INITIAL_COUNT;

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      window.requestAnimationFrame(() => {
        document
          .getElementById("case-studies")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    setShowAll(true);
  };

  return (
    <Reveal as="section" className="stories-section" id="case-studies">
      <div className="section-top">
        <Reveal animation="fade-up" delay={0}>
          <div className="eyebrow blue">CASE STUDIES</div>
          <h2>
            The difference is
            <br />
            in the details.
          </h2>
        </Reveal>
        <Reveal animation="fade-up" delay={100}>
          <p>
            See how ownership, service deadlines and closure become part of a
            connected operational process.
          </p>
          {expandable && hasMore ? (
            <button
              type="button"
              className="text-button"
              onClick={handleToggle}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>
                  Show fewer case studies <span>−</span>
                </>
              ) : (
                <>
                  View all case studies <span>+</span>
                </>
              )}
            </button>
          ) : null}
          {!expandable && showViewAll ? (
            <Link to={viewAllTo} className="text-button">
              View all case studies <span>+</span>
            </Link>
          ) : null}
        </Reveal>
      </div>
      <div className="story-grid">
        {visibleStudies.map((item, index) => {
          const isNewlyRevealed =
            expandable && showAll && index >= INITIAL_COUNT;
          // First 3 keep a stable Reveal wrapper; only newly revealed cards stagger in.
          const shouldAnimate = !expandable || index < INITIAL_COUNT || isNewlyRevealed;

          return (
            <CaseStudyCard
              key={item.id}
              item={item}
              index={index}
              animate={shouldAnimate}
              animationDelay={
                isNewlyRevealed
                  ? (index - INITIAL_COUNT) * 70
                  : 150 + index * 100
              }
            />
          );
        })}
      </div>
    </Reveal>
  );
};

export default CaseStudyGrid;
