import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { formatTextValue } from "@/lib/display";

import { AvailabilityBadge } from "./availability-badge";

export type DataRowProps = {
  label: string;
  value?: ReactNode;
  textValue?: string | null;
  booleanValue?: boolean | null;
  className?: string;
};

export type DataRowGroupProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function DataRowGroup({
  children,
  className,
  "aria-label": ariaLabel,
}: DataRowGroupProps) {
  return (
    <dl aria-label={ariaLabel} className={cn("divide-y divide-border", className)}>
      {children}
    </dl>
  );
}

export function DataRow({ label, value, textValue, booleanValue, className }: DataRowProps) {
  let content = value;

  if (content == null && booleanValue !== undefined) {
    content = <AvailabilityBadge value={booleanValue} />;
  }

  if (content == null && textValue !== undefined) {
    content = formatTextValue(textValue);
  }

  if (content == null) {
    content = formatTextValue(null);
  }

  return (
    <div
      className={cn(
        "grid gap-1 py-3 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4",
        className,
      )}
    >
      <dt className="text-sm font-medium text-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{content}</dd>
    </div>
  );
}
