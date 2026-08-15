import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { formatBooleanAvailability, formatTextValue } = await import("../src/lib/display");
  const { getProviderBySlug } = await import("../src/db/queries");

  const paystack = await getProviderBySlug("paystack");
  const woodcore = await getProviderBySlug("woodcore");
  const bachs = await getProviderBySlug("bachs");
  const zest = await getProviderBySlug("zest-payments");
  const invalid = await getProviderBySlug("not-a-real-provider");

  if (!paystack || !woodcore || !bachs || !zest) {
    throw new Error("Expected providers were not found.");
  }

  console.log("Paystack:");
  console.log(`- name: ${paystack.name}`);
  console.log(`- categories: ${paystack.categories.map((c) => c.slug).join(", ")}`);
  console.log(`- website: ${paystack.websiteUrl}`);
  console.log(`- documentation: ${paystack.documentationUrl}`);

  console.log("Woodcore:");
  console.log(`- sandbox: ${formatBooleanAvailability(woodcore.sandboxAvailable)}`);

  console.log("Bachs:");
  console.log(`- coverageSummary: ${bachs.coverageSummary}`);
  console.log(`- countries: ${bachs.countries.length}`);

  console.log("Zest Payments missing fields:");
  console.log(`- apiStyle: ${formatTextValue(zest.apiStyle)}`);
  console.log(`- sandbox: ${formatBooleanAvailability(zest.sandboxAvailable)}`);
  console.log(`- webhooks: ${formatBooleanAvailability(zest.webhooksAvailable)}`);

  console.log(`Invalid provider: ${invalid ?? "null"}`);

  const success =
    paystack.slug === "paystack" &&
    paystack.categories.length > 0 &&
    woodcore.sandboxAvailable === true &&
    bachs.coverageSummary === "150+ countries" &&
    bachs.countries.length === 0 &&
    formatTextValue(zest.apiStyle) === "Not available" &&
    formatBooleanAvailability(zest.sandboxAvailable) === "Information not available" &&
    invalid == null;

  if (!success) {
    throw new Error("Phase 8 verification failed.");
  }

  console.log("Phase 8 verification passed.");
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
