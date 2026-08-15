"use client";

import { useEffect, useRef } from "react";

import { createAnalyticsEvent, trackEvent } from "@/lib/analytics";

type PageViewTrackerProps = {
  event: ReturnType<typeof createAnalyticsEvent>;
};

export function PageViewTracker({ event }: PageViewTrackerProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) {
      return;
    }

    trackedRef.current = true;
    trackEvent(event);
  }, [event]);

  return null;
}

export function ProviderViewTracker({ providerSlug }: { providerSlug: string }) {
  return (
    <PageViewTracker
      event={createAnalyticsEvent("provider_view", { providerSlug })}
    />
  );
}

export function CategoryViewTracker({ categorySlug }: { categorySlug: string }) {
  return (
    <PageViewTracker
      event={createAnalyticsEvent("category_view", { categorySlug })}
    />
  );
}

export function ComparisonStartedTracker({
  providerASlug,
  providerBSlug,
  categorySlug,
}: {
  providerASlug: string;
  providerBSlug: string;
  categorySlug: string;
}) {
  return (
    <PageViewTracker
      event={createAnalyticsEvent("comparison_started", {
        providerASlug,
        providerBSlug,
        categorySlug,
      })}
    />
  );
}
