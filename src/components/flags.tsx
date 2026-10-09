import { cn } from "@/lib/utils";

// Round flags, drawn in a 20 x 20 box and cut to a circle.
const base = "shrink-0 rounded-full";

export function FlagDe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={cn(base, className)}>
      <rect width="20" height="6.67" fill="#17171a" />
      <rect y="6.67" width="20" height="6.67" fill="#dd0000" />
      <rect y="13.33" width="20" height="6.67" fill="#ffce00" />
    </svg>
  );
}

export function FlagGe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={cn(base, className)}>
      <rect width="20" height="20" fill="#fff" />
      <path d="M8.5 0h3v8.5H20v3h-8.5V20h-3v-8.5H0v-3h8.5z" fill="#e8112d" />
      <path
        d="M4.1 2.7h1v1.4h1.4v1H5.1v1.4h-1V5.1H2.7v-1h1.4zM14.9 2.7h1v1.4h1.4v1h-1.4v1.4h-1V5.1h-1.4v-1h1.4zM4.1 13.5h1v1.4h1.4v1H5.1v1.4h-1v-1.4H2.7v-1h1.4zM14.9 13.5h1v1.4h1.4v1h-1.4v1.4h-1v-1.4h-1.4v-1h1.4z"
        fill="#e8112d"
      />
    </svg>
  );
}

// The flag that goes with one of the site's languages.
export function LanguageFlag({ code, className }: { code: "ka" | "de"; className?: string }) {
  return code === "de" ? <FlagDe className={className} /> : <FlagGe className={className} />;
}
