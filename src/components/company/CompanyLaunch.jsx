import Reveal from "../common/Reveal.jsx";
import { LAUNCH_YOUTUBE_ID } from "../../data/caseStudies.js";
import LaunchVideo from "../case-studies/LaunchVideo.jsx";

const CompanyLaunch = () => (
  <Reveal as="section" className="launch-section" id="launch">
    <div>
      <div className="eyebrow">A REAL-WORLD MILESTONE</div>
      <h2>
        From building software
        <br />
        to putting it to work.
      </h2>
      <p>Watch the SocioHood product launch in the Tata Motors ecosystem.</p>
      <a
        href={`https://youtu.be/${LAUNCH_YOUTUBE_ID}`}
        target="_blank"
        rel="noreferrer"
        className="launch-link"
      >
        Watch on YouTube
      </a>
    </div>
    <LaunchVideo />
  </Reveal>
);

export default CompanyLaunch;
