import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

type CheckResult = {
  name: string;
  passed: boolean;
  detail?: string;
};

const checks: CheckResult[] = [];

function record(name: string, passed: boolean, detail?: string) {
  checks.push({ name, passed, detail });
  const status = passed ? "PASS" : "FAIL";
  console.log(`[${status}] ${name}${detail ? ` — ${detail}` : ""}`);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

async function main() {
  const { CANONICAL_CATEGORIES } = await import("../src/db/seed/categories");
  const { formatBooleanAvailability, formatTextValue } = await import("../src/lib/display");
  const { buildComparisonRows } = await import("../src/lib/comparison-presentation");
  const {
    discoverProviders,
    getCategoryBySlug,
    getProviderBySlug,
    listCategories,
    listCategoriesWithProviderCounts,
    listProviders,
    listProvidersByCategorySlug,
    resolveComparison,
    searchProviders,
  } = await import("../src/db/queries");

  const providers = await listProviders();
  const categories = await listCategories();
  const categoriesWithCounts = await listCategoriesWithProviderCounts();

  record("provider count", providers.length === 32, `${providers.length} providers`);
  record("category count", categories.length === 10, `${categories.length} categories`);

  for (const canonical of CANONICAL_CATEGORIES) {
    const category = await getCategoryBySlug(canonical.slug);
    const categoryProviders = category
      ? await listProvidersByCategorySlug(canonical.slug)
      : [];

    record(
      `category exists: ${canonical.slug}`,
      category != null && category.name === canonical.name,
    );
    record(
      `category has providers: ${canonical.slug}`,
      categoryProviders.length > 0,
      `${categoryProviders.length} providers`,
    );
  }

  const paystack = await getProviderBySlug("paystack");
  const flutterwave = await getProviderBySlug("flutterwave");
  record(
    "multi-category provider: paystack",
    (paystack?.categories.length ?? 0) > 1,
    `${paystack?.categories.length ?? 0} categories`,
  );
  record(
    "multi-category provider: flutterwave",
    (flutterwave?.categories.length ?? 0) > 1,
    `${flutterwave?.categories.length ?? 0} categories`,
  );

  const woodcore = await getProviderBySlug("woodcore");
  const bachs = await getProviderBySlug("bachs");
  const zest = await getProviderBySlug("zest-payments");

  record(
    "woodcore sandbox_available",
    woodcore?.sandboxAvailable === true,
    formatBooleanAvailability(woodcore?.sandboxAvailable),
  );
  record(
    "bachs coverage summary",
    bachs?.coverageSummary === "150+ countries",
    bachs?.coverageSummary ?? "missing",
  );
  record(
    "bachs zero country rows",
    (bachs?.countries.length ?? -1) === 0,
    `${bachs?.countries.length ?? 0} countries`,
  );
  record(
    "zest missing apiStyle renders Not available",
    formatTextValue(zest?.apiStyle) === "Not available",
  );
  record(
    "zest null sandbox renders Information not available",
    formatBooleanAvailability(zest?.sandboxAvailable) === "Information not available",
  );

  const searchResults = await searchProviders("virtual account");
  record(
    "search returns results",
    searchResults.length > 0,
    `${searchResults.length} providers`,
  );

  const emptySearch = await searchProviders("   ");
  record("empty search returns no results", emptySearch.length === 0);

  const noMatchSearch = await searchProviders("zzzz-not-a-provider-name");
  record("no-match search returns empty list", noMatchSearch.length === 0);

  const paymentsDiscovery = await discoverProviders({
    query: "payment",
    categorySlug: "payments",
  });
  record(
    "discoverProviders filters by category",
    paymentsDiscovery.every((provider) =>
      provider.categories.some((category) => category.slug === "payments"),
    ),
    `${paymentsDiscovery.length} providers`,
  );

  const categoryOnlyDiscovery = await discoverProviders({ categorySlug: "cards" });
  record(
    "discoverProviders category-only listing",
    categoryOnlyDiscovery.length > 0,
    `${categoryOnlyDiscovery.length} card providers`,
  );

  const invalidProvider = await getProviderBySlug("not-a-real-provider");
  record("missing provider returns null", invalidProvider == null);

  let invalidOfficialLinks = 0;
  for (const provider of [paystack, flutterwave, woodcore, bachs, zest]) {
    if (!provider) {
      continue;
    }

    if (!isHttpUrl(provider.websiteUrl) || !isHttpUrl(provider.documentationUrl)) {
      invalidOfficialLinks += 1;
    }
  }

  record("official links use stored http(s) URLs", invalidOfficialLinks === 0);

  const readyComparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "monnify",
    categorySlug: "payments",
  });
  record("comparison ready state", readyComparison.status === "ready");

  const sameProviderComparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "paystack",
    categorySlug: "payments",
  });
  record("comparison rejects same provider", sameProviderComparison.status === "invalid");

  const invalidCategoryComparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "flutterwave",
    categorySlug: "open-banking",
  });
  record(
    "comparison rejects invalid shared category",
    invalidCategoryComparison.status === "invalid",
  );

  const needsCategoryComparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "flutterwave",
  });
  record(
    "comparison requires category when multiple shared categories exist",
    needsCategoryComparison.status === "needs-category",
  );

  if (readyComparison.providerA && readyComparison.providerB) {
    const rows = buildComparisonRows(readyComparison.providerA, readyComparison.providerB);
    record("comparison table rows render", rows.length >= 10, `${rows.length} rows`);
  } else {
    record("comparison table rows render", false, "ready comparison missing providers");
  }

  const totalAssignedProviders = categoriesWithCounts.reduce(
    (sum, category) => sum + category.providerCount,
    0,
  );
  record(
    "category provider counts are populated",
    totalAssignedProviders >= categories.length,
    `${totalAssignedProviders} total assignments`,
  );

  const failures = checks.filter((check) => !check.passed);

  if (failures.length > 0) {
    throw new Error(`Phase 11 integration verification failed (${failures.length} checks).`);
  }

  console.log(`Phase 11 integration verification passed (${checks.length} checks).`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const { closeDb } = await import("../src/db/client");
    await closeDb();
  });
