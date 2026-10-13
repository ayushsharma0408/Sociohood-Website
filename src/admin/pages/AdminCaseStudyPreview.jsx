import { Link, useParams } from "react-router-dom";
import { sanitizeBlogHtml } from "../../utils/blogHtml.js";
import AdminPreviewChrome from "../components/AdminPreviewChrome.jsx";
import { getCaseStudy } from "../services/caseStudiesService.js";

const PreviewHtml = ({ html, emptyLabel }) => {
  const safe = sanitizeBlogHtml(html);
  if (!safe) return <p>{emptyLabel}</p>;
  return (
    <div
      className="blog-article-body case-study-copy"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
};

const AdminCaseStudyPreview = () => {
  const { id } = useParams();
  const study = getCaseStudy(id);

  if (!study) {
    return (
      <main className="admin-page">
        <h2 className="admin-page-heading">Case study preview</h2>
        <div className="admin-panel admin-placeholder">
          <p className="admin-empty">Case study not found in local mock data.</p>
          <p className="admin-empty">
            <Link to="/admin/case-studies">Back to case studies</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <AdminPreviewChrome
      contentType="Case study"
      status={study.status}
      backToListTo="/admin/case-studies"
      backToListLabel="Back to list"
      backToEditorTo={`/admin/case-studies/${study.id}/edit`}
    >
      <div className="case-studies-page admin-preview-surface">
        <section className="case-hero">
          <div className="case-hero-grid">
            <div>
              <div className="eyebrow blue">IMPLEMENTATION STORY</div>
              <h1>{study.title}</h1>
              <p>{study.description}</p>
              <div className="admin-preview-meta-row">
                <span>{study.client}</span>
                <span>{study.category}</span>
                <span>{study.status}</span>
              </div>
            </div>
            <div className={`story-card story-0 admin-preview-metric-card`}>
              <span className="story-index">
                {study.category}
              </span>
              <div className="story-number">
                {study.metric || "—"}
                <small>{study.metricLabel || "Metric"}</small>
              </div>
              <h3>{study.client}</h3>
              <p>{study.description}</p>
            </div>
          </div>
        </section>

        {study.heroImage ? (
          <section className="detail-section admin-preview-hero-media-wrap">
            <div className="admin-preview-hero-media">
              <img src={study.heroImage} alt="" />
            </div>
          </section>
        ) : null}

        <section className="detail-section admin-preview-detail-grid">
          <article>
            <h2>Challenge</h2>
            <PreviewHtml
              html={study.challenge}
              emptyLabel="No challenge content yet."
            />
          </article>
          <article>
            <h2>Solution</h2>
            <PreviewHtml
              html={study.solution}
              emptyLabel="No solution content yet."
            />
          </article>
          <article>
            <h2>Results</h2>
            <PreviewHtml
              html={study.results}
              emptyLabel="No results content yet."
            />
          </article>
        </section>

        {study.videoUrl ? (
          <section className="launch-section admin-preview-video">
            <div>
              <div className="eyebrow blue">VIDEO</div>
              <h2>Watch the related story.</h2>
              <p>
                <a href={study.videoUrl} target="_blank" rel="noreferrer">
                  Open video URL
                </a>
              </p>
            </div>
          </section>
        ) : null}
      </div>
    </AdminPreviewChrome>
  );
};

export default AdminCaseStudyPreview;
