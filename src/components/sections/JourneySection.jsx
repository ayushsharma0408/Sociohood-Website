import Reveal from "../common/Reveal.jsx";
import ComplaintJourney from "../journey/ComplaintJourney.jsx";

const JourneySection = () => (
  <Reveal as="section" className="journey-section connected-journey" id="workflow">
    <div className="section-top">
      <div>
        <div className="eyebrow blue">ONE COMPLAINT. A CONNECTED JOURNEY.</div>
        <h2>
          Watch ownership
          <br />
          <span>turn into action.</span>
        </h2>
      </div>
      <div className="journey-intro">
        <p>
          Follow one complaint from automatic assignment to resolution, feedback and Job
          Measurement Report review.
        </p>
      </div>
    </div>
    <ComplaintJourney />
  </Reveal>
);

export default JourneySection;
