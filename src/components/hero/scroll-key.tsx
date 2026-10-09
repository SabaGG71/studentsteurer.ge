import type { CSSProperties } from "react";
import { ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// The hero's last word: a key to press, cut from the same thick, rounded stuff as the logo's. It stands on a darker
// lilac edge and goes down under the pointer; in its lime disc an arrow keeps dropping out while the next one drops
// in (`sst-drop`, hero.css). A hairline fades away from it on either side. It is a plain link to `#why`, the
// section that follows the hero, so it needs no script.
export function ScrollKey({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("flex items-center justify-center gap-5", className)} style={style}>
      <span aria-hidden="true" className="h-px w-32 bg-linear-to-l from-ink/25 to-transparent" />

      <a
        href="#why"
        className="group/key inline-flex h-11 items-center gap-3 rounded-full bg-white pr-1.5 pl-5 shadow-[0_4px_0_#b796d8,0_16px_24px_-12px_rgb(59_31_99/0.6)] transition-[translate,box-shadow] duration-150 outline-none hover:translate-y-[3px] hover:shadow-[0_1px_0_#b796d8,0_8px_14px_-10px_rgb(59_31_99/0.6)] focus-visible:ring-2 focus-visible:ring-forest/50 active:translate-y-1 active:shadow-[0_0_0_#b796d8,0_4px_8px_-6px_rgb(59_31_99/0.6)] short:h-10"
      >
        <span className="mtavruli text-[11.5px] leading-none font-semibold tracking-[0.06em] text-ink/80">ჩამოსქროლე</span>
        <span
          aria-hidden="true"
          className="relative size-8 overflow-hidden rounded-full bg-lime text-forest transition-colors duration-150 [--drop:2rem] group-hover/key:bg-forest group-hover/key:text-lime short:size-7 short:[--drop:1.75rem]"
        >
          <span className="sst-drop absolute inset-0">
            <ArrowDownIcon className="absolute inset-0 m-auto size-4" strokeWidth={2.5} />
            <ArrowDownIcon className="absolute inset-0 m-auto size-4 -translate-y-(--drop)" strokeWidth={2.5} />
          </span>
        </span>
      </a>

      <span aria-hidden="true" className="h-px w-32 bg-linear-to-r from-ink/25 to-transparent" />
    </div>
  );
}
