import { CategoryCard } from "@/components/category-card";
import type { CategoryWithProviderCount } from "@/db/queries";
import { cn } from "@/lib/cn";

type CategoryListProps = {
  categories: CategoryWithProviderCount[];
  className?: string;
};

export function CategoryList({ categories, className }: CategoryListProps) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {categories.map((category) => (
        <li key={category.slug} className="min-w-0">
          <CategoryCard {...category} />
        </li>
      ))}
    </ul>
  );
}
