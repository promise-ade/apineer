export const appRoutes = {
  home: "/",
  about: "/about",
  categories: "/categories",
  category: (slug: string) => `/categories/${slug}`,
  categoryWithSearch: (slug: string, params: { q?: string } = {}) => {
    const searchParams = new URLSearchParams();

    if (params.q?.trim()) {
      searchParams.set("q", params.q.trim());
    }

    const queryString = searchParams.toString();
    return queryString ? `/categories/${slug}?${queryString}` : `/categories/${slug}`;
  },
  providers: "/providers",
  providersWithFilters: (params: { q?: string; category?: string }) => {
    const searchParams = new URLSearchParams();

    if (params.q?.trim()) {
      searchParams.set("q", params.q.trim());
    }

    if (params.category?.trim()) {
      searchParams.set("category", params.category.trim());
    }

    const queryString = searchParams.toString();
    return queryString ? `/providers?${queryString}` : "/providers";
  },
  provider: (slug: string) => `/providers/${slug}`,
  compare: "/compare",
  compareWithProviders: (params: { a?: string; b?: string; category?: string }) => {
    const searchParams = new URLSearchParams();

    if (params.a?.trim()) {
      searchParams.set("a", params.a.trim());
    }

    if (params.b?.trim()) {
      searchParams.set("b", params.b.trim());
    }

    if (params.category?.trim()) {
      searchParams.set("category", params.category.trim());
    }

    const queryString = searchParams.toString();
    return queryString ? `/compare?${queryString}` : "/compare";
  },
} as const;

export type AppRouteKey = keyof typeof appRoutes;
