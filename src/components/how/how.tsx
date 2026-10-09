import type { CSSProperties } from "react";
import { NOISE_LIGHT } from "@/lib/noise";
import { Reveal } from "@/components/reveal";
import { FlowDefs, Key, KEY_EDGE, KEYS, STOPS_AT, Tube, VIEW } from "./how-art";
import { FlowDriver } from "./how-flow";
import "./how.css";

// The four stops of the refund's way, one per key, in order: who acts there, what they do, and a line about it.
const STOPS = [
  { who: "შენ", title: "გვიგზავნი დოკუმენტებს", text: "გერმანიიდან წამოღებულ სახელფასო დოკუმენტებს გვიზიარებ." },
  { who: "ჩვენ", title: "ვამზადებთ დეკლარაციას", text: "ვამოწმებთ მონაცემებს და დეკლარაციას გერმანულად ვავსებთ." },
  {
    who: "Finanzamt",
    title: "განიხილავს განაცხადს",
    text: "დეკლარაციას ჩვენ ვაგზავნით. Finanzamt ამოწმებს მას და გადაწყვეტილებას იღებს.",
  },
  { who: "შენ", title: "იღებ თანხას", text: "დადასტურებული თანხა პირდაპირ შენს საბანკო ანგარიშზე ირიცხება." },
];
const LAST = STOPS.length - 1;

const order = (d: number) => ({ "--d": d }) as CSSProperties;
const n = (value: number) => Number(value.toFixed(3));

// How a stop is marked before `FlowDriver` takes over: the journey finished, the light at the last stop.
const mark = (k: number) => ({ "data-k": k, "data-on": k === LAST ? "" : undefined, "data-done": k < LAST ? "" : undefined });

// Where each stop is along the tube, for how.css (--p0 to --p3).
const PLACES = Object.fromEntries(STOPS_AT.map((at, k) => [`--p${k}`, at])) as CSSProperties;

// A stop's words. The label takes its key's colour (the last key is pale, so its label is lime, like money).
function Caption({ k, className }: { k: number; className?: string }) {
  const { who, title, text } = STOPS[k];
  return (
    <div className={className}>
      <p className="mtavruli text-[10px] leading-none font-semibold tracking-[0.09em] sm:text-[10.5px]" style={{ color: k === LAST ? "#adee68" : KEYS[k].face }}>
        {who}
      </p>
      <h3 className="mtavruli mt-2 text-[15px] leading-[1.15] font-extrabold tracking-[-0.005em] text-cream sm:text-[16.5px]">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-cream/70 sm:mt-2 sm:text-[14.5px]">{text}</p>
    </div>
  );
}

// The third section, on deep green from edge to edge: how it works. A centred header, and under it one drawing: a
// tube that crosses the whole screen in a slow wave, with four thick keys on it, one per stop, each carrying what
// the stop is about (the payslips, the tax return, the tax office's stamp, the money) and its words under it. A
// light flows through the tube from stop to stop; each key takes its own colour as the light reaches it, and
// pointing at a key or at its words holds the light there (`FlowDriver`, how.css).
//
// From 1024px up the tube waves across (`Tube`). Below that the stops are a list, and the tube a straight pipe
// down its left side. Both are in the page; each shows only where it fits.
//
// The menu's "როგორ მუშაობს" leads here (`#how`).
export function How() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative isolate overflow-clip bg-forest px-4 py-16 text-cream sm:px-6 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute -bottom-40 -left-40 size-[30rem] rounded-full border border-white/[0.06]" />
        <span className="absolute -bottom-64 -left-64 size-[44rem] rounded-full border border-white/[0.05]" />
        <span className="absolute inset-0 opacity-[0.09]" style={{ backgroundImage: NOISE_LIGHT }} />
      </div>

      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <Reveal />
          <p className="sst-how-rise inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pr-3.5 pl-2.5 sm:pr-4" style={order(0)}>
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            <span className="mtavruli text-[10px] leading-tight font-semibold tracking-[0.04em] text-cream/90 sm:text-[11.5px]">როგორ მუშაობს</span>
          </p>
          <h2
            id="how-title"
            className="sst-how-rise mtavruli mt-4 text-[clamp(1.5rem,7vw,2.9rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance"
            style={order(1)}
          >
            <span className="text-lime">ოთხი გაჩერება</span> შენს ანგარიშამდე
          </h2>
          <p className="sst-how-rise mx-auto mt-4 max-w-[33rem] text-[14.5px] leading-[1.6] text-balance text-cream/70 sm:text-[16px] sm:leading-[1.65]" style={order(2)}>
            დოკუმენტები გერმანიაში მიდის, თანხა კი შენთან ბრუნდება. აი, რა ხდება გზად.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-12">
          <Reveal />
          <div className="sst-how-rise sst-flow relative" data-step={LAST} style={PLACES}>
            <FlowDriver />
            <FlowDefs />

            {/* Wide screens: the tube waves across, and each stop's words hang under its key. */}
            <div className="@container relative pb-36 max-lg:hidden">
              <svg aria-hidden="true" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="block w-full overflow-visible">
                <Tube />
                {KEYS.map(({ x, y }, k) => (
                  <g key={x} transform={`translate(${x} ${y})`}>
                    <Key k={k} />
                  </g>
                ))}
              </svg>
              <ol aria-label="როგორ მუშაობს: ოთხი ეტაპი" className="pointer-events-none absolute inset-0">
                {KEYS.map(({ x, y, half }, k) => (
                  <li
                    key={x}
                    {...mark(k)}
                    className="sst-cap pointer-events-auto absolute w-[min(15.5rem,22cqw)] -translate-x-1/2 text-center"
                    style={{ left: `${n((x / VIEW.w) * 100)}%`, top: `calc(100cqw * ${n((y + half + KEY_EDGE + 20) / VIEW.w)})` }}
                  >
                    <Caption k={k} />
                  </li>
                ))}
              </ol>
            </div>

            {/* Narrower screens: the stops as a list, on a straight pipe. The rows are equally tall, so the stops
                are evenly spaced along it. */}
            <ol aria-label="როგორ მუშაობს: ოთხი ეტაპი" className="relative grid auto-rows-fr lg:hidden">
              <li
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-[3.25rem] w-3.5 -translate-x-1/2 mask-[linear-gradient(to_bottom,transparent,#000_7%,#000_93%,transparent)] sm:left-16"
              >
                <span className="absolute inset-0 rounded-full bg-[#1b5521] shadow-[inset_0_0_0_1.5px_rgb(253_248_242/0.3)]" />
                <span className="sst-pipe-light absolute inset-x-[3px] top-0 h-full rounded-full bg-[linear-gradient(to_bottom,#dbb9f3_12.5%,#adee68_37.5%,#f8c677_62.5%,#8fe24f_87.5%)]" />
                <span className="sst-pipe-head absolute left-1/2 h-6 w-2 -translate-1/2 rounded-full bg-[#fffdf4] shadow-[0_0_10px_3px_rgb(255_253_244/0.55)]" />
              </li>
              {STOPS.map(({ title }, k) => (
                <li key={title} className="relative flex items-center gap-4 py-2.5 sm:gap-6 sm:py-3">
                  <svg aria-hidden="true" viewBox="-100 -95 200 200" className="size-[6.5rem] shrink-0 overflow-visible sm:size-32">
                    <Key k={k} />
                  </svg>
                  <div {...mark(k)} className="sst-cap min-w-0 flex-1">
                    <Caption k={k} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
