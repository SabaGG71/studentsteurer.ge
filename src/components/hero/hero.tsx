import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { NOISE } from "@/lib/noise";
import { FlagDe, FlagGe } from "@/components/flags";
import { CtaLink } from "@/components/site-header/cta-link";
import { Paragraph } from "@/components/site-header/logo";
import { CENTRE, em, GAP, HeroStack } from "./hero-stack";
import { HeroTicker } from "./hero-ticker";
import { ScrollKey } from "./scroll-key";
import { StackTilt } from "./stack-tilt";
import { StepClock } from "./step-clock";
import "./hero.css";

// The way from the payslip to the money: whose hands it passes through, and what each of them does. One row per
// layer of the stack, in the same order, each with an orb in its layer's colour (light, mid, deep, and the r g b of
// its soft shadow).
const STEPS = [
  { who: "შენ", what: "გვიგზავნი დოკუმენტებს", orb: ["#f8effe", "#d5b6f0", "#a87fd0", "150 110 200"] },
  { who: "ჩვენ", what: "ვამზადებთ დეკლარაციას", orb: ["#f0fdda", "#adee68", "#7fd33c", "110 190 50"] },
  { who: "Finanzamt", what: "განიხილავს განაცხადს", orb: ["#fff3d9", "#f8c677", "#eaa53a", "226 160 50"] },
  { who: "შენ", what: "იღებ თანხას ანგარიშზე", orb: ["#5aa860", "#236b2b", "#0d3311", "13 51 17"] },
];

// The rows beside the stack, from 640px up: one row per layer and exactly as tall as the distance between two
// layers, so each sits level with its own layer; where the first row starts; and how tall the card behind a row is.
// All in the stack's own em. hero.css picks them up as --gap, --rows-top and --card (on phones it sets its own).
const STEP_SIZES = {
  "--gap-d": em(GAP),
  "--top-d": em(CENTRE - GAP / 2),
  "--card-d": em(5.6),
} as CSSProperties;

// Where the card behind row `i` sits.
const cardTop = (i: number) => `calc(var(--rows-top) + (var(--gap) - var(--card)) / 2 + var(--gap) * ${i})`;

// Two distances on the desktop hero that give way when the window is low: the space above the glossary and the
// space under the scroll key. Both are counted into the stack's --reserve, so the stack takes exactly what they
// leave.
const SPACING = {
  "--above-ticker": "clamp(1.25rem, calc(14svh - 5rem), 3.5rem)",
  "--under-key": "clamp(1rem, calc(10svh - 3.65rem), 2.25rem)",
} as CSSProperties;

const at = (seconds: number) => ({ "--at": `${seconds}s` }) as CSSProperties;

// A glossy ball in one colour, lit from the upper left.
function Orb({ tones }: { tones: string[] }) {
  const [light, mid, deep, glow] = tones;
  return (
    <span
      aria-hidden="true"
      className="size-[2.3em] shrink-0 rounded-full max-sm:hidden"
      style={{
        background: `radial-gradient(ellipse 46% 34% at 36% 24%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 100%), linear-gradient(165deg, ${light} 0%, ${mid} 55%, ${deep} 100%)`,
        boxShadow: `inset 0 0.08em 0.13em rgb(255 255 255 / 0.9), inset 0 -0.2em 0.42em -0.16em rgb(${glow} / 0.55), 0 0.5em 0.9em -0.45em rgb(${glow} / 0.7)`,
      }}
    />
  );
}

// The site's opening: one grainy lilac field from edge to edge that fills the first screen exactly (so nothing
// scrolls on a desktop), with the brand's § lying across it, huge and a shade lighter. Its content is exactly as
// wide as the header. Left: who it is for, the title in Georgian capitals (its middle line under a lime marker), the
// short pitch and two actions. Right, on a sheet of frosted glass with a second sheet slipped under it: the way from
// the payslip to the money, in four layers (`HeroStack`), each joined to a small card saying whose hands it passes
// through; a clock walks through the four steps, and pointing at a row or a layer holds its step (`StepClock`).
// Under them, a glossary of German tax words sliding by (`HeroTicker`), and last, alone at the bottom on a desktop,
// a key to press for what comes next (`ScrollKey`).
//
// On a desktop, sizes follow the window's height as well as its width, which is what keeps it on one screen: the
// title is sized from its own column (`cqw`) and from the height, and the stack from what the height leaves once
// --reserve (the header, the glossary, the scroll key and the card's own trim) is taken off. On phones everything
// is a size smaller, and the layers stand apart as four tiles, one beside each row.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-lilac px-4 sm:px-6 lg:h-svh lg:max-h-[68rem] lg:min-h-[38rem]"
      style={SPACING}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Paragraph className="absolute top-[58%] left-1/2 h-[92%] w-auto -translate-1/2 -rotate-12 text-white/[0.17] lg:top-1/2 lg:left-[66%] lg:h-[152%]" />
        <span className="absolute inset-0 opacity-[0.34]" style={{ backgroundImage: NOISE }} />
      </div>

      <div className="mx-auto flex h-full max-w-[1180px] flex-col">
        {/* The text and the card with the glossary under them: together they sit in the middle of what the header
            and the scroll key leave. */}
        <div className="flex flex-1 flex-col justify-center pt-25 pb-4 sm:pt-32 sm:pb-6 lg:min-h-0 lg:pt-[5.5rem] lg:pb-0">
          <div className="grid grid-cols-1 items-center gap-x-12 gap-y-9 sm:gap-y-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
            <div className="@container">
              <p className="sst-rise inline-flex items-center gap-2 rounded-full bg-white/55 py-1.5 pr-3.5 pl-1.5 sm:gap-2.5 sm:pr-4" style={at(0)}>
                {/* Where the money is held back, and where it returns to. */}
                <span aria-hidden="true" className="flex shrink-0 items-center">
                  <FlagDe className="size-5 ring-2 ring-white" />
                  <FlagGe className="-ml-1.5 size-5 ring-2 ring-white" />
                </span>
                <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">
                  გერმანიაში ნამუშევარი სტუდენტებისთვის
                </span>
              </p>

              <h1
                id="hero-title"
                className="mtavruli mt-4 text-[length:10.6cqw] leading-[1.04] font-extrabold tracking-[-0.02em] whitespace-nowrap text-ink sm:mt-5 sm:text-[length:min(12.6cqw,4.5rem)] lg:mt-[clamp(0.9rem,2.6svh,1.6rem)] lg:text-[length:min(12.6cqw,8.6svh,4.5rem)]"
              >
                <span className="sst-word block" style={at(0.1)}>
                  დაიბრუნე შენი
                </span>{" "}
                <span className="sst-word block" style={at(0.2)}>
                  <span className="relative isolate inline-block">
                    <span
                      aria-hidden="true"
                      className="sst-grow absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 origin-left -rotate-[1.3deg] rounded-[0.14em] bg-lime"
                      style={at(0.6)}
                    />
                    გადასახადი
                  </span>
                </span>{" "}
                <span className="sst-word block" style={at(0.3)}>
                  გერმანიიდან
                </span>
              </h1>

              <p
                className="sst-rise mt-4 max-w-[33rem] text-[14.5px] leading-[1.6] text-ink/75 sm:mt-5 sm:text-[16.5px] sm:leading-[1.65] lg:mt-[clamp(0.8rem,2.6svh,1.5rem)] lg:short:text-[15px] lg:short:leading-[1.55]"
                style={at(0.4)}
              >
                ზაფხულის სამუშაოზე დაკავებული <span className="font-display font-semibold text-ink">Lohnsteuer</span>-ის დაბრუნება
                შესაძლებელია. დეკლარაციას ჩვენ ვამზადებთ და <span className="font-display font-semibold text-ink">Finanzamt</span>-ში
                ვაგზავნით, თანხა კი შენს ანგარიშზე ირიცხება.
              </p>

              <div
                className="sst-rise mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-7 sm:gap-x-5 sm:gap-y-4 lg:mt-[clamp(1rem,3.2svh,2rem)]"
                style={at(0.5)}
              >
                <CtaLink size="lg" variant="forest" label="რამდენი გიბრუნდება?" />
                <Link
                  href="/#how"
                  className="group/how mtavruli inline-flex items-center gap-2.5 rounded-full text-[12.5px] font-semibold tracking-[0.02em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest/50 sm:text-[13.5px]"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-white/60 text-forest transition-colors duration-150 group-hover/how:bg-white sm:size-11">
                    <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/how:translate-x-0.5" />
                  </span>
                  როგორ მუშაობს
                </Link>
              </div>
            </div>

            <div className="group/card sst-rise relative w-full max-w-[37.5rem] justify-self-center lg:justify-self-end" style={at(0.15)}>
              {/* A second sheet of glass slipped under the card: it shows at the card's left and lower edges, and
                  slides out a little further while the pointer is on the card. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-2 translate-y-2 -rotate-[2.4deg] rounded-[1.75rem] bg-white/25 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.45)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-x-4 group-hover/card:translate-y-3 group-hover/card:-rotate-[3.3deg] motion-reduce:transition-none sm:-translate-x-3 sm:rounded-[2.25rem]"
              />

              <div className="sst-stage relative isolate rounded-[1.75rem] bg-white/55 p-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),inset_0_0_0_1px_rgb(255_255_255/0.6),0_1px_2px_rgb(59_31_99/0.05),0_50px_90px_-56px_rgb(59_31_99/0.7)] backdrop-blur-xl sm:rounded-[2.25rem] sm:p-7">
                <StackTilt />
                <StepClock />
                {/* Under the glass: a soft light, a fine dotted mat below the stack, two faint rings in the corner,
                    and the grain. */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
                  <span className="sst-sheen absolute size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)] max-lg:hidden" />
                  <span className="absolute inset-0 bg-[radial-gradient(rgb(59_31_99/0.16)_1px,transparent_1.5px)] bg-[size:20px_20px] mask-[radial-gradient(60%_58%_at_28%_54%,#000_0%,transparent_100%)]" />
                  <span className="absolute -right-24 -bottom-24 size-64 rounded-full border border-ink/[0.06]" />
                  <span className="absolute -right-40 -bottom-40 size-[26rem] rounded-full border border-ink/[0.05]" />
                  <span className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: NOISE }} />
                </span>

                <div className="flex items-center justify-between gap-4">
                  <p className="mtavruli text-[10px] leading-none font-semibold tracking-[0.05em] whitespace-nowrap text-ink/55 sm:text-[11px]">
                    დოკუმენტიდან თანხამდე
                  </p>
                  {/* One bar per step: full once its step is done, filling while it is on. */}
                  <span aria-hidden="true" className="sst-bars flex gap-1">
                    {STEPS.map(({ what }, i) => (
                      <span key={what} className="block h-1 w-4 overflow-hidden rounded-full bg-ink/10 sm:w-6">
                        <span data-state={i === 0 ? "on" : "todo"} className="sst-bar block size-full rounded-full bg-forest" />
                      </span>
                    ))}
                  </span>
                </div>

                {/* The layers, and beside each one its row, level with it and joined to it by a dot (from 640px up
                    by a hairline as well). */}
                <div
                  className="sst-steps mt-4 flex items-start text-[10px] [--reserve:calc(20.5rem_+_var(--above-ticker)_+_var(--under-key))] sm:text-[11.5px] lg:text-[length:min(12.4px,calc((100svh_-_var(--reserve))/36.2),calc((100vw_-_10rem)*0.53/44.4))] short:[--reserve:calc(19.5rem_+_var(--above-ticker)_+_var(--under-key))]"
                  style={STEP_SIZES}
                >
                  <HeroStack className="max-sm:text-[4.6px] max-[360px]:text-[4px]" />

                  <div className="relative min-w-0 flex-1 pt-(--rows-top)">
                    {/* A soft card behind every row, and over them the white key, which rests behind the row whose
                        step is on. They come in together, just before the rows' text. */}
                    <span aria-hidden="true" className="sst-rise absolute inset-0" style={at(1.15)}>
                      {STEPS.map(({ what }, i) => (
                        <span
                          key={what}
                          className="absolute right-0 left-[2em] h-(--card) rounded-2xl bg-white/45 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.6)] sm:left-[2.8em] sm:rounded-[1.4em]"
                          style={{ top: cardTop(i) }}
                        />
                      ))}
                      <span
                        className="sst-key absolute right-0 left-[2em] h-(--card) rounded-2xl bg-white shadow-[0_1px_2px_rgb(59_31_99/0.06),0_14px_24px_-14px_rgb(59_31_99/0.5)] sm:left-[2.8em] sm:rounded-[1.4em]"
                        style={{ top: cardTop(0) }}
                      />
                    </span>

                    <ol aria-label="როგორ მუშაობს" className="relative">
                      {STEPS.map(({ who, what, orb }, i) => (
                        <li key={what} data-k={i} data-on={i === 0 ? "" : undefined} className="sst-row flex h-(--gap) items-center">
                          <span
                            aria-hidden="true"
                            className="relative ml-[0.5em] size-[0.9em] shrink-0 rounded-full bg-white shadow-[0_0_0_0.12em_rgb(12_11_10/0.18)]"
                          >
                            <span className="sst-pip absolute inset-0 rounded-full bg-lime shadow-[0_0_0_0.12em_#154618]" />
                          </span>
                          {/* On phones the hairline is only the space between the dot and the row's card. */}
                          <span
                            aria-hidden="true"
                            className="sst-grow h-px w-[0.6em] shrink-0 origin-left bg-ink/25 max-sm:invisible sm:w-[1.4em]"
                            style={at(1.3 + i * 0.12)}
                          />
                          <div
                            className="sst-rise flex min-w-0 items-center px-3 sm:gap-[0.7em] sm:pr-[0.5em] sm:pl-[0.75em]"
                            style={at(1.4 + i * 0.12)}
                          >
                            <Orb tones={orb} />
                            <p className="min-w-0">
                              <span className="mtavruli block text-[10px] leading-none font-semibold tracking-[0.07em] text-forest/70 sm:text-[max(10px,0.84em)]">
                                {who}
                              </span>
                              <span className="mt-1 block text-[13px] leading-[1.25] font-semibold text-ink sm:mt-[0.35em] sm:text-[max(12.5px,1.1em)]">
                                {what}
                              </span>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <HeroTicker className="sst-rise mt-8 sm:mt-11 lg:mt-(--above-ticker) lg:short:h-11" style={at(0.7)} />
        </div>

        {/* Last, on a desktop (where the hero is one screen): the scroll key, alone at the bottom. */}
        <ScrollKey className="sst-rise pt-4 pb-(--under-key) max-lg:hidden short:pt-3" style={at(0.85)} />
      </div>
    </section>
  );
}
