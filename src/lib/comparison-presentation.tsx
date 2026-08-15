import type { ReactNode } from "react";
import React from "react";

import type { ComparisonTableRow } from "@/components/comparison-table";
import { AvailabilityBadge } from "@/components/availability-badge";
import type { ProviderDetail } from "@/db/queries";
import { formatTextValue } from "@/lib/display";
import { appRoutes } from "@/lib/routes";

function formatNamedList(items: Array<{ name: string }>): string {
  if (items.length === 0) {
    return formatTextValue(null);
  }

  return items.map((item) => item.name).join(", ");
}

function formatCoverage(provider: ProviderDetail): string {
  const parts: string[] = [];

  if (provider.coverageSummary) {
    parts.push(provider.coverageSummary);
  }

  if (provider.countries.length > 0) {
    parts.push(provider.countries.map((country) => country.name).join(", "));
  }

  if (parts.length === 0) {
    return formatTextValue(null);
  }

  return parts.join("; ");
}

function formatDocumentation(provider: ProviderDetail): ReactNode {
  if (provider.documentationUrl.trim().length === 0) {
    return formatTextValue(null);
  }

  return (
    <a
      href={provider.documentationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      Documentation
    </a>
  );
}

export function buildComparisonRows(
  providerA: ProviderDetail,
  providerB: ProviderDetail,
): ComparisonTableRow[] {
  return [
    {
      attribute: "Description",
      providerA: providerA.description,
      providerB: providerB.description,
    },
    {
      attribute: "Categories",
      providerA: formatNamedList(providerA.categories),
      providerB: formatNamedList(providerB.categories),
    },
    {
      attribute: "Products",
      providerA: formatNamedList(providerA.products),
      providerB: formatNamedList(providerB.products),
    },
    {
      attribute: "Features",
      providerA: formatNamedList(providerA.features),
      providerB: formatNamedList(providerB.features),
    },
    {
      attribute: "Coverage",
      providerA: formatCoverage(providerA),
      providerB: formatCoverage(providerB),
    },
    {
      attribute: "API Style",
      providerA: formatTextValue(providerA.apiStyle),
      providerB: formatTextValue(providerB.apiStyle),
    },
    {
      attribute: "Authentication",
      providerA: formatTextValue(providerA.authentication),
      providerB: formatTextValue(providerB.authentication),
    },
    {
      attribute: "Sandbox",
      providerA: <AvailabilityBadge value={providerA.sandboxAvailable} />,
      providerB: <AvailabilityBadge value={providerB.sandboxAvailable} />,
    },
    {
      attribute: "SDK Languages",
      providerA: formatNamedList(providerA.sdkLanguages),
      providerB: formatNamedList(providerB.sdkLanguages),
    },
    {
      attribute: "Webhooks",
      providerA: <AvailabilityBadge value={providerA.webhooksAvailable} />,
      providerB: <AvailabilityBadge value={providerB.webhooksAvailable} />,
    },
    {
      attribute: "Pricing",
      providerA: formatTextValue(providerA.pricingModel),
      providerB: formatTextValue(providerB.pricingModel),
    },
    {
      attribute: "Free Tier",
      providerA: formatTextValue(providerA.freeTier),
      providerB: formatTextValue(providerB.freeTier),
    },
    {
      attribute: "Documentation",
      providerA: formatDocumentation(providerA),
      providerB: formatDocumentation(providerB),
    },
  ];
}

export function buildCompareEntryHref(
  providerSlug: string,
  categories: Array<{ slug: string }>,
): string {
  if (categories.length === 1) {
    return appRoutes.compareWithProviders({
      a: providerSlug,
      category: categories[0].slug,
    });
  }

  return appRoutes.compareWithProviders({ a: providerSlug });
}
