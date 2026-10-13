export default function JourneyControls({ onPrev, onNext, canPrev = false, canNext = false }) {
  return (
    <div className="journey-controls">
      <button type="button" onClick={onPrev} disabled={!canPrev}>
        Previous
      </button>
      <button type="button" onClick={onNext} disabled={!canNext}>
        Next
      </button>
    </div>
  );
}
