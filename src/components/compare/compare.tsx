import type { CSSProperties } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURES, PLANS, priceOf } from "@/lib/plans";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import "@/components/pricing/pricing.css";

// The table's columns, in hundredths of its width: the lines' names, then one column per plan.
const NAMES = 34;
const PLAN = (100 - NAMES) / PLANS.length;
const FEATURED = PLANS.findIndex((plan) => plan.featured);

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// The fifth section, on the page's cream: the plans side by side. A header on the left, then one sheet cut like
// the logo's key (a face over a hard edge) holding a table: every line the plans include down the side, a lime
// tick where a plan has it and a dash where it has not. The recommended plan's column is a deep green pillar that
// runs through the whole table and stands out past the sheet at the top and at the bottom. Under the table, the
// way on for whoever still has a question. The plans and their lines come from lib/plans, like the pricing cards'.
//
// It is a real table, so it reads as one to a screen reader. On phones it keeps all four columns: the plans' names
// get small and the prices and the buttons, which the cards just above already show, are left out.
export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[40rem]">
          <Reveal />
          <p className="sst-price-rise inline-flex items-center gap-2 rounded-full bg-lilac/35 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">შედარება</span>
          </p>
          <h2
            id="compare-title"
            className="sst-price-rise mtavruli mt-4 text-[clamp(1.45rem,6.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink"
            style={order(1)}
          >
            ყველაფერი, რაც{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
              პაკეტებში
            </span>{" "}
            შედის
          </h2>
          <p className="sst-price-rise mt-4 max-w-[30rem] text-[14.5px] leading-[1.6] text-ink/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            სამივე პაკეტი ერთ ცხრილში: ნახე, რით განსხვავდება ერთმანეთისგან.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <Reveal />
          <div className="sst-price-rise relative rounded-[1.75rem] bg-[#fffdf8] pb-3 shadow-[0_10px_0_#e0d5c6] sm:rounded-[2.25rem] sm:pb-0" style={order(0)}>
            {/* The recommended plan's pillar: behind its column, a little narrower than it, and taller than the sheet. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -bottom-4 rounded-[1.1rem] bg-forest shadow-[0_10px_0_#0a260c] sm:-top-5 sm:-bottom-5 sm:rounded-[1.75rem]"
              style={{ left: `calc(${NAMES + PLAN * FEATURED}% + 3px)`, width: `calc(${PLAN}% - 6px)` }}
            />

            <table className="relative w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: `${NAMES}%` }} />
                {PLANS.map(({ name }) => (
                  <col key={name} style={{ width: `${PLAN}%` }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="pt-6 pr-2 pb-4 pl-4 text-left align-bottom sm:pt-8 sm:pb-6 sm:pl-8">
                    <span className="mtavruli text-[9.5px] leading-none font-semibold tracking-[0.08em] text-ink/45 sm:text-[10.5px]">რა შედის</span>
                  </th>
                  {PLANS.map(({ name, price, featured }) => (
                    <th key={name} scope="col" className={cn("px-1 pt-6 pb-4 align-bottom sm:px-4 sm:pt-8 sm:pb-6", featured ? "text-cream" : "text-ink")}>
                      {featured && (
                        <span className="mtavruli mb-3 inline-flex rounded-full bg-lime px-2.5 py-1.5 text-[9.5px] leading-none font-semibold tracking-[0.06em] text-forest max-lg:hidden">
                          რეკომენდებული
                        </span>
                      )}
                      <span className="mtavruli block text-[9.5px] leading-[1.2] font-extrabold tracking-[0.01em] sm:text-[14px] lg:text-[15px]">{name}</span>
                      <span className={cn("mt-1.5 block font-display text-[15px] leading-none font-semibold max-sm:hidden lg:text-[17px]", featured ? "text-lime" : "text-forest")}>
                        {priceOf(price)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map(({ label, from }) => (
                  <tr key={label}>
                    <th scope="row" className="border-t border-ink/[0.08] py-3.5 pr-2 pl-4 text-left text-[13px] leading-[1.35] font-normal text-ink/80 sm:py-4 sm:pl-8 sm:text-[15px]">
                      {label}
                    </th>
                    {PLANS.map(({ name, featured }, i) => (
                      <td key={name} className={cn("border-t py-3.5 sm:py-4", featured ? "border-white/[0.12]" : "border-ink/[0.08]")}>
                        {i >= from ? (
                          <span className="mx-auto grid size-5 place-items-center rounded-full bg-lime text-forest sm:size-6">
                            <CheckIcon aria-hidden="true" className="size-3 sm:size-3.5" strokeWidth={3.5} />
                            <span className="sr-only">შედის</span>
                          </span>
                        ) : (
                          <span className={cn("mx-auto block h-0.5 w-3 rounded-full", featured ? "bg-white/25" : "bg-ink/20")}>
                            <span className="sr-only">არ შედის</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className="max-sm:hidden">
                <tr>
                  <td className="border-t border-ink/[0.08]" />
                  {PLANS.map(({ name, cta, featured }) => (
                    <td key={name} className={cn("border-t px-3 pt-5 pb-8 lg:px-5", featured ? "border-white/[0.12]" : "border-ink/[0.08]")}>
                      <CtaLink size="md" variant={featured ? "lime" : "forest"} label={cta} className="w-full" />
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          <div
            className="sst-price-rise mt-14 flex flex-col gap-4 rounded-[1.75rem] bg-lilac p-5 shadow-[0_10px_0_#b796d8] sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:py-3 sm:pr-3 sm:pl-8"
            style={order(2)}
          >
            <p className="text-[14.5px] leading-[1.5] text-ink/75 sm:text-[15.5px]">
              <span className="font-semibold text-ink">კიდევ გაქვს კითხვები?</span> მოგვწერე და არჩევაში დაგეხმარებით.
            </p>
            <CtaLink size="lg" variant="forest" label="მოგვწერე" className="shrink-0 max-sm:w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
