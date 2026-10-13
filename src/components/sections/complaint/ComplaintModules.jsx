import { Bell, DoorOpen, MessagesSquare, UtensilsCrossed } from "lucide-react";
import Reveal from "../../common/Reveal.jsx";
import { complaintModules } from "../../../data/complaintModules.js";

const icons = {
  utensils: UtensilsCrossed,
  door: DoorOpen,
  bell: Bell,
  messages: MessagesSquare,
};

const ComplaintModules = () => (
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
      <a className="modules-discuss" href="mailto:contact@sociohood.com?subject=Discuss%20requirements">
        Discuss your requirements
      </a>
    </div>
    <div className="module-options">
      {complaintModules.map((item, index) => {
        const Icon = icons[item.icon];
        return (
          <Reveal key={item.id} animation="fade-up" delay={index * 70}>
            <Icon size={21} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Reveal>
        );
      })}
    </div>
    <p className="modules-scope">
      Optional modules are scoped separately. Inclusion and availability are confirmed during your
      discussion.
    </p>
  </Reveal>
);

export default ComplaintModules;
