import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategorySearchControls } from "@/components/category-search-controls";
import { CategoryViewTracker } from "@/components/analytics/page-view-tracker";
import { EmptyState } from "@/components/empty-state";
import { ProviderList } from "@/components/provider-list";
import { SectionHeader } from "@/components/section-header";
import { discoverProviders, getCategoryBySlug } from "@/db/queries";
import { appRoutes } from "@/lib/routes";
import { toProviderCardPropsList } from "@/lib/provider-presentation";
import { mutedTextClassName } from "@/components/styles";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.name,
    description: category.description ?? `Browse ${category.name} API providers on Apineer.`,
  };
}

export default async function CategoryDetailPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params;
  const { q } = await searchParams;
  const initialQuery = q?.trim() ?? "";

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const providers = await discoverProviders({
    query: initialQuery,
    categorySlug: slug,
  });

  const providerCards = toProviderCardPropsList(providers);
  const hasSearchQuery = initialQuery.length > 0;

  return (
    <div className="space-y-8">
      <CategoryViewTracker categorySlug={slug} />
      <div className="space-y-3">
        <SectionHeader
          headingLevel="h1"
          title={category.name}
          description={category.description ?? undefined}
        />
        <p className={cn(mutedTextClassName)}>
          {providers.length} provider{providers.length === 1 ? "" : "s"}
          {hasSearchQuery ? " matching your search" : " in this category"}
        </p>
      </div>

      <section aria-labelledby="category-providers-heading" className="space-y-6">
        <h2 id="category-providers-heading" className="sr-only">
          Providers in {category.name}
        </h2>
        <CategorySearchControls
          categorySlug={slug}
          categoryName={category.name}
          initialQuery={initialQuery}
        />

        {providerCards.length > 0 ? (
          <ProviderList providers={providerCards} />
        ) : (
          <EmptyState
            title="No results found"
            description={
              hasSearchQuery
                ? "No providers in this category matched your search. Try a different term or browse all providers in this category."
                : "No providers are currently assigned to this category."
            }
            actions={[
              { label: "Browse categories", href: appRoutes.categories },
              { label: "View all providers", href: appRoutes.providers },
            ]}
          />
        )}
      </section>
    </div>
  );
}
