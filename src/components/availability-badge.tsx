import { cn } from "@/lib/cn";
import {
  formatBooleanAvailability,
  getBooleanAvailabilityVariant,
  type BooleanAvailability,
} from "@/lib/display";

export type AvailabilityBadgeProps = {
  value: BooleanAvailability;
  className?: string;
};

const variantClassNames = {
  available: "border-zinc-300 bg-zinc-50 text-foreground",
  "not-available": "border-zinc-300 bg-zinc-50 text-foreground",
  unknown: "border-dashed border-border bg-white text-muted",
} as const;

export function AvailabilityBadge({ value, className }: AvailabilityBadgeProps) {
  const variant = getBooleanAvailabilityVariant(value);
  const label = formatBooleanAvailability(value);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variantClassNames[variant],
        className,
      )}
      aria-label={label}
    >
      {label}
    </span>
  );
}
