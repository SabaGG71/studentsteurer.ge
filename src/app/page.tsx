import { Compare } from "@/components/compare/compare";
import { Hero } from "@/components/hero/hero";
import { How } from "@/components/how/how";
import { Pricing } from "@/components/pricing/pricing";
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
    </main>
  );
}
