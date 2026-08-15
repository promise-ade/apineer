import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { closeSeedConnection, runSeedWithValidationReport } = await import("./seed");
  const result = await runSeedWithValidationReport();

  if (!result.report.passed) {
    process.exitCode = 1;
    return;
  }

  if (result.seeded) {
    console.log("");
    console.log("Seed completed successfully.");
  }

  await closeSeedConnection();
}

main().catch((error: unknown) => {
  console.error("Seed failed.");
  console.error(error);
  process.exitCode = 1;
});
