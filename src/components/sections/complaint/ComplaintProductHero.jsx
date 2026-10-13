import { useBookDemo, useSampleDemo } from "../../../context/BookDemoContext.jsx";

const ComplaintProductHero = () => {
  const { openBookDemo } = useBookDemo();
  const { openSampleDemo } = useSampleDemo();

  return (
    <section className="product-hero">
      <div className="eyebrow product-hero-stagger">OUR FLAGSHIP PRODUCT</div>
      <h1 className="product-hero-stagger">
        Every issue has an owner. Every action has a record.
      </h1>
      <p className="product-hero-stagger">
        Connect reporting, routing, vendor execution, service deadlines and verified closure in a
        configurable operational workflow.
      </p>
      <span className="product-hero-stagger">
        Designed for industrial plants, townships and institutional campuses.
      </span>
      <div className="actions product-hero-stagger">
        <button type="button" className="primary" onClick={openBookDemo}>
          Book a demo
        </button>
        <button type="button" className="secondary" onClick={openSampleDemo}>
          Try sample workspace
        </button>
      </div>
    </section>
  );
};

export default ComplaintProductHero;
