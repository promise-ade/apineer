export const displayLabels = {
  available: "Available",
  notAvailable: "Not available",
  informationNotAvailable: "Information not available",
} as const;

export type BooleanAvailability = boolean | null | undefined;

export function formatBooleanAvailability(value: BooleanAvailability): string {
  if (value === true) {
    return displayLabels.available;
  }

  if (value === false) {
    return displayLabels.notAvailable;
  }

  return displayLabels.informationNotAvailable;
}

export function formatTextValue(value: string | null | undefined): string {
  if (value == null || value.trim() === "") {
    return displayLabels.notAvailable;
  }

  return value;
}

export function formatLastVerified(value: string | null | undefined): string {
  if (value == null || value.trim() === "") {
    return displayLabels.notAvailable;
  }

  const [year, month] = value.split("-");

  if (!year || !month) {
    return value;
  }

  const date = new Date(Number(year), Number(month) - 1, 1);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function getBooleanAvailabilityVariant(
  value: BooleanAvailability,
): "available" | "not-available" | "unknown" {
  if (value === true) {
    return "available";
  }

  if (value === false) {
    return "not-available";
  }

  return "unknown";
}
