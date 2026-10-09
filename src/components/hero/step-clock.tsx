"use client";

import { useEffect, useRef } from "react";

// How long each step is on.
const STEP_MS = 3000;
// How long after the pointer leaves a row or a layer the clock takes over again: long enough that crossing from one
// to the next does not count as leaving.
const RELEASE_MS = 90;

// The card's clock, and its only state: which of the steps is on. It lives in the page, not in React. The step is
// written to the stage this sits in (`--step`, for the white key), to that step's row and layer (`data-on`) and to
// the progress bars (`data-state`), and hero.css draws everything from those with transitions. The server already
// renders the first step as on, so the card is complete before this runs.
//
// The clock moves on by itself. Pointing at a row or at a layer (anything with `data-k`) holds that step for as long
// as the pointer stays, and afterwards the clock goes on from there, giving that step its full turn. With reduced
// motion the clock stands still, and pointing still works.
export function StepClock() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.parentElement;
    if (!stage) return;
    const rows = Array.from(stage.querySelectorAll<HTMLElement>(".sst-row"));
    const slabs = Array.from(stage.querySelectorAll<HTMLElement>("[data-slab]"));
    const bars = Array.from(stage.querySelectorAll<HTMLElement>(".sst-bar"));
    const triggers = Array.from(stage.querySelectorAll<HTMLElement>("[data-k]"));
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let step = 0;
    let tick = 0;
    let release = 0;

    const show = (next: number, held: boolean) => {
      step = next;
      stage.style.setProperty("--step", String(next));
      rows.forEach((row, i) => row.toggleAttribute("data-on", i === next));
      slabs.forEach((slab, i) => slab.toggleAttribute("data-on", i === next));
      if (held) {
        // A held step has no turn to count down: the bars just show how far along it is.
        bars.forEach((bar, i) => (bar.dataset.state = i <= next ? "done" : "todo"));
      } else {
        // The bar of the step that is on fills for as long as the step lasts, so it has to start empty: empty it,
        // have the browser take that in (reading a size does it), then set it going.
        bars.forEach((bar, i) => (bar.dataset.state = i < next ? "done" : i === next ? "reset" : "todo"));
        stage.getBoundingClientRect();
        bars[next].dataset.state = "on";
      }
    };

    const run = () => {
      window.clearTimeout(tick);
      if (!motion.matches) return;
      tick = window.setTimeout(() => {
        show((step + 1) % rows.length, false);
        run();
      }, STEP_MS);
    };

    const hold = (event: Event) => {
      window.clearTimeout(release);
      window.clearTimeout(tick);
      show(Number((event.currentTarget as HTMLElement).dataset.k), true);
    };

    const letGo = () => {
      window.clearTimeout(release);
      release = window.setTimeout(() => {
        show(step, false);
        run();
      }, RELEASE_MS);
    };

    stage.style.setProperty("--step-ms", `${STEP_MS}ms`);
    show(0, false);
    run();
    for (const el of triggers) {
      el.addEventListener("pointerenter", hold);
      el.addEventListener("pointerleave", letGo);
    }
    motion.addEventListener("change", run);

    return () => {
      window.clearTimeout(tick);
      window.clearTimeout(release);
      for (const el of triggers) {
        el.removeEventListener("pointerenter", hold);
        el.removeEventListener("pointerleave", letGo);
      }
      motion.removeEventListener("change", run);
    };
  }, []);

  return <span ref={ref} hidden />;
}
