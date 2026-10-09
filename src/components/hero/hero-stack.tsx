import type { CSSProperties, ReactNode } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "./hero.css";

// Drawn in em, so its font-size sets its size. Each layer is a flat square (S x S) turned 45° and squashed to half
// height, so it shows as a diamond 2 * HALF_W wide and 2 * HALF_H tall, seen from above at an angle. The layers hang
// one under the other, --gap apart (hero.css): from 640px up that is GAP, less than a diamond's height, so they
// overlap in a stack; on phones it is a whole row's height, so they stand apart as four tiles. Either way the rows
// beside them are --gap tall as well, which keeps every row level with its layer.
//
// Inside a layer everything is placed in the square's own plane. Two things follow from the tilt: "straight up" on
// screen is up and to the right in the plane (`translate(a, -a)`), and a tick lying on a layer is drawn turned back
// by 45° (`rotate-45`) so that it still reads as a tick.
const S = 15;
export const GAP = 7.8;
export const HALF_W = 0.70711 * S;
export const HALF_H = 0.35355 * S;
// How far below the stack's top the first layer's middle is, its thickness included.
export const CENTRE = HALF_H + 0.6;
const PLANE = "scaleY(0.5) rotate(-45deg)";
const WALLS = [4, 3, 2, 1];

export const em = (n: number) => `${Number(n.toFixed(3))}em`;

const BAR = "block rounded-full bg-ink/[0.13]";
const SHEET = "absolute rounded-[0.9em] bg-white shadow-[0_0.5em_1em_-0.6em_rgb(59_31_99/0.45)]";

type Look = { top: string; left: string; right: string; edge: string; rim: string };

// Each drawing has one part that moves when its layer's step comes on (the `sst-art-…` classes, see hero.css): the
// top payslip is held up, the ticks are ticked one by one, the stamp comes down, the coins hop.

// 1. What you send: the payslips, with the tax row marked.
function Documents() {
  return (
    <>
      <span className={cn(SHEET, "opacity-75")} style={{ left: em(4.6), top: em(1.6), width: em(8.4), height: em(10.4) }} />
      <span className={cn(SHEET, "sst-art-sheet p-[0.9em]")} style={{ left: em(2.2), top: em(3), width: em(8.4), height: em(10.4) }}>
        <span className="flex items-center gap-[0.45em]">
          <span className="size-[0.9em] shrink-0 rounded-full bg-forest" />
          <span className={cn(BAR, "h-[0.5em] w-[3.6em] bg-forest/60")} />
        </span>
        <span className={cn(BAR, "mt-[1em] h-[0.42em] w-[78%]")} />
        <span className={cn(BAR, "mt-[0.55em] h-[0.42em] w-full")} />
        <span className="mt-[0.6em] block h-[1.1em] rounded-full bg-apricot" />
        <span className={cn(BAR, "mt-[0.6em] h-[0.42em] w-[88%]")} />
        <span className={cn(BAR, "mt-[0.55em] h-[0.42em] w-[52%]")} />
      </span>
    </>
  );
}

// 2. What we prepare: the tax return, filled in line by line.
function Declaration() {
  return (
    <span className={cn(SHEET, "flex flex-col gap-[0.7em] rounded-[1.2em] p-[1em]")} style={{ left: em(1.8), top: em(1.8), width: em(11.4), height: em(11.4) }}>
      {[5.4, 6.6, 4.4].map((w, k) => (
        <span key={w} className="flex items-center gap-[0.6em]">
          <span
            className="sst-art-tick grid size-[1.7em] shrink-0 place-items-center rounded-full bg-lime text-forest"
            style={{ "--k": k } as CSSProperties}
          >
            <CheckIcon className="size-[1.1em] rotate-45" strokeWidth={3.5} />
          </span>
          <span className={cn(BAR, "h-[0.5em]")} style={{ width: em(w) }} />
        </span>
      ))}
      <span className="mt-auto grid h-[1.9em] place-items-center rounded-full bg-forest">
        <span className="block h-[0.45em] w-[4.4em] rounded-full bg-lime" />
      </span>
    </span>
  );
}

// 3. The tax office: its stamp on the return.
function Office() {
  return (
    <>
      <span className={cn(SHEET, "rounded-[1.2em] p-[1em]")} style={{ left: em(1.8), top: em(1.8), width: em(11.4), height: em(11.4) }}>
        <span className={cn(BAR, "h-[0.5em] w-[5em] bg-ink/30")} />
        <span className={cn(BAR, "mt-[0.6em] h-[0.42em] w-[3.4em]")} />
      </span>
      <span
        className="sst-art-stamp absolute grid place-items-center rounded-full border-[0.2em] border-leaf text-leaf"
        style={{ left: em(5.3), top: em(5.1), width: em(6.6), height: em(6.6) }}
      >
        <span className="absolute inset-[0.42em] rounded-full border-[0.11em] border-dashed border-leaf/70" />
        <CheckIcon className="size-[3em] rotate-45" strokeWidth={3} />
      </span>
    </>
  );
}

// 4. What comes back: the money, on your own account.
function Money() {
  return (
    <>
      <span
        className="absolute flex items-center gap-[0.6em] rounded-[1.1em] bg-white/[0.12] px-[0.8em] ring-[0.08em] ring-white/20"
        style={{ left: em(1.8), top: em(1.9), width: em(11.4), height: em(3.6) }}
      >
        <span className="font-display text-[1.5em] leading-none font-bold tracking-[-0.02em] text-lime">GE</span>
        <span className="flex flex-1 flex-col gap-[0.4em]">
          <span className="block h-[0.42em] w-full rounded-full bg-white/35" />
          <span className="block h-[0.42em] w-[60%] rounded-full bg-white/20" />
        </span>
      </span>
      {/* The coins' shadow on the layer, then the coins. */}
      <span
        className="absolute rounded-full bg-black/40 blur-[0.5em]"
        style={{ left: em(5), top: em(7.8), width: em(6.4), height: em(6.4) }}
      />
      <span
        className="sst-art-coin absolute grid place-items-center rounded-full bg-[radial-gradient(circle_at_34%_28%,#f0fdd9,#adee68_58%,#93e04f)] shadow-[inset_0_0_0_0.11em_rgb(255_255_255/0.7),-0.2em_0.2em_0_#6cc746,-0.4em_0.4em_0_#6cc746,-0.6em_0.6em_0_#2a7a2e,-0.8em_0.8em_0_#6cc746,-1em_1em_0_#6cc746]"
        style={{ left: em(6.2), top: em(6.6), width: em(6.2), height: em(6.2) }}
      >
        <span className="absolute inset-[0.6em] rounded-full border-[0.13em] border-forest/25" />
        <span className="font-display text-[3.5em] leading-none font-extrabold text-forest">€</span>
      </span>
    </>
  );
}

const LAYERS: { look: Look; art: ReactNode }[] = [
  {
    look: { top: "linear-gradient(150deg,#f8f0fe,#e9d6f9)", left: "#d5b6f0", right: "#bd97e2", edge: "#aa82d2", rim: "rgb(255 255 255 / 0.9)" },
    art: <Documents />,
  },
  {
    look: { top: "linear-gradient(150deg,#f3fde2,#dcf7b9)", left: "#bfee88", right: "#9cdd5d", edge: "#87ca4b", rim: "rgb(255 255 255 / 0.9)" },
    art: <Declaration />,
  },
  {
    look: { top: "linear-gradient(150deg,#fff6e0,#fbe4b0)", left: "#f3ce7e", right: "#e6b555", edge: "#d4a142", rim: "rgb(255 255 255 / 0.9)" },
    art: <Office />,
  },
  {
    look: { top: "linear-gradient(150deg,#236b2b,#154618)", left: "#103a13", right: "#0a280c", edge: "#061c08", rim: "rgb(255 255 255 / 0.22)" },
    art: <Money />,
  },
];

// The way from the payslip to the money, in four thick layers hanging one under the other: the payslips you send,
// the tax return we prepare, the tax office's stamp, and the money on your account. Pressed together at first, they
// move apart on load, then breathe a little. The first is on to begin with; `StepClock` takes it from there, and
// pointing at a layer holds its step (each layer's face carries `data-k`, and is the only part that takes the
// pointer).
//
// From 640px up the layers overlap in a stack: one shadow lies on the ground under it, and every layer but the top
// one is shaded where it passes under the layer above. On phones they stand apart as tiles on a dashed thread, each
// over a small shadow of its own.
export function HeroStack({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("sst-stack pointer-events-none relative shrink-0 select-none", className)}
      style={
        {
          "--centre": em(CENTRE),
          width: em(2 * HALF_W),
          height: `calc(${em(2 * HALF_H + 2.2)} + var(--gap) * 3)`,
        } as CSSProperties
      }
    >
      <span
        className="absolute left-1/2 h-[4.6em] w-[19em] -translate-x-1/2 rounded-[50%] bg-[#3b1f63]/20 blur-[1.3em] max-sm:hidden"
        style={{ top: `calc(${em(HALF_H + 3.4)} + var(--gap) * 3)` }}
      />
      <span
        className="absolute left-1/2 -translate-x-1/2 border-l border-dashed border-ink/25 sm:hidden"
        style={{ top: em(HALF_H), height: "calc(var(--gap) * 3)" }}
      />

      {LAYERS.map(({ look, art }, i) => (
        <div
          key={i}
          className="sst-layer absolute"
          style={
            {
              "--i": i,
              left: em(HALF_W - S / 2),
              top: `calc(${em(HALF_H - S / 2)} + var(--gap) * ${i})`,
              width: em(S),
              height: em(S),
              zIndex: LAYERS.length - i,
            } as CSSProperties
          }
        >
          <span
            className="absolute left-1/2 h-[3em] w-[13em] -translate-x-1/2 rounded-[50%] bg-[#3b1f63]/25 blur-[0.9em] sm:hidden"
            style={{ top: em(S / 2 + HALF_H) }}
          />
          <div className="sst-float size-full">
            <div data-slab={i} data-on={i === 0 ? "" : undefined} className="sst-slab size-full">
              <div data-k={i} className="pointer-events-auto relative size-full" style={{ transform: PLANE }}>
                {WALLS.map((k) => (
                  <span
                    key={k}
                    className="absolute inset-0 rounded-[2em]"
                    style={{
                      transform: `translate(${em(-0.42 * k)}, ${em(0.42 * k)})`,
                      background:
                        k === WALLS[0]
                          ? look.edge
                          : `linear-gradient(135deg, ${look.left} 0%, ${look.left} 46%, ${look.right} 54%, ${look.right} 100%)`,
                    }}
                  />
                ))}
                <span
                  className="absolute inset-0 rounded-[2em]"
                  style={{ background: look.top, boxShadow: `inset 0 0 0 0.14em ${look.rim}` }}
                />
                {art}
                {/* The shade of the layer above: deepest at the far corner, which lies under it. Multiplied in, so
                    it darkens the layer's own colours instead of greying them. */}
                {i > 0 && (
                  <span className="absolute inset-0 rounded-[2em] bg-[linear-gradient(to_bottom_left,#bfb4da_0%,#d6cee9_34%,#fff_60%)] mix-blend-multiply max-sm:hidden" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
