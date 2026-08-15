"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName, mutedTextClassName } from "./styles";

export type FilterOption = {
  slug: string;
  label: string;
};

export type FilterControlProps = {
  label?: string;
  options: FilterOption[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
  onClearAll?: () => void;
  className?: string;
};

export function FilterControl({
  label = "Filter by category",
  options,
  selectedSlugs,
  onToggle,
  onClearAll,
  className,
}: FilterControlProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasSelection = selectedSlugs.length > 0;

  const filterButtons = (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedSlugs.includes(option.slug);

        return (
          <button
            key={option.slug}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(option.slug)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium",
              focusRingClassName,
              interactiveTransitionClassName,
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-white text-muted hover:border-primary/25 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <section aria-label={label} className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-foreground">{label}</h2>
        <div className="flex items-center gap-3">
          {hasSelection && onClearAll ? (
            <button
              type="button"
              onClick={onClearAll}
              className={cn(
                "hidden text-sm font-medium text-muted hover:text-foreground sm:inline",
                focusRingClassName,
                interactiveTransitionClassName,
              )}
            >
              Clear filters
            </button>
          ) : null}
          <button
            type="button"
            className={cn(
              "rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground sm:hidden",
              focusRingClassName,
              interactiveTransitionClassName,
              "hover:bg-zinc-50",
            )}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? "Hide filters" : "Filters"}
            {hasSelection ? ` (${selectedSlugs.length})` : ""}
          </button>
        </div>
      </div>

      <div className={cn("hidden sm:block")}>{filterButtons}</div>
      {mobileOpen ? <div className="sm:hidden">{filterButtons}</div> : null}

      {hasSelection ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={mutedTextClassName}>
            {selectedSlugs.length} filter{selectedSlugs.length === 1 ? "" : "s"} applied
          </p>
          {onClearAll ? (
            <button
              type="button"
              onClick={onClearAll}
              className={cn(
                "text-sm font-medium text-muted hover:text-foreground sm:hidden",
                focusRingClassName,
                interactiveTransitionClassName,
              )}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
