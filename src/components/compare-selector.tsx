"use client";

import { cn } from "@/lib/cn";

import {
  cardClassName,
  focusRingClassName,
  interactiveTransitionClassName,
  mutedTextClassName,
  primaryButtonClassName,
  selectFieldClassName,
} from "./styles";

export type CompareOption = {
  slug: string;
  name: string;
};

export type CompareSelectorProps = {
  categoryOptions: CompareOption[];
  categorySlug?: string;
  categoryFieldLabel?: string;
  categoryHelperText?: string;
  isSharedCategoryMode?: boolean;
  providerOptions: CompareOption[];
  providerASlug?: string;
  providerBSlug?: string;
  categoryLabel?: string;
  onCategoryChange: (slug: string) => void;
  onProviderAChange: (slug: string) => void;
  onProviderBChange: (slug: string) => void;
  onCompare: () => void;
  onStartNewComparison?: () => void;
  showStartNewComparison?: boolean;
  compareDisabled?: boolean;
  constraintMessage?: string;
  className?: string;
};

function SelectField({
  id,
  label,
  helperText,
  value,
  options,
  onChange,
  disabled = false,
  placeholder,
  excludeSlug,
}: {
  id: string;
  label: string;
  helperText?: string;
  value: string;
  options: CompareOption[];
  onChange: (slug: string) => void;
  disabled?: boolean;
  placeholder: string;
  excludeSlug?: string;
}) {
  const availableOptions = options.filter((option) => option.slug !== excludeSlug);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium tracking-[-0.01em] text-foreground">
        {label}
      </label>
      {helperText ? <p className={mutedTextClassName}>{helperText}</p> : null}
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn(selectFieldClassName, disabled && "cursor-not-allowed opacity-60")}
      >
        <option value="">{placeholder}</option>
        {availableOptions.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProviderChip({ label, name }: { label: string; name?: string }) {
  if (!name) {
    return null;
  }

  return (
    <div className="rounded-md border border-border bg-zinc-50/80 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{name}</p>
    </div>
  );
}

export function CompareSelector({
  categoryOptions,
  categorySlug = "",
  categoryFieldLabel = "Category",
  categoryHelperText,
  isSharedCategoryMode = false,
  providerOptions,
  providerASlug = "",
  providerBSlug = "",
  categoryLabel,
  onCategoryChange,
  onProviderAChange,
  onProviderBChange,
  onCompare,
  onStartNewComparison,
  showStartNewComparison = false,
  compareDisabled = false,
  constraintMessage,
  className,
}: CompareSelectorProps) {
  const categorySelected = categorySlug.length > 0;
  const canCompare =
    !compareDisabled &&
    categorySelected &&
    providerASlug.length > 0 &&
    providerBSlug.length > 0 &&
    !constraintMessage;

  const providerAName = providerOptions.find((option) => option.slug === providerASlug)?.name;
  const providerBName = providerOptions.find((option) => option.slug === providerBSlug)?.name;

  return (
    <section
      aria-label="Compare providers"
      className={cn(cardClassName, "space-y-6 p-5 sm:p-6", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Provider comparison
          </p>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            Compare fintech API providers
          </h2>
          <p className={cn("max-w-2xl", mutedTextClassName)}>
            Choose a category first, then select two providers to compare side by side.
            {categoryLabel ? ` Current comparison category: ${categoryLabel}.` : null}
          </p>
        </div>
        {showStartNewComparison && onStartNewComparison ? (
          <button
            type="button"
            onClick={onStartNewComparison}
            className={cn(
              "shrink-0 rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-foreground",
              focusRingClassName,
              interactiveTransitionClassName,
              "motion-safe:hover:border-primary/30 motion-safe:hover:bg-primary/5",
            )}
          >
            Start new comparison
          </button>
        ) : null}
      </div>

      {(providerAName || providerBName) && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ProviderChip label="Provider A" name={providerAName} />
          <ProviderChip label="Provider B" name={providerBName} />
        </div>
      )}

      <SelectField
        id="compare-category"
        label={categoryFieldLabel}
        helperText={categoryHelperText}
        value={categorySlug}
        options={categoryOptions}
        onChange={onCategoryChange}
        placeholder={
          isSharedCategoryMode ? "Select a shared category" : "Select a category"
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          id="compare-provider-a"
          label="Provider A"
          value={providerASlug}
          options={providerOptions}
          onChange={onProviderAChange}
          disabled={!categorySelected}
          placeholder={categorySelected ? "Select a provider" : "Select a category first"}
          excludeSlug={providerBSlug}
        />
        <SelectField
          id="compare-provider-b"
          label="Provider B"
          value={providerBSlug}
          options={providerOptions}
          onChange={onProviderBChange}
          disabled={!categorySelected}
          placeholder={categorySelected ? "Select a provider" : "Select a category first"}
          excludeSlug={providerASlug}
        />
      </div>

      {constraintMessage ? (
        <p className="rounded-md border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground">
          {constraintMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={onCompare}
          disabled={!canCompare}
          className={cn(
            primaryButtonClassName,
            !canCompare && "cursor-not-allowed opacity-50 motion-safe:hover:bg-primary",
          )}
        >
          Compare
        </button>
      </div>
    </section>
  );
}
