import Reveal from "../common/Reveal.jsx";
import { useCustomSoftware } from "../../context/BookDemoContext.jsx";

const ProjectInviteSection = () => {
  const { openCustomSoftware } = useCustomSoftware();

  return (
    <Reveal as="section" className="project-invite" id="custom">
      <div className="eyebrow">HAVE A DIFFERENT SOFTWARE CHALLENGE?</div>
      <div>
        <h2>Have a different software need?</h2>
        <p>We build web apps, mobile apps and business systems around your requirements.</p>
      </div>
      <button type="button" className="white-button" onClick={openCustomSoftware}>
        Build custom software
      </button>
    </Reveal>
  );
};

export default ProjectInviteSection;
