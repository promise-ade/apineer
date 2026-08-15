import { SectionHeader } from "@/components/section-header";
import { ExternalLinkButton } from "@/components/external-link-button";
import type { ProviderDetail } from "@/db/queries";
import { formatTextValue } from "@/lib/display";

type ProviderDocumentationSectionProps = {
  provider: ProviderDetail;
};

function hasExternalUrl(value: string | null | undefined): value is string {
  return value != null && value.trim().length > 0;
}

export function ProviderDocumentationSection({ provider }: ProviderDocumentationSectionProps) {
  const hasDocumentation = hasExternalUrl(provider.documentationUrl);

  return (
    <section aria-labelledby="provider-documentation-heading" className="space-y-4">
      <SectionHeader
        id="provider-documentation-heading"
        title="Documentation"
        description="Official provider documentation hosted externally. Apineer does not reproduce provider documentation."
      />

      {hasDocumentation ? (
        <ExternalLinkButton
          href={provider.documentationUrl}
          label="Documentation"
          providerSlug={provider.slug}
          analyticsEvent="documentation_click"
        />
      ) : (
        <p className="text-sm text-foreground">{formatTextValue(null)}</p>
      )}
    </section>
  );
}
