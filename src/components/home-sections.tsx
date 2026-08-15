import Link from "next/link";

import { CategoryList } from "@/components/category-list";
import { ProviderCard, type ProviderCardProps } from "@/components/provider-card";
import { SectionHeader } from "@/components/section-header";
import type { CategoryWithProviderCount } from "@/db/queries";
import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/cn";

import { linkArrowClassName, linkClassName } from "./styles";

type CategoryBrowseProps = {
  categories: CategoryWithProviderCount[];
  className?: string;
};

export function CategoryBrowse({ categories, className }: CategoryBrowseProps) {
  return (
    <section aria-labelledby="browse-categories-heading" className={className}>
      <SectionHeader
        id="browse-categories-heading"
        title="Browse by category"
        description="Explore providers grouped by fintech API category."
      />
      <CategoryList categories={categories} className="mt-6 lg:grid-cols-3" />
    </section>
  );
}

type ExploreProvidersSectionProps = {
  providers: ProviderCardProps[];
  className?: string;
};

export function ExploreProvidersSection({ providers, className }: ExploreProvidersSectionProps) {
  return (
    <section aria-labelledby="explore-providers-heading" className={className}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-10">
        <SectionHeader
          id="explore-providers-heading"
          title="Explore providers"
          description="Browse a selection of fintech API providers in the current dataset."
        />
        <Link href={appRoutes.providers} className={cn("group/link text-sm", linkClassName)}>
          View all providers
          <span className={linkArrowClassName} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => (
          <li key={provider.href} className="min-w-0">
            <ProviderCard {...provider} />
          </li>
        ))}
      </ul>
    </section>
  );
}
