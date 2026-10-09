"use client";

import { useEffect, useRef } from "react";

// How long a stop has: the light travels to it, then it rests there. How much longer the last stop rests before
// everything starts over, how long the light takes to fade out for that, and how long after the pointer leaves a
// stop the journey goes on.
const STEP_MS = 3000;
const REST_MS = 2400;
const DRAIN_MS = 450;
const RELEASE_MS = 140;

// The journey of the light, for the drawing this sits in. The page comes with the journey finished: the light at
// the last stop and every orb lit. If the drawing is still below the screen when this starts, the tube is emptied,
// and when it scrolls into view the light flows in and goes from stop to stop; after the last one it fades, and
// flows in again. Pointing at an orb or at its caption holds the light at that stop; it goes on from there
// afterwards. Off screen everything waits.
//
// It only says where the light is. That is written to the page (`data-step` on the drawing, from -1, the empty
// tube, to the last stop; `data-on` and `data-done` on everything that carries a stop's `data-k`), and how.css
// draws all of it with transitions. With reduced motion this does nothing, and the finished journey stays.
export function FlowDriver() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement | SVGElement>("[data-k]"));
    const last = Math.max(...marks.map((mark) => Number(mark.dataset.k)));
    let at = last;
    let timer = 0;
    let release = 0;
    let started = false;

    const show = (step: number) => {
      at = step;
      root.dataset.step = String(step);
      for (const mark of marks) {
        const k = Number(mark.dataset.k);
        mark.toggleAttribute("data-on", k === step);
        mark.toggleAttribute("data-done", k < step);
      }
    };

    // Empties the tube at once, nothing easing: where every journey starts. The browser has to take the empty tube
    // in before anything may ease again, and reading a size makes it.
    const empty = () => {
      root.dataset.phase = "jump";
      show(-1);
      root.getBoundingClientRect();
      root.dataset.phase = "";
    };

    const run = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => {
          if (at < last) {
            show(at + 1);
            run();
            return;
          }
          root.dataset.phase = "drain";
          timer = window.setTimeout(() => {
            empty();
            show(0);
            run();
          }, DRAIN_MS);
        },
        at < last ? STEP_MS : STEP_MS + REST_MS
      );
    };

    const below = root.getBoundingClientRect().top > window.innerHeight * 0.9;
    if (below) empty();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          window.clearTimeout(timer);
          return;
        }
        if (!started && below) show(0);
        started = true;
        run();
      },
      { threshold: 0.35 }
    );
    observer.observe(root);

    const hold = (event: Event) => {
      if (!started) return;
      window.clearTimeout(release);
      window.clearTimeout(timer);
      root.dataset.phase = "";
      const k = Number((event.currentTarget as HTMLElement).dataset.k);
      if (k !== at) show(k);
    };
    const letGo = () => {
      if (!started) return;
      window.clearTimeout(release);
      release = window.setTimeout(run, RELEASE_MS);
    };
    const pointing = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (pointing) {
      for (const mark of marks) {
        mark.addEventListener("pointerenter", hold);
        mark.addEventListener("pointerleave", letGo);
      }
    }

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(release);
      observer.disconnect();
      for (const mark of marks) {
        mark.removeEventListener("pointerenter", hold);
        mark.removeEventListener("pointerleave", letGo);
      }
    };
  }, []);

  return <span ref={ref} hidden />;
}
