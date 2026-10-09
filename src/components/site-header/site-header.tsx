"use client";

import Link from "next/link";
import { type SyntheticEvent, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { type LanguageCode, navLinks } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { LanguageMenu } from "./language-menu";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 12;
const getServerScrolled = () => false;

// The menu, in its own shallow lilac track. One white key lies under the links: it fades in under the link the
// pointer (or the keyboard) reaches, glides to the next one as you move along the row, and fades out when you leave.
// The key is moved by writing its styles directly, so hovering never re-renders the header.
function DesktopNav() {
  const key = useRef<HTMLSpanElement>(null);
  const shown = useRef(false);

  const show = (event: SyntheticEvent<HTMLAnchorElement>) => {
    const el = key.current;
    if (!el) return;
    const link = event.currentTarget;
    // Arriving from outside: appear in place. Already out: glide (the class's own transition takes over).
    el.style.transition = shown.current ? "" : "opacity 150ms ease-out";
    el.style.width = `${link.offsetWidth}px`;
    el.style.transform = `translateX(${link.offsetLeft}px)`;
    el.style.opacity = "1";
    shown.current = true;
  };

  const hide = () => {
    if (key.current) key.current.style.opacity = "0";
    shown.current = false;
  };

  return (
    <nav aria-label="მთავარი მენიუ" className="hidden xl:block">
      <ul onMouseLeave={hide} className="relative flex items-center rounded-full bg-lilac/[0.22] p-1">
        <li aria-hidden="true" className="contents">
          <span
            ref={key}
            className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-white opacity-0 shadow-[0_1px_2px_rgb(59_31_99/0.08),0_6px_14px_-8px_rgb(59_31_99/0.5)] transition-[transform,width,opacity] duration-200 ease-out motion-reduce:transition-none"
          />
        </li>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onMouseEnter={show}
              onFocus={show}
              onBlur={hide}
              className="mtavruli relative inline-flex h-9 items-center rounded-full px-3.5 text-[12.5px] tracking-[0.02em] text-ink/75 transition-colors duration-150 outline-none hover:text-ink focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-forest/40"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// A floating white pill, the same width as the page's content: the logo, the menu in the middle, and on the right
// the language button and the call to action. Below 1280px the menu moves into a sheet; below 640px the language
// choice and the call to action move there too. Once the page scrolls the pill turns fully solid and its shadow
// deepens a little. The chosen language lives here, so the button and the sheet always show the same one.
export function SiteHeader() {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);
  const [language, setLanguage] = useState<LanguageCode>("ka");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 rounded-full bg-white/85 pr-2.5 pl-3 backdrop-blur-xl backdrop-saturate-150 sm:pr-3.5 xl:grid xl:grid-cols-[1fr_auto_1fr]",
          "shadow-[inset_0_0_0_1px_rgb(255_255_255/0.9),0_1px_2px_rgb(59_31_99/0.06),0_16px_34px_-22px_rgb(59_31_99/0.5)]",
          "transition-[background-color,box-shadow] duration-200",
          scrolled &&
            "bg-white/95 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.9),0_1px_2px_rgb(59_31_99/0.08),0_18px_38px_-20px_rgb(59_31_99/0.55)]"
        )}
      >
        <Logo className="justify-self-start" />

        <DesktopNav />

        <div className="flex items-center gap-2 justify-self-end">
          <LanguageMenu value={language} onChange={setLanguage} className="max-sm:hidden" />
          <CtaLink className="max-sm:hidden" />
          <div className="xl:hidden">
            <MobileMenu language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>
    </header>
  );
}
