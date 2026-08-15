import { SectionHeader } from "@/components/section-header";
import { ExternalLinkButton } from "@/components/external-link-button";
import type { ProviderDetail } from "@/db/queries";
import { mutedTextClassName } from "@/components/styles";
import { cn } from "@/lib/cn";

type ProviderSupportSectionProps = {
  provider: ProviderDetail;
};

export function ProviderSupportSection({ provider }: ProviderSupportSectionProps) {
  return (
    <section aria-labelledby="provider-support-heading" className="space-y-4">
      <SectionHeader
        id="provider-support-heading"
        title="Support"
        description="The current Apineer dataset does not include a dedicated support channel field. Use the provider's official website or documentation for support-related enquiries."
      />

      <p className={cn("text-sm leading-6", mutedTextClassName)}>
        For implementation questions, account setup, or provider-specific support, refer to the
        provider&apos;s official resources below.
      </p>

      <div className="flex flex-wrap gap-3">
        <ExternalLinkButton
          href={provider.websiteUrl}
          label="Website"
          variant="website"
          providerSlug={provider.slug}
          analyticsEvent="website_click"
        />
        <ExternalLinkButton
          href={provider.documentationUrl}
          label="Documentation"
          variant="documentation"
          providerSlug={provider.slug}
          analyticsEvent="documentation_click"
        />
      </div>
    </section>
  );
}
