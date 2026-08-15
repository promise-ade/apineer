import { asc, eq, ilike, inArray, or } from "drizzle-orm";

import { getDb } from "@/db/client";
import {
  categories,
  features,
  products,
  providerCategories,
  providerFeatures,
  providerProducts,
  providers,
} from "@/db/schema";

import {
  mapProviderDetail,
  mapProviderSummary,
  type ProviderWithAllRelations,
  type ProviderWithCategoryRelations,
} from "./mappers";
import { isSearchableQuery, toSearchPattern } from "./normalize";
import type { ProviderDetail, ProviderSummary } from "./types";

async function getProviderSummariesByIds(ids: string[]): Promise<ProviderSummary[]> {
  if (ids.length === 0) {
    return [];
  }

  const db = getDb();
  const rows = (await db.query.providers.findMany({
    where: inArray(providers.id, ids),
    orderBy: [asc(providers.name)],
    with: {
      providerCategories: {
        with: {
          category: true,
        },
      },
      providerCountries: {
        with: {
          country: true,
        },
      },
    },
  })) as ProviderWithCategoryRelations[];

  return rows.map(mapProviderSummary);
}

export async function listProviders(): Promise<ProviderSummary[]> {
  const db = getDb();
  const rows = (await db.query.providers.findMany({
    orderBy: [asc(providers.name)],
    with: {
      providerCategories: {
        with: {
          category: true,
        },
      },
      providerCountries: {
        with: {
          country: true,
        },
      },
    },
  })) as ProviderWithCategoryRelations[];

  return rows.map(mapProviderSummary);
}

export async function getProviderBySlug(slug: string): Promise<ProviderDetail | null> {
  const db = getDb();
  const provider = (await db.query.providers.findFirst({
    where: eq(providers.slug, slug),
    with: {
      providerCategories: {
        with: {
          category: true,
        },
      },
      providerProducts: {
        with: {
          product: true,
        },
      },
      providerFeatures: {
        with: {
          feature: true,
        },
      },
      providerCountries: {
        with: {
          country: true,
        },
      },
      providerSdkLanguages: {
        with: {
          sdkLanguage: true,
        },
      },
    },
  })) as ProviderWithAllRelations | undefined;

  if (!provider) {
    return null;
  }

  return mapProviderDetail(provider);
}

export async function listProvidersByCategorySlug(
  categorySlug: string,
): Promise<ProviderSummary[]> {
  const db = getDb();
  const links = await db
    .select({ providerId: providerCategories.providerId })
    .from(providerCategories)
    .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
    .where(eq(categories.slug, categorySlug));

  const providerIds = links.map((link) => link.providerId);
  return getProviderSummariesByIds(providerIds);
}

export async function searchProviders(query: string): Promise<ProviderSummary[]> {
  if (!isSearchableQuery(query)) {
    return [];
  }

  const pattern = toSearchPattern(query);
  const db = getDb();

  const matches = await db
    .selectDistinct({
      id: providers.id,
      name: providers.name,
    })
    .from(providers)
    .leftJoin(providerCategories, eq(providers.id, providerCategories.providerId))
    .leftJoin(categories, eq(providerCategories.categoryId, categories.id))
    .leftJoin(providerProducts, eq(providers.id, providerProducts.providerId))
    .leftJoin(products, eq(providerProducts.productId, products.id))
    .leftJoin(providerFeatures, eq(providers.id, providerFeatures.providerId))
    .leftJoin(features, eq(providerFeatures.featureId, features.id))
    .where(
      or(
        ilike(providers.name, pattern),
        ilike(categories.name, pattern),
        ilike(products.name, pattern),
        ilike(features.name, pattern),
      ),
    )
    .orderBy(asc(providers.name));

  return getProviderSummariesByIds(matches.map((match) => match.id));
}

export type DiscoverProvidersOptions = {
  query?: string;
  categorySlug?: string;
};

export async function discoverProviders(
  options: DiscoverProvidersOptions = {},
): Promise<ProviderSummary[]> {
  const query = options.query?.trim() ?? "";
  const categorySlug = options.categorySlug?.trim() ?? "";

  if (query && isSearchableQuery(query)) {
    const results = await searchProviders(query);

    if (!categorySlug) {
      return results;
    }

    return results.filter((provider) =>
      provider.categories.some((category) => category.slug === categorySlug),
    );
  }

  if (categorySlug) {
    return listProvidersByCategorySlug(categorySlug);
  }

  return listProviders();
}
