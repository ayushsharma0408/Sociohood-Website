import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { getDeployments } from "../../data/company.js";
import { useCmsContent } from "../../hooks/useCmsContent.js";
import Reveal from "../common/Reveal.jsx";

const DeploymentSection = () => {
  useCmsContent();
  const deployments = getDeployments();

  return (
    <Reveal as="section" className="credibility">
      <div className="trust-label">CLIENTS & DEPLOYMENTS</div>
      <div className="client-wall">
        {deployments.map((item, index) => (
          <Reveal
            key={item.id}
            className={`client-brand${item.className ? ` ${item.className}` : ""}`}
            animation="fade-up"
            delay={index * 80}
          >
            {item.logo ? <img src={item.logo} alt={item.logoAlt} /> : null}
            <b>{item.name}</b>
            <span>{item.location}</span>
          </Reveal>
        ))}
      </div>
      {deployments.length === 0 ? (
        <p style={{ marginTop: 20, color: "#63708a" }}>
          No active deployments are listed right now.
        </p>
      ) : null}
      <div style={{ marginTop: 18 }}>
        <Link to="/clients" className="text-button">
          Explore all clients <span>+</span>
        </Link>
      </div>
      <div className="institution-row">
        <Reveal className="institution-item" animation="fade-up" delay={80}>
          <ShieldCheck size={24} />
          <span>
            <small>BACKED BY</small>
            <b>Department of Science & Technology</b>
            <p>Government of India · through the IDEAS-TIH ecosystem</p>
          </span>
        </Reveal>
        <Reveal className="institution-item" animation="fade-up" delay={160}>
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
        </Reveal>
      </div>
    </Reveal>
  );
};

export default DeploymentSection;
