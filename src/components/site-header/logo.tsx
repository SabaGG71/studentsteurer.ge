import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// The brand's sign: §, the paragraph mark of German law, which is also two S's, one for "student" and one for
// "steurer". Its outline is the § of Bricolage Grotesque ExtraBold (the wordmark's typeface), in font units with y
// pointing up, so it is always drawn through `scale(1 -1)`.
export const PARAGRAPH_PATH =
  "M266 -158Q212 -158 166.5 -147.5Q121 -137 88 -114Q55 -91 37.5 -52.5Q20 -14 23 42L163 54Q165 22 177.5 0Q190 -22 213.5 -32.5Q237 -43 272 -43Q305 -43 327 -32Q349 -21 349 4Q349 17 341 30Q333 43 311 54.5Q289 66 246 76Q194 88 152.5 102Q111 116 83 135Q55 154 40 181Q25 208 25 247Q25 271 35 298Q45 325 78 349Q111 373 179 388L179 392Q111 403 78 425Q45 447 35 473Q25 499 25 520Q25 574 58 608.5Q91 643 144 659.5Q197 676 255 676Q317 676 370.5 657Q424 638 455 595Q486 552 478 480L340 467Q343 498 331.5 518.5Q320 539 298.5 549Q277 559 248 559Q213 559 194.5 546Q176 533 176 513Q176 497 189 483Q202 469 227.5 457.5Q253 446 291 437Q326 429 363 417.5Q400 406 431.5 387.5Q463 369 482 339Q501 309 501 264Q501 242 491.5 215Q482 188 449.5 165Q417 142 348 131L348 127Q406 116 439.5 98.5Q473 81 487 56.5Q501 32 501 -1Q501 -49 474.5 -84Q448 -119 396 -138.5Q344 -158 266 -158ZM264 192Q281 192 299.5 197Q318 202 331.5 215.5Q345 229 345 256Q345 274 338 286.5Q331 299 319 307.5Q307 316 291 320Q275 324 257 324Q224 324 202 310Q180 296 180 261Q180 244 185.5 231Q191 218 201.5 209.5Q212 201 228 196.5Q244 192 264 192Z";

// The sign on its own, filled with the current text colour; used large, as the hero's backdrop.
export function Paragraph({ className }: { className?: string }) {
  return (
    <svg viewBox="22 -676 480 834" aria-hidden="true" className={className}>
      <path transform="scale(1 -1)" fill="currentColor" d={PARAGRAPH_PATH} />
    </svg>
  );
}

// The mark: the sign on a thick lime key, the same chunky, lit-from-above shape as the layers in the site's
// pictures.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" aria-hidden="true" className={cn("h-10 w-auto shrink-0", className)}>
      <rect y="4" width="40" height="40" rx="12" fill="#62bb39" />
      <rect width="40" height="40" rx="12" fill="#adee68" />
      <path d="M12 1.2h16A10.8 10.8 0 0 1 38.8 12" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      <path transform="translate(11.68 28.24) scale(0.0318 -0.0318)" fill="#154618" d={PARAGRAPH_PATH} />
    </svg>
  );
}

// The wordmark is one deep green, told apart by weight: `student` heavy, `steurer` lighter, and the domain's ending
// in the lighter leaf green.
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${site.domain} — მთავარი`}
      onClick={onClick}
      className={cn(
        "-mx-1 inline-flex items-center gap-2.5 rounded-2xl px-1 outline-none focus-visible:ring-2 focus-visible:ring-forest/40",
        className
      )}
    >
      <LogoMark />
      <span className="font-display text-[20px] leading-none tracking-[-0.04em] text-forest font-stretch-[88%] max-[400px]:text-[18px]">
        <span className="font-extrabold">{site.nameStart}</span>
        <span className="font-medium">{site.nameEnd}</span>
        <span className="font-semibold text-leaf">{site.tld}</span>
      </span>
    </Link>
  );
}
