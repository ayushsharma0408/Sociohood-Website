import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const ImageLightbox = ({
  src,
  alt = "",
  caption,
  isOpen,
  onClose,
  aspect = 16 / 9,
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const onCancel = (event) => {
      event.preventDefault();
      onClose?.();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="screen-dialog"
      aria-label={alt || "Enlarged image"}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose?.();
      }}
    >
      {isOpen ? (
        <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="screen-close"
            aria-label="Close enlarged screenshot"
            onClick={onClose}
          >
            <X size={22} />
          </button>
          <div className="zoom-screen-canvas" style={{ "--screen-aspect": aspect }}>
            <img src={src} alt={alt} />
            {children}
          </div>
          {caption ? <p>{caption}</p> : null}
        </div>
      ) : null}
    </dialog>
  );
};

export default ImageLightbox;
