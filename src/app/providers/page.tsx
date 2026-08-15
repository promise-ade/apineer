import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { ProviderList } from "@/components/provider-list";
import { ProvidersDiscoveryControls } from "@/components/providers-discovery-controls";
import { SectionHeader } from "@/components/section-header";
import { discoverProviders, listCategories } from "@/db/queries";
import { appRoutes } from "@/lib/routes";
import { toProviderCardPropsList } from "@/lib/provider-presentation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Providers",
  description: "Browse and search fintech API providers on Apineer.",
};

type ProvidersPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const { q, category } = await searchParams;
  const initialQuery = q?.trim() ?? "";
  const initialCategorySlug = category?.trim() ?? "";

  const [categories, providers] = await Promise.all([
    listCategories(),
    discoverProviders({
      query: initialQuery,
      categorySlug: initialCategorySlug || undefined,
    }),
  ]);

  const providerCards = toProviderCardPropsList(providers);
  const hasActiveFilters = initialQuery.length > 0 || initialCategorySlug.length > 0;

  return (
    <div className="space-y-8">
      <SectionHeader
        headingLevel="h1"
        title="Providers"
        description="Browse and search fintech API providers. Filter by category to narrow the directory."
      />

      <ProvidersDiscoveryControls
        categories={categories}
        initialQuery={initialQuery}
        initialCategorySlug={initialCategorySlug || undefined}
      />

      {providerCards.length > 0 ? (
        <ProviderList providers={providerCards} />
      ) : (
        <EmptyState
          title="No results found"
          description={
            hasActiveFilters
              ? "No providers matched your search or filters. Try a different term or browse all providers and categories."
              : "No providers are available to display."
          }
          actions={[
            { label: "Browse categories", href: appRoutes.categories },
            { label: "View all providers", href: appRoutes.providers },
          ]}
        />
      )}
    </div>
  );
}
