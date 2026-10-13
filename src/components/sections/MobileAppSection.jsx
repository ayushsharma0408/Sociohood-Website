import { useState } from "react";
import { Clock3, Maximize2, Ticket, Wrench } from "lucide-react";
import Reveal from "../common/Reveal.jsx";
import ImageLightbox from "../common/ImageLightbox.jsx";

const benefits = [
  {
    icon: Ticket,
    title: "Raise a complaint",
    description: "Give the issue a place in the shared complaint record.",
  },
  {
    icon: Clock3,
    title: "Follow status and deadlines",
    description: "See complaint details and the service deadline in the app.",
  },
  {
    icon: Wrench,
    title: "Keep every stakeholder connected",
    description:
      "Mobile access connects administrators, users and vendors around the complaint workflow.",
  },
];

const MobileAppSection = () => {
  const [open, setOpen] = useState(false);
  const alt =
    "SocioHood mobile app showing complaint status, service deadline, category and location";

  return (
    <Reveal as="section" className="mobile-app-showcase">
      <div className="mobile-app-copy">
        <div className="eyebrow blue">COMPLAINT MANAGEMENT · MOBILE APP</div>
        <h2>
          One app.
          <br />
          Every stakeholder.
        </h2>
        <p>
          Admins, users and vendors all access SocioHood through the mobile app, with views for
          their responsibilities. Users raise and follow complaints, vendors see assigned work, and
          admins stay connected to operations. The web dashboard provides additional management
          oversight.
        </p>
        <div className="app-benefits">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}>
                <Icon size={21} />
                <span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </span>
              </div>
            );
          })}
        </div>
        <a href="#product" className="text-button">
          Explore the complaint-management system <span>+</span>
        </a>
      </div>

      <div className="app-screen-showcase">
        <div className="app-screen-heading">USER APP · COMPLAINT DETAILS</div>
        <div className="app-screen-frame">
          <button
            type="button"
            className="screen-view mobile-screen"
            aria-label={`Enlarge ${alt}`}
            onClick={() => setOpen(true)}
          >
            <img src="/product/user-complaints.webp" alt={alt} loading="lazy" />
            <span className="enlarge">
              <Maximize2 size={16} /> Enlarge screen
            </span>
          </button>
        </div>
        <p>Actual product screen · tap to enlarge</p>
      </div>

      <ImageLightbox
        src="/product/user-complaints.webp"
        alt={alt}
        isOpen={open}
        onClose={() => setOpen(false)}
        aspect={738 / 1531}
        caption={`${alt} · Product screen supplied by SocioHood`}
      />
    </Reveal>
  );
};

export default MobileAppSection;
