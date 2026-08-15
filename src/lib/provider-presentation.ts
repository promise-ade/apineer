import type { ProviderCardProps } from "@/components/provider-card";
import type { ProviderSummary } from "@/db/queries";

import { appRoutes } from "./routes";

export function buildProviderSummaryAttributes(provider: ProviderSummary): string[] {
  const attributes: string[] = [];

  if (provider.coverageSummary) {
    attributes.push(provider.coverageSummary);
  } else if (provider.countries.length === 1) {
    attributes.push(provider.countries[0].name);
  } else if (provider.countries.length > 1) {
    attributes.push(`${provider.countries[0].name} +${provider.countries.length - 1} more`);
  }

  if (provider.apiStyle) {
    attributes.push(provider.apiStyle);
  }

  if (provider.sandboxAvailable === true) {
    attributes.push("Sandbox available");
  }

  return attributes;
}

export function toProviderCardProps(provider: ProviderSummary): ProviderCardProps {
  return {
    name: provider.name,
    description: provider.description,
    categories: provider.categories,
    summaryAttributes: buildProviderSummaryAttributes(provider),
    href: appRoutes.provider(provider.slug),
  };
}

export function toProviderCardPropsList(providers: ProviderSummary[]): ProviderCardProps[] {
  return providers.map(toProviderCardProps);
}
