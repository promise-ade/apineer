import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const {
    discoverProviders,
    getCategoryBySlug,
    listCategoriesWithProviderCounts,
    listProvidersByCategorySlug,
  } = await import("../src/db/queries");

  const categories = await listCategoriesWithProviderCounts();
  const payments = await getCategoryBySlug("payments");
  const paymentsProviders = await listProvidersByCategorySlug("payments");
  const searchInCategory = await discoverProviders({
    query: "paystack",
    categorySlug: "payments",
  });
  const invalidCategory = await getCategoryBySlug("not-a-real-category");

  console.log(`categories with counts: ${categories.length}`);
  console.log(
    categories.map((category) => `${category.slug}=${category.providerCount}`).join(", "),
  );
  console.log(`payments category: ${payments?.name ?? "NOT FOUND"}`);
  console.log(`payments providers: ${paymentsProviders.length}`);
  console.log(`search in payments (paystack): ${searchInCategory.map((p) => p.name).join(", ")}`);
  console.log(`invalid category: ${invalidCategory ?? "null"}`);

  const success =
    categories.length === 10 &&
    categories.every((category) => category.providerCount > 0) &&
    payments != null &&
    paymentsProviders.length > 0 &&
    searchInCategory.some((provider) => provider.slug === "paystack") &&
    invalidCategory == null;

  if (!success) {
    throw new Error("Phase 7 verification failed.");
  }

  console.log("Phase 7 verification passed.");
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
