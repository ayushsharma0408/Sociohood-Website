import { implementationSteps } from "../../data/modules.js";
import { useBookDemo } from "../../context/BookDemoContext.jsx";
import Reveal from "../common/Reveal.jsx";

const ImplementationSection = () => {
  const { openBookDemo } = useBookDemo();

  return (
    <Reveal as="section" className="implementation-section">
      <div>
        <div className="eyebrow blue">CONFIGURED AROUND YOUR OPERATIONS</div>
        <h2>
          Your locations.
          <br />
          Your responsibilities.
          <br />
          <span>A process that fits.</span>
        </h2>
        <p>
          A plant and a township have different operating structures. Agree the workflow before
          bringing your teams on board.
        </p>
        <button type="button" className="primary" onClick={openBookDemo}>
          Book a demo
        </button>
      </div>
      <div className="setup-list">
        {implementationSteps.map((step) => (
          <div key={step.index}>
            <span>{step.index}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
};

export default ImplementationSection;
