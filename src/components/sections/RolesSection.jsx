import { useState } from "react";
import { Link } from "react-router-dom";
import { Maximize2 } from "lucide-react";
import { stakeholders } from "../../data/stakeholders.js";
import Reveal from "../common/Reveal.jsx";
import ImageLightbox from "../common/ImageLightbox.jsx";
import ProductShowcase from "../product/ProductShowcase.jsx";

const RolesSection = () => {
  const [activeId, setActiveId] = useState(stakeholders[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = stakeholders.find((item) => item.id === activeId) || stakeholders[0];
  const isPortrait = active.orientation === "portrait";

  return (
    <Reveal as="section" className="roles-showcase" id="product">
      <div className="role-heading">
        <div className="eyebrow blue">THE PRODUCT, IN YOUR PEOPLE’S HANDS</div>
        <h2>
          Different responsibilities.
          <br />
          One connected record.
        </h2>
        <p>
          Mobile access for admins, users and vendors. A web dashboard adds a shared view for
          management.
        </p>
        <div className="role-select" role="tablist" aria-label="Product roles">
          {stakeholders.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`role-tab-${index}`}
              aria-controls="role-panel"
              tabIndex={item.id === activeId ? 0 : -1}
              aria-selected={item.id === activeId}
              onClick={() => {
                setActiveId(item.id);
                setLightboxOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="role-description"
          role="tabpanel"
          id="role-panel"
          aria-labelledby={`role-tab-${stakeholders.findIndex((item) => item.id === activeId)}`}
          key={active.id}
        >
          <h3>{active.title}</h3>
          <p>{active.description}</p>
        </div>
        <Link to="/products/complaint-management" className="text-button">
          Explore complaint management <span>+</span>
        </Link>
      </div>

      <div className={`role-visual ${isPortrait ? "portrait" : ""}`.trim()} key={active.id}>
        {active.spotlights ? (
          <ProductShowcase
            image={active.image}
            alt={active.alt}
            states={active.spotlights}
            compact
            numbered
            deviceLabel={active.deviceLabel}
          />
        ) : (
          <>
            <div className="role-device-label">{active.deviceLabel}</div>
            <button
              type="button"
              className="screen-view mobile-screen"
              aria-label={`Enlarge ${active.alt}`}
              onClick={() => setLightboxOpen(true)}
            >
              <img src={active.image} alt={active.alt} loading="lazy" />
              <span className="enlarge">
                <Maximize2 size={16} /> Enlarge screen
              </span>
            </button>
            <ImageLightbox
              src={active.image}
              alt={active.alt}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              aspect={738 / 1531}
              caption={`${active.alt} · Product screen supplied by SocioHood`}
            />
          </>
        )}
      </div>
    </Reveal>
  );
};

export default RolesSection;
