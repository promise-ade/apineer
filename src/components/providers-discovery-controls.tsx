"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FilterControl } from "@/components/filter-control";
import { SearchInput } from "@/components/search-input";
import type { CategoryRecord } from "@/db/queries";
import { createAnalyticsEvent, trackEvent } from "@/lib/analytics";
import { appRoutes } from "@/lib/routes";

type ProvidersDiscoveryControlsProps = {
  categories: CategoryRecord[];
  initialQuery: string;
  initialCategorySlug?: string;
};

export function ProvidersDiscoveryControls({
  categories,
  initialQuery,
  initialCategorySlug,
}: ProvidersDiscoveryControlsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(initialCategorySlug ?? "");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCategorySlug(initialCategorySlug ?? "");
  }, [initialCategorySlug]);

  const trackedSearchRef = useRef("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextUrl = appRoutes.providersWithFilters({
        q: query,
        category: selectedCategorySlug || undefined,
      });
      const currentParams = new URLSearchParams(window.location.search);
      const currentUrl = appRoutes.providersWithFilters({
        q: currentParams.get("q") ?? "",
        category: currentParams.get("category") ?? undefined,
      });

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl);

        const normalizedQuery = query.trim();
        if (normalizedQuery.length > 0 && normalizedQuery !== trackedSearchRef.current) {
          trackedSearchRef.current = normalizedQuery;
          trackEvent(createAnalyticsEvent("provider_search", { query: normalizedQuery }));
        }

        if (normalizedQuery.length === 0) {
          trackedSearchRef.current = "";
        }
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [query, selectedCategorySlug, router]);

  function handleCategoryToggle(slug: string) {
    setSelectedCategorySlug((current) => (current === slug ? "" : slug));
  }

  function handleClearFilters() {
    setSelectedCategorySlug("");
    setQuery("");
  }

  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />
      <FilterControl
        label="Filter by category"
        options={categories.map((category) => ({
          slug: category.slug,
          label: category.name,
        }))}
        selectedSlugs={selectedCategorySlug ? [selectedCategorySlug] : []}
        onToggle={handleCategoryToggle}
        onClearAll={selectedCategorySlug || query ? handleClearFilters : undefined}
      />
    </div>
  );
}
