import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ModalsContext = createContext(null);

export const BookDemoProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const openBookDemo = useCallback(() => setActiveModal("demo"), []);
  const closeBookDemo = useCallback(() => {
    setActiveModal((current) => (current === "demo" ? null : current));
  }, []);

  const openCustomSoftware = useCallback(() => setActiveModal("custom-software"), []);
  const closeCustomSoftware = useCallback(() => {
    setActiveModal((current) => (current === "custom-software" ? null : current));
  }, []);

  const openSampleDemo = useCallback(() => setActiveModal("sample-demo"), []);
  const closeSampleDemo = useCallback(() => {
    setActiveModal((current) => (current === "sample-demo" ? null : current));
  }, []);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const value = useMemo(
    () => ({
      activeModal,
      isOpen: activeModal === "demo",
      isCustomSoftwareOpen: activeModal === "custom-software",
      isSampleDemoOpen: activeModal === "sample-demo",
      openBookDemo,
      closeBookDemo,
      openCustomSoftware,
      closeCustomSoftware,
      openSampleDemo,
      closeSampleDemo,
      closeModal,
    }),
    [
      activeModal,
      openBookDemo,
      closeBookDemo,
      openCustomSoftware,
      closeCustomSoftware,
      openSampleDemo,
      closeSampleDemo,
      closeModal,
    ]
  );

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("Modal hooks must be used within BookDemoProvider");
  }
  return context;
};

export const useBookDemo = () => {
  const { isOpen, openBookDemo, closeBookDemo } = useModals();
  return { isOpen, openBookDemo, closeBookDemo };
};

export const useCustomSoftware = () => {
  const { isCustomSoftwareOpen, openCustomSoftware, closeCustomSoftware } = useModals();
  return {
    isOpen: isCustomSoftwareOpen,
    openCustomSoftware,
    closeCustomSoftware,
  };
};

export const useSampleDemo = () => {
  const { isSampleDemoOpen, openSampleDemo, closeSampleDemo } = useModals();
  return {
    isOpen: isSampleDemoOpen,
    openSampleDemo,
    closeSampleDemo,
  };
};
