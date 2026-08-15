import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const providers = pgTable(
  "providers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description").notNull(),
    websiteUrl: text("website_url").notNull(),
    apiStyle: varchar("api_style", { length: 100 }),
    authentication: varchar("authentication", { length: 100 }),
    sandboxAvailable: boolean("sandbox_available"),
    webhooksAvailable: boolean("webhooks_available"),
    pricingModel: varchar("pricing_model", { length: 100 }),
    freeTier: varchar("free_tier", { length: 100 }),
    documentationUrl: text("documentation_url").notNull(),
    coverageSummary: text("coverage_summary"),
    lastVerified: date("last_verified"),
    source: varchar("source", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("providers_name_unique").on(table.name),
    uniqueIndex("providers_slug_unique").on(table.slug),
    index("providers_name_idx").on(table.name),
    index("providers_last_verified_idx").on(table.lastVerified),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
  },
  (table) => [
    uniqueIndex("categories_name_unique").on(table.name),
    uniqueIndex("categories_slug_unique").on(table.slug),
  ],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [
    uniqueIndex("products_name_unique").on(table.name),
    uniqueIndex("products_slug_unique").on(table.slug),
  ],
);

export const features = pgTable(
  "features",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [
    uniqueIndex("features_name_unique").on(table.name),
    uniqueIndex("features_slug_unique").on(table.slug),
  ],
);

export const countries = pgTable(
  "countries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 2 }),
  },
  (table) => [uniqueIndex("countries_name_unique").on(table.name)],
);

export const sdkLanguages = pgTable(
  "sdk_languages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [
    uniqueIndex("sdk_languages_name_unique").on(table.name),
    uniqueIndex("sdk_languages_slug_unique").on(table.slug),
  ],
);

export const providerCategories = pgTable(
  "provider_categories",
  {
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
  },
  (table) => [
    primaryKey({ columns: [table.providerId, table.categoryId] }),
    index("provider_categories_category_id_idx").on(table.categoryId),
  ],
);

export const providerProducts = pgTable(
  "provider_products",
  {
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
  },
  (table) => [
    primaryKey({ columns: [table.providerId, table.productId] }),
    index("provider_products_product_id_idx").on(table.productId),
  ],
);

export const providerFeatures = pgTable(
  "provider_features",
  {
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    featureId: uuid("feature_id")
      .notNull()
      .references(() => features.id, { onDelete: "restrict" }),
  },
  (table) => [
    primaryKey({ columns: [table.providerId, table.featureId] }),
    index("provider_features_feature_id_idx").on(table.featureId),
  ],
);

export const providerCountries = pgTable(
  "provider_countries",
  {
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    countryId: uuid("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "restrict" }),
  },
  (table) => [
    primaryKey({ columns: [table.providerId, table.countryId] }),
    index("provider_countries_country_id_idx").on(table.countryId),
  ],
);

export const providerSdkLanguages = pgTable(
  "provider_sdk_languages",
  {
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    sdkLanguageId: uuid("sdk_language_id")
      .notNull()
      .references(() => sdkLanguages.id, { onDelete: "restrict" }),
  },
  (table) => [
    primaryKey({ columns: [table.providerId, table.sdkLanguageId] }),
    index("provider_sdk_languages_sdk_language_id_idx").on(table.sdkLanguageId),
  ],
);

export const providersRelations = relations(providers, ({ many }) => ({
  providerCategories: many(providerCategories),
  providerProducts: many(providerProducts),
  providerFeatures: many(providerFeatures),
  providerCountries: many(providerCountries),
  providerSdkLanguages: many(providerSdkLanguages),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  providerCategories: many(providerCategories),
}));

export const productsRelations = relations(products, ({ many }) => ({
  providerProducts: many(providerProducts),
}));

export const featuresRelations = relations(features, ({ many }) => ({
  providerFeatures: many(providerFeatures),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  providerCountries: many(providerCountries),
}));

export const sdkLanguagesRelations = relations(sdkLanguages, ({ many }) => ({
  providerSdkLanguages: many(providerSdkLanguages),
}));

export const providerCategoriesRelations = relations(providerCategories, ({ one }) => ({
  provider: one(providers, {
    fields: [providerCategories.providerId],
    references: [providers.id],
  }),
  category: one(categories, {
    fields: [providerCategories.categoryId],
    references: [categories.id],
  }),
}));

export const providerProductsRelations = relations(providerProducts, ({ one }) => ({
  provider: one(providers, {
    fields: [providerProducts.providerId],
    references: [providers.id],
  }),
  product: one(products, {
    fields: [providerProducts.productId],
    references: [products.id],
  }),
}));

export const providerFeaturesRelations = relations(providerFeatures, ({ one }) => ({
  provider: one(providers, {
    fields: [providerFeatures.providerId],
    references: [providers.id],
  }),
  feature: one(features, {
    fields: [providerFeatures.featureId],
    references: [features.id],
  }),
}));

export const providerCountriesRelations = relations(providerCountries, ({ one }) => ({
  provider: one(providers, {
    fields: [providerCountries.providerId],
    references: [providers.id],
  }),
  country: one(countries, {
    fields: [providerCountries.countryId],
    references: [countries.id],
  }),
}));

export const providerSdkLanguagesRelations = relations(providerSdkLanguages, ({ one }) => ({
  provider: one(providers, {
    fields: [providerSdkLanguages.providerId],
    references: [providers.id],
  }),
  sdkLanguage: one(sdkLanguages, {
    fields: [providerSdkLanguages.sdkLanguageId],
    references: [sdkLanguages.id],
  }),
}));

export const schema = {
  providers,
  categories,
  products,
  features,
  countries,
  sdkLanguages,
  providerCategories,
  providerProducts,
  providerFeatures,
  providerCountries,
  providerSdkLanguages,
};

export type Provider = typeof providers.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Feature = typeof features.$inferSelect;
export type Country = typeof countries.$inferSelect;
export type SdkLanguage = typeof sdkLanguages.$inferSelect;
