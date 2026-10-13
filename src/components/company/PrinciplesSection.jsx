import { companyExperience, principles } from "../../data/company.js";
import Reveal from "../common/Reveal.jsx";

const PrinciplesSection = () => (
  <Reveal as="section" className="company-story">
    <Reveal animation="fade-up" delay={0}>
      <h2>Experience shapes what we build.</h2>
    </Reveal>
    <Reveal animation="fade-up" delay={80}>
      <p>{companyExperience}</p>
    </Reveal>
    <div className="company-principles">
      {principles.map((item, index) => (
        <Reveal key={item.index} animation="fade-up" delay={index * 120}>
          <span>{item.index}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Reveal>
      ))}
    </div>
  </Reveal>
);

export default PrinciplesSection;
