import { describe, expect, it } from "vitest";

import { getSharedCategories } from "./comparison";
import type { ProviderDetail } from "./types";

function createProvider(
  slug: string,
  categorySlugs: string[],
): ProviderDetail {
  return {
    id: slug,
    name: slug,
    slug,
    description: "Description",
    websiteUrl: "https://example.com",
    apiStyle: null,
    authentication: null,
    sandboxAvailable: null,
    webhooksAvailable: null,
    pricingModel: null,
    freeTier: null,
    documentationUrl: "https://example.com/docs",
    coverageSummary: null,
    lastVerified: null,
    source: null,
    categories: categorySlugs.map((categorySlug) => ({
      name: categorySlug,
      slug: categorySlug,
      description: null,
    })),
    products: [],
    features: [],
    countries: [],
    sdkLanguages: [],
  };
}

describe("getSharedCategories", () => {
  it("returns categories shared by both providers", () => {
    const providerA = createProvider("a", ["payments", "cards"]);
    const providerB = createProvider("b", ["payments", "wallets"]);

    expect(getSharedCategories(providerA, providerB).map((category) => category.slug)).toEqual([
      "payments",
    ]);
  });

  it("returns an empty list when providers do not overlap", () => {
    const providerA = createProvider("a", ["payments"]);
    const providerB = createProvider("b", ["wallets"]);

    expect(getSharedCategories(providerA, providerB)).toEqual([]);
  });
});
