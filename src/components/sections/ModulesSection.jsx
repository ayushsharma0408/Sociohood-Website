import { Bell, DoorOpen, MessagesSquare, UtensilsCrossed } from "lucide-react";
import { modules } from "../../data/modules.js";
import Reveal from "../common/Reveal.jsx";

const icons = {
  utensils: UtensilsCrossed,
  door: DoorOpen,
  bell: Bell,
  messages: MessagesSquare,
};

const ModulesSection = () => (
  <Reveal as="section" className="optional-modules" id="extensions">
    <div className="modules-heading">
      <div>
        <div className="eyebrow blue">OPTIONAL MODULES</div>
        <h2>
          Start with complaints.
          <br />
          Connect more when you need it.
        </h2>
        <p>
          Extend the setup around your operations, with the modules and scope agreed for your
          organisation.
        </p>
      </div>
      <button
        type="button"
        className="modules-discuss"
        onClick={() => document.getElementById("closing")?.scrollIntoView({ behavior: "smooth" })}
      >
        Discuss your requirements
      </button>
    </div>
    <div className="module-options">
      {modules.map((item) => {
        const Icon = icons[item.icon];
        return (
          <div key={item.id}>
            <Icon size={21} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
    <p className="modules-scope">
      Optional modules are scoped separately. Inclusion and availability are confirmed during your
      discussion.
    </p>
  </Reveal>
);

export default ModulesSection;
