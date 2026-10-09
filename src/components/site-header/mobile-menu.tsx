"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { type LanguageCode, navLinks } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { LanguageToggle } from "./language-menu";
import { Logo } from "./logo";

const iconButton =
  "grid place-items-center rounded-full bg-forest text-lime transition-colors duration-150 outline-none hover:bg-ink focus-visible:ring-2 focus-visible:ring-forest/50";

export function MobileMenu({
  language,
  onLanguageChange,
}: {
  language: LanguageCode;
  onLanguageChange: (code: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Alone on phones it is a full-size touch target; from 640px up it is as tall as the buttons beside it. */}
      <SheetTrigger aria-label="მენიუს გახსნა" className={`${iconButton} size-11 sm:size-9`}>
        <MenuIcon className="size-5 sm:size-4" />
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 rounded-[2rem] border border-white/65 bg-white/90 p-2 ring-1 ring-ink/[0.03] backdrop-blur-2xl backdrop-saturate-150 data-[side=top]:inset-x-4 data-[side=top]:top-4 data-[side=top]:border-b data-[side=top]:shadow-[0_18px_50px_-14px_rgb(60_30_100/0.4)] sm:data-[side=top]:inset-x-6 sm:data-[side=top]:top-6"
      >
        <SheetTitle className="sr-only">მენიუ</SheetTitle>

        <div className="flex h-12 items-center justify-between pr-0.5 pl-1.5">
          <Logo onClick={close} />
          <SheetClose aria-label="მენიუს დახურვა" className={`${iconButton} size-11`}>
            <XIcon className="size-5" />
          </SheetClose>
        </div>

        <nav aria-label="მობილური მენიუ" className="px-1 pt-3 pb-3">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="mtavruli flex items-center rounded-2xl px-3 py-2.5 text-[15px] tracking-[0.02em] text-ink transition-colors duration-150 hover:bg-lime-soft/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* From 640px up the header itself has room for the language button. */}
        <LanguageToggle value={language} onChange={onLanguageChange} className="mb-2 sm:hidden" />
        <CtaLink size="lg" variant="forest" onClick={close} className="w-full" />
      </SheetContent>
    </Sheet>
  );
}
