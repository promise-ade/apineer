import type { Metadata } from "next";

import { CategoryList } from "@/components/category-list";
import { SectionHeader } from "@/components/section-header";
import { listCategoriesWithProviderCounts } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse fintech API categories on Apineer.",
};

export default async function CategoriesPage() {
  const categories = await listCategoriesWithProviderCounts();

  return (
    <div className="space-y-8">
      <SectionHeader
        headingLevel="h1"
        title="Categories"
        description="Browse fintech API categories and explore providers relevant to each capability area."
      />
      <CategoryList categories={categories} />
    </div>
  );
}
