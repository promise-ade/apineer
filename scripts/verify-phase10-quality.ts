import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });

const requiredAnalyticsEvents = [
  "provider_view",
  "provider_search",
  "category_view",
  "comparison_started",
  "provider_removed_from_comparison",
  "documentation_click",
  "website_click",
] as const;

function assertFileContains(relativePath: string, needle: string, label: string) {
  const absolutePath = resolve(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing file: ${relativePath}`);
  }

  const contents = readFileSync(absolutePath, "utf8");
  if (!contents.includes(needle)) {
    throw new Error(`${label}: expected "${needle}" in ${relativePath}`);
  }
}

async function main() {
  const { analyticsEvents, createAnalyticsEvent } = await import("../src/lib/analytics");
  const { getSiteUrl } = await import("../src/lib/env");

  const eventValues = Object.values(analyticsEvents);
  for (const eventName of requiredAnalyticsEvents) {
    if (!eventValues.includes(eventName)) {
      throw new Error(`Missing analytics event: ${eventName}`);
    }
  }

  const sampleEvent = createAnalyticsEvent("provider_view", { providerSlug: "paystack" });
  if (sampleEvent.name !== "provider_view" || sampleEvent.properties.providerSlug !== "paystack") {
    throw new Error("createAnalyticsEvent did not return the expected payload.");
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl.startsWith("http")) {
    throw new Error(`getSiteUrl() must return an absolute URL, received: ${siteUrl}`);
  }

  assertFileContains("src/app/error.tsx", "ErrorState", "error page");
  assertFileContains("src/app/global-error.tsx", "ErrorState", "global error page");
  assertFileContains("src/app/not-found.tsx", "Page not found", "not-found page");
  assertFileContains("src/components/app-shell.tsx", "Skip to main content", "skip link");
  assertFileContains("src/components/comparison-table.tsx", 'scope="col"', "comparison table headers");
  assertFileContains("src/components/analytics/page-view-tracker.tsx", "ProviderViewTracker", "provider tracker");
  assertFileContains("src/components/analytics/page-view-tracker.tsx", "CategoryViewTracker", "category tracker");
  assertFileContains("src/components/analytics/page-view-tracker.tsx", "ComparisonStartedTracker", "comparison tracker");
  assertFileContains("src/app/providers/[provider]/page.tsx", "ProviderViewTracker", "provider page tracker wiring");
  assertFileContains("src/app/categories/[category]/page.tsx", "CategoryViewTracker", "category page tracker wiring");
  assertFileContains("src/app/compare/page.tsx", "ComparisonStartedTracker", "compare page tracker wiring");

  const { listCategories, listProviders } = await import("../src/db/queries");
  const sitemap = (await import("../src/app/sitemap")).default;
  const robots = (await import("../src/app/robots")).default;

  const [providers, categories, sitemapEntries, robotsConfig] = await Promise.all([
    listProviders(),
    listCategories(),
    sitemap(),
    Promise.resolve(robots()),
  ]);

  if (providers.length !== 32) {
    throw new Error(`Expected 32 providers for sitemap verification, found ${providers.length}.`);
  }

  if (categories.length !== 10) {
    throw new Error(`Expected 10 categories for sitemap verification, found ${categories.length}.`);
  }

  const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));
  const expectedMinimum = 4 + providers.length + categories.length;

  if (sitemapEntries.length < expectedMinimum) {
    throw new Error(
      `Sitemap too small: ${sitemapEntries.length} entries (expected at least ${expectedMinimum}).`,
    );
  }

  if (!sitemapUrls.has(`${siteUrl}/providers/paystack`)) {
    throw new Error("Sitemap missing a known provider route.");
  }

  if (!robotsConfig.sitemap?.includes("/sitemap.xml")) {
    throw new Error("robots.txt does not reference sitemap.xml.");
  }

  console.log(`analytics events: ${requiredAnalyticsEvents.length}`);
  console.log(`sitemap entries: ${sitemapEntries.length}`);
  console.log(`robots sitemap: ${robotsConfig.sitemap}`);
  console.log("Phase 10 verification passed.");
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
