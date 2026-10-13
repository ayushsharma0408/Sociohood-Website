import Reveal from "../common/Reveal.jsx";
import { useBookDemo, useSampleDemo } from "../../context/BookDemoContext.jsx";

const BlogCta = () => {
  const { openBookDemo } = useBookDemo();
  const { openSampleDemo } = useSampleDemo();

  return (
    <Reveal as="section" className="article-cta">
      <h2>Let’s talk about your operations.</h2>
      <p>Explore the product or discuss a workflow specific to your organisation.</p>
      <div className="actions">
        <button type="button" className="primary" onClick={openBookDemo}>
          Book a demo
        </button>
        <button type="button" className="light-secondary" onClick={openSampleDemo}>
          Get sample demo access
        </button>
      </div>
    </Reveal>
  );
};

export default BlogCta;
