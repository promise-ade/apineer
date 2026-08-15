import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { CATEGORY_NAME_SET } from "./categories";
import { slugify } from "./slug";

export type ParsedProviderRecord = {
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  documentationUrl: string;
  apiStyle: string | null;
  authentication: string | null;
  sandboxAvailable: boolean | null;
  webhooksAvailable: boolean | null;
  pricingModel: string | null;
  freeTier: string | null;
  coverageSummary: string | null;
  lastVerified: string | null;
  source: string | null;
  categories: string[];
  products: string[];
  features: string[];
  countries: string[];
  sdkLanguages: string[];
};

export type ParsedSeedDataset = {
  providers: ParsedProviderRecord[];
  uniqueCategories: string[];
  uniqueProducts: string[];
  uniqueFeatures: string[];
  uniqueCountries: string[];
  uniqueSdkLanguages: string[];
  joinCounts: {
    providerCategories: number;
    providerProducts: number;
    providerFeatures: number;
    providerCountries: number;
    providerSdkLanguages: number;
  };
};

const PROVIDER_INFORMATION_PATH = resolve(
  process.cwd(),
  "docs/Provider Information.md",
);

const BACHS_COVERAGE_SUMMARY = "150+ countries";

function cleanCell(value: string): string {
  return value.replace(/\s*\|\s*$/g, "").trim();
}

function isMissing(value: string): boolean {
  const trimmed = cleanCell(value);
  return trimmed === "-" || trimmed === "\\-" || trimmed === "";
}

function parseMarkdownUrl(value: string): string {
  const cleaned = cleanCell(value);
  const match = cleaned.match(/\((https?:\/\/[^)]+)\)/);
  return match ? match[1] : cleaned;
}

function splitCommaSeparated(value: string): string[] {
  if (isMissing(value)) {
    return [];
  }

  return value
    .split(",")
    .map((item) => cleanCell(item))
    .filter(Boolean);
}

function parseSandbox(value: string, providerName: string): boolean | null {
  if (providerName === "Woodcore") {
    return true;
  }

  const cleaned = cleanCell(value).replace(/^\\-/, "-");

  if (isMissing(cleaned)) {
    return null;
  }

  if (/^yes$/i.test(cleaned)) {
    return true;
  }

  if (/^no$/i.test(cleaned)) {
    return false;
  }

  return null;
}

function parseOptionalText(value: string): string | null {
  if (isMissing(value)) {
    return null;
  }

  return cleanCell(value);
}

function parseAvailability(value: string): boolean | null {
  const cleaned = cleanCell(value);

  if (isMissing(cleaned)) {
    return null;
  }

  if (/^yes$/i.test(cleaned)) {
    return true;
  }

  if (/^no$/i.test(cleaned)) {
    return false;
  }

  return null;
}

function parseLastVerified(value: string): string | null {
  const cleaned = parseOptionalText(value);
  if (!cleaned) {
    return null;
  }

  const match = cleaned.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    return null;
  }

  const monthName = match[1].toLowerCase();
  const year = match[2];
  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const month = monthMap[monthName];
  if (!month) {
    return null;
  }

  return `${year}-${month}-01`;
}

function parseCountries(
  value: string,
  providerName: string,
): { countries: string[]; coverageSummary: string | null } {
  if (providerName === "Bachs") {
    return {
      countries: [],
      coverageSummary: BACHS_COVERAGE_SUMMARY,
    };
  }

  if (isMissing(value)) {
    return { countries: [], coverageSummary: null };
  }

  const countries = splitCommaSeparated(value).map((country) =>
    country.replace(/\s+and others$/i, "").trim(),
  );

  return {
    countries: countries.filter(Boolean),
    coverageSummary: null,
  };
}

function getFieldValue(block: string, fieldLabel: string): string {
  const pattern = new RegExp(`\\*\\*${fieldLabel}\\*\\* \\| ([^\\n]+)`, "i");
  const match = block.match(pattern);
  return match ? match[1] : "";
}

export function parseProviderInformation(
  filePath: string = PROVIDER_INFORMATION_PATH,
): ParsedSeedDataset {
  const content = readFileSync(filePath, "utf8");
  const blocks = content.split(/^### \*\*/m).slice(1);

  const providers: ParsedProviderRecord[] = [];
  const categorySet = new Set<string>();
  const productSet = new Set<string>();
  const featureSet = new Set<string>();
  const countrySet = new Set<string>();
  const sdkSet = new Set<string>();

  let joinProviderCategories = 0;
  let joinProviderProducts = 0;
  let joinProviderFeatures = 0;
  let joinProviderCountries = 0;
  let joinProviderSdkLanguages = 0;

  for (const block of blocks) {
    const headingName = cleanCell(block.split("\n", 1)[0]?.replace(/\*\*/g, "") ?? "");
    const name = cleanCell(getFieldValue(block, "Provider Name") || headingName);
    const { countries, coverageSummary } = parseCountries(
      getFieldValue(block, "Countries Supported"),
      name,
    );
    const categories = splitCommaSeparated(getFieldValue(block, "API Categories"));
    const products = splitCommaSeparated(getFieldValue(block, "Core Products"));
    const features = splitCommaSeparated(getFieldValue(block, "Features"));
    const sdkLanguages = splitCommaSeparated(getFieldValue(block, "SDK Languages"));

    for (const category of categories) {
      if (!CATEGORY_NAME_SET.has(category)) {
        throw new Error(`Unknown category "${category}" for provider "${name}".`);
      }
      categorySet.add(category);
      joinProviderCategories += 1;
    }

    for (const product of products) {
      productSet.add(product);
      joinProviderProducts += 1;
    }

    for (const feature of features) {
      featureSet.add(feature);
      joinProviderFeatures += 1;
    }

    for (const country of countries) {
      countrySet.add(country);
      joinProviderCountries += 1;
    }

    for (const sdkLanguage of sdkLanguages) {
      sdkSet.add(sdkLanguage);
      joinProviderSdkLanguages += 1;
    }

    providers.push({
      name,
      slug: slugify(name),
      description: cleanCell(getFieldValue(block, "Description")),
      websiteUrl: parseMarkdownUrl(getFieldValue(block, "Website")),
      documentationUrl: parseMarkdownUrl(getFieldValue(block, "Documentation URL")),
      apiStyle: parseOptionalText(getFieldValue(block, "API Style")),
      authentication: parseOptionalText(getFieldValue(block, "Authentication")),
      sandboxAvailable: parseSandbox(getFieldValue(block, "Sandbox"), name),
      webhooksAvailable: parseAvailability(getFieldValue(block, "Webhooks")),
      pricingModel: parseOptionalText(getFieldValue(block, "Pricing Model")),
      freeTier: parseOptionalText(getFieldValue(block, "Free Tier")),
      coverageSummary,
      lastVerified: parseLastVerified(getFieldValue(block, "Last Verified")),
      source: parseOptionalText(getFieldValue(block, "Source")),
      categories,
      products,
      features,
      countries,
      sdkLanguages,
    });
  }

  return {
    providers,
    uniqueCategories: [...categorySet].sort(),
    uniqueProducts: [...productSet].sort(),
    uniqueFeatures: [...featureSet].sort(),
    uniqueCountries: [...countrySet].sort(),
    uniqueSdkLanguages: [...sdkSet].sort(),
    joinCounts: {
      providerCategories: joinProviderCategories,
      providerProducts: joinProviderProducts,
      providerFeatures: joinProviderFeatures,
      providerCountries: joinProviderCountries,
      providerSdkLanguages: joinProviderSdkLanguages,
    },
  };
}

export function getProviderInformationPath(): string {
  return PROVIDER_INFORMATION_PATH;
}
