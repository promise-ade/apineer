export { getCategoryBySlug, listCategories, listCategoriesWithProviderCounts } from "./categories";
export { resolveComparison, getSharedCategories, type ComparisonRequest, type ResolvedComparison } from "./comparison";
export {
  discoverProviders,
  getProviderBySlug,
  listProviders,
  listProvidersByCategorySlug,
  searchProviders,
  type DiscoverProvidersOptions,
} from "./providers";
export type {
  CategoryRecord,
  CategoryWithProviderCount,
  CountryItem,
  NamedSlugItem,
  ProviderDetail,
  ProviderSummary,
} from "./types";
