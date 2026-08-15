import type { Metadata } from "next";

import { SectionHeader } from "@/components/section-header";
import { mutedTextClassName } from "@/components/styles";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what Apineer is, who it is for, and how provider information is sourced.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <SectionHeader
        headingLevel="h1"
        title="About Apineer"
        description="Apineer is a research and comparison platform for fintech API providers across African markets."
      />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">What Apineer is</h2>
        <p className={cn(mutedTextClassName, "leading-7")}>
          Apineer helps developers and product teams discover, evaluate, and compare fintech API
          providers in one place. It brings structured provider information together so you can
          understand what each provider offers before visiting official documentation or websites.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Who it is for</h2>
        <p className={cn(mutedTextClassName, "leading-7")}>
          Apineer is built for developers integrating fintech APIs and product teams evaluating
          providers for fintech products. It supports teams that need to move quickly from research
          to informed integration decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          What you can do with Apineer
        </h2>
        <ul className={cn(mutedTextClassName, "list-disc space-y-2 pl-5 leading-7")}>
          <li>Search and browse fintech API providers by name, category, product, or feature.</li>
          <li>Open provider detail pages with structured information in one view.</li>
          <li>Browse providers within predefined fintech API categories.</li>
          <li>Compare two providers side by side within the same category.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          What provider information Apineer displays
        </h2>
        <p className={cn(mutedTextClassName, "leading-7")}>
          Provider pages include the information collected for each provider in the current dataset,
          such as description, supported categories, products, features, coverage, developer
          resources, pricing model, free tier availability, documentation links, and website links.
          When a field is unavailable, Apineer shows a clear not-available state rather than
          inventing details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          How provider information is sourced
        </h2>
        <p className={cn(mutedTextClassName, "leading-7")}>
          Provider information in Apineer is sourced from official provider websites and
          documentation. Apineer does not re-host provider documentation and does not generate
          provider facts beyond what has been collected from those official sources.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Authoritative source for current details
        </h2>
        <p className={cn(mutedTextClassName, "leading-7")}>
          Provider websites and official documentation remain the authoritative source for current
          pricing, availability, technical specifications, and integration requirements. Use Apineer
          to compare and shortlist providers, then confirm the latest details directly with each
          provider before making integration decisions.
        </p>
      </section>
    </div>
  );
}
