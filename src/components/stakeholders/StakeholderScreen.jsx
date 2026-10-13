export default function StakeholderScreen({ src, alt = "", onOpen }) {
  if (!src) return null;

  return (
    <button type="button" className="lightbox__trigger" onClick={() => onOpen?.(src, alt)}>
      <img src={src} alt={alt} />
    </button>
  );
}
