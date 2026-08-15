import { SectionHeader } from "@/components/section-header";
import type { ProviderDetail } from "@/db/queries";

import { ItemChipList } from "./item-chip-list";

type ProviderProductsSectionProps = {
  provider: ProviderDetail;
};

export function ProviderProductsSection({ provider }: ProviderProductsSectionProps) {
  return (
    <section aria-labelledby="provider-products-heading" className="space-y-6">
      <SectionHeader
        id="provider-products-heading"
        title="Products Offered"
        description="Core products and features recorded in the Apineer dataset for this provider."
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Products</h3>
          <ItemChipList items={provider.products.map((product) => product.name)} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Features</h3>
          <ItemChipList items={provider.features.map((feature) => feature.name)} />
        </div>
      </div>
    </section>
  );
}
