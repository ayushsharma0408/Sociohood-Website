import { incubation } from "../../data/company.js";
import Reveal from "../common/Reveal.jsx";

const IncubationSection = () => (
  <Reveal as="section" className="institution-detail">
    <Reveal animation="fade-up" delay={0}>
      <div className="eyebrow blue">{incubation.eyebrow}</div>
      <h2>{incubation.heading}</h2>
    </Reveal>
    {incubation.paragraphs.map((paragraph, index) => (
      <Reveal key={paragraph.slice(0, 24)} animation="fade-up" delay={80 + index * 80}>
        <p>{paragraph}</p>
      </Reveal>
    ))}
    <Reveal animation="fade-up" delay={240}>
      <a href={incubation.ctaHref} target="_blank" rel="noreferrer">
        {incubation.ctaLabel}
      </a>
    </Reveal>
    <Reveal className="evidence-note" animation="fade-up" delay={300}>
      <b>{incubation.addressLabel}</b>
      <br />
      {incubation.address}
    </Reveal>
  </Reveal>
);

export default IncubationSection;
