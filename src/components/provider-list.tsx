import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ProviderCard, type ProviderCardProps } from "./provider-card";

export type ProviderListProps = {
  providers: ProviderCardProps[];
  className?: string;
  emptyState?: ReactNode;
};

export function ProviderList({ providers, className, emptyState }: ProviderListProps) {
  if (providers.length === 0) {
    return emptyState ? <>{emptyState}</> : null;
  }

  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {providers.map((provider) => (
        <li key={provider.href} className="min-w-0">
          <ProviderCard {...provider} />
        </li>
      ))}
    </ul>
  );
}
