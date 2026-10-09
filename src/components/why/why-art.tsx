import type { CSSProperties, ReactNode } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "./why.css";

// The three pictures of the "how the refund works" section, in the same view as the hero's stack: everything
// stands on a square piece of ground (S x S) that is turned 45° and squashed to half height, so it is seen from
// above at an angle. They are drawn in em (the scene is W x H), so the font-size sets their size.
//
// Things on the ground are placed in the ground's own plane (u to the right, v down, from its top left corner).
// In that plane "straight up" on screen is up and to the right, and a wall is made of copies of an outline
// stepping straight down. Things that stand upright (the tags) are placed in the scene itself, at `project(u, v, h)`.
const S = 20;
const W = 27;
const H = 20.5;
const CX = 13.5;
const CY = 12.6;
const R2 = Math.SQRT2;
const PLANE = "scaleY(0.5) rotate(-45deg)";
// How far apart the copies that make up a wall are, measured on screen.
const STEP = 0.12;

const em = (n: number) => `${Number(n.toFixed(3))}em`;
const project = (u: number, v: number, h = 0) => [CX + (u + v - S) / R2, CY + (v - u) / (2 * R2) - h] as const;
const up = (h: number) => `translate(${em(h * R2)}, ${em(-h * R2)})`;
const steps = (depth: number) => Math.max(1, Math.round(depth / STEP));

type Box = { u: number; v: number; w: number; h: number };
const place = ({ u, v, w, h }: Box): CSSProperties => ({ left: em(u), top: em(v), width: em(w), height: em(h) });

// A wall with shading in it (and, for the coin, a piece missing): copies of the outline, lowest first. With `ridge`,
// every fourth copy takes that second shade, which reads as the milling on a coin's edge. What the copies are
// painted with is said once, on the wall; a copy itself only says which step down it is (--i), and why.css does
// the rest. That keeps the page's markup short: a coin's edge alone is nineteen copies.
function Walls({
  depth,
  background,
  ridge,
  radius,
  mask,
}: {
  depth: number;
  background: string;
  ridge?: string;
  radius: string;
  mask?: string;
}) {
  const count = steps(depth);
  return (
    <span className="sst-why-walls" style={{ "--wall": background, "--ridge": ridge, "--round": radius, "--cut": mask } as CSSProperties}>
      {Array.from({ length: count }, (_, i) => count - i).map((k) => (
        <span key={k} style={{ "--i": k } as CSSProperties} />
      ))}
    </span>
  );
}

// The same for a small thing in one colour, where a list of hard shadows does.
const extrude = (depth: number, color: string) =>
  Array.from({ length: steps(depth) }, (_, i) => `${em(-(i + 1) * STEP * R2)} ${em((i + 1) * STEP * R2)} 0 ${color}`).join(", ");

type Surface = { top: string; wall: string; ridge?: string; rim: string };

// A solid thing: its top face, and its wall under it. It fills the element it is put in.
function Solid({
  depth,
  radius,
  surface,
  mask,
  children,
}: {
  depth: number;
  radius: string;
  surface: Surface;
  mask?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Walls depth={depth} background={surface.wall} ridge={surface.ridge} radius={radius} mask={mask} />
      <div
        className="absolute inset-0"
        style={{ background: surface.top, borderRadius: radius, boxShadow: `inset 0 0 0 0.13em ${surface.rim}`, maskImage: mask, WebkitMaskImage: mask }}
      >
        {children}
      </div>
    </>
  );
}

// A soft shadow lying on the ground.
function Shade({ box, className, radius = "50%" }: { box: Box; className?: string; radius?: string }) {
  return <span className={cn("absolute blur-[0.9em]", className)} style={{ ...place(box), borderRadius: radius }} />;
}

// One picture: the ground with what lies on it (`ground`), and what stands upright in front of it (`children`).
function Scene({ art, ground, children, className }: { art: string; ground: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-art={art}
      className={cn("pointer-events-none relative shrink-0 select-none", className)}
      style={{ width: em(W), height: em(H) }}
    >
      <div className="absolute" style={{ left: em(CX - S / 2), top: em(CY - S / 2), width: em(S), height: em(S), transform: PLANE }}>
        {ground}
      </div>
      {children}
    </div>
  );
}

// A small glossy ball with a sign in it: light, mid and deep colour, and the colour of the sign.
type Tone = { light: string; mid: string; deep: string; ink: string };
const AMBER: Tone = { light: "#fff3d6", mid: "#f8c677", deep: "#e9a136", ink: "#5f3a06" };
const GREEN: Tone = { light: "#f0fdd9", mid: "#adee68", deep: "#7fd33c", ink: "#154618" };

function Ball({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className="grid size-[1.95em] shrink-0 place-items-center rounded-full font-display text-[max(10px,0.84em)] leading-none font-extrabold"
      style={{
        color: tone.ink,
        background: `radial-gradient(ellipse 46% 34% at 36% 24%, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0) 100%), linear-gradient(165deg, ${tone.light} 0%, ${tone.mid} 55%, ${tone.deep} 100%)`,
        boxShadow: "inset 0 0.08em 0.13em rgb(255 255 255 / 0.9), inset 0 -0.2em 0.4em -0.16em rgb(0 0 0 / 0.25)",
      }}
    >
      {children}
    </span>
  );
}

// A note standing on the picture: a dot where it stands, a thin stem, and a white tag facing you. `follow` ties it
// to the piece cut from the coin (it then moves, and bobs, with the piece); `shift` is where the tag's left end is,
// measured from the stem.
function Tag({
  at,
  stem,
  shift = -1.3,
  follow,
  dark,
  ball,
  children,
}: {
  at: readonly [number, number];
  stem: number;
  shift?: number;
  follow?: boolean;
  dark?: boolean;
  ball: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={cn("absolute", follow && "sst-why-follow")} style={{ left: em(at[0]), top: em(at[1]) }}>
      <div className={cn("sst-why-tag", follow && "sst-why-float-up")}>
        <span className={cn("absolute size-[0.55em] -translate-1/2 rounded-full", dark ? "bg-white/60" : "bg-ink/45")} />
        <span
          className={cn("absolute bottom-0 left-0 w-[0.11em] -translate-x-1/2 rounded-full", dark ? "bg-white/45" : "bg-ink/35")}
          style={{ height: em(stem) }}
        />
        <span
          className="absolute flex items-center gap-[0.55em] rounded-full bg-white py-[0.32em] pr-[0.95em] pl-[0.32em] whitespace-nowrap shadow-[0_0.9em_1.7em_-0.9em_rgb(40_20_70/0.6),0_0.1em_0.2em_rgb(40_20_70/0.08)]"
          style={{ bottom: em(stem - 0.3), left: em(shift) }}
        >
          {ball}
          <span className="text-[max(10.5px,0.86em)] leading-none font-semibold text-ink">{children}</span>
        </span>
      </div>
    </div>
  );
}

// The coin: one thick euro, with a piece cut off it. The cut is straight, across the side of the coin that faces
// you (the plane's "down"): the coin keeps KEEP percent of its width, the piece is the rest. The coin's and the
// piece's masks are the two sides of that one cut, so the euro sign in the middle is never touched.
const KEEP = 71;
const COIN_MASK = `linear-gradient(to bottom, #000 ${KEEP}%, transparent ${KEEP}%)`;
const PIECE_MASK = `linear-gradient(to bottom, transparent ${KEEP}%, #000 ${KEEP}%)`;
// How far from the coin's middle the piece's own middle is, as a share of the coin's width.
const PIECE_AT = (KEEP + (100 - KEEP) / 2 - 50) / 100;

const LIME: Surface = {
  top: "radial-gradient(circle at 30% 24%, #f6fee4 0%, #c0f486 36%, #a0e55e 100%)",
  wall: "linear-gradient(135deg, #a9ea6b 0%, #68bd3f 46%, #2f7f2c 100%)",
  ridge: "linear-gradient(135deg, #97dc5b 0%, #58ab35 46%, #256e25 100%)",
  rim: "rgb(255 255 255 / 0.6)",
};
const APRICOT: Surface = {
  top: "radial-gradient(circle at 30% 24%, #fff8e8 0%, #fbd898 38%, #f7c06a 100%)",
  wall: "linear-gradient(135deg, #f5c672 0%, #d99a3c 50%, #a96c1c 100%)",
  ridge: "linear-gradient(135deg, #eab863 0%, #c98a30 50%, #975d14 100%)",
  rim: "rgb(255 255 255 / 0.6)",
};

// What is struck on the coin's face: a ring, and the euro sign (turned so that it reads upright from here).
function CoinFace({ ring, sign }: { ring: string; sign?: string }) {
  return (
    <>
      <span className="absolute inset-[0.95em] rounded-full border-[0.15em]" style={{ borderColor: ring }} />
      {sign && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="rotate-45 font-display text-[6.6em] leading-none font-extrabold" style={{ color: sign }}>
            €
          </span>
        </span>
      )}
    </>
  );
}

// The coin with the piece missing, standing on the ground (or on whatever is `base` high).
function Coin({ d, depth, base = 0 }: { d: number; depth: number; base?: number }) {
  const box = { u: (S - d) / 2, v: (S - d) / 2, w: d, h: d };
  return (
    <div className="absolute" style={{ ...place(box), transform: up(base + depth) }}>
      <Solid depth={depth} radius="50%" surface={LIME} mask={COIN_MASK}>
        <CoinFace ring="rgb(21 70 24 / 0.22)" sign="#154618" />
      </Solid>
    </div>
  );
}

// The piece itself. Where it is comes from the picture's --out and --lift (why.css). In lime it is the coin's own
// missing part, sign and all, so that it closes the coin exactly when it sits back in.
function Piece({ d, depth, surface, whole }: { d: number; depth: number; surface: Surface; whole?: boolean }) {
  const box = { u: (S - d) / 2, v: (S - d) / 2, w: d, h: d };
  return (
    <div className="sst-why-wedge absolute" style={place(box)}>
      <div className="sst-why-float relative size-full">
        <Solid depth={depth} radius="50%" surface={surface} mask={PIECE_MASK}>
          {whole ? <CoinFace ring="rgb(21 70 24 / 0.22)" sign="#154618" /> : <CoinFace ring="rgb(140 84 12 / 0.3)" />}
        </Solid>
      </div>
    </div>
  );
}

// Where a tag that follows the piece stands before the piece has moved: the middle of the piece, on the ground.
const pieceFoot = (d: number) => project(S / 2, S / 2 + PIECE_AT * d);

// 1. Withheld: a piece of the coin has been taken out of it and hangs beside it.
export function WithheldArt({ className }: { className?: string }) {
  const d = 14;
  const depth = 2.3;
  const c = (S - d) / 2;
  return (
    <Scene
      art="withheld"
      className={className}
      ground={
        <>
          <span
            className="absolute rounded-full border-[0.1em] border-dashed border-ink/20"
            style={place({ u: c - 2.3, v: c - 2.3, w: d + 4.6, h: d + 4.6 })}
          />
          <Shade box={{ u: c + 0.3, v: c + 1.5, w: d, h: d }} className="bg-[#3b1f63]/30" />
          {/* The piece's shadow: blurred as a whole, cut to the piece's outline inside. */}
          <span className="sst-why-wedge-shade absolute blur-[0.8em]" style={place({ u: c, v: c, w: d, h: d })}>
            <span className="absolute inset-0 rounded-full bg-[#3b1f63]/35" style={{ maskImage: PIECE_MASK, WebkitMaskImage: PIECE_MASK }} />
          </span>
          <Coin d={d} depth={depth} />
          <Piece d={d} depth={depth} surface={APRICOT} />
        </>
      }
    >
      <Tag at={pieceFoot(d)} stem={3.6} shift={-4.6} follow ball={<Ball tone={AMBER}>−</Ball>}>
        დაკავებული
      </Tag>
    </Scene>
  );
}

// 2. The year: a calendar of twelve months, three of which (the summer's) stand up from it.
const MONTHS = { cols: 4, rows: 3, size: 2.45, gap: 0.5 };
const WORKED = [5, 6, 7];
const PAGE: Surface = {
  top: "linear-gradient(150deg, #ffffff 0%, #fbf3e6 100%)",
  wall: "linear-gradient(135deg, #ecdcc0 0%, #ecdcc0 46%, #cfb88f 54%, #cfb88f 100%)",
  rim: "rgb(255 255 255 / 0.95)",
};

export function YearArt({ className }: { className?: string }) {
  const side = 13;
  const depth = 1.6;
  const head = 2.4;
  const c = (S - side) / 2;
  const { cols, rows, size, gap } = MONTHS;
  const u0 = (side - cols * size - (cols - 1) * gap) / 2;
  const v0 = head + (side - head - rows * size - (rows - 1) * gap) / 2;
  const month = (i: number) => ({ u: u0 + (i % cols) * (size + gap), v: v0 + Math.floor(i / cols) * (size + gap), w: size, h: size });
  // The tag stands on the middle one of the worked months.
  const mid = month(WORKED[1]);
  const foot = project(c + mid.u + size / 2, c + mid.v + size / 2, 2.85);

  return (
    <Scene
      art="year"
      className={className}
      ground={
        <>
          <Shade box={{ u: c + 0.4, v: c + 1.6, w: side, h: side }} radius="2.2em" className="bg-[#7a4a0c]/30" />
          <div className="absolute" style={{ ...place({ u: c, v: c, w: side, h: side }), transform: up(depth) }}>
            <Solid depth={depth} radius="2em" surface={PAGE}>
              {/* The calendar's head, with the two rings it hangs by. */}
              <span className="absolute inset-x-0 top-0 rounded-t-[2em] bg-forest" style={{ height: em(head) }}>
                {[0.26, 0.74].map((x) => (
                  <span
                    key={x}
                    className="absolute top-1/2 size-[1.05em] -translate-1/2 rounded-full bg-lime shadow-[inset_0_0_0_0.26em_#154618,0_0_0_0.12em_rgb(255_255_255/0.25)]"
                    style={{ left: `${x * 100}%` }}
                  />
                ))}
              </span>
              {Array.from({ length: cols * rows }, (_, i) => i)
                .filter((i) => !WORKED.includes(i))
                .map((i) => (
                  <span
                    key={i}
                    className="absolute rounded-[0.7em] bg-[linear-gradient(150deg,#f6edfd,#eadbf8)]"
                    style={{ ...place(month(i)), transform: up(0.35), boxShadow: `inset 0 0 0 0.1em rgb(255 255 255 / 0.9), ${extrude(0.35, "#cdb4e6")}` }}
                  >
                    {/* The month's name, as a small bar. */}
                    <span className="absolute top-[0.5em] left-[0.5em] h-[0.3em] w-[0.95em] rounded-full bg-[#b79ad6]/70" />
                  </span>
                ))}
              {/* The worked months' shadows on the page, then the months themselves, standing --key high. */}
              {WORKED.map((i) => (
                <span key={i} className="absolute rounded-[0.7em] bg-[#7a4a0c]/30 blur-[0.35em]" style={place(month(i))} />
              ))}
            </Solid>
          </div>
          <div className="absolute" style={place({ u: c, v: c, w: side, h: side })}>
            {WORKED.map((i, k) => (
              <span
                key={i}
                className="sst-why-key absolute grid place-items-center rounded-[0.7em] bg-[radial-gradient(circle_at_30%_24%,#f6fee4_0%,#c0f486_40%,#a0e55e_100%)] text-forest"
                style={
                  {
                    "--k": k,
                    ...place(month(i)),
                    boxShadow: `inset 0 0 0 0.11em rgb(255 255 255 / 0.65), ${extrude(1.25, "#5fb93a")}`,
                  } as CSSProperties
                }
              >
                {/* A tick, turned so that it reads upright from here. */}
                <CheckIcon className="size-[1.25em] rotate-45" strokeWidth={3.5} />
              </span>
            ))}
          </div>
        </>
      }
    >
      <Tag at={foot} stem={3.9} shift={-3.6} ball={<Ball tone={GREEN}>3</Ball>}>
        თვე 12-დან
      </Tag>
    </Scene>
  );
}

// 3. Returned: the coin's missing piece is on its way back to it, a short slide from home.
const STAND: Surface = {
  top: "radial-gradient(circle at 34% 28%, #2f8338 0%, #1f6427 60%, #18541f 100%)",
  wall: "linear-gradient(135deg, #17521d 0%, #0d3611 55%, #06200a 100%)",
  rim: "rgb(255 255 255 / 0.14)",
};

export function ReturnArt({ className }: { className?: string }) {
  const d = 12.5;
  const depth = 2.3;
  const stand = { d: 18, depth: 0.6 };
  const s = (S - stand.d) / 2;
  const c = (S - d) / 2;
  return (
    <Scene
      art="return"
      className={className}
      ground={
        <>
          <Shade box={{ u: s + 0.3, v: s + 1.2, w: stand.d, h: stand.d }} className="bg-black/45" />
          <div className="absolute" style={{ ...place({ u: s, v: s, w: stand.d, h: stand.d }), transform: up(stand.depth) }}>
            <Solid depth={stand.depth} radius="50%" surface={STAND}>
              <span className="absolute inset-[0.9em] rounded-full border-[0.1em] border-dashed border-lime/45" />
              {/* The coin's glow and its shadow on the stand. */}
              <span className="absolute rounded-full bg-lime/30 blur-[1.4em]" style={place({ u: c - s - 1, v: c - s - 1, w: d + 2, h: d + 2 })} />
              <span className="absolute rounded-full bg-black/45 blur-[0.7em]" style={place({ u: c - s + 0.3, v: c - s + 1.3, w: d, h: d })} />
            </Solid>
          </div>
          <Coin d={d} depth={depth} base={stand.depth} />
          {/* The piece's shadow on the stand. It travels with the piece, like the one in the first picture. */}
          <span className="sst-why-wedge-shade absolute blur-[0.7em]" style={place({ u: c, v: c, w: d, h: d })}>
            <span className="absolute inset-0 rounded-full bg-black/50" style={{ maskImage: PIECE_MASK, WebkitMaskImage: PIECE_MASK }} />
          </span>
          <Piece d={d} depth={depth} surface={LIME} whole />
        </>
      }
    >
      <Tag at={pieceFoot(d)} stem={3.2} shift={-4.9} follow dark ball={<Ball tone={GREEN}>+</Ball>}>
        ბრუნდება
      </Tag>
    </Scene>
  );
}
