import Reveal from "../common/Reveal.jsx";
import { useBookDemo, useSampleDemo } from "../../context/BookDemoContext.jsx";

const ClosingSection = () => {
  const { openBookDemo } = useBookDemo();
  const { openSampleDemo } = useSampleDemo();

  return (
    <Reveal as="section" className="closing" id="closing">
      <div className="eyebrow blue">SEE THE WORKFLOW FOR YOURSELF</div>
      <h2>
        Less chasing.
        <br />
        More accountability.
      </h2>
      <p>
        Walk us through your current complaint process.
        <br />
        See how SocioHood could fit your operations.
      </p>
      <div className="actions">
        <button type="button" className="primary" onClick={openBookDemo}>
          Book a demo
        </button>
        <button type="button" className="light-secondary" onClick={openSampleDemo}>
          Try sample workspace
        </button>
      </div>
    </Reveal>
  );
};

export default ClosingSection;
