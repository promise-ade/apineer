import { SectionHeader } from "@/components/section-header";
import { ExternalLinkButton } from "@/components/external-link-button";
import type { ProviderDetail } from "@/db/queries";

type ProviderOverviewSectionProps = {
  provider: ProviderDetail;
};

export function ProviderOverviewSection({ provider }: ProviderOverviewSectionProps) {
  return (
    <section aria-labelledby="provider-overview-heading" className="space-y-4">
      <SectionHeader
        id="provider-overview-heading"
        title="Provider Overview"
        description="What this provider offers and where to find its official online presence."
      />
      <p className="max-w-3xl text-base leading-7 text-muted">{provider.description}</p>
      <ExternalLinkButton
        href={provider.websiteUrl}
        label="Website"
        variant="website"
        providerSlug={provider.slug}
        analyticsEvent="website_click"
      />
    </section>
  );
}
