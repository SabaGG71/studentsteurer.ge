import type { CSSProperties, ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOISE, NOISE_LIGHT, NOISE_WARM } from "@/lib/noise";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import { ReturnArt, WithheldArt, YearArt } from "./why-art";
import "./why.css";

// What each card is made of: its colours, the dotted mat and the soft light under its picture, and its grain (once
// under everything, once more over the picture, where `blend` says how it mixes in).
const LOOKS = {
  lilac: {
    card: "bg-[#eee0fb] text-ink",
    glow: "bg-[radial-gradient(closest-side,rgb(255_255_255/0.75),transparent)]",
    dots: "bg-[radial-gradient(rgb(59_31_99/0.17)_1px,transparent_1.5px)]",
    ring: "border-ink/[0.06]",
    grain: NOISE,
    grainUnder: 0.3,
    grainOver: 0.24,
    blend: "mix-blend-multiply",
    dash: "border-ink/20",
    term: "bg-white/75 text-forest",
    text: "text-ink/70",
  },
  apricot: {
    card: "bg-[#fcebcb] text-ink",
    glow: "bg-[radial-gradient(closest-side,rgb(255_255_255/0.8),transparent)]",
    dots: "bg-[radial-gradient(rgb(122_74_12/0.17)_1px,transparent_1.5px)]",
    ring: "border-ink/[0.06]",
    grain: NOISE_WARM,
    grainUnder: 0.26,
    grainOver: 0.22,
    blend: "mix-blend-multiply",
    dash: "border-ink/20",
    term: "bg-white/75 text-forest",
    text: "text-ink/70",
  },
  forest: {
    card: "bg-forest text-cream",
    glow: "bg-[radial-gradient(closest-side,rgb(173_238_104/0.22),transparent)]",
    dots: "bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.5px)]",
    ring: "border-white/[0.08]",
    grain: NOISE_LIGHT,
    grainUnder: 0.09,
    grainOver: 0.12,
    blend: "mix-blend-soft-light",
    dash: "border-white/25",
    term: "bg-white/10 text-lime",
    text: "text-cream/70",
  },
};

// Why money comes back, in three steps. Each has the German word for it, a line, a sentence and a picture.
const POINTS: { look: keyof typeof LOOKS; term: string; title: string; text: string; art: ReactNode }[] = [
  {
    look: "lilac",
    term: "Lohnsteuer",
    title: "ხელფასიდან გიკავებენ",
    text: "გერმანიაში დამსაქმებელი ყოველი ხელფასიდან ავტომატურად აკავებს საშემოსავლო გადასახადს და Finanzamt-ს ურიცხავს.",
    art: <WithheldArt />,
  },
  {
    look: "apricot",
    term: "Kalenderjahr",
    title: "ანგარიში წლიურია",
    text: "თანხა ისე ითვლება, თითქოს თორმეტივე თვე მუშაობდე. რამდენიმე თვის შემოსავალზე ხშირად საჭიროზე მეტი გამოდის დაკავებული.",
    art: <YearArt />,
  },
  {
    look: "forest",
    term: "Erstattung",
    title: "სხვაობა გიბრუნდება",
    text: "წლის დასრულების შემდეგ დეკლარაცია აჩვენებს, რეალურად რამდენი გეკუთვნოდა. ზედმეტად დაკავებული თანხა შენს ანგარიშზე ბრუნდება.",
    art: <ReturnArt />,
  },
];

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// A card's notches, cut out of two opposite sides at the perforation. They are discs in the page's colour.
const NOTCH = "absolute size-6 rounded-full bg-background";

// The second section, on the page's cream: why the money comes back at all. A short header (the insight in two
// lines, the conclusion beside it), then three cards that tell it in order: a piece is taken from the coin, the
// calendar shows why it was too big a piece, the piece comes back. Each card is cut like a slip of paper, with a
// perforation between its picture and its words, and a round arrow sits on the seam between one card and the next.
// Under them, one line of caution and the way on.
//
// The cards stand in a row from 1024px up. Below that they are stacked: on phones as they are, picture above
// words; between 640px and 1024px lying down, picture beside words, with the perforation running down between.
//
// Everything comes in once, when it scrolls into view (`Reveal`, why.css), and pointing at a card moves its picture.
// The hero's scroll key leads here (`#why`).
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-end lg:gap-14">
          <Reveal />
          <div>
            <p
              className="sst-why-rise inline-flex items-center gap-2 rounded-full bg-lilac/35 py-1.5 pr-3.5 pl-2.5 sm:pr-4"
              style={order(0)}
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
              <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">
                რატომ გიბრუნდება ფული
              </span>
            </p>
            <h2
              id="why-title"
              className="sst-why-rise mtavruli mt-4 text-[clamp(1.45rem,6.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink lg:text-[clamp(1.9rem,3.1vw,2.4rem)]"
              style={order(1)}
            >
              გადასახადი წელზეა გათვლილი. შენ კი{" "}
              <span className="relative isolate inline-block whitespace-nowrap">
                <span aria-hidden="true" className="sst-why-mark absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 rounded-[0.14em] bg-lime" />
                რამდენიმე თვე
              </span>{" "}
              იმუშავე.
            </h2>
          </div>
          <p className="sst-why-rise text-[14.5px] leading-[1.6] text-ink/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            ამიტომ ხელფასიდან ხშირად იმაზე მეტს გიკავებენ, ვიდრე რეალურად გეკუთვნის. სხვაობა შენია და მისი დაბრუნება
            შეიძლება.
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          <Reveal />
          <ol className="grid gap-6 lg:grid-cols-3">
            {POINTS.map(({ look, term, title, text, art }, i) => {
              const l = LOOKS[look];
              return (
                <li
                  key={term}
                  className={cn(
                    "sst-why-card sst-why-rise relative flex flex-col rounded-[2.25rem] transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:transition-none sm:rounded-[2.5rem] sm:max-lg:flex-row",
                    l.card
                  )}
                  style={order(i)}
                >
                  {/* What the card is made of: two faint rings in a corner, and the grain. */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                    <span className={cn("absolute -top-24 -right-24 size-64 rounded-full border", l.ring)} />
                    <span className={cn("absolute -top-40 -right-40 size-[26rem] rounded-full border", l.ring)} />
                    <span className="absolute inset-0" style={{ backgroundImage: l.grain, opacity: l.grainUnder }} />
                  </span>

                  {/* The arrow from the card before, on the seam between the two: above this card while they are
                      stacked (over the pictures where the cards lie on their sides, clear of the notch), to its
                      left once they stand in a row. */}
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-8 left-1/2 z-10 grid size-10 -translate-x-1/2 rotate-90 place-items-center rounded-full bg-white text-forest shadow-[0_8px_16px_-10px_rgb(40_20_70/0.7)] ring-[6px] ring-background sm:max-lg:left-[22%] lg:top-[8.5rem] lg:-left-8 lg:translate-x-0 lg:rotate-0"
                    >
                      <ArrowRightIcon className="size-4" strokeWidth={2.25} />
                    </span>
                  )}

                  {/* The picture: on a dotted mat in a soft light, with the grain over it once more so that the
                      drawn things have the card's tooth. Its size follows the width it is given. */}
                  <div className="@container relative flex flex-col justify-center px-3 pt-4 sm:max-lg:w-[44%] sm:max-lg:shrink-0 sm:max-lg:py-5 sm:max-lg:pr-0">
                    <div className="relative mx-auto text-[length:calc(100cqw/28.5)]">
                      <span aria-hidden="true" className={cn("absolute top-[14%] left-1/2 h-[84%] w-[104%] -translate-x-1/2 rounded-[50%]", l.glow)} />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -inset-x-[1em] top-[18%] bottom-0 bg-[size:1.5em_1.5em] mask-[radial-gradient(closest-side,#000_25%,transparent)]",
                          l.dots
                        )}
                      />
                      {art}
                      <span
                        aria-hidden="true"
                        className={cn("pointer-events-none absolute -inset-[1em] mask-[radial-gradient(closest-side,#000_72%,transparent)]", l.blend)}
                        style={{ backgroundImage: l.grain, opacity: l.grainOver }}
                      />
                    </div>
                  </div>

                  {/* The perforation: a dashed line between two notches. It runs across the card under the picture,
                      and down the card beside the picture where the card lies on its side. */}
                  <div aria-hidden="true" className="relative h-6 shrink-0 sm:max-lg:h-auto sm:max-lg:w-6">
                    <span className={cn(NOTCH, "top-1/2 -left-3 -translate-y-1/2 sm:max-lg:-top-3 sm:max-lg:left-1/2 sm:max-lg:-translate-x-1/2 sm:max-lg:translate-y-0")} />
                    <span className={cn(NOTCH, "top-1/2 -right-3 -translate-y-1/2 sm:max-lg:top-auto sm:max-lg:right-auto sm:max-lg:-bottom-3 sm:max-lg:left-1/2 sm:max-lg:-translate-x-1/2 sm:max-lg:translate-y-0")} />
                    <span className={cn("absolute inset-x-7 top-1/2 border-t-2 border-dashed sm:max-lg:inset-x-auto sm:max-lg:inset-y-7 sm:max-lg:left-1/2 sm:max-lg:border-t-0 sm:max-lg:border-l-2", l.dash)} />
                  </div>

                  <div className="relative flex flex-1 flex-col px-6 pt-4 pb-7 sm:px-8 sm:pb-9 sm:max-lg:justify-center sm:max-lg:py-8 sm:max-lg:pl-7">
                    <p className={cn("self-start rounded-full px-3 py-1.5 font-display text-[12px] leading-none font-semibold", l.term)}>{term}</p>
                    <h3 className="mtavruli mt-4 text-[17px] leading-[1.15] font-extrabold tracking-[-0.01em] sm:text-[19px]">{title}</h3>
                    <p className={cn("mt-2.5 text-[14px] leading-[1.6] sm:text-[15px]", l.text)}>{text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            className="sst-why-rise mt-6 flex flex-col gap-4 rounded-[1.75rem] bg-white p-5 shadow-[0_1px_2px_rgb(40_20_70/0.05),0_24px_44px_-30px_rgb(40_20_70/0.45)] sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:py-2.5 sm:pr-2.5 sm:pl-8"
            style={order(3)}
          >
            <p className="text-[14px] leading-[1.5] text-ink/70 sm:text-[15px]">
              <span className="font-semibold text-ink">ყველა შემთხვევა განსხვავებულია.</span> ზუსტ თანხას შენი დოკუმენტები
              გვიჩვენებს.
            </p>
            <CtaLink size="lg" variant="forest" label="რამდენი გიბრუნდება?" className="shrink-0 max-sm:w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
