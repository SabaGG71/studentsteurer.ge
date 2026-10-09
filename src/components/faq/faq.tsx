import type { CSSProperties } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOISE } from "@/lib/noise";
import { PLANS } from "@/lib/plans";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import { FaqDriver } from "./faq-driver";
import "./faq.css";

// PLACEHOLDERS. The questions are the ones such a service is usually asked; the answers are our guess at how the
// client works and must be checked by the client before launch. On purpose they give no deadlines, amounts,
// guarantees, discounts or contact details, and they do not say who is entitled to a refund: that depends on the
// case and is the client's call. The plans' names come from lib/plans, which is a placeholder too.
const QUESTIONS = [
  {
    q: "დეკლარაციას თქვენ ავსებთ ჩემ მაგივრად?",
    a: "კი. შენ დოკუმენტებს გვიგზავნი, დანარჩენი ჩვენზეა: ვამოწმებთ, ვამზადებთ დეკლარაციას და ვაგზავნით Finanzamt-ში.",
  },
  {
    q: "რა დოკუმენტები დამჭირდება?",
    a: "მთავარია Lohnsteuerbescheinigung: წლიური ცნობა ხელფასისა და დაკავებული გადასახადის შესახებ, რომელსაც დამსაქმებელი გაძლევს. კიდევ რა დაგჭირდება, შენს შემთხვევაზეა დამოკიდებული და თავიდანვე გეტყვით.",
  },
  {
    q: "რამდენ ხანში დამიბრუნდება თანხა?",
    a: "ვადას Finanzamt განსაზღვრავს და ყველა შემთხვევაში სხვადასხვაა. ჩვენი ნაწილი, დეკლარაციის მომზადება და გაგზავნა, დოკუმენტების მიღებისთანავე იწყება.",
  },
  {
    q: "უკვე საქართველოში ვარ. მაინც შემიძლია?",
    a: "დეკლარაციის გასაგზავნად გერმანიაში ყოფნა საჭირო არ არის. დაგიბრუნდება თუ არა თანხა, შენს შემთხვევაზეა დამოკიდებული, ამიტომ ჯერ მას ვამოწმებთ.",
  },
  {
    q: "გერმანული არ ვიცი. პრობლემაა?",
    a: "არა. ჩვენთან ქართულად საუბრობ, გერმანულ ფორმებს კი ჩვენ ვავსებთ.",
  },
  {
    q: "რომელი პაკეტი ავირჩიო?",
    a: `ერთი წლისთვის, როცა დოკუმენტები ხელთ გაქვს, „${PLANS[0].name}“ საკმარისია. თუ გინდა, Finanzamt-თან მიმოწერაც ჩვენ ვაწარმოოთ, აირჩიე „${PLANS[1].name}“. ერთზე მეტი წლისთვის არის „${PLANS[2].name}“.`,
  },
  {
    q: "გადახდა ერთჯერადია თუ გამოწერაა?",
    a: "ერთჯერადი. იხდი ერთი დეკლარაციისთვის, ყოველთვიური საფასური არ არის.",
  },
];

// A small key in the list: a question mark before a question, an exclamation mark before its answer.
const CAP =
  "sst-faq-cap grid size-9 shrink-0 place-items-center rounded-[0.7rem] font-display text-[1.2rem] leading-none font-extrabold text-forest sm:size-10 sm:rounded-[0.8rem] sm:text-[1.35rem]";

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// The ninth section, on the page's cream: the questions. Left, staying in view while the list scrolls: a lilac
// card cut like the logo's key, with the header and the way to ask something else, and on its lower corner two
// large keys, a question mark and an exclamation mark. Right: the questions as an open list, a hairline between
// them and no boxes. Each question has a small question-mark key in front of it. Opening one presses that key in,
// draws the site's lime marker over the question, and unfolds the answer under it, whose own small
// exclamation-mark key hops into place; the large question mark is pressed with it and the large exclamation mark
// jumps in answer (`FaqDriver`, faq.css). One question is open at a time.
//
// The markup holds every answer open, so it reads without scripts and to a search engine; the script folds them.
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <FaqDriver />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal />
          <div className="sst-faq-rise relative isolate rounded-[1.75rem] bg-lilac px-6 pt-7 pb-8 shadow-[0_10px_0_#b796d8] sm:rounded-[2.25rem] sm:px-9 sm:pt-9 sm:pb-10" style={order(0)}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-[0.34]" style={{ backgroundImage: NOISE }} />
            <p className="inline-flex items-center gap-2 rounded-full bg-white/45 py-1.5 pr-3.5 pl-2.5 sm:pr-4">
              <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
              <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">კითხვა-პასუხი</span>
            </p>
            <h2 id="faq-title" className="mtavruli mt-4 text-[clamp(1.45rem,6.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink">
              ხშირად დასმული{" "}
              <span className="relative isolate inline-block whitespace-nowrap">
                <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
                კითხვები
              </span>
            </h2>
            <p className="mt-4 max-w-[15rem] text-[14.5px] leading-[1.6] text-ink/70 sm:text-[16px] sm:leading-[1.65]">ვერ იპოვე პასუხი? მოგვწერე და გიპასუხებთ.</p>
            <div className="mt-7">
              <CtaLink size="lg" variant="forest" label="მოგვწერე" />
            </div>

            {/* The two large keys sit on the card's lower corner, a little over its edge. */}
            <div
              aria-hidden="true"
              className="absolute -right-2 -bottom-5 h-[7.5rem] w-[11.5rem] origin-bottom-right font-display leading-none font-extrabold text-forest max-sm:scale-[0.7] sm:-right-4 sm:-bottom-6"
            >
              <span
                className="sst-faq-key sst-faq-ask absolute bottom-0 left-0 grid size-[6rem] place-items-center rounded-[1.6rem] bg-[#fffdf8] text-[3.6rem]"
                style={{ "--r": "-9deg", "--edge-color": "#b48be0" } as CSSProperties}
              >
                ?
              </span>
              <span
                className="sst-faq-key sst-faq-tell absolute top-0 right-0 grid size-[4.75rem] place-items-center rounded-[1.3rem] bg-lime text-[2.8rem]"
                style={{ "--r": "9deg", "--edge-color": "#62bb39" } as CSSProperties}
              >
                !
              </span>
            </div>
          </div>
        </div>

        <div>
          <Reveal />
          <div className="border-t border-ink/10">
            {QUESTIONS.map(({ q, a }, i) => (
              <div key={q} data-faq-item="" className="sst-faq-rise sst-faq-item border-b border-ink/10 pb-3 sm:pb-4" style={order(i)}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded="true"
                    aria-controls={`faq-a-${i}`}
                    className="flex w-full cursor-pointer items-start gap-4 rounded-lg pt-5 pb-2 text-left outline-forest/60 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-5 sm:pt-6"
                  >
                    <span aria-hidden="true" className={cn(CAP, "sst-faq-cap-q bg-lilac")} style={{ "--edge-color": "#b48be0" } as CSSProperties}>
                      ?
                    </span>
                    <span className="flex-1 pt-[0.45rem] text-[15.5px] leading-[1.4] font-semibold text-ink sm:text-[18px]">
                      <span className="sst-faq-q">{q}</span>
                    </span>
                    <PlusIcon aria-hidden="true" className="sst-faq-plus mt-2 size-5 shrink-0 text-ink/50 sm:mt-2.5" strokeWidth={2.5} />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="sst-faq-panel">
                  <div className="-ml-1 pl-1">
                    <div className="flex items-start gap-4 pt-3 pb-3 sm:gap-5 sm:pb-4">
                      <span aria-hidden="true" className={cn(CAP, "sst-faq-cap-a bg-lime")} style={{ "--edge-color": "#62bb39" } as CSSProperties}>
                        !
                      </span>
                      <p className="flex-1 pt-1.5 text-[14.5px] leading-[1.65] text-ink/75 sm:pt-[0.42rem] sm:pr-12 sm:text-[16px]">{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
