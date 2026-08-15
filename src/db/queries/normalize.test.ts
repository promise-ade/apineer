import { describe, expect, it } from "vitest";

import { isSearchableQuery, normalizeSearchQuery, toSearchPattern } from "./normalize";

describe("normalizeSearchQuery", () => {
  it("trims and collapses whitespace", () => {
    expect(normalizeSearchQuery("  virtual   account  ")).toBe("virtual account");
  });
});

describe("isSearchableQuery", () => {
  it("returns false for blank queries", () => {
    expect(isSearchableQuery("")).toBe(false);
    expect(isSearchableQuery("   ")).toBe(false);
  });

  it("returns true for non-empty queries", () => {
    expect(isSearchableQuery("paystack")).toBe(true);
  });
});

describe("toSearchPattern", () => {
  it("wraps normalized query in SQL wildcards", () => {
    expect(toSearchPattern("  paystack ")).toBe("%paystack%");
  });
});
