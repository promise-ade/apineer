import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const {
    getCategoryBySlug,
    getProviderBySlug,
    listCategories,
    listProviders,
    listProvidersByCategorySlug,
    searchProviders,
  } = await import("../src/db/queries");

  const providers = await listProviders();
  console.log(`listProviders: ${providers.length} providers`);

  const paystack = await getProviderBySlug("paystack");
  console.log(
    `getProviderBySlug(paystack): ${paystack ? paystack.name : "NOT FOUND"} | categories=${paystack?.categories.length ?? 0}`,
  );

  const categories = await listCategories();
  console.log(`listCategories: ${categories.length} categories`);

  const paymentsCategory = await getCategoryBySlug("payments");
  console.log(
    `getCategoryBySlug(payments): ${paymentsCategory ? paymentsCategory.name : "NOT FOUND"}`,
  );

  const paymentsProviders = await listProvidersByCategorySlug("payments");
  console.log(`listProvidersByCategorySlug(payments): ${paymentsProviders.length} providers`);

  const searchResults = await searchProviders("virtual account");
  console.log(
    `searchProviders("virtual account"): ${searchResults.length} providers -> ${searchResults.map((provider) => provider.name).join(", ")}`,
  );

  const emptySearch = await searchProviders("   ");
  console.log(`searchProviders(empty): ${emptySearch.length} providers`);

  const success =
    providers.length === 32 &&
    paystack != null &&
    categories.length === 10 &&
    paymentsCategory != null &&
    paymentsProviders.length > 0 &&
    searchResults.length > 0 &&
    emptySearch.length === 0;

  if (!success) {
    throw new Error("Phase 5 query verification failed.");
  }

  console.log("Phase 5 query verification passed.");
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
