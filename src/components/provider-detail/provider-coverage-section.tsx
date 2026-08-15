import { SectionHeader } from "@/components/section-header";
import type { ProviderDetail } from "@/db/queries";
import { formatTextValue } from "@/lib/display";

import { ItemChipList } from "./item-chip-list";

type ProviderCoverageSectionProps = {
  provider: ProviderDetail;
};

export function ProviderCoverageSection({ provider }: ProviderCoverageSectionProps) {
  const hasCoverageSummary =
    provider.coverageSummary != null && provider.coverageSummary.trim().length > 0;
  const hasCountries = provider.countries.length > 0;
  const hasCoverage = hasCoverageSummary || hasCountries;

  return (
    <section aria-labelledby="provider-coverage-heading" className="space-y-4">
      <SectionHeader
        id="provider-coverage-heading"
        title="Coverage"
        description="Supported countries and coverage summaries from the provider dataset."
      />

      {!hasCoverage ? (
        <p className="text-sm text-foreground">{formatTextValue(null)}</p>
      ) : (
        <div className="space-y-4">
          {hasCoverageSummary ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Coverage summary</h3>
              <p className="text-sm text-foreground">{provider.coverageSummary}</p>
            </div>
          ) : null}

          {hasCountries ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Countries supported</h3>
              <ItemChipList items={provider.countries.map((country) => country.name)} />
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
