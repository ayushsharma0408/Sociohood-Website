import { useEffect, useState } from "react";
import { subscribeContentChange } from "../admin/data/browserContentStore.js";

/** Re-read CMS getters after an admin save in this browser. */
export const useCmsContent = () => {
  const [revision, setRevision] = useState(0);

  useEffect(
    () => subscribeContentChange(() => setRevision((value) => value + 1)),
    []
  );

  return revision;
};
