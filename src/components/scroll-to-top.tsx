"use client";

import { useEffect } from "react";

// Next.js keeps the scroll position when the new page is already in view, so a case
// study opened from the middle of the home page would start halfway down. Reset it.
export function ScrollToTop({ trigger }: { trigger: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [trigger]);
  return null;
}
