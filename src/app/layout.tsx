import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { site } from "@/lib/site";
import "./globals.css";

// Georgian text: FiraGO. Its `case` feature draws Georgian capitals (Mtavruli) from ordinary letters, which is what
// the `mtavruli` utility in globals.css switches on. Three weights: text, labels, titles. The files in src/fonts are
// cut down to Georgian, Latin and common punctuation (about 43 KB each, with every OpenType feature kept); the full
// fonts, and the other weights, are at github.com/bBoxType/FiraGO.
const georgian = localFont({
  variable: "--font-geo",
  display: "swap",
  src: [
    { path: "../fonts/FiraGO-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/FiraGO-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/FiraGO-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
});

// Latin words and numbers in headings, the logo and the illustration.
const latin = Bricolage_Grotesque({
  variable: "--font-latin",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `გადასახადის დაბრუნება გერმანიიდან სტუდენტებისთვის | ${site.domain}`,
  description:
    "გერმანიაში ნამუშევარი სტუდენტებისთვის: ხელფასიდან დაკავებული გადასახადის (Lohnsteuer) დაბრუნება. დეკლარაციას ჩვენ ვამზადებთ და Finanzamt-ში ვაგზავნით.",
};

// In-page links (the hero's scroll key, the menu's #anchors) glide to their target, unless the visitor asked for
// reduced motion (`motion-safe:scroll-smooth`). `data-scroll-behavior` tells Next.js to keep page-to-page navigation
// instant all the same.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ka"
      data-scroll-behavior="smooth"
      className={`${georgian.variable} ${latin.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
