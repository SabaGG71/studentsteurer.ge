import type { CSSProperties } from "react";
import { CheckIcon } from "lucide-react";
import { NOISE_LIGHT, NOISE_WARM } from "@/lib/noise";
import { Reveal } from "@/components/reveal";
import { LogoMark, Paragraph } from "@/components/site-header/logo";
import "./who.css";

// PLACEHOLDERS. Who the service is for is our guess at the usual cases; the client has not confirmed the list.
// The first four are the kinds of work the tags in the pile name, in the same order.
const WHO = [
  "ზაფხულის სამუშაოზე იყავი",
  "სწავლის პარალელურად მუშაობდი",
  "ანაზღაურებადი სტაჟირება გაიარე",
  "სეზონურ სამუშაოზე იყავი",
  "პირველად ავსებ დეკლარაციას",
  "უკვე დაბრუნდი საქართველოში",
  "რამდენიმე წელი იმუშავე",
  "წინა წლების თანხა არ მოგითხოვია",
];

// The pile: the German word for a kind of work, where its tag lies on the slab (hundredths of the slab's width
// and height), how far it is turned, and its colours (face, the edge under it, the word).
const TAGS = [
  { word: "Ferienjob", left: 6, top: 12, turn: -7, face: "#adee68", edge: "#62bb39", ink: "#154618" },
  { word: "Werkstudent", left: 31, top: 31, turn: 5, face: "#dbb9f3", edge: "#b48be0", ink: "#0c0b0a" },
  { word: "Praktikum", left: 9, top: 50, turn: -3, face: "#f8c677", edge: "#d99a3c", ink: "#0c0b0a" },
  { word: "Saisonarbeit", left: 33, top: 69, turn: 4, face: "#fdf8f2", edge: "#cbbda6", ink: "#154618" },
];

const order = (d: number) => ({ "--d": d }) as CSSProperties;

// The sixth section, on pale apricot with a grain: who the service is for. Left: the question, one line, and the
// cases as a list of ticks in two columns. Right, on a deep green slab cut like the logo's key (a face over a hard
// edge): a pile of luggage tags in the brand's colours, each with the German word for one kind of work, and the
// logo's own key among them. The tags fall into the pile when the section scrolls into view, and one that is
// pointed at straightens and lifts (`Reveal`, who.css).
export function Who() {
  return (
    <section id="who" aria-labelledby="who-title" className="relative isolate overflow-clip bg-[#fcebcb] px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]" style={{ backgroundImage: NOISE_WARM }} />

      <div className="mx-auto grid max-w-[1180px] items-center gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
        <div>
          <Reveal />
          <p className="sst-who-rise inline-flex items-center gap-2 rounded-full bg-white/60 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-forest" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-ink/80 sm:text-[11.5px]">ვისთვის</span>
          </p>
          <h2
            id="who-title"
            className="sst-who-rise mtavruli mt-4 text-[clamp(1.45rem,6.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink"
            style={order(1)}
          >
            ვის შეგვიძლია{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              <span aria-hidden="true" className="absolute -inset-x-[0.13em] top-[0.05em] bottom-[0.07em] -z-10 -rotate-[1.3deg] rounded-[0.14em] bg-lime" />
              დავეხმაროთ
            </span>
          </h2>
          <p className="sst-who-rise mt-4 max-w-[30rem] text-[14.5px] leading-[1.6] text-ink/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            თუ გერმანიაში იმუშავე და ხელფასიდან გადასახადი დაგიკავეს, შენს შემთხვევასაც აქ იპოვი.
          </p>

          <ul className="sst-who-rise mt-8 grid gap-x-6 gap-y-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-y-[1.125rem]" style={order(3)}>
            {WHO.map((text) => (
              <li key={text} className="flex items-start gap-3 text-[14.5px] leading-[1.4] text-ink/85 sm:text-[15px]">
                <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-forest">
                  <CheckIcon className="size-3" strokeWidth={3.5} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Reveal />
          <div
            aria-hidden="true"
            className="@container sst-who-rise relative mx-auto aspect-[5/4] w-full max-w-[34rem] rounded-[1.75rem] bg-forest shadow-[0_10px_0_#0a260c] sm:rounded-[2.25rem]"
          >
            {/* The site's sign, large and faint, under a grain; the slab cuts both off. */}
            <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <Paragraph className="absolute top-1/2 left-[70%] h-[124%] w-auto -translate-1/2 -rotate-12 text-white/[0.05]" />
              <span className="absolute inset-0 opacity-[0.09]" style={{ backgroundImage: NOISE_LIGHT }} />
            </span>

            {TAGS.map(({ word, left, top, turn, face, edge, ink }, i) => (
              <span
                key={word}
                className="sst-who-tag absolute inline-flex items-center gap-[0.45em] rounded-[0.5em] py-[0.36em] pr-[0.7em] pl-[0.48em] font-display text-[length:7.2cqw] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap"
                style={
                  {
                    "--r": `${turn}deg`,
                    "--d": i,
                    left: `${left}%`,
                    top: `${top}%`,
                    background: face,
                    color: ink,
                    boxShadow: `0 0.17em 0 ${edge}`,
                  } as CSSProperties
                }
              >
                {/* The hole the tag hangs by: the slab shows through it. */}
                <span className="size-[0.36em] shrink-0 rounded-full bg-forest shadow-[inset_0_0.06em_0_rgb(0_0_0/0.3)]" />
                {word}
              </span>
            ))}

            <span className="sst-who-tag absolute" style={{ "--r": "11deg", "--d": TAGS.length, left: "77%", top: "7%" } as CSSProperties}>
              <LogoMark className="h-[12.5cqw]!" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
