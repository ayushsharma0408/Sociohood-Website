import { useEffect } from "react";
import { useCmsContent } from "../hooks/useCmsContent.js";
import { Link } from "react-router-dom";
import Navbar from "../components/navigation/Navbar.jsx";
import FooterSection from "../components/sections/FooterSection.jsx";
import Reveal from "../components/common/Reveal.jsx";
import {
  getActiveClients,
  toClientCard,
} from "../admin/services/clientsService.js";

const Clients = () => {
  useCmsContent();
  const clients = getActiveClients().map(toClientCard);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Clients & deployments | SocioHood";
    return () => {
      document.title = "SocioHood | Complaints shouldn’t need chasing";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="case-studies-page">
        <Reveal as="section" className="page-hero">
          <div className="eyebrow blue">CLIENTS & DEPLOYMENTS</div>
          <h1>
            Deployments and
            <br />
            operating environments.
          </h1>
          <p>
            Active client and deployment listings managed through the SocioHood
            CMS. Deactivated entries stay out of this public list.
          </p>
        </Reveal>

        <Reveal as="section" className="credibility">
          <div className="trust-label">ALL ACTIVE CLIENTS</div>
          <div className="client-wall">
            {clients.map((client, index) => (
              <Reveal
                key={client.id}
                className={`client-brand${client.className ? ` ${client.className}` : ""}`}
                animation="fade-up"
                delay={index * 60}
              >
                {client.logo ? (
                  <img src={client.logo} alt={client.logoAlt || client.name} />
                ) : null}
                <b>{client.name}</b>
                <span>{client.description}</span>
                {client.website ? (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-button"
                    style={{
                      marginTop: 10,
                      display: "inline-flex",
                      fontSize: "0.85rem",
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {client.website.replace(/^https?:\/\//i, "")} <span>+</span>
                  </a>
                ) : null}
              </Reveal>
            ))}
          </div>
          {clients.length === 0 ? (
            <p className="admin-empty" style={{ marginTop: 24 }}>
              No active clients are available right now.
            </p>
          ) : null}
          <Link
            to="/"
            className="text-button"
            style={{ marginTop: 28, display: "inline-flex" }}
          >
            Back to home <span>+</span>
          </Link>
        </Reveal>
      </main>
      <FooterSection />
    </>
  );
};

export default Clients;
