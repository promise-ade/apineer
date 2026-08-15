import type { Metadata } from "next";

import { CompareControls } from "@/components/compare-controls";
import { ComparisonStartedTracker } from "@/components/analytics/page-view-tracker";
import { ComparisonTable } from "@/components/comparison-table";
import { EmptyState } from "@/components/empty-state";
import { SectionHeader } from "@/components/section-header";
import { getProviderBySlug, listCategories, listProviders, resolveComparison } from "@/db/queries";
import { buildComparisonRows } from "@/lib/comparison-presentation";
import { appRoutes } from "@/lib/routes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare two fintech API providers in the same category.",
};

type ComparePageProps = {
  searchParams: Promise<{
    a?: string;
    b?: string;
    category?: string;
  }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { a, b, category } = await searchParams;
  const providerASlug = a?.trim() ?? "";
  const providerBSlug = b?.trim() ?? "";
  const categorySlug = category?.trim() ?? "";

  const [allProviders, allCategories, comparison] = await Promise.all([
    listProviders(),
    listCategories(),
    resolveComparison({
      providerASlug,
      providerBSlug,
      categorySlug,
    }),
  ]);

  let anchorProviderCategories = comparison.providerA?.categories;

  if (!anchorProviderCategories && providerASlug && !providerBSlug) {
    const anchorProvider = await getProviderBySlug(providerASlug);
    anchorProviderCategories = anchorProvider?.categories;
  }

  const initialCategorySlug =
    comparison.category?.slug ??
    categorySlug ??
    (anchorProviderCategories?.length === 1 ? anchorProviderCategories[0].slug : "");

  const showComparisonTable =
    comparison.status === "ready" &&
    comparison.providerA != null &&
    comparison.providerB != null;

  const comparisonRows =
    showComparisonTable && comparison.providerA && comparison.providerB
      ? buildComparisonRows(comparison.providerA, comparison.providerB)
      : null;

  return (
    <div className="space-y-8">
      <SectionHeader
        headingLevel="h1"
        title="Compare providers"
        description="Evaluate two fintech API providers side by side within a shared category."
      />

      <CompareControls
        allProviders={allProviders}
        allCategories={allCategories}
        sharedCategories={comparison.sharedCategories}
        anchorProviderCategories={anchorProviderCategories}
        initialProviderASlug={providerASlug}
        initialProviderBSlug={providerBSlug}
        initialCategorySlug={initialCategorySlug}
        status={comparison.status}
        message={comparison.message}
        categoryLabel={comparison.category?.name}
      />

      {comparison.status === "incomplete" ? (
        <EmptyState
          title="Start a comparison"
          description="Select a category, then choose Provider A and Provider B from that category to view a side-by-side comparison."
          actions={[
            { label: "Browse providers", href: appRoutes.providers },
            { label: "Browse categories", href: appRoutes.categories },
          ]}
        />
      ) : null}

      {showComparisonTable &&
      comparisonRows &&
      comparison.providerA &&
      comparison.providerB &&
      comparison.category ? (
        <>
          <ComparisonStartedTracker
            providerASlug={comparison.providerA.slug}
            providerBSlug={comparison.providerB.slug}
            categorySlug={comparison.category.slug}
          />
          <ComparisonTable
            providerAName={comparison.providerA.name}
            providerBName={comparison.providerB.name}
            providerASlug={comparison.providerA.slug}
            providerBSlug={comparison.providerB.slug}
            rows={comparisonRows}
            providerADetailHref={appRoutes.provider(comparison.providerA.slug)}
            providerBDetailHref={appRoutes.provider(comparison.providerB.slug)}
            providerADocumentationHref={comparison.providerA.documentationUrl}
            providerBDocumentationHref={comparison.providerB.documentationUrl}
          />
        </>
      ) : null}
    </div>
  );
}
