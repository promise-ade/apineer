import { describe, expect, it } from "vitest";

import { analyticsEvents, createAnalyticsEvent } from "./events";

describe("analytics events", () => {
  it("defines all required MVP events", () => {
    expect(Object.values(analyticsEvents)).toEqual([
      "provider_view",
      "provider_search",
      "category_view",
      "comparison_started",
      "provider_removed_from_comparison",
      "documentation_click",
      "website_click",
    ]);
  });

  it("creates typed event payloads", () => {
    const event = createAnalyticsEvent("comparison_started", {
      providerASlug: "paystack",
      providerBSlug: "monnify",
      categorySlug: "payments",
    });

    expect(event.name).toBe("comparison_started");
    if (event.name === "comparison_started") {
      expect(event.properties.categorySlug).toBe("payments");
    }
  });
});
