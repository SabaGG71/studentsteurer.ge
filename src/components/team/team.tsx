import type { CSSProperties } from "react";
import { CheckIcon } from "lucide-react";
import { NOISE } from "@/lib/noise";
import { site } from "@/lib/site";
import { FlagDe, FlagGe } from "@/components/flags";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import { LogoMark } from "@/components/site-header/logo";
import "./team.css";

// PLACEHOLDERS. How the client's people work is our guess: the client has not told us who fills in the
// declarations or how. Nothing here names a person, a title, a number or a rating on purpose; those must come from
// the client. None of the lines promises what only the larger plans include (lib/plans).
const PROMISES = [
  "გესაუბრებით ქართულად",
  "ფორმებს გერმანულად ჩვენ ვავსებთ",
  "შენს დოკუმენტებს ადამიანი ამოწმებს",
  "გაგზავნამდე ყველაფერს გადავამოწმებთ",
  "ნებისმიერ დროს გეტყვით, რა ეტაპზეა საქმე",
];

// A name written by hand, as one line: a tall first loop, a few low waves, a tail, and the stroke under it all.
// It spells nothing.
const SIGNATURE =
  "M16 56C22 30 38 8 48 18S34 64 26 54 48 34 60 44 68 34 78 36 84 54 94 50 102 26 114 30 116 56 130 50 148 30 158 36 178 44 200 20 214 26 198 40 90 74 26 76";

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// The seventh section, on the lilac field with its grain: who works on a declaration. Left: a name badge on a
// lanyard that comes down from the section's top edge, a "hello, my name is" tag whose name is a signature. When
// the section scrolls into view the badge drops in and swings out like a pendulum, and the signature is written;
// pointing at the picture nudges the badge aside (`Reveal`, team.css). Right: the question, one line, what the
// client can expect as a list of ticks, and the way on.
//
// The badge is drawn in `em`, and its size follows the picture's width (`cqw`), so it keeps its proportions.
export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative isolate overflow-clip bg-lilac px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.34]" style={{ backgroundImage: NOISE }} />

      <div className="mx-auto grid max-w-[1180px] items-center gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
        <div className="sst-team-stage @container relative mx-auto w-full max-w-[30rem]">
          <Reveal />
          <div aria-hidden="true" className="sst-team-hang relative mx-auto w-[15.5em] pt-[5.5em] text-[length:5.2cqw] sm:text-[length:4cqw]">
            {/* The strap's two bands run from the clasp up past the section's top edge; the back one is darker. */}
            <span className="sst-team-strap absolute bottom-[calc(100%-2.2em)] left-1/2 -ml-[0.8em] h-[46em] w-[1.6em]" style={{ "--a": "-17deg", "--band": "#0f3712" } as CSSProperties} />
            <span className="sst-team-strap absolute bottom-[calc(100%-2.2em)] left-1/2 -ml-[0.8em] h-[46em] w-[1.6em]" style={{ "--a": "17deg" } as CSSProperties} />
            {/* The clasp the bands meet in, and the hook that goes through the badge's slot. */}
            <span className="absolute top-[1.2em] left-1/2 z-10 h-[1.5em] w-[2.4em] -translate-x-1/2 rounded-[0.5em] bg-[#fdf8f2] shadow-[0_0.22em_0_#cbbda6]" />
            <span className="absolute top-[2.6em] left-1/2 z-20 h-[4em] w-[0.56em] -translate-x-1/2 rounded-full bg-[#fdf8f2] shadow-[inset_-0.16em_0_0_#cbbda6]" />

            <div className="relative rounded-[1.5em] bg-[#fffdf8] px-[0.8em] pt-[2em] pb-[0.9em] shadow-[0_0.5em_0_#b796d8]">
              <span className="absolute top-[0.75em] left-1/2 h-[0.6em] w-[2.6em] -translate-x-1/2 rounded-full bg-lilac shadow-[inset_0_0.1em_0_rgb(12_11_10/0.2)]" />

              <div className="rounded-[0.9em] bg-forest px-[1em] pt-[1.15em] pb-[1.1em]">
                <p className="mtavruli text-[1.75em] leading-none font-extrabold tracking-[-0.02em] text-lime">გამარჯობა!</p>
                <p className="mt-[0.9em] text-[0.7em] leading-none text-cream/80">შენს დეკლარაციას მე ვავსებ</p>
              </div>

              <div className="grid h-[6.4em] place-items-center">
                <svg viewBox="0 0 220 84" fill="none" className="sst-team-sign h-[4.6em] w-auto -rotate-[4deg]">
                  <path pathLength={1} d={SIGNATURE} stroke="#154618" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex gap-[0.45em] px-[0.2em]">
                {[
                  { Flag: FlagGe, word: "ქართულად" },
                  { Flag: FlagDe, word: "Deutsch" },
                ].map(({ Flag, word }) => (
                  <span key={word} className="inline-flex items-center gap-[0.45em] rounded-full bg-lilac/35 py-[0.32em] pr-[0.75em] pl-[0.36em] text-[0.64em] leading-none font-semibold text-ink/80">
                    <Flag className="size-[1.5em]!" />
                    {word}
                  </span>
                ))}
              </div>

              <div className="mt-[0.9em] flex items-center justify-between px-[0.2em]">
                <span className="flex items-center gap-[0.45em]">
                  <LogoMark className="h-[1.7em]!" />
                  <span className="font-display text-[0.9em] leading-none tracking-[-0.04em] text-forest font-stretch-[88%]">
                    <span className="font-extrabold">{site.nameStart}</span>
                    <span className="font-medium">{site.nameEnd}</span>
                    <span className="font-semibold text-leaf">{site.tld}</span>
                  </span>
                </span>
                <span className="sst-team-bars h-[1.3em] w-[2.2em]" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Reveal />
          <p className="sst-team-rise inline-flex items-center gap-2 rounded-full bg-white/45 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">გუნდი</span>
          </p>
          <h2
            id="team-title"
            className="sst-team-rise mtavruli mt-4 text-[clamp(1.45rem,6.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink"
            style={order(1)}
          >
            ვინ ავსებს ჩემს{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
              დეკლარაციას?
            </span>
          </h2>
          <p className="sst-team-rise mt-4 max-w-[32rem] text-[14.5px] leading-[1.6] text-ink/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            შენს დეკლარაციას პროგრამა კი არა, ადამიანი ავსებს: ის, ვინც გერმანულ საგადასახადო ფორმებთან ყოველდღე მუშაობს.
          </p>

          <ul className="sst-team-rise mt-8 grid gap-y-3.5 sm:mt-9 sm:gap-y-4" style={order(3)}>
            {PROMISES.map((text) => (
              <li key={text} className="flex items-start gap-3 text-[14.5px] leading-[1.4] text-ink/85 sm:text-[15.5px]">
                <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-forest text-lime">
                  <CheckIcon className="size-3" strokeWidth={3.5} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="sst-team-rise mt-9 sm:mt-10" style={order(4)}>
            <CtaLink size="lg" variant="forest" />
          </div>
        </div>
      </div>
    </section>
  );
}
