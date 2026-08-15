import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });

type CheckResult = {
  name: string;
  passed: boolean;
  detail?: string;
  severity?: "error" | "warn";
};

const checks: CheckResult[] = [];

function record(
  name: string,
  passed: boolean,
  detail?: string,
  severity: "error" | "warn" = "error",
) {
  checks.push({ name, passed, detail, severity });
  const status = passed ? "PASS" : severity === "warn" ? "WARN" : "FAIL";
  console.log(`[${status}] ${name}${detail ? ` — ${detail}` : ""}`);
}

function assertFileExists(relativePath: string, label: string) {
  const absolutePath = resolve(process.cwd(), relativePath);
  record(label, existsSync(absolutePath), relativePath);
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
  console.log("Phase 12 production readiness verification\n");

  record("DATABASE_URL configured", Boolean(process.env.DATABASE_URL?.trim()));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  record(
    "NEXT_PUBLIC_SITE_URL configured",
    siteUrl.length > 0,
    siteUrl || "not set (defaults to http://localhost:3000)",
    siteUrl.length > 0 ? "error" : "warn",
  );

  if (siteUrl.includes("localhost")) {
    record(
      "NEXT_PUBLIC_SITE_URL is not localhost",
      false,
      "Use your preview/production domain before public deployment",
      "warn",
    );
  }

  assertFileExists("drizzle/0000_famous_mystique.sql", "migration file exists");
  assertFileExists("drizzle/meta/_journal.json", "migration journal exists");
  assertFileExists(".env.example", "environment template exists");
  assertFileExists("next.config.ts", "Next.js config exists");

  const mvpRoutes = [
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/categories/page.tsx",
    "src/app/categories/[category]/page.tsx",
    "src/app/providers/page.tsx",
    "src/app/providers/[provider]/page.tsx",
    "src/app/compare/page.tsx",
    "src/app/error.tsx",
    "src/app/not-found.tsx",
    "src/app/sitemap.ts",
    "src/app/robots.ts",
  ];

  for (const routeFile of mvpRoutes) {
    assertFileExists(routeFile, `route artifact: ${routeFile}`);
  }

  const { runPreSeedValidation } = await import("../src/db/seed/validate");
  const seedReport = runPreSeedValidation();
  record("seed dataset validation", seedReport.passed, `${seedReport.counts.length} count checks`);

  const {
    discoverProviders,
    getProviderBySlug,
    listCategories,
    listCategoriesWithProviderCounts,
    listProviders,
    resolveComparison,
  } = await import("../src/db/queries");
  const { appRoutes } = await import("../src/lib/routes");
  const { getSiteUrl } = await import("../src/lib/env");
  const { CANONICAL_CATEGORIES } = await import("../src/db/seed/categories");
  const sitemap = (await import("../src/app/sitemap")).default;
  const robots = (await import("../src/app/robots")).default;

  const [providers, categories, categoriesWithCounts, sitemapEntries, robotsConfig] =
    await Promise.all([
      listProviders(),
      listCategories(),
      listCategoriesWithProviderCounts(),
      sitemap(),
      Promise.resolve(robots()),
    ]);

  record("database reachable", true, `${providers.length} providers loaded`);
  record("provider count in database", providers.length === 32, `${providers.length}/32`);
  record("category count in database", categories.length === 10, `${categories.length}/10`);

  for (const canonical of CANONICAL_CATEGORIES) {
    const match = categories.find((category) => category.slug === canonical.slug);
    record(
      `category seeded: ${canonical.slug}`,
      match != null && match.name === canonical.name,
    );
  }

  let invalidOfficialLinkCount = 0;

  for (const provider of providers) {
    const detail = await getProviderBySlug(provider.slug);

    if (
      !detail ||
      !isHttpUrl(detail.websiteUrl) ||
      !isHttpUrl(detail.documentationUrl)
    ) {
      invalidOfficialLinkCount += 1;
    }
  }

  record(
    "official links for all providers",
    invalidOfficialLinkCount === 0,
    invalidOfficialLinkCount > 0
      ? `${invalidOfficialLinkCount} providers with invalid links`
      : `${providers.length} providers checked`,
  );

  const paystack = await getProviderBySlug("paystack");
  const comparison = await resolveComparison({
    providerASlug: "paystack",
    providerBSlug: "monnify",
    categorySlug: "payments",
  });

  record("representative provider detail", paystack != null, paystack?.name);
  record("shareable comparison URL resolves", comparison.status === "ready");
  record(
    "comparison share URL format",
    appRoutes.compareWithProviders({
      a: "paystack",
      b: "monnify",
      category: "payments",
    }) === "/compare?a=paystack&b=monnify&category=payments",
  );

  const searchResults = await discoverProviders({ query: "payment" });
  record("provider search works", searchResults.length > 0, `${searchResults.length} results`);

  const categoryProviders = await discoverProviders({ categorySlug: "payments" });
  record(
    "category filtering works",
    categoryProviders.length > 0,
    `${categoryProviders.length} payment providers`,
  );

  const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));
  record(
    "sitemap includes providers and categories",
    sitemapEntries.length >= 4 + providers.length + categories.length,
    `${sitemapEntries.length} entries`,
  );
  const siteUrlBase = getSiteUrl().replace(/\/$/, "");
  record(
    "sitemap includes homepage",
    sitemapUrls.has(`${siteUrlBase}${appRoutes.home}`) ||
      sitemapUrls.has(`${siteUrlBase}/`),
  );
  const robotsSitemap = Array.isArray(robotsConfig.sitemap)
    ? robotsConfig.sitemap.join(", ")
    : robotsConfig.sitemap;
  record(
    "robots references sitemap",
    Boolean(robotsSitemap?.includes("/sitemap.xml")),
    robotsSitemap,
  );

  const totalCategoryAssignments = categoriesWithCounts.reduce(
    (sum, category) => sum + category.providerCount,
    0,
  );
  record(
    "category provider counts populated",
    totalCategoryAssignments >= categories.length,
    `${totalCategoryAssignments} assignments`,
  );

  if (existsSync(resolve(process.cwd(), ".next/BUILD_ID"))) {
    record("production build artifact present", true, ".next/BUILD_ID");
  } else {
    record(
      "production build artifact present",
      false,
      "Run npm run build before deploying",
      "warn",
    );
  }

  const blockingFailures = checks.filter((check) => !check.passed && check.severity !== "warn");
  const warnings = checks.filter((check) => !check.passed && check.severity === "warn");

  console.log("\n--- Deployment checklist (manual) ---");
  console.log("1. Confirm production/preview PostgreSQL database.");
  console.log("2. Set DATABASE_URL and NEXT_PUBLIC_SITE_URL in the deployment environment.");
  console.log("3. Run migrations: npm run db:migrate");
  console.log("4. Seed or verify data: npm run db:validate-seed && npm run db:seed");
  console.log("5. Deploy preview first and review all MVP routes.");
  console.log("6. Verify responsive layout on mobile and desktop.");
  console.log("7. Promote preview to production after acceptance.");

  if (warnings.length > 0) {
    console.log(`\nWarnings: ${warnings.length}`);
  }

  if (blockingFailures.length > 0) {
    throw new Error(
      `Phase 12 production verification failed (${blockingFailures.length} blocking checks).`,
    );
  }

  console.log(`\nPhase 12 production verification passed (${checks.length} checks).`);
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
