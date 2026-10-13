import Reveal from "../../common/Reveal.jsx";
import {
  complaintDetailNote,
  complaintRoles,
  complaintUseCase,
} from "../../../data/complaintFeatures.js";

const ComplaintRoles = () => (
  <Reveal as="section" className="roles-section">
    <div className="eyebrow blue">WHO USES IT</div>
    <h2>Different roles. A connected process.</h2>
    <div className="roles-grid">
      {complaintRoles.map((role, index) => (
        <Reveal key={role.id} className="role-card" animation="fade-up" delay={index * 80}>
          <h3>{role.title}</h3>
          <p>{role.description}</p>
        </Reveal>
      ))}
    </div>
    <Reveal className="use-example" animation="fade-up" delay={120}>
      <b>{complaintUseCase.label}</b>
      <p>{complaintUseCase.body}</p>
    </Reveal>
    <p className="detail-note">{complaintDetailNote}</p>
  </Reveal>
);

export default ComplaintRoles;
