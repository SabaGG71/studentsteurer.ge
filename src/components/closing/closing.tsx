import type { CSSProperties } from "react";
import { NOISE_LIGHT } from "@/lib/noise";
import { PLANS, priceOf } from "@/lib/plans";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import { StampArt } from "./closing-art";
import "@/components/why/why.css";

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// A notch of the card, cut out of its edge at the perforation: a disc in the page's colour.
const NOTCH = "absolute size-6 rounded-full bg-background";

// The last section: the page's closing call, kept inside the page's width and made of what the page already has.
// The card is the deep green slip of paper from the second section, laid on its side and grown to the page's
// width: the call and the button on the left, a perforation, and a picture on the right. The picture is its own,
// drawn the way that section's are (closing-art): a declaration with a stamp hanging over it, which comes down on
// the sheet again and again and leaves the site's sign on it.
//
// The card and its entrance are the second section's (why.css). The price is the one the plans start from
// (lib/plans), a placeholder.
export function Closing() {
  return (
    <section id="start" aria-labelledby="start-title" className="bg-background px-4 pb-20 sm:px-6 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal />
        <div
          className="sst-end-card sst-why-rise relative flex flex-col rounded-[2.25rem] bg-forest text-cream transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:transition-none sm:rounded-[2.5rem] lg:flex-row"
          style={order(0)}
        >
          {/* What the card is made of: two faint rings in a corner, and the grain. */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute -top-24 -right-24 size-64 rounded-full border border-white/[0.08]" />
            <span className="absolute -top-40 -right-40 size-[26rem] rounded-full border border-white/[0.08]" />
            <span className="absolute inset-0" style={{ backgroundImage: NOISE_LIGHT, opacity: 0.09 }} />
          </span>

          <div className="relative flex flex-1 flex-col justify-center px-6 pt-9 pb-7 sm:px-10 sm:pt-12 sm:pb-9 lg:py-14 lg:pr-10 lg:pl-16">
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 py-1.5 pr-3.5 pl-2.5 sm:pr-4">
              <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
              <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-cream/90 sm:text-[11.5px]">დაწყება</span>
            </p>
            <h2 id="start-title" className="mtavruli mt-4 text-[clamp(1.6rem,6.8vw,2.9rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance">
              დეკლარაცია{" "}
              <span className="relative isolate inline-block whitespace-nowrap text-forest">
                <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
                ჩვენ
              </span>{" "}
              მოგვანდე
            </h2>
            <p className="mt-4 max-w-[30rem] text-[14.5px] leading-[1.6] text-balance text-cream/70 sm:text-[16px] sm:leading-[1.65]">
              შევამოწმებთ დოკუმენტებს, მოვამზადებთ დეკლარაციას და <span className="whitespace-nowrap">Finanzamt-ში</span> გავგზავნით.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-9">
              <CtaLink size="lg" variant="lime" className="max-sm:w-full" />
              <p className="text-[14px] leading-none text-cream/70 sm:text-[15px]">
                <span className="font-display text-[1.15em] font-semibold text-lime">{priceOf(PLANS[0].price)}</span>-დან
              </p>
            </div>
          </div>

          {/* The perforation: a dashed line between two notches. It runs across the card while the picture is under
              the words, and down the card once the picture stands beside them. */}
          <div aria-hidden="true" className="relative h-6 shrink-0 lg:h-auto lg:w-6">
            <span className={`${NOTCH} top-1/2 -left-3 -translate-y-1/2 lg:-top-3 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0`} />
            <span className={`${NOTCH} top-1/2 -right-3 -translate-y-1/2 lg:top-auto lg:right-auto lg:-bottom-3 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0`} />
            <span className="absolute inset-x-7 top-1/2 border-t-2 border-dashed border-white/25 lg:inset-x-auto lg:inset-y-7 lg:left-1/2 lg:border-t-0 lg:border-l-2" />
          </div>

          {/* The picture: on a dotted mat in a soft light, with the grain over it once more. Its size follows the
              width it is given. */}
          <div
            aria-hidden="true"
            className="@container relative mx-auto flex w-full max-w-[28rem] flex-col justify-center px-3 pt-1 pb-5 lg:mx-0 lg:w-[41%] lg:max-w-none lg:shrink-0 lg:py-7 lg:pr-8 lg:pl-3"
          >
            <div className="relative mx-auto text-[length:calc(100cqw/28.5)]">
              <span className="absolute top-[14%] left-1/2 h-[84%] w-[104%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(173_238_104/0.22),transparent)]" />
              <span className="absolute -inset-x-[1em] top-[18%] bottom-0 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.5px)] bg-[size:1.5em_1.5em] mask-[radial-gradient(closest-side,#000_25%,transparent)]" />
              <StampArt />
              <span
                className="pointer-events-none absolute -inset-[1em] mask-[radial-gradient(closest-side,#000_72%,transparent)] mix-blend-soft-light"
                style={{ backgroundImage: NOISE_LIGHT, opacity: 0.12 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
