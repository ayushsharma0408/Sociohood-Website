import { useEffect, useRef, useState } from "react";
import Reveal from "../common/Reveal.jsx";
import CountUp from "../common/CountUp.jsx";

const EcosystemSection = () => {
  const anchorRef = useRef(null);
  const [countActive, setCountActive] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const section = anchorRef.current?.closest("section.ecosystem-proof");
    if (!section || hasTriggeredRef.current) return undefined;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      hasTriggeredRef.current = true;
      setCountActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasTriggeredRef.current) return;
        if (entry.intersectionRatio < 0.28) return;
        hasTriggeredRef.current = true;
        setCountActive(true);
        observer.disconnect();
      },
      { threshold: [0, 0.15, 0.28, 0.35, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal as="section" className="ecosystem-proof">
      <div className="proof-context" ref={anchorRef}>
        <span>PROVEN IN REAL OPERATIONS</span>
        <h2>
          Tata Motors{" "}
          <br />
          ecosystem
        </h2>
      </div>
      <div>
        <strong>
          <CountUp end={100000} format="lakh" active={countActive} />
        </strong>
        <span>Complaints raised</span>
      </div>
      <div>
        <strong>
          <CountUp end={97} suffix="%" active={countActive} />
        </strong>
        <span>Closure rate</span>
      </div>
      <div>
        <strong>
          <CountUp end={100} suffix="%" active={countActive} />
        </strong>
        <span>SLA monitored</span>
      </div>
      <p>
        Figures across the Tata Motors ecosystem. SLA monitoring measures tracking coverage; it does
        not mean every complaint meets its deadline.
      </p>
    </Reveal>
  );
};

export default EcosystemSection;
