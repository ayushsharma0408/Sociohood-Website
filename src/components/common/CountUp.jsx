import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 2000;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const formatLakh = (value) => {
  if (value >= 100000) return "1 lakh+";
  if (value <= 0) return "0";
  const thousands = Math.floor(value / 1000);
  if (thousands < 1) return "0";
  return `${thousands}k+`;
};

const formatPercent = (value) => `${Math.round(value)}%`;

const formatValue = (value, format, suffix) => {
  if (format === "lakh") return formatLakh(value);
  if (suffix === "%") return formatPercent(value);
  return `${Math.round(value)}${suffix || ""}`;
};

const CountUp = ({
  end,
  format = "number",
  suffix = "",
  duration = DEFAULT_DURATION,
  active = false,
  className = "",
}) => {
  const finalLabel = formatValue(end, format, suffix);
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? finalLabel : formatValue(0, format, suffix)
  );
  const frameRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    if (reduced) {
      completedRef.current = true;
      setDisplay(finalLabel);
      return undefined;
    }

    if (!active || completedRef.current) {
      if (completedRef.current) setDisplay(finalLabel);
      return undefined;
    }

    let cancelled = false;
    const start = performance.now();

    const finish = () => {
      completedRef.current = true;
      setDisplay(finalLabel);
    };

    const tick = (now) => {
      if (cancelled) return;

      const progress = Math.min(1, (now - start) / duration);

      if (progress >= 1) {
        finish();
        return;
      }

      const eased = easeOutCubic(progress);
      setDisplay(formatValue(end * eased, format, suffix));

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    const safety = window.setTimeout(() => {
      if (!cancelled && !completedRef.current) finish();
    }, duration + 80);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(safety);
    };
  }, [active, duration, end, format, suffix, finalLabel]);

  return (
    <span className={`count-up ${className}`.trim()}>
      <span className="count-up-sizer" aria-hidden="true">
        {finalLabel}
      </span>
      <span className="count-up-value">{display}</span>
    </span>
  );
};

export default CountUp;
