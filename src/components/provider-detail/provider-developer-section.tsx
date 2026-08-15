import { DataRow, DataRowGroup } from "@/components/data-row";
import { SectionHeader } from "@/components/section-header";
import type { ProviderDetail } from "@/db/queries";
import { formatTextValue } from "@/lib/display";

import { ItemChipList } from "./item-chip-list";

type ProviderDeveloperSectionProps = {
  provider: ProviderDetail;
};

export function ProviderDeveloperSection({ provider }: ProviderDeveloperSectionProps) {
  const sdkLanguageNames = provider.sdkLanguages.map((language) => language.name);

  return (
    <section aria-labelledby="provider-developer-heading" className="space-y-4">
      <SectionHeader
        id="provider-developer-heading"
        title="Developer Information"
        description="A concise summary of integration characteristics. Detailed implementation guidance remains on the provider's official documentation."
      />

      <DataRowGroup aria-label="Developer information">
        <DataRow label="API Style" textValue={provider.apiStyle} />
        <DataRow label="Authentication" textValue={provider.authentication} />
        <DataRow label="Sandbox" booleanValue={provider.sandboxAvailable} />
        <DataRow
          label="SDK Languages"
          value={
            sdkLanguageNames.length > 0 ? (
              <ItemChipList items={sdkLanguageNames} />
            ) : (
              formatTextValue(null)
            )
          }
        />
        <DataRow label="Webhooks" booleanValue={provider.webhooksAvailable} />
      </DataRowGroup>
    </section>
  );
}
