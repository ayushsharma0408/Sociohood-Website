import { productStates } from "../../data/productStates.js";
import { useBookDemo, useCustomSoftware } from "../../context/BookDemoContext.jsx";
import ProductShowcase from "../product/ProductShowcase.jsx";

const HeroSection = () => {
  const { openBookDemo } = useBookDemo();
  const { openCustomSoftware } = useCustomSoftware();

  return (
    <section className="sales-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="sales-hero-copy">
        <div className="eyebrow hero-stagger">COMPLAINT MANAGEMENT FOR PLANTS & TOWNSHIPS</div>
        <h1 className="hero-stagger">
          Complaints
          <br />
          shouldn’t need
          <br />
          <em>chasing.</em>
        </h1>
        <p className="hero-stagger">
          Give every complaint a clear owner, a visible deadline and an accountable path to
          closure.
        </p>
        <div className="actions hero-stagger">
          <button type="button" className="primary" onClick={openBookDemo}>
            Book a demo
          </button>
          <button type="button" className="secondary" onClick={openCustomSoftware}>
            Build custom software
          </button>
        </div>
        <p className="hero-platforms hero-stagger">
          One mobile app for admins, users and vendors.
          <br />
          Plus a web dashboard for management.
        </p>
        <div className="hero-use hero-stagger">
          <strong>Live in the Tata Motors ecosystem.</strong>
          <span>Built for the people who report, manage and resolve.</span>
        </div>
      </div>

      <div className="product-stage guided-dashboard hero-stagger-showcase">
        <div className="stage-label">
          <span>INSIDE SOCIOHOOD</span>
          <b>A clearer view of the work.</b>
        </div>
        <div className="hero-desktop">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>SocioHood · Admin console</span>
          </div>
          <ProductShowcase
            image="/product/admin-complaints.webp"
            alt="Admin complaint console with status counts, filters and complaint records"
            states={productStates}
          />
        </div>
        <div className="stage-caption">
          Actual product screen · screenshot figures belong to this workspace
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
