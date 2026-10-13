import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ChartColumn,
  Check,
  Maximize2,
  Play,
  Pause,
  RotateCcw,
  Ticket,
  UserRound,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  actors,
  complaintMeta,
  journeyPaths,
} from "../../data/journeyStages.js";
import ImageLightbox from "../common/ImageLightbox.jsx";

const actorIcons = [UserRound, Workflow, Wrench, ChartColumn];
const SLIDE_MS = 500;
const AUTOPLAY_PAUSE_MS = 1500;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const JourneyStagePanel = ({ stage, progress, pathId, active }) => {
  const [decision, setDecision] = useState(null);
  const [recordExpanded, setRecordExpanded] = useState(false);
  const actorStyle = useMemo(
    () => ({ "--active-actor": stage.actor }),
    [stage.actor]
  );
  const jmrStatus =
    decision === "approved"
      ? "JMR approved"
      : decision === "denied"
        ? "JMR denied"
        : stage.status;
  const jmrEvent =
    decision === "approved"
      ? "Admin approves the JMR"
      : decision === "denied"
        ? "Admin denies the JMR"
        : stage.event;

  useEffect(() => {
    setDecision(null);
    setRecordExpanded(false);
  }, [stage.id, pathId, active]);

  return (
    <div className="story-scene">
      <div className="actor-handoff">
        <div className="handoff-track" />
        {actors.map((actor, index) => {
          const Icon = actorIcons[index];
          return (
            <div
              key={actor.id}
              className={`actor-station ${stage.actor === index ? "current" : ""}`.trim()}
            >
              <span>
                <Icon size={21} />
              </span>
              <b>{actor.label}</b>
              <small>{actor.detail}</small>
            </div>
          );
        })}
        <div className="handoff-token" style={actorStyle} aria-hidden="true">
          <Ticket size={14} />
        </div>
      </div>

      <div
        className={`persistent-complaint${recordExpanded ? " record-expanded" : ""}`.trim()}
      >
        <div className="complaint-record-heading">
          <span>COMPLAINT RECORD</span>
          <span className="record-status">{jmrStatus}</span>
        </div>
        <h3>{complaintMeta.title}</h3>
        <p className="complaint-location">{complaintMeta.location}</p>
        <button
          type="button"
          className="record-details-toggle"
          aria-expanded={recordExpanded}
          onClick={() => setRecordExpanded((value) => !value)}
        >
          {recordExpanded ? "Hide record details" : "View record details"}
        </button>
        <div className="record-fields">
          {stage.fields.map((field) => (
            <div key={`${pathId}-${stage.id}-${field.label}`}>
              <span>{field.label}</span>
              <strong>{field.value}</strong>
            </div>
          ))}
        </div>
        <div className={`jmr-record${decision ? " visible" : ""}`}>
          <span>Job Measurement Report</span>
          <strong>
            {decision === "approved"
              ? "Approved"
              : decision === "denied"
                ? "Denied"
                : stage.jmr}
          </strong>
        </div>
        <div className="record-event">
          <Check size={17} />
          <span>{jmrEvent}</span>
        </div>
        <div className="record-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
        <small>{complaintMeta.note}</small>
      </div>

      <div className="story-explanation">
        <span className="story-phase">{stage.phase}</span>
        <span className="story-stage-label">{stage.stageLabel}</span>
        <h3>{stage.heading}</h3>
        <p>{stage.description}</p>
        {stage.decisions?.length ? (
          <div className="jmr-decision">
            <span>{stage.decisionPrompt}</span>
            <div>
              {stage.decisions.map((option) => {
                const value = option === "Approve JMR" ? "approved" : "denied";
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={decision === value}
                    onClick={() => setDecision(value)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ComplaintJourney = () => {
  const [pathId, setPathId] = useState("standard");
  const [stageIndex, setStageIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [proofOpen, setProofOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(undefined);
  const [transitioning, setTransitioning] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const viewportRef = useRef(null);
  const panelRefs = useRef([]);
  const railRef = useRef(null);
  const stageButtonRefs = useRef([]);
  const transitionLock = useRef(false);
  const transitionTimer = useRef(null);
  const stageIndexRef = useRef(stageIndex);

  const path = journeyPaths[pathId];
  const stages = path.stages;
  const stage = stages[stageIndex];
  const progressFor = (index) => ((index + 1) / stages.length) * 100;

  stageIndexRef.current = stageIndex;

  /** Escalation path keeps Raise/Auto-assign in the rail, but playback starts at Deadline nears. */
  const pathStartIndex = (nextPathId, nextStages) => {
    if (nextPathId !== "escalation") return 0;
    const deadlineIndex = nextStages.findIndex((item) => item.id === "deadline-nears");
    return deadlineIndex >= 0 ? deadlineIndex : 0;
  };

  const measureViewport = (index = stageIndexRef.current) => {
    const activePanel = panelRefs.current[index];
    const nextHeight = activePanel?.offsetHeight ?? 0;
    if (nextHeight > 0) setViewportHeight(nextHeight);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    measureViewport(stageIndex);
  }, [stageIndex, pathId, stages.length]);

  useEffect(() => {
    const onResize = () => measureViewport();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [stageIndex]);

  useEffect(() => {
    const rail = railRef.current;
    const button = stageButtonRefs.current[stageIndex];
    if (!rail || !button) return;

    const reduced = prefersReducedMotion();
    const railRect = rail.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const delta =
      buttonRect.left -
      railRect.left -
      (rail.clientWidth - buttonRect.width) / 2;

    rail.scrollBy({
      left: delta,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [stageIndex, pathId, stages.length]);

  useEffect(
    () => () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    },
    []
  );

  const beginTransition = () => {
    if (reduceMotion) {
      transitionLock.current = false;
      setTransitioning(false);
      return;
    }

    transitionLock.current = true;
    setTransitioning(true);
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      transitionLock.current = false;
      setTransitioning(false);
      measureViewport();
    }, SLIDE_MS);
  };

  const goTo = (index, { keepPlaying = false } = {}) => {
    if (index === stageIndex) return;
    if (index < 0 || index >= stages.length) return;
    if (transitionLock.current) return;

    if (!keepPlaying) setPlaying(false);
    setStageIndex(index);
    beginTransition();
  };

  useEffect(() => {
    if (!playing || transitioning) return undefined;
    if (stageIndex >= stages.length - 1) return undefined;

    const timer = window.setTimeout(() => {
      goTo(stageIndex + 1, { keepPlaying: true });
    }, AUTOPLAY_PAUSE_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional stage-driven autoplay
  }, [playing, stageIndex, stages.length, transitioning]);

  useEffect(() => {
    if (playing && stageIndex >= stages.length - 1 && !transitioning) {
      const stop = window.setTimeout(() => setPlaying(false), 400);
      return () => window.clearTimeout(stop);
    }
    return undefined;
  }, [playing, stageIndex, stages.length, transitioning]);

  const restart = () => {
    const start = pathStartIndex(pathId, stages);
    setPlaying(false);
    if (start === stageIndex) return;
    goTo(start);
  };

  const switchPath = (nextPath) => {
    if (nextPath === pathId) return;
    if (transitionLock.current) return;
    const nextStages = journeyPaths[nextPath].stages;
    const start = pathStartIndex(nextPath, nextStages);
    setPlaying(false);
    setPathId(nextPath);
    setStageIndex(start);
    beginTransition();
  };

  const trackStyle = {
    transform: `translateX(-${stageIndex * 100}%)`,
    transition: reduceMotion
      ? "none"
      : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
  };

  return (
    <>
      <div className="complaint-story-board">
        <div className="story-topline">
          <span>
            <Ticket size={16} /> EXAMPLE COMPLAINT · {complaintMeta.id}
          </span>
          <span>Illustrative workflow</span>
        </div>

        <div
          ref={viewportRef}
          className={`journey-stage-viewport${transitioning ? " is-transitioning" : ""}`}
          style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
        >
          <div className="journey-stage-track" style={trackStyle}>
            {stages.map((item, index) => (
              <div
                key={`${pathId}-${item.id}`}
                className="journey-stage-panel"
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
                aria-hidden={index !== stageIndex}
              >
                <JourneyStagePanel
                  stage={item}
                  progress={progressFor(index)}
                  pathId={pathId}
                  active={index === stageIndex}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="journey-workspace-controls">
          <div className="story-player-controls">
            <button
              type="button"
              className="audio-control"
              onClick={() => {
                if (stageIndex >= stages.length - 1) {
                  const start = pathStartIndex(pathId, stages);
                  if (start !== stageIndex) {
                    goTo(start);
                    window.setTimeout(() => setPlaying(true), SLIDE_MS + 40);
                    return;
                  }
                  setPlaying(true);
                  return;
                }
                setPlaying((value) => !value);
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
              {playing
                ? "Pause journey"
                : stageIndex >= stages.length - 1
                  ? "Replay story"
                  : "Play the journey"}
            </button>
            <button
              type="button"
              className="story-restart"
              aria-label="Restart complaint journey"
              onClick={restart}
            >
              <RotateCcw size={17} />
            </button>
          </div>
          <div className="journey-nav">
            <button
              type="button"
              disabled={stageIndex === 0 || transitioning}
              onClick={() => goTo(Math.max(0, stageIndex - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={stageIndex >= stages.length - 1 || transitioning}
              onClick={() => goTo(Math.min(stages.length - 1, stageIndex + 1))}
            >
              Next stage
            </button>
          </div>
          <div className="scenario-switch">
            <span>Explore the SLA path</span>
            <div>
              <button
                type="button"
                aria-pressed={pathId === "standard"}
                onClick={() => switchPath("standard")}
              >
                Standard path
              </button>
              <button
                type="button"
                aria-pressed={pathId === "escalation"}
                onClick={() => switchPath("escalation")}
              >
                Needs escalation
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="story-stage-rail"
          aria-label="Complaint journey stages"
        >
          {stages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                stageButtonRefs.current[index] = node;
              }}
              className={`${index === stageIndex ? "active" : ""} ${index < stageIndex ? "done" : ""}`.trim()}
              aria-current={index === stageIndex ? "step" : undefined}
              aria-label={`Show stage ${index + 1}: ${item.railLabel}`}
              onClick={() => goTo(index)}
            >
              <span>{index + 1}</span>
              <b>{item.railLabel}</b>
            </button>
          ))}
        </div>
      </div>

      <details
        className="story-product-proof"
        open={proofOpen}
        onToggle={(event) => setProofOpen(event.currentTarget.open)}
      >
        <summary>
          <span>
            <Maximize2 size={17} /> View the related product screen
          </span>
          <span>{stage.proof.device}</span>
        </summary>
        <div className="proof-screen-wrap portrait">
          <button
            type="button"
            className="screen-view mobile-screen"
            aria-label={`Enlarge ${stage.proof.alt}`}
            onClick={() => setLightboxOpen(true)}
          >
            <img src={stage.proof.image} alt={stage.proof.alt} loading="lazy" />
            <span className="enlarge">
              <Maximize2 size={16} /> Enlarge screen
            </span>
          </button>
          <p>
            Actual product screenshot. The example above explains the workflow; it is not a live
            customer complaint.
          </p>
        </div>
      </details>

      <ImageLightbox
        src={stage.proof.image}
        alt={stage.proof.alt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        aspect={738 / 1531}
        caption={`${stage.proof.alt} · Product screen supplied by SocioHood`}
      />
    </>
  );
};

export default ComplaintJourney;
