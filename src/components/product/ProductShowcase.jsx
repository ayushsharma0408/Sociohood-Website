import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";
import ImageLightbox from "../common/ImageLightbox.jsx";

const CAPTION_SLIDE_MS = 500;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProductShowcase = ({
  image,
  alt,
  states,
  browserLabel = "SocioHood · Admin console",
  deviceLabel = "",
  compact = false,
  numbered = false,
  autoPlayMs = 4200,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [cycleToken, setCycleToken] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [captionHeight, setCaptionHeight] = useState(undefined);
  const [reduceMotion, setReduceMotion] = useState(false);

  const captionPanelRefs = useRef([]);
  const active = states[activeIndex];
  const screenSrc = active.image || image;
  const screenAlt = active.alt || alt;
  const aspect = active.aspect || 2200 / 1172;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!playing || states.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % states.length);
    }, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [playing, states.length, autoPlayMs, cycleToken]);

  const measureCaption = () => {
    const panel = captionPanelRefs.current[activeIndex];
    const nextHeight = panel?.offsetHeight ?? 0;
    if (nextHeight > 0) setCaptionHeight(nextHeight);
  };

  useLayoutEffect(() => {
    measureCaption();
  }, [activeIndex, states]);

  useEffect(() => {
    const onResize = () => measureCaption();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  const selectState = (index) => {
    setActiveIndex(index);
    setPlaying(true);
    setCycleToken((token) => token + 1);
  };

  const spotlight = (
    <span
      className="dashboard-spotlight"
      style={{
        left: active.rect.left,
        top: active.rect.top,
        width: active.rect.width,
        height: active.rect.height,
      }}
    >
      <span className="spotlight-number">{Number(active.index)}</span>
    </span>
  );

  const controls = (
    <div className="spotlight-controls">
      <div aria-label="Dashboard highlights">
        {states.map((state, index) => (
          <button
            key={state.id}
            type="button"
            title={state.label}
            aria-label={`Highlight ${state.label}`}
            aria-pressed={index === activeIndex}
            onClick={() => selectState(index)}
          >
            {numbered ? index + 1 : state.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="spotlight-toggle"
        aria-label={playing ? "Pause dashboard highlights" : "Resume dashboard highlights"}
        aria-pressed={!playing}
        onClick={() => {
          setPlaying((value) => {
            const next = !value;
            if (next) setCycleToken((token) => token + 1);
            return next;
          });
        }}
      >
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
    </div>
  );

  const captionTrackStyle = {
    transform: `translateX(-${activeIndex * 100}%)`,
    transition: reduceMotion || prefersReducedMotion()
      ? "none"
      : `transform ${CAPTION_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
  };

  return (
    <div className={`guided-product-image ${compact ? "compact" : "hero-image"} ${className}`.trim()}>
      {compact && deviceLabel ? (
        <div className="role-visual-top">
          <div className="role-device-label">{deviceLabel}</div>
          {controls}
        </div>
      ) : (
        controls
      )}
      <button
        type="button"
        className="screen-view"
        aria-label={`Enlarge ${screenAlt}`}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={screenSrc}
          alt={screenAlt}
          width={2200}
          height={1172}
          loading={compact ? "lazy" : "eager"}
        />
        {spotlight}
        <span className="enlarge">
          <Maximize2 size={16} /> Enlarge screen
        </span>
      </button>

      <div
        className="spotlight-caption-viewport"
        style={captionHeight ? { height: `${captionHeight}px` } : undefined}
      >
        <div className="spotlight-caption-track" style={captionTrackStyle}>
          {states.map((state, index) => (
            <div
              key={state.id}
              className="spotlight-caption-panel"
              ref={(node) => {
                captionPanelRefs.current[index] = node;
              }}
              aria-hidden={index !== activeIndex}
            >
              <div className="spotlight-caption is-visible">
                <span className="spotlight-index">{state.index}</span>
                <div>
                  <h3>{state.title}</h3>
                  <p>{state.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageLightbox
        src={screenSrc}
        alt={screenAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        aspect={aspect}
        caption={`${screenAlt} · Product screen supplied by SocioHood`}
      >
        {spotlight}
      </ImageLightbox>
      {browserLabel ? null : null}
    </div>
  );
};

export default ProductShowcase;
