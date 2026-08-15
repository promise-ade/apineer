"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchInput } from "@/components/search-input";
import { appRoutes } from "@/lib/routes";

type CategorySearchControlsProps = {
  categorySlug: string;
  categoryName: string;
  initialQuery: string;
};

export function CategorySearchControls({
  categorySlug,
  categoryName,
  initialQuery,
}: CategorySearchControlsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextUrl = appRoutes.categoryWithSearch(categorySlug, { q: query });
      const currentParams = new URLSearchParams(window.location.search);
      const currentUrl = appRoutes.categoryWithSearch(categorySlug, {
        q: currentParams.get("q") ?? "",
      });

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl);
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [categorySlug, query, router]);

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onClear={() => setQuery("")}
      label={`Search providers in ${categoryName}`}
      placeholder="Search within this category..."
    />
  );
}
