"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CompareSelector } from "@/components/compare-selector";
import type { CategoryRecord, ProviderSummary } from "@/db/queries";
import { createAnalyticsEvent, trackEvent } from "@/lib/analytics";
import { appRoutes } from "@/lib/routes";

type CompareControlsProps = {
  allProviders: ProviderSummary[];
  allCategories: CategoryRecord[];
  sharedCategories: CategoryRecord[];
  anchorProviderCategories?: CategoryRecord[];
  initialProviderASlug?: string;
  initialProviderBSlug?: string;
  initialCategorySlug?: string;
  status: "incomplete" | "needs-category" | "invalid" | "ready";
  message?: string;
  categoryLabel?: string;
};

function providerBelongsToCategory(
  provider: ProviderSummary,
  categorySlug: string,
): boolean {
  return provider.categories.some((category) => category.slug === categorySlug);
}

function getProviderName(providers: ProviderSummary[], slug: string): string | undefined {
  return providers.find((provider) => provider.slug === slug)?.name;
}

export function CompareControls({
  allProviders,
  allCategories,
  sharedCategories,
  anchorProviderCategories,
  initialProviderASlug = "",
  initialProviderBSlug = "",
  initialCategorySlug = "",
  status,
  message,
  categoryLabel,
}: CompareControlsProps) {
  const router = useRouter();
  const [providerASlug, setProviderASlug] = useState(initialProviderASlug);
  const [providerBSlug, setProviderBSlug] = useState(initialProviderBSlug);
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);

  useEffect(() => {
    setProviderASlug(initialProviderASlug);
    setProviderBSlug(initialProviderBSlug);
    setCategorySlug(initialCategorySlug);
  }, [initialProviderASlug, initialProviderBSlug, initialCategorySlug]);

  const bothProvidersSelected = providerASlug.length > 0 && providerBSlug.length > 0;
  const isSharedCategoryMode = bothProvidersSelected && sharedCategories.length > 0;
  const isAnchorCategoryMode =
    !bothProvidersSelected &&
    providerASlug.length > 0 &&
    (anchorProviderCategories?.length ?? 0) > 0;

  const categoryOptions = useMemo(() => {
    let source = allCategories;

    if (isSharedCategoryMode) {
      source = sharedCategories;
    } else if (isAnchorCategoryMode && anchorProviderCategories) {
      source = anchorProviderCategories;
    }

    return source.map((category) => ({ slug: category.slug, name: category.name }));
  }, [
    allCategories,
    anchorProviderCategories,
    isAnchorCategoryMode,
    isSharedCategoryMode,
    sharedCategories,
  ]);

  const categoryFieldLabel = isSharedCategoryMode ? "Comparison category" : "Category";

  const categoryHelperText = useMemo(() => {
    if (isSharedCategoryMode) {
      const providerAName = getProviderName(allProviders, providerASlug);
      const providerBName = getProviderName(allProviders, providerBSlug);

      if (providerAName && providerBName) {
        return `Showing categories shared by ${providerAName} and ${providerBName}.`;
      }
    }

    if (isAnchorCategoryMode) {
      const providerAName = getProviderName(allProviders, providerASlug);

      if (providerAName) {
        return `Showing categories available for ${providerAName}. Select one to choose Provider B.`;
      }
    }

    return "Choose a category to see providers available for comparison.";
  }, [
    allProviders,
    isAnchorCategoryMode,
    isSharedCategoryMode,
    providerASlug,
    providerBSlug,
  ]);

  const providerOptions = useMemo(() => {
    if (!categorySlug) {
      return [];
    }

    return allProviders
      .filter((provider) => providerBelongsToCategory(provider, categorySlug))
      .map((provider) => ({ slug: provider.slug, name: provider.name }));
  }, [allProviders, categorySlug]);

  const hasActiveSelection =
    categorySlug.length > 0 || providerASlug.length > 0 || providerBSlug.length > 0;

  const constraintMessage =
    status === "invalid" || status === "needs-category" ? message : undefined;

  function handleCompare() {
    router.replace(
      appRoutes.compareWithProviders({
        a: providerASlug,
        b: providerBSlug,
        category: categorySlug || undefined,
      }),
    );
  }

  function handleCategoryChange(nextCategorySlug: string) {
    setCategorySlug(nextCategorySlug);
  }

  function handleProviderAChange(slug: string) {
    if (providerASlug && slug !== providerASlug) {
      trackEvent(
        createAnalyticsEvent("provider_removed_from_comparison", {
          removedProviderSlug: providerASlug,
          side: "a",
        }),
      );
    }

    setProviderASlug(slug);
  }

  function handleProviderBChange(slug: string) {
    if (providerBSlug && slug !== providerBSlug) {
      trackEvent(
        createAnalyticsEvent("provider_removed_from_comparison", {
          removedProviderSlug: providerBSlug,
          side: "b",
        }),
      );
    }

    setProviderBSlug(slug);
  }

  function handleStartNewComparison() {
    if (providerASlug) {
      trackEvent(
        createAnalyticsEvent("provider_removed_from_comparison", {
          removedProviderSlug: providerASlug,
          side: "a",
        }),
      );
    }

    if (providerBSlug) {
      trackEvent(
        createAnalyticsEvent("provider_removed_from_comparison", {
          removedProviderSlug: providerBSlug,
          side: "b",
        }),
      );
    }

    setProviderASlug("");
    setProviderBSlug("");
    setCategorySlug("");
    router.replace(appRoutes.compare);
  }

  return (
    <CompareSelector
      categoryOptions={categoryOptions}
      categorySlug={categorySlug}
      categoryFieldLabel={categoryFieldLabel}
      categoryHelperText={categoryHelperText}
      isSharedCategoryMode={isSharedCategoryMode}
      providerOptions={providerOptions}
      providerASlug={providerASlug}
      providerBSlug={providerBSlug}
      categoryLabel={categoryLabel}
      onCategoryChange={handleCategoryChange}
      onProviderAChange={handleProviderAChange}
      onProviderBChange={handleProviderBChange}
      onCompare={handleCompare}
      onStartNewComparison={handleStartNewComparison}
      showStartNewComparison={hasActiveSelection}
      constraintMessage={constraintMessage}
    />
  );
}
