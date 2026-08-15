import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { formatBooleanAvailability, formatTextValue } = await import("../src/lib/display");
  const { buildComparisonRows } = await import("../src/lib/comparison-presentation");
  const { getProviderBySlug, getSharedCategories, resolveComparison } = await import(
    "../src/db/queries"
  );

  const paystack = await getProviderBySlug("paystack");
  const flutterwave = await getProviderBySlug("flutterwave");
  const bachs = await getProviderBySlug("bachs");
  const zest = await getProviderBySlug("zest-payments");

  if (!paystack || !flutterwave || !bachs || !zest) {
    throw new Error("Expected providers were not found.");
  }

  const shared = getSharedCategories(paystack, flutterwave);
  const readyComparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "monnify",
    categorySlug: "payments",
  });
  const sameProvider = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "paystack",
    categorySlug: "payments",
  });
  const invalidCategory = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "flutterwave",
    categorySlug: "open-banking",
  });
  const autoCategory = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "monnify",
  });

  console.log(`shared(paystack, flutterwave): ${shared.map((c) => c.slug).join(", ")}`);
  console.log(`ready comparison status: ${readyComparison.status}`);
  console.log(`same provider status: ${sameProvider.status}`);
  console.log(`invalid category status: ${invalidCategory.status}`);
  console.log(`auto category status: ${autoCategory.status}`);

  if (readyComparison.providerA && readyComparison.providerB) {
    const rows = buildComparisonRows(readyComparison.providerA, readyComparison.providerB);
    console.log(`comparison rows: ${rows.length}`);
  }

  const bachsCoverageRow = buildComparisonRows(bachs, zest).find((row) => row.attribute === "Coverage");
  console.log(`bachs coverage: ${bachsCoverageRow?.providerA}`);
  console.log(`zest sandbox: ${formatBooleanAvailability(zest.sandboxAvailable)}`);
  console.log(`zest api style: ${formatTextValue(zest.apiStyle)}`);

  const success =
    shared.length > 0 &&
    readyComparison.status === "ready" &&
    sameProvider.status === "invalid" &&
    invalidCategory.status === "invalid" &&
    autoCategory.status === "needs-category" &&
    bachsCoverageRow?.providerA === "150+ countries";

  if (!success) {
    throw new Error("Phase 9 verification failed.");
  }

  console.log("Phase 9 verification passed.");
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
