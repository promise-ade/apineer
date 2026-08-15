import { describe, expect, it } from "vitest";

import { appRoutes } from "./routes";

describe("appRoutes", () => {
  it("builds provider and category paths", () => {
    expect(appRoutes.provider("paystack")).toBe("/providers/paystack");
    expect(appRoutes.category("payments")).toBe("/categories/payments");
  });

  it("builds provider discovery URLs with filters", () => {
    expect(appRoutes.providersWithFilters({ q: "virtual", category: "payments" })).toBe(
      "/providers?q=virtual&category=payments",
    );
    expect(appRoutes.providersWithFilters({})).toBe("/providers");
  });

  it("builds compare URLs with selected providers", () => {
    expect(
      appRoutes.compareWithProviders({
        a: "paystack",
        b: "monnify",
        category: "payments",
      }),
    ).toBe("/compare?a=paystack&b=monnify&category=payments");
  });

  it("builds category search URLs", () => {
    expect(appRoutes.categoryWithSearch("payments", { q: "card" })).toBe(
      "/categories/payments?q=card",
    );
  });
});
