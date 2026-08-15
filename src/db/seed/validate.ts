import { CANONICAL_CATEGORIES } from "./categories";
import { EXPECTED_COUNTS } from "./expected-counts";
import {
  getProviderInformationPath,
  parseProviderInformation,
  type ParsedSeedDataset,
} from "./parse-provider-information";

export type CountComparison = {
  entity: string;
  expected: number;
  actual: number;
  matches: boolean;
};

export type ValidationReport = {
  sourcePath: string;
  passed: boolean;
  counts: CountComparison[];
  providersWithMissingFields: Array<{ provider: string; fields: string[] }>;
  duplicateSlugs: string[];
  duplicateNames: string[];
  coverageSummaryProviders: string[];
  woodcoreSandbox: boolean | null;
  messages: string[];
};

function compareCounts(dataset: ParsedSeedDataset): CountComparison[] {
  const actual = {
    providers: dataset.providers.length,
    categories: CANONICAL_CATEGORIES.length,
    products: dataset.uniqueProducts.length,
    features: dataset.uniqueFeatures.length,
    countries: dataset.uniqueCountries.length,
    sdkLanguages: dataset.uniqueSdkLanguages.length,
    providerCategories: dataset.joinCounts.providerCategories,
    providerProducts: dataset.joinCounts.providerProducts,
    providerFeatures: dataset.joinCounts.providerFeatures,
    providerCountries: dataset.joinCounts.providerCountries,
    providerSdkLanguages: dataset.joinCounts.providerSdkLanguages,
  };

  return (Object.keys(EXPECTED_COUNTS) as Array<keyof typeof EXPECTED_COUNTS>).map(
    (entity) => ({
      entity,
      expected: EXPECTED_COUNTS[entity],
      actual: actual[entity],
      matches: actual[entity] === EXPECTED_COUNTS[entity],
    }),
  );
}

function findMissingFields(dataset: ParsedSeedDataset) {
  return dataset.providers
    .map((provider) => {
      const fields: string[] = [];

      if (!provider.apiStyle) fields.push("apiStyle");
      if (!provider.authentication) fields.push("authentication");
      if (provider.sandboxAvailable === null) fields.push("sandboxAvailable");
      if (provider.webhooksAvailable === null) fields.push("webhooksAvailable");
      if (!provider.pricingModel) fields.push("pricingModel");
      if (!provider.freeTier) fields.push("freeTier");
      if (!provider.lastVerified) fields.push("lastVerified");
      if (!provider.source) fields.push("source");
      if (provider.sdkLanguages.length === 0) fields.push("sdkLanguages");

      return { provider: provider.name, fields };
    })
    .filter((entry) => entry.fields.length > 0);
}

export function validateSeedDataset(
  dataset: ParsedSeedDataset,
  sourcePath: string,
): ValidationReport {
  const counts = compareCounts(dataset);
  const providersWithMissingFields = findMissingFields(dataset);

  const slugCounts = new Map<string, number>();
  const nameCounts = new Map<string, number>();

  for (const provider of dataset.providers) {
    slugCounts.set(provider.slug, (slugCounts.get(provider.slug) ?? 0) + 1);
    nameCounts.set(provider.name, (nameCounts.get(provider.name) ?? 0) + 1);
  }

  const duplicateSlugs = [...slugCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([slug]) => slug);
  const duplicateNames = [...nameCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name);

  const coverageSummaryProviders = dataset.providers
    .filter((provider) => provider.coverageSummary)
    .map((provider) => `${provider.name}=${provider.coverageSummary}`);

  const woodcore = dataset.providers.find((provider) => provider.name === "Woodcore");

  const messages: string[] = [];
  const failedCounts = counts.filter((count) => !count.matches);

  if (failedCounts.length > 0) {
    messages.push("Count validation failed.");
  }

  if (duplicateSlugs.length > 0) {
    messages.push("Duplicate provider slugs detected.");
  }

  if (duplicateNames.length > 0) {
    messages.push("Duplicate provider names detected.");
  }

  if (woodcore?.sandboxAvailable !== true) {
    messages.push("Woodcore sandboxAvailable must be TRUE.");
  }

  const bachs = dataset.providers.find((provider) => provider.name === "Bachs");
  if (bachs?.coverageSummary !== "150+ countries" || bachs.countries.length > 0) {
    messages.push("Bachs coverage handling is invalid.");
  }

  const passed =
    failedCounts.length === 0 &&
    duplicateSlugs.length === 0 &&
    duplicateNames.length === 0 &&
    woodcore?.sandboxAvailable === true &&
    bachs?.coverageSummary === "150+ countries" &&
    bachs?.countries.length === 0;

  return {
    sourcePath,
    passed,
    counts,
    providersWithMissingFields,
    duplicateSlugs,
    duplicateNames,
    coverageSummaryProviders,
    woodcoreSandbox: woodcore?.sandboxAvailable ?? null,
    messages,
  };
}

export function formatValidationReport(report: ValidationReport): string {
  const lines: string[] = [
    "Apineer pre-seed validation",
    `Source: ${report.sourcePath}`,
    "",
    "Count comparison:",
  ];

  for (const count of report.counts) {
    lines.push(
      `- ${count.entity}: expected ${count.expected}, actual ${count.actual}${count.matches ? "" : "  MISMATCH"}`,
    );
  }

  lines.push("");
  lines.push(`Woodcore sandboxAvailable: ${String(report.woodcoreSandbox)}`);
  lines.push("Coverage summary providers:");
  for (const entry of report.coverageSummaryProviders) {
    lines.push(`- ${entry}`);
  }

  lines.push("");
  lines.push(`Providers with missing/null scalar or SDK list: ${report.providersWithMissingFields.length}`);
  for (const entry of report.providersWithMissingFields) {
    lines.push(`- ${entry.provider}: ${entry.fields.join(", ")}`);
  }

  if (report.duplicateSlugs.length > 0) {
    lines.push("");
    lines.push(`Duplicate slugs: ${report.duplicateSlugs.join(", ")}`);
  }

  if (report.duplicateNames.length > 0) {
    lines.push(`Duplicate names: ${report.duplicateNames.join(", ")}`);
  }

  lines.push("");
  lines.push(`Validation result: ${report.passed ? "PASSED" : "FAILED"}`);

  if (report.messages.length > 0) {
    lines.push("");
    lines.push("Messages:");
    for (const message of report.messages) {
      lines.push(`- ${message}`);
    }
  }

  return lines.join("\n");
}

export function runPreSeedValidation(): ValidationReport {
  const sourcePath = getProviderInformationPath();
  const dataset = parseProviderInformation(sourcePath);
  return validateSeedDataset(dataset, sourcePath);
}
