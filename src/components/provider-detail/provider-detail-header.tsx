import Link from "next/link";

import { CategoryBadge } from "@/components/category-badge";
import { ExternalLinkButton } from "@/components/external-link-button";
import type { ProviderDetail } from "@/db/queries";
import { buildCompareEntryHref } from "@/lib/comparison-presentation";
import { formatLastVerified } from "@/lib/display";
import { cn } from "@/lib/cn";

import { mutedTextClassName, primaryButtonClassName } from "../styles";

type ProviderDetailHeaderProps = {
  provider: ProviderDetail;
};

export function ProviderDetailHeader({ provider }: ProviderDetailHeaderProps) {
  return (
    <header className="space-y-5 border-b border-border pb-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{provider.name}</h1>
      </div>

      {provider.categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {provider.categories.map((category) => (
            <CategoryBadge key={category.slug} name={category.name} slug={category.slug} />
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href={buildCompareEntryHref(provider.slug, provider.categories)}
          className={cn("inline-flex items-center justify-center", primaryButtonClassName)}
        >
          Compare
        </Link>
        <ExternalLinkButton
          href={provider.documentationUrl}
          label="Documentation"
          variant="documentation"
          providerSlug={provider.slug}
          analyticsEvent="documentation_click"
        />
        <ExternalLinkButton
          href={provider.websiteUrl}
          label="Website"
          variant="website"
          providerSlug={provider.slug}
          analyticsEvent="website_click"
        />
      </div>

      <p className={cn(mutedTextClassName)}>
        Last verified: {formatLastVerified(provider.lastVerified)}
      </p>
    </header>
  );
}
