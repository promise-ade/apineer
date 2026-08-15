import type { ProviderDetail } from "@/db/queries";

import { ProviderCoverageSection } from "./provider-coverage-section";
import { ProviderDetailHeader } from "./provider-detail-header";
import { ProviderDeveloperSection } from "./provider-developer-section";
import { ProviderDocumentationSection } from "./provider-documentation-section";
import { ProviderOverviewSection } from "./provider-overview-section";
import { ProviderPricingSection } from "./provider-pricing-section";
import { ProviderProductsSection } from "./provider-products-section";
import { ProviderSupportSection } from "./provider-support-section";

type ProviderDetailViewProps = {
  provider: ProviderDetail;
};

export function ProviderDetailView({ provider }: ProviderDetailViewProps) {
  return (
    <article className="space-y-10">
      <ProviderDetailHeader provider={provider} />
      <ProviderOverviewSection provider={provider} />
      <ProviderProductsSection provider={provider} />
      <ProviderCoverageSection provider={provider} />
      <ProviderDeveloperSection provider={provider} />
      <ProviderPricingSection provider={provider} />
      <ProviderDocumentationSection provider={provider} />
      <ProviderSupportSection provider={provider} />
    </article>
  );
}
