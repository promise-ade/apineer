"use client";

import type { AnalyticsEvent } from "./events";

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[Apineer analytics]", event.name, event.properties);
  }

  window.apineerTrack?.(event);
  window.dispatchEvent(new CustomEvent("apineer-analytics", { detail: event }));
}
