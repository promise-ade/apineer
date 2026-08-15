import { asc, count, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { categories, providerCategories } from "@/db/schema";

import { mapCategoryRecord } from "./mappers";
import type { CategoryRecord, CategoryWithProviderCount } from "./types";

export async function listCategories(): Promise<CategoryRecord[]> {
  const db = getDb();
  const rows = await db.select().from(categories).orderBy(asc(categories.name));

  return rows.map(mapCategoryRecord);
}

export async function listCategoriesWithProviderCounts(): Promise<CategoryWithProviderCount[]> {
  const db = getDb();
  const rows = await db
    .select({
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      providerCount: count(providerCategories.providerId),
    })
    .from(categories)
    .leftJoin(providerCategories, eq(categories.id, providerCategories.categoryId))
    .groupBy(categories.id, categories.name, categories.slug, categories.description)
    .orderBy(asc(categories.name));

  return rows.map((row) => ({
    name: row.name,
    slug: row.slug,
    description: row.description,
    providerCount: Number(row.providerCount),
  }));
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRecord | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  return row ? mapCategoryRecord(row) : null;
}
