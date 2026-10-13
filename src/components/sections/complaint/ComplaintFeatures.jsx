import Reveal from "../../common/Reveal.jsx";
import { complaintFeatures } from "../../../data/complaintFeatures.js";

const ComplaintFeatures = () => (
  <Reveal as="section" className="detail-section">
    <div className="eyebrow blue">FEATURES & WORKFLOWS</div>
    <h2>Details that make the process work.</h2>
    <div className="detail-features">
      {complaintFeatures.map((feature, index) => (
        <Reveal
          key={feature.id}
          className="detail-feature-card"
          animation="fade-up"
          delay={index * 60}
        >
          <span>{feature.index}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </Reveal>
      ))}
    </div>
  </Reveal>
);

export default ComplaintFeatures;
