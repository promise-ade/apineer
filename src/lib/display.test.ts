import { describe, expect, it } from "vitest";

import {
  displayLabels,
  formatBooleanAvailability,
  formatLastVerified,
  formatTextValue,
  getBooleanAvailabilityVariant,
} from "./display";

describe("formatBooleanAvailability", () => {
  it("maps true to Available", () => {
    expect(formatBooleanAvailability(true)).toBe(displayLabels.available);
  });

  it("maps false to Not available", () => {
    expect(formatBooleanAvailability(false)).toBe(displayLabels.notAvailable);
  });

  it("maps null and undefined to Information not available", () => {
    expect(formatBooleanAvailability(null)).toBe(displayLabels.informationNotAvailable);
    expect(formatBooleanAvailability(undefined)).toBe(displayLabels.informationNotAvailable);
  });
});

describe("formatTextValue", () => {
  it("returns the value when present", () => {
    expect(formatTextValue("REST")).toBe("REST");
  });

  it("returns Not available for empty or missing values", () => {
    expect(formatTextValue(null)).toBe(displayLabels.notAvailable);
    expect(formatTextValue(undefined)).toBe(displayLabels.notAvailable);
    expect(formatTextValue("   ")).toBe(displayLabels.notAvailable);
  });
});

describe("formatLastVerified", () => {
  it("formats YYYY-MM dates", () => {
    expect(formatLastVerified("2024-03")).toBe("March 2024");
  });

  it("returns Not available for missing values", () => {
    expect(formatLastVerified(null)).toBe(displayLabels.notAvailable);
  });
});

describe("getBooleanAvailabilityVariant", () => {
  it("returns the expected variants", () => {
    expect(getBooleanAvailabilityVariant(true)).toBe("available");
    expect(getBooleanAvailabilityVariant(false)).toBe("not-available");
    expect(getBooleanAvailabilityVariant(null)).toBe("unknown");
  });
});
