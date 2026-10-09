import { Closing } from "@/components/closing/closing";
import { Compare } from "@/components/compare/compare";
import { Faq } from "@/components/faq/faq";
import { Hero } from "@/components/hero/hero";
import { How } from "@/components/how/how";
import { Press } from "@/components/press/press";
import { Pricing } from "@/components/pricing/pricing";
import { Team } from "@/components/team/team";
import { Who } from "@/components/who/who";
import { Why } from "@/components/why/why";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Why />
      <How />
      <Pricing />
      <Compare />
      <Who />
      <Team />
      <Press />
      <Faq />
      <Closing />
    </main>
  );
}
