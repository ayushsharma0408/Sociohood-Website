import { ShieldCheck } from "lucide-react";
import {
  getFeaturedClients,
  toClientCard,
} from "../../admin/services/clientsService.js";
import { HOMEPAGE_CLIENT_COUNT } from "../../constants/homepage.js";
import { useCmsContent } from "../../hooks/useCmsContent.js";
import Reveal from "../common/Reveal.jsx";

const CredibilitySection = () => {
  useCmsContent();
  const featured = getFeaturedClients(HOMEPAGE_CLIENT_COUNT).map(toClientCard);

  return (
    <Reveal as="section" className="credibility" id="about">
      <div className="trust-label">CLIENTS & DEPLOYMENTS</div>
      <div className="client-wall">
        {featured.map((client) => (
          <div
            key={client.id}
            className={`client-brand${client.className ? ` ${client.className}` : ""}`}
          >
            {client.logo ? (
              <img src={client.logo} alt={client.logoAlt || client.name} />
            ) : null}
            <b>{client.name}</b>
            <span>{client.description}</span>
          </div>
        ))}
      </div>
      <div className="institution-row">
        <div>
          <ShieldCheck size={24} />
          <span>
            <small>BACKED BY</small>
            <b>Department of Science & Technology</b>
            <p>Government of India · through the IDEAS-TIH ecosystem</p>
          </span>
        </div>
        <div>
          <img
            className="institution-logo"
            src="/brand/isi.png"
            alt="Indian Statistical Institute"
          />
          <span>
            <small>INCUBATED AT</small>
            <b>Indian Statistical Institute, Kolkata</b>
            <p>IDEAS · Technology Innovation Hub</p>
          </span>
        </div>
      </div>
    </Reveal>
  );
};

export default CredibilitySection;
