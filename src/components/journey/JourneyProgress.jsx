export default function JourneyProgress({ current = 0, total = 0 }) {
  return (
    <div className="journey-progress" aria-hidden={total === 0}>
      {total > 0 ? `${current} / ${total}` : null}
    </div>
  );
}
