import type { CSSProperties } from "react";
import { BookOpenIcon, GlobeIcon, MicIcon, NewspaperIcon, RadioIcon, TvIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOISE_LIGHT } from "@/lib/noise";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import "./press.css";

// DUMMIES, ALL OF IT. We know of no press coverage of the client, so nothing here quotes or names a real outlet:
// the quote says of itself that it is a placeholder, the cutting's masthead, author and date are empty slots, and
// the "logos" are kinds of media, not outlets. The section may only go live with a real quote, from a real
// outlet, with that outlet's permission to show its logo; without one it has to be taken out, not filled in.
const QUOTE = `აქ იქნება ციტატა: ერთი-ორი წინადადება იმაზე, რას წერს მედია ${site.domain}-ზე.`;

const LOGOS = [
  { Icon: NewspaperIcon, word: "გაზეთი", look: "mtavruli text-[18px] font-extrabold tracking-[-0.02em]" },
  { Icon: BookOpenIcon, word: "ჟურნალი", look: "text-[19px] font-semibold" },
  { Icon: RadioIcon, word: "რადიო", look: "mtavruli text-[15px] font-semibold tracking-[0.18em]" },
  { Icon: TvIcon, word: "ტელევიზია", look: "text-[19px] font-extrabold tracking-[-0.03em]" },
  { Icon: MicIcon, word: "პოდკასტი", look: "mtavruli text-[16px] font-normal tracking-[0.07em]" },
  { Icon: GlobeIcon, word: "პორტალი", look: "text-[19px] font-extrabold tracking-[-0.01em]" },
];

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// One set of the logos. The row holds two, so that it can run on without a gap; the second is left out where
// nothing moves.
function Logos({ again = false }: { again?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-x-12 gap-y-5 motion-safe:shrink-0 motion-safe:pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center sm:gap-x-14 sm:motion-safe:pr-14",
        again && "motion-reduce:hidden"
      )}
    >
      {LOGOS.map(({ Icon, word, look }) => (
        <span key={word} className="flex shrink-0 items-center gap-2.5 text-cream/70">
          <Icon className="size-6" strokeWidth={2.2} />
          <span className={cn("leading-none", look)}>{word}</span>
        </span>
      ))}
    </div>
  );
}

// The eighth section, on the deep green field: what the press says.
//
// A newspaper cutting lies taped to the field, slightly turned, its lower edge cut with pinking shears. Its
// headline is the quote, and the site's own lime marker is drawn over it, line after line, when the section
// scrolls into view; pointing at the cutting straightens it (`Reveal`, press.css). Under it runs a row of logos.
export function Press() {
  return (
    <section id="press" aria-labelledby="press-title" className="relative isolate overflow-clip bg-forest px-4 py-16 text-cream sm:px-6 sm:py-24 lg:py-28">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]" style={{ backgroundImage: NOISE_LIGHT }} />

      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <Reveal />
          <p className="sst-press-rise inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-cream/90 sm:text-[11.5px]">მედია</span>
          </p>
          <h2 id="press-title" className="sst-press-rise mtavruli mt-4 text-[clamp(1.5rem,7vw,2.9rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance" style={order(1)}>
            რას წერს{" "}
            <span className="relative isolate inline-block whitespace-nowrap text-forest">
              <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
              მედია
            </span>{" "}
            ჩვენზე
          </h2>
        </div>

        <div className="mt-12 sm:mt-16">
          <Reveal />
          <div className="sst-press-clip relative mx-auto max-w-[45rem]">
            {/* The strip of tape that holds the cutting, its ends cut to a notch. */}
            <span
              aria-hidden="true"
              className="absolute -top-3.5 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-[4deg] bg-lilac/90 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%,4%_50%)] sm:h-8 sm:w-32"
            />
            <figure className="sst-press-sheet rounded-t-[0.6rem] bg-[#fffdf8] px-5 pt-9 pb-12 text-ink sm:px-10 sm:pt-11 sm:pb-14">
              <div className="flex items-end justify-between gap-4">
                <span className="mtavruli text-[15px] leading-none font-extrabold tracking-[-0.01em] sm:text-[19px]">გამოცემის სახელი</span>
                <span className="mtavruli text-[9.5px] leading-none font-semibold tracking-[0.08em] text-ink/45 sm:text-[10.5px]">თარიღი</span>
              </div>
              <span aria-hidden="true" className="mt-3 block h-[5px] border-t-2 border-b border-ink" />

              <blockquote className="mt-6 text-[clamp(1.2rem,4.6vw,2.05rem)] leading-[1.42] font-extrabold tracking-[-0.015em] text-balance sm:mt-8">
                <span className="sst-press-mark">„{QUOTE}“</span>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[12.5px] text-ink/55 sm:mt-6 sm:text-[13.5px]">
                <span aria-hidden="true" className="h-px w-8 bg-ink/30" />
                ავტორის სახელი
              </figcaption>

              <div aria-hidden="true" className="mt-7 grid h-14 grid-cols-2 gap-5 sm:mt-8 sm:h-16 sm:grid-cols-3 sm:gap-7">
                <span className="sst-press-lines" />
                <span className="sst-press-lines" />
                <span className="sst-press-lines max-sm:hidden" />
              </div>
            </figure>
          </div>

          <div aria-hidden="true" className="sst-press-rise sst-press-strip mx-auto mt-14 max-w-[58rem] overflow-hidden sm:mt-20" style={order(5)}>
            <div className="sst-press-track flex motion-safe:w-max motion-reduce:justify-center">
              <Logos />
              <Logos again />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
