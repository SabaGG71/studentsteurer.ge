"use client";

import { useEffect, useRef } from "react";

// Makes the list of questions this sits in an accordion. The markup arrives with every answer open, so the page
// reads without scripts. Once this runs it marks its parent `data-faq="on"` (the stylesheet then folds away every
// answer whose question is not `data-open`) and opens the first question; from then on a click on a question
// opens it and closes the one that was open, or closes it if it was the open one. Every opening also restarts the
// little beat of the two keys beside the list (`data-beat`).
export function FaqDriver() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const items = Array.from(host.querySelectorAll<HTMLElement>("[data-faq-item]"));
    const set = (item: HTMLElement, open: boolean) => {
      item.toggleAttribute("data-open", open);
      item.querySelector("button")?.setAttribute("aria-expanded", String(open));
    };

    host.dataset.faq = "on";
    items.forEach((item, i) => set(item, i === 0));

    const onClick = (event: MouseEvent) => {
      const item = (event.target as Element).closest("[data-faq-item] button")?.closest<HTMLElement>("[data-faq-item]");
      if (!item) return;
      const open = !item.hasAttribute("data-open");
      items.forEach((other) => set(other, other === item && open));
      if (!open) return;
      // Taking the mark off, letting the page take note, and putting it back makes the animation start again.
      delete host.dataset.beat;
      void host.offsetWidth;
      host.dataset.beat = "";
    };
    host.addEventListener("click", onClick);

    return () => {
      host.removeEventListener("click", onClick);
      delete host.dataset.faq;
      delete host.dataset.beat;
      items.forEach((item) => {
        item.removeAttribute("data-open");
        item.querySelector("button")?.setAttribute("aria-expanded", "true");
      });
    };
  }, []);

  return <span ref={ref} hidden />;
}
