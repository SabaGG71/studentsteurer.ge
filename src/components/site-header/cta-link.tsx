import type { MouseEvent } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cta } from "@/lib/site";

// `md` is the header's button, as tall as the keys beside it (the menu's links, the language button). `lg` is the
// page's main button; on phones it is a size smaller.
const sizes = {
  md: {
    button: "h-9 gap-2.5 pl-4 text-[11.5px]",
    circle: "size-7",
    arrow: "size-3.5",
    arrowIn: "-mt-[7px] -ml-[7px] -translate-x-6",
    arrowOut: "group-hover/cta:translate-x-6",
  },
  lg: {
    button: "h-12 gap-3 pl-5 text-[12.5px] sm:h-13 sm:pl-6 sm:text-[13.5px]",
    circle: "size-10 sm:size-11",
    arrow: "size-4",
    arrowIn: "-mt-2 -ml-2 -translate-x-8",
    arrowOut: "group-hover/cta:translate-x-8",
  },
};

const variants = {
  lime: {
    button: "bg-lime text-forest hover:bg-[#9fe556]",
    circle: "bg-forest text-lime",
  },
  forest: {
    button: "bg-forest text-lime shadow-[0_16px_30px_-18px_rgb(21_70_24/0.75)] hover:bg-ink",
    circle: "bg-lime text-forest",
  },
};

export function CtaLink({
  className,
  onClick,
  size = "md",
  variant = "lime",
  href = cta.href,
  label = cta.label,
}: {
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  href?: string;
  label?: string;
}) {
  const s = sizes[size];
  const v = variants[variant];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group/cta mtavruli inline-flex items-center justify-between rounded-full py-1 pr-1 font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-forest/50 focus-visible:ring-offset-2",
        s.button,
        v.button,
        className
      )}
    >
      {label}
      {/* Hover: the arrow slides out to the right and a second one slides in from the left. */}
      <span className={cn("relative isolate grid shrink-0 place-items-center overflow-hidden rounded-full", s.circle, v.circle)}>
        <ArrowRightIcon
          className={cn(s.arrow, "transition-transform duration-200 ease-out motion-reduce:transition-none", s.arrowOut)}
        />
        <ArrowRightIcon
          aria-hidden="true"
          className={cn(
            s.arrow,
            "absolute top-1/2 left-1/2 transition-transform duration-200 ease-out group-hover/cta:translate-x-0 motion-reduce:transition-none",
            s.arrowIn
          )}
        />
      </span>
    </Link>
  );
}
