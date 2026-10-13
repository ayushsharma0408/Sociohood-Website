import Reveal from "../common/Reveal.jsx";

const items = [
  {
    index: "01",
    title: "Who owns this?",
    description: "Route complaints to mapped vendors and responsible teams.",
  },
  {
    index: "02",
    title: "When is it due?",
    description: "Make SLA deadlines and escalation visible.",
  },
  {
    index: "03",
    title: "Is it really resolved?",
    description: "Connect the work record, OTP closure and feedback.",
  },
];

const PainSection = () => (
  <Reveal as="section" className="pain-section">
    <div>
      <div className="eyebrow blue">THE PROBLEM ISN’T RECORDING THE COMPLAINT</div>
      <h2>
        It’s what happens
        <br />
        <span>after it’s raised.</span>
      </h2>
    </div>
    <div className="pain-grid">
      {items.map((item) => (
        <div key={item.index}>
          <span>{item.index}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </Reveal>
);

export default PainSection;
