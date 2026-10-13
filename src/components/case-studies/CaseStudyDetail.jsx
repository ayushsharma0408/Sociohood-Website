import { Link } from "react-router-dom";
import { sanitizeBlogHtml } from "../../utils/blogHtml.js";
import Reveal from "../common/Reveal.jsx";
import CaseStudiesCta from "./CaseStudiesCta.jsx";
import CaseStudyCard from "./CaseStudyCard.jsx";
import LaunchVideo from "./LaunchVideo.jsx";
import { youtubeIdFromUrl } from "../../admin/services/caseStudiesService.js";

const CaseStudyHtml = ({ html }) => {
  const safe = sanitizeBlogHtml(html);
  if (!safe) return null;
  return (
    <div
      className="blog-article-body case-study-copy"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
};

const CaseStudyDetail = ({ study, related = [] }) => {
  const videoId = youtubeIdFromUrl(study.videoUrl);
  const isDemo =
    study.isDemo ||
    String(study.client || "")
      .toLowerCase()
      .includes("demo") ||
    String(study.client || "")
      .toLowerCase()
      .includes("sample");

  return (
    <main className="case-studies-page">
      <Reveal as="section" className="case-hero">
        <div className="case-hero-copy">
          <div className="eyebrow blue">
            {study.index ? `${study.index} / ` : ""}
            {study.category}
          </div>
          <h1>{study.title}</h1>
          <p>{study.description}</p>
          <p className="case-hero-client">
            <strong>{study.client}</strong>
            {isDemo ? " · Demonstration / sample content" : ""}
          </p>
          {study.metric || study.metricLabel ? (
            <div className="case-hero-metric">
              {study.metric}
              {study.metricLabel ? <small>{study.metricLabel}</small> : null}
            </div>
          ) : null}
          <Link to="/case-studies" className="text-button">
            Back to case studies <span>+</span>
          </Link>
        </div>
      </Reveal>

      {study.heroImage ? (
        <Reveal as="section" className="detail-section">
          <img
            src={study.heroImage}
            alt=""
            style={{
              width: "100%",
              maxHeight: 420,
              objectFit: "cover",
              borderRadius: 14,
              border: "1px solid #e1e8f4",
            }}
          />
        </Reveal>
      ) : null}

      <Reveal as="section" className="detail-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 28,
          }}
        >
          <article>
            <h2 style={{ marginTop: 0 }}>Challenge</h2>
            <CaseStudyHtml html={study.challenge} />
          </article>
          <article>
            <h2 style={{ marginTop: 0 }}>Solution</h2>
            <CaseStudyHtml html={study.solution} />
          </article>
          <article>
            <h2 style={{ marginTop: 0 }}>Results</h2>
            <CaseStudyHtml html={study.results} />
          </article>
        </div>
      </Reveal>

      {videoId ? (
        <Reveal as="section" className="detail-section">
          <div className="eyebrow blue">VIDEO</div>
          <h2 style={{ marginTop: 8 }}>Watch the story</h2>
          <div style={{ marginTop: 20 }}>
            <LaunchVideo youtubeId={videoId} />
          </div>
        </Reveal>
      ) : null}

      {related.length > 0 ? (
        <Reveal as="section" className="stories-section">
          <div className="section-top">
            <div>
              <div className="eyebrow blue">RELATED</div>
              <h2>
                More
                <br />
                case studies.
              </h2>
            </div>
            <Link to="/case-studies" className="text-button">
              View all case studies <span>+</span>
            </Link>
          </div>
          <div className="story-grid">
            {related.map((item, index) => (
              <CaseStudyCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </Reveal>
      ) : null}

      <CaseStudiesCta />
    </main>
  );
};

export default CaseStudyDetail;
