import type { CSSProperties } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOISE } from "@/lib/noise";
import { FEATURES, PLANS } from "@/lib/plans";
import { Key } from "@/components/how/how-art";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import "./pricing.css";

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// The fourth section, on the hero's grainy lilac: the plans. A centred header, then three cards cut like the
// logo's key, a face over a hard edge (no soft shadows), which lift a little under the pointer. The middle one is
// the recommended plan: deep green, and standing a little taller than the other two. Each card has its plan's name
// and a line about it, a small key from the "how it works" drawing in its corner, the price, what the plan adds, and
// the way on. The plans themselves are in lib/plans, which the comparison table under this section reads too.
// Everything comes in once, when it scrolls into view (`Reveal`, pricing.css).
export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative isolate overflow-clip bg-lilac px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.34]" style={{ backgroundImage: NOISE }} />

      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[42rem] text-center">
          <Reveal />
          <p className="sst-price-rise inline-flex items-center gap-2 rounded-full bg-white/55 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">ფასები</span>
          </p>
          <h2
            id="pricing-title"
            className="sst-price-rise mtavruli mt-4 text-[clamp(1.5rem,7vw,2.9rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance text-ink"
            style={order(1)}
          >
            აირჩიე{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
              პაკეტი
            </span>{" "}
            შენი შემთხვევისთვის
          </h2>
          <p className="sst-price-rise mx-auto mt-4 max-w-[33rem] text-[14.5px] leading-[1.6] text-balance text-ink/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            ყველა პაკეტში შედის დეკლარაციის მომზადება და Finanzamt-ში გაგზავნა.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <Reveal />
          <ul className="grid gap-x-6 gap-y-9 lg:grid-cols-3">
            {PLANS.map(({ name, text, price, lead, cta, art, featured }, i) => (
              <li
                key={name}
                className={cn(
                  "sst-price-rise relative flex flex-col rounded-[2.25rem] p-6 transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none sm:p-8",
                  featured
                    ? "bg-forest text-cream shadow-[0_10px_0_#0a260c] hover:shadow-[0_14px_0_#0a260c] lg:-mt-6"
                    : "bg-[#fffdf8] text-ink shadow-[0_10px_0_#b796d8] hover:shadow-[0_14px_0_#b796d8]"
                )}
                style={order(i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {featured && (
                      <p className="mtavruli mb-3.5 inline-flex rounded-full bg-lime px-3 py-1.5 text-[10px] leading-none font-semibold tracking-[0.06em] text-forest">
                        რეკომენდებული
                      </p>
                    )}
                    <h3 className="mtavruli text-[16px] leading-[1.15] font-extrabold tracking-[0.01em] sm:text-[17px]">{name}</h3>
                    <p className={cn("mt-2 text-[14px] leading-[1.5]", featured ? "text-cream/70" : "text-ink/65")}>{text}</p>
                  </div>
                  <svg aria-hidden="true" viewBox="-70 -70 140 150" className="h-[4.5rem] w-auto shrink-0 overflow-visible">
                    <Key k={art} />
                  </svg>
                </div>

                <p className="mt-7 flex min-h-[3.5rem] items-end gap-2.5">
                  {price ? (
                    <>
                      <span className="font-display text-[3.5rem] leading-[0.85] font-extrabold tracking-[-0.03em]">{price}</span>
                      <span className="pb-0.5 leading-tight">
                        <span className="block text-[1.35rem] font-extrabold">₾</span>
                        <span className={cn("block text-[12.5px]", featured ? "text-cream/60" : "text-ink/55")}>ერთ დეკლარაციაზე</span>
                      </span>
                    </>
                  ) : (
                    <span className="mtavruli text-[1.6rem] leading-none font-extrabold tracking-[-0.01em]">შეთანხმებით</span>
                  )}
                </p>

                <div className={cn("mt-7 flex-1 border-t pt-6", featured ? "border-white/15" : "border-ink/10")}>
                  <p className={cn("mtavruli text-[10px] leading-none font-semibold tracking-[0.08em]", featured ? "text-lime/85" : "text-forest/70")}>{lead}</p>
                  <ul className="mt-4 space-y-3">
                    {FEATURES.filter((feature) => feature.from === i).map(({ label }) => (
                      <li key={label} className="flex items-start gap-3 text-[14.5px] leading-[1.45]">
                        <span aria-hidden="true" className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-lime text-forest">
                          <CheckIcon className="size-3" strokeWidth={3.5} />
                        </span>
                        <span className={featured ? "text-cream/90" : "text-ink/80"}>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <CtaLink size="lg" variant={featured ? "lime" : "forest"} label={cta} className="mt-8 w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
