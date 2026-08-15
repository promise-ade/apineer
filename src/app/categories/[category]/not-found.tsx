import { EmptyState } from "@/components/empty-state";
import { appRoutes } from "@/lib/routes";

export default function CategoryNotFound() {
  return (
    <EmptyState
      title="Category not found"
      description="The category you requested does not exist or may have moved. Browse all categories to continue exploring providers."
      actions={[
        { label: "Browse categories", href: appRoutes.categories },
        { label: "View all providers", href: appRoutes.providers },
      ]}
    />
  );
}
