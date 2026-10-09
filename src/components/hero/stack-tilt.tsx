"use client";

import { useEffect, useRef } from "react";

const QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// The card's only script: with a mouse on desktop it follows the pointer, eased, and writes where it is to the
// element it sits in. --mx and --my say where the pointer is in the window (each from -1 to 1): the stack's layers
// read them to shift a little against each other. --sx and --sy say where it is over the card itself, in px: the
// soft light under the glass sits there (hero.css). One rAF loop that runs only while something is still moving;
// nothing re-renders.
export function StackTilt() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.parentElement;
    if (!stage) return;
    const media = window.matchMedia(QUERY);
    let frame = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      const box = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", x.toFixed(3));
      stage.style.setProperty("--my", y.toFixed(3));
      stage.style.setProperty("--sx", `${(((x + 1) / 2) * window.innerWidth - box.left).toFixed(1)}px`);
      stage.style.setProperty("--sy", `${(((y + 1) / 2) * window.innerHeight - box.top).toFixed(1)}px`);
      frame = Math.abs(tx - x) < 0.002 && Math.abs(ty - y) < 0.002 ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || window.scrollY > window.innerHeight) return;
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      frame = 0;
      x = y = tx = ty = 0;
      for (const name of ["--mx", "--my", "--sx", "--sy"]) stage.style.removeProperty(name);
    };
    const sync = () => {
      stop();
      if (media.matches) window.addEventListener("pointermove", onMove, { passive: true });
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <span ref={ref} hidden />;
}
