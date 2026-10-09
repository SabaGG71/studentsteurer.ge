import type { CSSProperties, ReactNode } from "react";
import "./how.css";

// The drawing of the "how it works" section: a tube that runs across the section in a slow wave, and four thick
// keys on it, one for each stop. Everything is flat and hard-edged, like the logo's key: no glows, no soft shadows.
// It is drawn in SVG, in the units of VIEW (1180 wide, like the page's content), so it scales with the room it is
// given.
export const VIEW = { w: 1180, h: 300 };

type Point = { x: number; y: number };

// The keys: where each one's middle is, half its side, and its colours once the light has reached it (the face,
// and the edge under it). They sit high and low in turn, and the last one, where the money arrives, is the biggest.
const HIGH = 122;
const LOW = 198;
export const KEYS = [
  { x: 147.5, y: HIGH, half: 68, face: "#dbb9f3", edge: "#b48be0" },
  { x: 442.5, y: LOW, half: 68, face: "#adee68", edge: "#62bb39" },
  { x: 737.5, y: HIGH, half: 68, face: "#f8c677", edge: "#d99a3c" },
  { x: 1032.5, y: LOW, half: 80, face: "#fdf8f2", edge: "#cbbda6" },
];
// How thick a key is: how far its edge shows under its face.
export const KEY_EDGE = 10;

// The tube runs from far outside the drawing on the left, through every key's middle, and far out on the right,
// so that on a wide screen it reaches both edges. Between two points it bends in an S that leaves and arrives
// level.
const LEAD = 1100;
const START: Point = { x: -LEAD, y: LOW };
const INLET: Point = { x: -40, y: LOW };
const OUTLET: Point = { x: VIEW.w + 40, y: HIGH };
const END: Point = { x: VIEW.w + LEAD, y: HIGH };

const n = (value: number) => Number(value.toFixed(2));
const bend = (a: Point, b: Point): Point[] => {
  const reach = (b.x - a.x) * 0.42;
  return [a, { x: a.x + reach, y: a.y }, { x: b.x - reach, y: b.y }, b];
};
const along = ([a, b, c, d]: Point[], t: number): Point => {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return { x: w[0] * a.x + w[1] * b.x + w[2] * c.x + w[3] * d.x, y: w[0] * a.y + w[1] * b.y + w[2] * c.y + w[3] * d.y };
};
// A bend's length, measured along a fine polyline.
const lengthOf = (curve: Point[]) => {
  let total = 0;
  let from = curve[0];
  for (let i = 1; i <= 96; i++) {
    const to = along(curve, i / 96);
    total += Math.hypot(to.x - from.x, to.y - from.y);
    from = to;
  }
  return total;
};

const WAY = [INLET, ...KEYS, OUTLET];
const BENDS = WAY.slice(1).map((point, i) => bend(WAY[i], point));
const TUBE_D =
  `M${START.x} ${START.y}H${INLET.x}` +
  BENDS.map(([, b, c, d]) => `C${n(b.x)} ${n(b.y)} ${n(c.x)} ${n(c.y)} ${n(d.x)} ${n(d.y)}`).join("") +
  `H${END.x}`;

// How far along the tube each key is, in hundredths of the tube's whole length. The tube's light is drawn with its
// length counted as 100 (`pathLength`), so these are exactly the values the light has to reach.
const PIECES = [INLET.x - START.x, ...BENDS.map(lengthOf), END.x - OUTLET.x];
const TOTAL = PIECES.reduce((sum, piece) => sum + piece, 0);
export const STOPS_AT = KEYS.map((_, i) => n((PIECES.slice(0, i + 2).reduce((sum, piece) => sum + piece, 0) / TOTAL) * 100));

// The paints the drawing uses. They are defined once, in an empty SVG of their own, and found by their names from
// every other SVG on the page (the wide drawing, and the keys drawn one by one on narrow screens).
export function FlowDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        {/* The light in the tube takes each key's colour as it passes it (the last one's is lime, like money). */}
        <linearGradient id="sst-g-light" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW.w} y2="0">
          {KEYS.map(({ x, face }, k) => (
            <stop key={x} offset={n(x / VIEW.w)} stopColor={k === KEYS.length - 1 ? "#adee68" : face} />
          ))}
        </linearGradient>
        <radialGradient id="sst-g-coin" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0" stopColor="#f3fde0" />
          <stop offset="0.55" stopColor="#adee68" />
          <stop offset="1" stopColor="#8fdd4c" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// The tube, from the back to the front: its rim and its inside, the light in it (drawn as far as the journey has
// got: how.css), the light's bright head, and one thin line of gloss along its upper side.
export function Tube() {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={TUBE_D} stroke="#fdf8f2" strokeOpacity="0.32" strokeWidth="30" />
      <path d={TUBE_D} stroke="#1b5521" strokeWidth="27" />
      <path d={TUBE_D} pathLength={100} stroke="url(#sst-g-light)" strokeWidth="15" className="sst-tube-light" />
      <path d={TUBE_D} pathLength={100} stroke="#fffdf4" strokeWidth="15" className="sst-tube-head" />
      <path d={TUBE_D} stroke="#fff" strokeOpacity="0.28" strokeWidth="1.6" transform="translate(0 -10.5)" />
    </g>
  );
}

const BAR = { fill: "#0c0b0a", fillOpacity: 0.13 };
const order = (k: number) => ({ "--k": k }) as CSSProperties;

// What is on each key, drawn for a key 68 across its half side and centred on its middle. Each has one part that
// moves when its stop comes on (the `sst-thing-…` classes, how.css): the payslip lifts, the ticks are ticked one
// after another, the stamp comes down, the coin hops. Parts that are moved by a class never carry a `transform` of
// their own (the class would replace it), hence the extra groups.
const THINGS: (() => ReactNode)[] = [
  // 1. What you send: payslips, with the tax row marked.
  () => (
    <>
      <g transform="rotate(10)">
        <rect x="-24" y="-41" width="56" height="74" rx="8" fill="#c7a0e8" />
      </g>
      <g className="sst-thing-sheet">
        <g transform="rotate(-6)">
          <rect x="-33" y="-39" width="60" height="77" rx="8" fill="#fffdf8" />
          <circle cx="-22" cy="-26" r="4.2" fill="#154618" />
          <rect x="-14" y="-29" width="25" height="6" rx="3" fill="#154618" fillOpacity="0.55" />
          <rect x="-25" y="-13" width="38" height="5" rx="2.5" {...BAR} />
          <rect x="-25" y="-3" width="44" height="5" rx="2.5" {...BAR} />
          <rect x="-25" y="7" width="44" height="10" rx="5" fill="#f8c677" />
          <rect x="-25" y="22" width="28" height="5" rx="2.5" {...BAR} />
        </g>
      </g>
    </>
  ),
  // 2. What we prepare: the tax return, ticked line by line.
  () => (
    <g transform="rotate(4)">
      <rect x="-31" y="-40" width="62" height="80" rx="9" fill="#fffdf8" />
      {[26, 31, 21].map((width, row) => (
        <g key={width} transform={`translate(0 ${-24 + row * 17})`}>
          <g className="sst-thing-tick" style={order(row)}>
            <circle cx="-19" r="6.6" fill="#adee68" />
            <path d="M-22.3 0.2l2.4 2.4 4-4.7" stroke="#154618" strokeWidth="2.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect x="-8" y="-2.6" width={width} height="5.2" rx="2.6" {...BAR} />
        </g>
      ))}
      <rect x="-22" y="22" width="44" height="10" rx="5" fill="#154618" />
      <rect x="-10" y="25.6" width="20" height="2.8" rx="1.4" fill="#adee68" />
    </g>
  ),
  // 3. The tax office: its stamp on the return.
  () => (
    <g transform="rotate(-4)">
      <rect x="-31" y="-40" width="62" height="80" rx="9" fill="#fffdf8" />
      <rect x="-21" y="-29" width="27" height="5.5" rx="2.75" fill="#0c0b0a" fillOpacity="0.28" />
      <rect x="-21" y="-19" width="17" height="5" rx="2.5" {...BAR} />
      <g className="sst-thing-stamp">
        <circle cx="4" cy="11" r="21" fill="#f1fbe3" stroke="#36893b" strokeWidth="3.6" />
        <circle cx="4" cy="11" r="15.4" fill="none" stroke="#36893b" strokeWidth="1.2" strokeDasharray="2.2 2.6" />
        <path d="M-4.6 11.4l5.7 5.7 10.4-11.9" stroke="#36893b" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  ),
  // 4. What comes back: the money, on your card.
  () => (
    <>
      <g transform="rotate(-9)">
        <rect x="-38" y="-27" width="66" height="44" rx="8" fill="#154618" />
        <rect x="-30" y="-17" width="13" height="10" rx="2.6" fill="#f8c677" />
        <rect x="-30" y="3" width="27" height="4" rx="2" fill="#fff" fillOpacity="0.35" />
      </g>
      <g className="sst-thing-coin">
        <circle cx="15" cy="15" r="26" fill="#5cb436" />
        <circle cx="13" cy="11" r="26" fill="url(#sst-g-coin)" />
        <circle cx="13" cy="11" r="19.6" fill="none" stroke="#154618" strokeOpacity="0.28" strokeWidth="1.6" />
        <text x="13" y="11" dy="0.36em" textAnchor="middle" className="font-display" fontSize="29" fontWeight="800" fill="#154618">
          €
        </text>
      </g>
    </>
  ),
];

// One key, drawn around its own middle: a thick rounded square, face over edge, with its thing on it. Until the
// light has reached it, it is dark like the tube; then it takes its own colours (how.css), and goes down and comes
// back up once, as if pressed. It carries `data-k`, which stop it belongs to: `FlowDriver` marks it `data-on` and
// `data-done`, and pointing at it holds the journey there.
export function Key({ k }: { k: number }) {
  const { half, face, edge } = KEYS[k];
  const side = half * 2;
  const round = n(half * 0.5);
  // The highlight just inside the face's upper edge, from corner to corner.
  const inset = 3;
  const arc = round - inset;
  const gloss = `M${-half + inset} ${-half + round}a${arc} ${arc} 0 0 1 ${arc} ${-arc}H${half - round}a${arc} ${arc} 0 0 1 ${arc} ${arc}`;
  return (
    <g
      data-k={k}
      data-on={k === KEYS.length - 1 ? "" : undefined}
      data-done={k < KEYS.length - 1 ? "" : undefined}
      className="sst-key"
      style={{ "--face": face, "--edge": edge } as CSSProperties}
    >
      <rect x={-half} y={-half + KEY_EDGE} width={side} height={side} rx={round} className="sst-key-edge" />
      <g className="sst-key-top">
        <rect x={-half} y={-half} width={side} height={side} rx={round} className="sst-key-face" />
        <path d={gloss} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        <g className="sst-key-thing">
          <g transform={`translate(0 1) scale(${n(half / 68)})`}>{THINGS[k]()}</g>
        </g>
      </g>
    </g>
  );
}
