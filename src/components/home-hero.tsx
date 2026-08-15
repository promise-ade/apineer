import { HomeSearchForm } from "@/components/home-search-form";
import { HeroNetworkMotif, SectionRule } from "@/components/visual-motifs";
import { cn } from "@/lib/cn";

type HomeHeroProps = {
  className?: string;
};

export function HomeHero({ className }: HomeHeroProps) {
  return (
    <section className={cn("relative border-b border-border pb-12 pt-2 sm:pb-16", className)}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:items-center lg:gap-12">
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <SectionRule />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Fintech API discovery
            </p>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl">
              Find the right{" "}
              <span className="text-primary">fintech API</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted sm:text-[17px]">
              Discover, evaluate, and compare fintech API providers across African markets. Search
              by provider, category, product, or feature to find relevant options quickly.
            </p>
          </div>

          <HomeSearchForm />
        </div>

        <div className="hidden lg:block">
          <HeroNetworkMotif className="rounded-md border border-border/80 bg-white/60 p-4" />
        </div>
      </div>
    </section>
  );
}
