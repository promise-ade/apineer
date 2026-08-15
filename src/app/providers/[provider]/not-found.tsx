import { EmptyState } from "@/components/empty-state";
import { appRoutes } from "@/lib/routes";

export default function ProviderNotFound() {
  return (
    <EmptyState
      title="Provider not found"
      description="The provider you requested does not exist or may have moved. Browse categories or the provider directory to continue exploring."
      actions={[
        { label: "Browse providers", href: appRoutes.providers },
        { label: "Browse categories", href: appRoutes.categories },
      ]}
    />
  );
}
