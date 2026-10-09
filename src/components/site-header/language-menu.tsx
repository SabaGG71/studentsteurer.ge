"use client";

import { Menu } from "@base-ui/react/menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type LanguageCode, languages } from "@/lib/site";
import { LanguageFlag } from "@/components/flags";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  className?: string;
};

// The language button in the header: the current language's flag and short name. It opens a small sheet of glass
// with the two languages, each under its own name with the other language's word for it below, and a lime tick on
// the chosen one. Choosing only changes what the button shows: the site itself is in Georgian for now.
export function LanguageMenu({ value, onChange, className }: Props) {
  const current = languages.find((language) => language.code === value) ?? languages[0];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`ენა: ${current.name}`}
        className={cn(
          "group/lang inline-flex h-9 items-center gap-1.5 rounded-full bg-lilac/[0.22] pr-2.5 pl-1 transition-colors duration-150 outline-none hover:bg-lilac/40 focus-visible:ring-2 focus-visible:ring-forest/40 data-popup-open:bg-lilac/40",
          className
        )}
      >
        <LanguageFlag code={current.code} className="size-6 ring-2 ring-white" />
        <span className="mtavruli text-[11px] font-semibold tracking-[0.04em] text-ink/80">{current.short}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-3 text-ink/50 transition-transform duration-200 group-data-popup-open/lang:rotate-180"
          strokeWidth={2.5}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={22}
        className="w-64 rounded-[1.75rem] bg-white/95 p-2 shadow-[0_1px_2px_rgb(59_31_99/0.08),0_26px_50px_-22px_rgb(59_31_99/0.6)] ring-1 ring-white backdrop-blur-xl duration-200"
      >
        <p aria-hidden="true" className="flex items-center justify-between px-3 pt-2 pb-2.5 text-ink/45">
          <span className="mtavruli text-[10.5px] leading-none font-semibold tracking-[0.08em]">ენა</span>
          <span className="font-display text-[10.5px] leading-none font-semibold tracking-[0.08em] uppercase">Sprache</span>
        </p>

        <DropdownMenuRadioGroup
          aria-label="ენა"
          value={value}
          onValueChange={(code) => onChange(code as LanguageCode)}
          className="grid gap-1"
        >
          {languages.map((language) => (
            <Menu.RadioItem
              key={language.code}
              value={language.code}
              closeOnClick
              className="group/item flex cursor-default items-center gap-3 rounded-[1.25rem] p-2 pr-3 outline-none select-none data-checked:bg-lilac/[0.16] data-highlighted:bg-lilac/30"
            >
              <LanguageFlag code={language.code} className="size-9 ring-1 ring-ink/[0.06]" />
              <span className="min-w-0 flex-1 font-display">
                <span className="block text-[15px] leading-tight font-semibold text-ink">{language.name}</span>
                <span className="mt-0.5 block text-[12px] leading-tight text-ink/55">{language.note}</span>
              </span>
              <span
                aria-hidden="true"
                className="grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-colors duration-150 group-data-checked/item:bg-lime group-data-checked/item:ring-lime"
              >
                <CheckIcon
                  className="size-3.5 text-forest opacity-0 transition-opacity duration-150 group-data-checked/item:opacity-100"
                  strokeWidth={3.25}
                />
              </span>
            </Menu.RadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// The same choice for the phone menu, where there is no room for a dropdown: two keys side by side in a lilac
// track, the chosen one white.
export function LanguageToggle({ value, onChange, className }: Props) {
  return (
    <div role="group" aria-label="ენა" className={cn("flex rounded-full bg-lilac/25 p-1", className)}>
      {languages.map((language) => {
        const chosen = language.code === value;
        return (
          <button
            key={language.code}
            type="button"
            aria-pressed={chosen}
            onClick={() => onChange(language.code)}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-2 rounded-full font-display text-[14px] font-semibold text-ink/60 transition-[background-color,color,box-shadow] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-forest/40",
              chosen && "bg-white text-ink shadow-[0_1px_2px_rgb(59_31_99/0.08),0_6px_14px_-8px_rgb(59_31_99/0.5)]"
            )}
          >
            <LanguageFlag code={language.code} className="size-5 ring-1 ring-ink/[0.06]" />
            {language.name}
          </button>
        );
      })}
    </div>
  );
}
