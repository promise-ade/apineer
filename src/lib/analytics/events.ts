export const analyticsEvents = {
  providerView: "provider_view",
  providerSearch: "provider_search",
  categoryView: "category_view",
  comparisonStarted: "comparison_started",
  providerRemovedFromComparison: "provider_removed_from_comparison",
  documentationClick: "documentation_click",
  websiteClick: "website_click",
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsEventPayload = {
  provider_view: {
    providerSlug: string;
  };
  provider_search: {
    query: string;
  };
  category_view: {
    categorySlug: string;
  };
  comparison_started: {
    providerASlug: string;
    providerBSlug: string;
    categorySlug: string;
  };
  provider_removed_from_comparison: {
    removedProviderSlug: string;
    side: "a" | "b";
  };
  documentation_click: {
    providerSlug?: string;
    href: string;
  };
  website_click: {
    providerSlug?: string;
    href: string;
  };
};

export type AnalyticsEvent = {
  [K in AnalyticsEventName]: {
    name: K;
    properties: AnalyticsEventPayload[K];
  };
}[AnalyticsEventName];

export type AnalyticsEventInput = AnalyticsEvent;

declare global {
  interface Window {
    apineerTrack?: (event: AnalyticsEvent) => void;
  }
}

export function createAnalyticsEvent<T extends AnalyticsEventName>(
  name: T,
  properties: AnalyticsEventPayload[T],
): AnalyticsEvent {
  return { name, properties } as AnalyticsEvent;
}
