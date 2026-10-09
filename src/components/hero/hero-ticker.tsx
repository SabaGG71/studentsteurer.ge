import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// The German words a student meets on their papers, each with what it means.
const GLOSSARY = [
  { de: "Lohnsteuer", ka: "ხელფასის გადასახადი" },
  { de: "Steuererklärung", ka: "საგადასახადო დეკლარაცია" },
  { de: "Finanzamt", ka: "საგადასახადო სამსახური" },
  { de: "Lohnsteuerbescheinigung", ka: "ხელფასის გადასახადის ცნობა" },
  { de: "Steuer-ID", ka: "საგადასახადო ნომერი" },
  { de: "Steuerklasse", ka: "საგადასახადო კლასი" },
  { de: "Lohnabrechnung", ka: "სახელფასო უწყისი" },
  { de: "Solidaritätszuschlag", ka: "სოლიდარობის დანამატი" },
  { de: "Kirchensteuer", ka: "საეკლესიო გადასახადი" },
  { de: "Steuerbescheid", ka: "საგადასახადო შეტყობინება" },
];

function Words({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {GLOSSARY.map(({ de, ka }) => (
        <li key={de} className="flex items-center whitespace-nowrap">
          <span className="font-display text-[13px] font-bold tracking-[-0.01em] text-forest sm:text-[14.5px]">{de}</span>
          <span className="ml-2 text-[12px] text-ink/60 sm:ml-2.5 sm:text-[13px]">{ka}</span>
          <span aria-hidden="true" className="mx-4 size-[6px] rotate-45 rounded-[2px] bg-leaf/45 sm:mx-6 sm:size-[7px]" />
        </li>
      ))}
    </ul>
  );
}

// The line under the hero's text and card: a frosted pill as wide as the header, in which a small glossary of
// German tax words slides by, each with its Georgian meaning. The list is there twice (the copy is hidden from
// screen readers), and the track slides left by one copy, so it never ends; it stops while the pointer is on it,
// and stands still with reduced motion.
export function HeroTicker({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn(
        "sst-ticker-pill flex h-11 items-center rounded-full bg-white/50 pl-1 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.7),0_16px_34px_-24px_rgb(59_31_99/0.55)] backdrop-blur-xl sm:h-13 sm:pl-1.5",
        className
      )}
      style={style}
    >
      <p className="mtavruli shrink-0 rounded-full bg-forest px-3.5 py-2.5 text-[10.5px] leading-none font-semibold tracking-[0.04em] text-lime sm:px-4 sm:text-[11.5px]">
        ლექსიკონი
      </p>
      <div className="min-w-0 flex-1 overflow-hidden rounded-r-full mask-[linear-gradient(to_right,transparent,#000_2.5rem,#000_calc(100%_-_4rem),transparent)]">
        <div className="sst-ticker flex w-max">
          <Words />
          <Words hidden />
        </div>
      </div>
    </div>
  );
}
