"use client";

import { useEffect, useRef } from "react";

// A one-time entrance for whatever this sits in. It marks its parent `data-reveal="armed"` while the parent is
// still below the screen, and `data-reveal="shown"` once it scrolls into view; the section's own stylesheet decides
// what those two states look like. Without scripts, with reduced motion, or if the parent is already on screen when
// the page loads, nothing is marked and everything is simply there.
export function Reveal({ margin = "0px 0px -16% 0px" }: { margin?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (host.getBoundingClientRect().top < window.innerHeight * 0.84) return;

    host.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        host.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: margin }
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      host.removeAttribute("data-reveal");
    };
  }, [margin]);

  return <span ref={ref} hidden />;
}
