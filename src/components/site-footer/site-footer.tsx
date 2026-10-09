import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpIcon, HeartIcon } from "lucide-react";
import { NOISE } from "@/lib/noise";
import { navLinks, site } from "@/lib/site";
import { FlagDe, FlagGe } from "@/components/flags";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/site-header/cta-link";
import { Logo, Paragraph } from "@/components/site-header/logo";
import "./site-footer.css";

// PLACEHOLDERS, like the header's menu: most of these pages do not exist yet, the two legal ones included. There
// is on purpose no address, phone number, e-mail or social link here: the client has not given us any.
const ON_PAGE = [
  { label: "რატომ გიბრუნდება", href: "/#why" },
  { label: "პაკეტები", href: "/#pricing" },
  { label: "ვისთვის", href: "/#who" },
  { label: "გუნდი", href: "/#team" },
  { label: "კითხვები", href: "/#faq" },
];
const LEGAL = [
  { label: "კონფიდენციალურობა", href: "/privacy" },
  { label: "წესები და პირობები", href: "/terms" },
];

// The year the site is first published, for the copyright line. It is written out, not read from the clock: the
// page is prerendered, and Next.js reports a clock read during prerendering as an error.
const SINCE = 2026;

// The three small keys on the sheet's corner: Germany, a heart, Georgia. Each has its angle, how far it stands
// above the others, its colours (face and edge), and what is on it.
const KEYS: { turn: number; rise: string; face: string; edge: string; on: ReactNode }[] = [
  { turn: -9, rise: "mt-2", face: "#fffdf8", edge: "#b796d8", on: <FlagDe className="size-[1.7rem]!" /> },
  { turn: 5, rise: "", face: "#adee68", edge: "#62bb39", on: <HeartIcon className="sst-foot-heart size-[1.45rem] fill-forest text-forest" /> },
  { turn: 10, rise: "mt-2.5", face: "#fffdf8", edge: "#b796d8", on: <FlagGe className="size-[1.7rem]!" /> },
];

// One list of links under its small heading.
function Links({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mtavruli text-[10.5px] leading-none font-semibold tracking-[0.08em] text-ink/45">{title}</h2>
      <ul className="mt-5 grid gap-3.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="sst-foot-link rounded-[0.2em] text-[15px] leading-none text-ink/80 outline-none">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// The footer, in the hero's own material, so that the page ends as it began: the flat lilac field with its grain
// and the large faint sign. On it floats one white sheet cut like the logo's key, with a soft shadow under its
// hard edge: the logo, one line and the button; the pages; the stops on the front page; and under a hairline the
// year, the legal pages and a small lime key that leads back to the top.
//
// On the sheet's upper corner sit three small keys: Germany's flag, a heart, Georgia's flag. They drop onto the
// corner one after another when the footer scrolls into view, the heart beats, and pointing at them makes them hop
// (`Reveal`, site-footer.css). A link gets the site's lime marker while it is pointed at.
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-lilac px-4 pt-16 pb-9 sm:px-6 sm:pt-20 sm:pb-12">
      {/* The hero's own field: its large faint sign, and the grain over it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Paragraph className="absolute top-1/2 left-[88%] h-[175%] w-auto -translate-1/2 -rotate-12 text-white/[0.15] max-lg:left-[80%]" />
        <span className="absolute inset-0 opacity-[0.34]" style={{ backgroundImage: NOISE }} />
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <Reveal margin="0px 0px -6% 0px" />

        <div className="sst-foot-rise rounded-[1.75rem] bg-[#fffdf8] text-ink shadow-[0_10px_0_#b796d8,0_52px_70px_-34px_rgb(59_31_99/0.6)] sm:rounded-[2.25rem]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 px-6 pt-8 pb-8 sm:gap-x-10 sm:px-10 sm:pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-14 lg:px-14 lg:pt-11 lg:pb-10">
            <div className="col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-5 max-w-[21rem] text-[14.5px] leading-[1.6] text-ink/65 sm:text-[15px]">გერმანიაში დაკავებული გადასახადის დაბრუნება ქართველი სტუდენტებისთვის.</p>
              <CtaLink className="mt-6" />
            </div>
            <Links title="გვერდები" links={navLinks} />
            <Links title="ამ გვერდზე" links={ON_PAGE} />
          </div>

          <div className="flex flex-col gap-4 border-t border-ink/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
            <p className="text-[13px] leading-none text-ink/55">
              © {SINCE} <span className="font-display font-semibold text-forest">{site.domain}</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {LEGAL.map(({ label, href }) => (
                <Link key={href} href={href} className="sst-foot-link rounded-[0.2em] text-[13px] leading-none text-ink/60 outline-none">
                  {label}
                </Link>
              ))}
              <a
                href="#"
                aria-label="გვერდის დასაწყისში"
                className="sst-foot-top grid size-10 place-items-center rounded-[0.8rem] bg-lime text-forest outline-forest/60 focus-visible:outline-2 focus-visible:outline-offset-4 max-sm:ml-auto"
              >
                <ArrowUpIcon aria-hidden="true" className="size-[1.1rem]" strokeWidth={2.75} />
              </a>
            </div>
          </div>
        </div>

        {/* The three small keys, half on the sheet's upper corner and half above it. The outer box of each is what
            drops in; the inner one is the key, and what hops. */}
        <div aria-hidden="true" className="sst-foot-keys absolute -top-8 right-6 flex items-start gap-1.5 sm:-top-9 sm:right-12 sm:gap-2 lg:right-16">
          {KEYS.map(({ turn, rise, face, edge, on }, i) => (
            <span key={i} className={`sst-foot-seat ${rise}`} style={{ "--r": `${turn}deg`, "--i": i } as CSSProperties}>
              <span
                className="sst-foot-key grid size-[3.1rem] place-items-center rounded-[0.95rem] sm:size-[3.4rem] sm:rounded-[1.05rem]"
                style={{ "--i": i, "--edge-color": edge, background: face } as CSSProperties}
              >
                {on}
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
