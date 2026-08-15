import type { Category, Country, Feature, Product, Provider, SdkLanguage } from "@/db/schema";

import type {
  CategoryRecord,
  CountryItem,
  NamedSlugItem,
  ProviderDetail,
  ProviderSummary,
} from "./types";

type CategoryRelation = {
  category: Category;
};

type ProductRelation = {
  product: Product;
};

type FeatureRelation = {
  feature: Feature;
};

type CountryRelation = {
  country: Country;
};

type SdkLanguageRelation = {
  sdkLanguage: SdkLanguage;
};

export type ProviderWithCategoryRelations = Provider & {
  providerCategories: CategoryRelation[];
  providerCountries: CountryRelation[];
};

export type ProviderWithAllRelations = Provider & {
  providerCategories: CategoryRelation[];
  providerProducts: ProductRelation[];
  providerFeatures: FeatureRelation[];
  providerCountries: CountryRelation[];
  providerSdkLanguages: SdkLanguageRelation[];
};

function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

export function mapCategoryRecord(category: Category): CategoryRecord {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description,
  };
}

function mapNamedSlugItem(item: NamedSlugItem): NamedSlugItem {
  return {
    name: item.name,
    slug: item.slug,
  };
}

export function mapProviderSummary(provider: ProviderWithCategoryRelations): ProviderSummary {
  const categories = sortByName(
    provider.providerCategories.map((relation) => ({
      name: relation.category.name,
      slug: relation.category.slug,
    })),
  );

  const countries: CountryItem[] = sortByName(
    provider.providerCountries.map((relation) => ({
      name: relation.country.name,
      code: relation.country.code,
    })),
  );

  return {
    id: provider.id,
    name: provider.name,
    slug: provider.slug,
    description: provider.description,
    apiStyle: provider.apiStyle,
    sandboxAvailable: provider.sandboxAvailable,
    coverageSummary: provider.coverageSummary,
    categories,
    countries,
  };
}

export function mapProviderDetail(provider: ProviderWithAllRelations): ProviderDetail {
  const categories = sortByName(
    provider.providerCategories.map((relation) => mapCategoryRecord(relation.category)),
  );

  const products = sortByName(
    provider.providerProducts.map((relation) =>
      mapNamedSlugItem({
        name: relation.product.name,
        slug: relation.product.slug,
      }),
    ),
  );

  const features = sortByName(
    provider.providerFeatures.map((relation) =>
      mapNamedSlugItem({
        name: relation.feature.name,
        slug: relation.feature.slug,
      }),
    ),
  );

  const countries: CountryItem[] = sortByName(
    provider.providerCountries.map((relation) => ({
      name: relation.country.name,
      code: relation.country.code,
    })),
  );

  const sdkLanguages = sortByName(
    provider.providerSdkLanguages.map((relation) =>
      mapNamedSlugItem({
        name: relation.sdkLanguage.name,
        slug: relation.sdkLanguage.slug,
      }),
    ),
  );

  return {
    id: provider.id,
    name: provider.name,
    slug: provider.slug,
    description: provider.description,
    websiteUrl: provider.websiteUrl,
    apiStyle: provider.apiStyle,
    authentication: provider.authentication,
    sandboxAvailable: provider.sandboxAvailable,
    webhooksAvailable: provider.webhooksAvailable,
    pricingModel: provider.pricingModel,
    freeTier: provider.freeTier,
    documentationUrl: provider.documentationUrl,
    coverageSummary: provider.coverageSummary,
    lastVerified: provider.lastVerified,
    source: provider.source,
    categories,
    products,
    features,
    countries,
    sdkLanguages,
  };
}
