import { Link } from "react-router-dom";
import Navbar from "../navigation/Navbar.jsx";
import FooterSection from "../sections/FooterSection.jsx";

const ContentNotFound = ({
  eyebrow = "NOT FOUND",
  title = "This page is not available.",
  description = "The link may be incorrect, or the content is no longer published.",
  backTo = "/",
  backLabel = "Back to home",
}) => (
  <>
    <Navbar />
    <main className="blog-page">
      <section className="page-hero">
        <div className="eyebrow blue">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="actions" style={{ marginTop: 24 }}>
          <Link to={backTo} className="primary">
            {backLabel}
          </Link>
        </div>
      </section>
    </main>
    <FooterSection />
  </>
);

export default ContentNotFound;
