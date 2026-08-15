import { DataRow, DataRowGroup } from "@/components/data-row";
import { SectionHeader } from "@/components/section-header";
import { ExternalLinkButton } from "@/components/external-link-button";
import type { ProviderDetail } from "@/db/queries";

type ProviderPricingSectionProps = {
  provider: ProviderDetail;
};

export function ProviderPricingSection({ provider }: ProviderPricingSectionProps) {
  return (
    <section aria-labelledby="provider-pricing-heading" className="space-y-4">
      <SectionHeader
        id="provider-pricing-heading"
        title="Pricing"
        description="Pricing model and free-tier information from the provider dataset."
      />

      <DataRowGroup aria-label="Pricing information">
        <DataRow label="Pricing model" textValue={provider.pricingModel} />
        <DataRow label="Free tier" textValue={provider.freeTier} />
      </DataRowGroup>

      <ExternalLinkButton
        href={provider.websiteUrl}
        label="View provider website for current pricing"
        variant="website"
        providerSlug={provider.slug}
        analyticsEvent="website_click"
      />
    </section>
  );
}
