import { eq, sql } from "drizzle-orm";

import { closeDb, getDb } from "../client";
import {
  categories,
  countries,
  features,
  products,
  providerCategories,
  providerCountries,
  providerFeatures,
  providerProducts,
  providerSdkLanguages,
  providers,
  sdkLanguages,
} from "../schema";
import { CANONICAL_CATEGORIES } from "./categories";
import {
  getProviderInformationPath,
  parseProviderInformation,
  type ParsedProviderRecord,
  type ParsedSeedDataset,
} from "./parse-provider-information";
import { slugify } from "./slug";
import { formatValidationReport, validateSeedDataset } from "./validate";

type DbClient = ReturnType<typeof getDb>;
type TransactionClient = Parameters<Parameters<DbClient["transaction"]>[0]>[0];
type DbExecutor = DbClient | TransactionClient;

type ReferenceMaps = {
  categoryByName: Map<string, string>;
  productByName: Map<string, string>;
  featureByName: Map<string, string>;
  countryByName: Map<string, string>;
  sdkLanguageByName: Map<string, string>;
};

async function upsertReferenceTables(
  db: DbExecutor,
  dataset: ParsedSeedDataset,
): Promise<ReferenceMaps> {
  const categoryRows = await db
    .insert(categories)
    .values(
      CANONICAL_CATEGORIES.map((category) => ({
        name: category.name,
        slug: category.slug,
        description: category.description,
      })),
    )
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
      },
    })
    .returning({ id: categories.id, name: categories.name });

  const productRows = await db
    .insert(products)
    .values(
      dataset.uniqueProducts.map((name) => ({
        name,
        slug: slugify(name),
      })),
    )
    .onConflictDoUpdate({
      target: products.name,
      set: {
        slug: sql`excluded.slug`,
      },
    })
    .returning({ id: products.id, name: products.name });

  const featureRows = await db
    .insert(features)
    .values(
      dataset.uniqueFeatures.map((name) => ({
        name,
        slug: slugify(name),
      })),
    )
    .onConflictDoUpdate({
      target: features.name,
      set: {
        slug: sql`excluded.slug`,
      },
    })
    .returning({ id: features.id, name: features.name });

  const countryRows = await db
    .insert(countries)
    .values(
      dataset.uniqueCountries.map((name) => ({
        name,
        code: null,
      })),
    )
    .onConflictDoUpdate({
      target: countries.name,
      set: {
        name: sql`excluded.name`,
      },
    })
    .returning({ id: countries.id, name: countries.name });

  const sdkRows = await db
    .insert(sdkLanguages)
    .values(
      dataset.uniqueSdkLanguages.map((name) => ({
        name,
        slug: slugify(name),
      })),
    )
    .onConflictDoUpdate({
      target: sdkLanguages.name,
      set: {
        slug: sql`excluded.slug`,
      },
    })
    .returning({ id: sdkLanguages.id, name: sdkLanguages.name });

  return {
    categoryByName: new Map(categoryRows.map((row) => [row.name, row.id])),
    productByName: new Map(productRows.map((row) => [row.name, row.id])),
    featureByName: new Map(featureRows.map((row) => [row.name, row.id])),
    countryByName: new Map(countryRows.map((row) => [row.name, row.id])),
    sdkLanguageByName: new Map(sdkRows.map((row) => [row.name, row.id])),
  };
}

async function upsertProvider(
  db: DbExecutor,
  record: ParsedProviderRecord,
): Promise<string> {
  const [provider] = await db
    .insert(providers)
    .values({
      name: record.name,
      slug: record.slug,
      description: record.description,
      websiteUrl: record.websiteUrl,
      documentationUrl: record.documentationUrl,
      apiStyle: record.apiStyle,
      authentication: record.authentication,
      sandboxAvailable: record.sandboxAvailable,
      webhooksAvailable: record.webhooksAvailable,
      pricingModel: record.pricingModel,
      freeTier: record.freeTier,
      coverageSummary: record.coverageSummary,
      lastVerified: record.lastVerified,
      source: record.source,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: providers.slug,
      set: {
        name: record.name,
        description: record.description,
        websiteUrl: record.websiteUrl,
        documentationUrl: record.documentationUrl,
        apiStyle: record.apiStyle,
        authentication: record.authentication,
        sandboxAvailable: record.sandboxAvailable,
        webhooksAvailable: record.webhooksAvailable,
        pricingModel: record.pricingModel,
        freeTier: record.freeTier,
        coverageSummary: record.coverageSummary,
        lastVerified: record.lastVerified,
        source: record.source,
        updatedAt: new Date(),
      },
    })
    .returning({ id: providers.id });

  return provider.id;
}

async function syncProviderRelationships(
  db: DbExecutor,
  providerId: string,
  record: ParsedProviderRecord,
  maps: ReferenceMaps,
): Promise<void> {
  await db.delete(providerCategories).where(eq(providerCategories.providerId, providerId));
  await db.delete(providerProducts).where(eq(providerProducts.providerId, providerId));
  await db.delete(providerFeatures).where(eq(providerFeatures.providerId, providerId));
  await db.delete(providerCountries).where(eq(providerCountries.providerId, providerId));
  await db.delete(providerSdkLanguages).where(eq(providerSdkLanguages.providerId, providerId));

  if (record.categories.length > 0) {
    await db.insert(providerCategories).values(
      record.categories.map((name) => ({
        providerId,
        categoryId: maps.categoryByName.get(name)!,
      })),
    );
  }

  if (record.products.length > 0) {
    await db.insert(providerProducts).values(
      record.products.map((name) => ({
        providerId,
        productId: maps.productByName.get(name)!,
      })),
    );
  }

  if (record.features.length > 0) {
    await db.insert(providerFeatures).values(
      record.features.map((name) => ({
        providerId,
        featureId: maps.featureByName.get(name)!,
      })),
    );
  }

  if (record.countries.length > 0) {
    await db.insert(providerCountries).values(
      record.countries.map((name) => ({
        providerId,
        countryId: maps.countryByName.get(name)!,
      })),
    );
  }

  if (record.sdkLanguages.length > 0) {
    await db.insert(providerSdkLanguages).values(
      record.sdkLanguages.map((name) => ({
        providerId,
        sdkLanguageId: maps.sdkLanguageByName.get(name)!,
      })),
    );
  }
}

export async function seedDatabase(): Promise<void> {
  const sourcePath = getProviderInformationPath();
  const dataset = parseProviderInformation(sourcePath);
  const report = validateSeedDataset(dataset, sourcePath);

  if (!report.passed) {
    throw new Error("Seed aborted because pre-seed validation failed.");
  }

  const db = getDb();

  await db.transaction(async (tx) => {
    const maps = await upsertReferenceTables(tx, dataset);

    for (const providerRecord of dataset.providers) {
      const providerId = await upsertProvider(tx, providerRecord);
      await syncProviderRelationships(tx, providerId, providerRecord, maps);
    }
  });
}

export async function runSeedWithValidationReport(): Promise<{
  report: ReturnType<typeof validateSeedDataset>;
  seeded: boolean;
}> {
  const sourcePath = getProviderInformationPath();
  const dataset = parseProviderInformation(sourcePath);
  const report = validateSeedDataset(dataset, sourcePath);

  console.log(formatValidationReport(report));

  if (!report.passed) {
    return { report, seeded: false };
  }

  await seedDatabase();
  return { report, seeded: true };
}

export async function closeSeedConnection(): Promise<void> {
  await closeDb();
}
