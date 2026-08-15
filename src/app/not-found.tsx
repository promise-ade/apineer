import { EmptyState } from "@/components/empty-state";
import { appRoutes } from "@/lib/routes";

export default function NotFound() {
  return (
    <EmptyState
      headingLevel="h1"
      title="Page not found"
      description="The page you requested does not exist or may have moved."
      actions={[
        { label: "Return home", href: appRoutes.home },
        { label: "Browse providers", href: appRoutes.providers },
      ]}
    />
  );
}
