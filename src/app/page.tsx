import type { Metadata } from "next";

import { CategoryBrowse, ExploreProvidersSection } from "@/components/home-sections";
import { HomeHero } from "@/components/home-hero";
import { listCategoriesWithProviderCounts, listProviders } from "@/db/queries";
import { toProviderCardPropsList } from "@/lib/provider-presentation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover, evaluate, and compare fintech API providers across African markets.",
};

const FEATURED_PROVIDER_COUNT = 6;

export default async function HomePage() {
  const [categories, providers] = await Promise.all([
    listCategoriesWithProviderCounts(),
    listProviders(),
  ]);
  const featuredProviders = toProviderCardPropsList(providers.slice(0, FEATURED_PROVIDER_COUNT));

  return (
    <div className="space-y-14 sm:space-y-16">
      <HomeHero />
      <CategoryBrowse categories={categories} />
      <ExploreProvidersSection providers={featuredProviders} />
    </div>
  );
}
