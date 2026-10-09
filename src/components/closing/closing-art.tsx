import { CheckIcon } from "lucide-react";
import { Paragraph } from "@/components/site-header/logo";
import { APRICOT, Ball, GREEN, LIME, Scene, Shade, Solid, Tag, place, project, up, type Surface } from "@/components/why/why-art";
import "./closing.css";

// The closing card's picture, drawn like the second section's (why-art: the same ground, the same solids): a
// declaration lying on the ground, and a stamp hanging over it. The stamp's head is the logo's lime key on a wooden
// handle; what it leaves on the sheet is the site's sign in green ink. It comes down on the sheet again and again
// (closing.css).

const PAPER: Surface = {
  top: "linear-gradient(135deg, #ffffff 0%, #f8f1e6 100%)",
  wall: "linear-gradient(135deg, #e9dfce 0%, #cbbda6 100%)",
  rim: "rgb(255 255 255 / 0.9)",
};
const UNDER: Surface = {
  top: "linear-gradient(135deg, #ecd9fb 0%, #d7b3f1 100%)",
  wall: "linear-gradient(135deg, #c9a2ea 0%, #a77fd0 100%)",
  rim: "rgb(255 255 255 / 0.5)",
};
// The coin's lime and apricot, without the milling on their edges.
const HEAD: Surface = { ...LIME, ridge: undefined };
const WOOD: Surface = { ...APRICOT, ridge: undefined };

// Where the sheet lies on the ground, how high its face is, and the stamp's footprint on it.
const SHEET = { u: 3.5, v: 2.5, w: 13, h: 15 };
const FACE = 0.7;
const MARK = { u: 5, v: 9.4, w: 6.4, h: 6.4 };
// The stamp from the sheet up: its head, its neck, its knob (how tall each is, and how wide the round ones are).
const HEAD_H = 1.4;
const NECK = { d: 2.6, h: 2.4 };
const KNOB = { d: 4.1, h: 1.5 };
// The lengths of the declaration's lines.
const LINES = [10, 8.4, 9.6, 6.8];

// A round part of the stamp, centred over its footprint.
const round = (d: number) => ({ u: MARK.u + (MARK.w - d) / 2, v: MARK.v + (MARK.h - d) / 2, w: d, h: d });

export function StampArt({ className }: { className?: string }) {
  return (
    <Scene
      art="stamp"
      className={className}
      ground={
        <>
          <Shade box={{ ...SHEET, u: SHEET.u + 0.7, v: SHEET.v + 1.7 }} radius="1.2em" className="bg-black/45" />
          {/* A second sheet under the first, a little to the side. */}
          <div className="absolute" style={{ ...place({ ...SHEET, u: SHEET.u + 1.3, v: SHEET.v + 1.1 }), transform: up(0.3) }}>
            <Solid depth={0.3} radius="1.1em" surface={UNDER} />
          </div>
          <div className="absolute" style={{ ...place(SHEET), transform: up(FACE) }}>
            <Solid depth={FACE - 0.3} radius="1.1em" surface={PAPER}>
              {/* The declaration: a heading and a few lines, too small to read. */}
              <span className="absolute rounded-full bg-forest/85" style={place({ u: 1.5, v: 1.5, w: 5.6, h: 0.62 })} />
              {LINES.map((w, i) => (
                <span key={i} className="absolute rounded-full bg-ink/15" style={place({ u: 1.5, v: 3.2 + i * 1.25, w, h: 0.42 })} />
              ))}
              {/* What the stamp leaves: the site's sign in a frame, in green ink, a little askew (and turned so that
                  the sign reads upright from here). */}
              <span
                className="sst-end-ink absolute grid place-items-center rounded-[28%] border-[0.3em] border-leaf/90"
                style={{ ...place({ u: MARK.u - SHEET.u + 0.3, v: MARK.v - SHEET.v + 0.3, w: MARK.w - 0.6, h: MARK.h - 0.6 }), rotate: "-5deg" }}
              >
                <Paragraph className="h-[3.5em] w-auto rotate-45 text-leaf/90" />
              </span>
            </Solid>
          </div>
          {/* The stamp's shadow on the sheet. */}
          <span className="absolute rounded-[28%] bg-black/30 blur-[0.7em]" style={{ ...place({ ...MARK, u: MARK.u + 0.5, v: MARK.v + 1.5 }), transform: up(FACE) }} />

          {/* The stamp. The outer box is what comes down; the inner one sways a little while it hangs. */}
          <div className="sst-end-stamp absolute inset-0">
            <div className="sst-end-bob absolute inset-0">
              <div className="absolute" style={{ ...place(MARK), transform: up(FACE + HEAD_H) }}>
                <Solid depth={HEAD_H} radius="28%" surface={HEAD} />
              </div>
              <div className="absolute" style={{ ...place(round(NECK.d)), transform: up(FACE + HEAD_H + NECK.h) }}>
                <Solid depth={NECK.h} radius="50%" surface={WOOD} />
              </div>
              <div className="absolute" style={{ ...place(round(KNOB.d)), transform: up(FACE + HEAD_H + NECK.h + KNOB.h) }}>
                <Solid depth={KNOB.h} radius="50%" surface={WOOD} />
              </div>
            </div>
          </div>
        </>
      }
    >
      <Tag
        at={project(14.6, 15.4, FACE)}
        stem={3}
        dark
        ball={
          <Ball tone={GREEN}>
            <CheckIcon className="size-[1.05em]" strokeWidth={3.6} />
          </Ball>
        }
      >
        მზადაა
      </Tag>
    </Scene>
  );
}
