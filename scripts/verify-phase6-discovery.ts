import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { discoverProviders, listCategories, listProviders, searchProviders } = await import(
    "../src/db/queries"
  );

  const categories = await listCategories();
  const providers = await listProviders();
  const searchResults = await searchProviders("paystack");
  const paymentsFiltered = await discoverProviders({ categorySlug: "payments" });
  const combined = await discoverProviders({ query: "virtual", categorySlug: "payments" });
  const emptyResults = await discoverProviders({ query: "zzzz-no-match-xyz" });

  console.log(`categories: ${categories.length}`);
  console.log(`providers: ${providers.length}`);
  console.log(`search(paystack): ${searchResults.map((p) => p.name).join(", ")}`);
  console.log(`filter(payments): ${paymentsFiltered.length}`);
  console.log(`search+filter(virtual/payments): ${combined.length}`);
  console.log(`empty search: ${emptyResults.length}`);

  const success =
    categories.length === 10 &&
    providers.length === 32 &&
    searchResults.some((p) => p.slug === "paystack") &&
    paymentsFiltered.length > 0 &&
    combined.length > 0 &&
    emptyResults.length === 0;

  if (!success) {
    throw new Error("Phase 6 verification failed.");
  }

  console.log("Phase 6 verification passed.");
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
