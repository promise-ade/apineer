"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName } from "./styles";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  autoComplete?: string;
  variant?: "default" | "hero";
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M9 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m13.5 13.5 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search providers, APIs, categories...",
  label = "Search providers, APIs, and categories",
  id,
  name = "search",
  className,
  inputClassName,
  autoComplete = "off",
  variant = "default",
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isHero = variant === "hero";

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        {isHero ? (
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/70" />
        ) : null}
        <input
          id={inputId}
          name={name}
          type="search"
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "w-full border border-border bg-white text-base text-foreground shadow-sm placeholder:text-muted",
            focusRingClassName,
            interactiveTransitionClassName,
            "hover:border-primary/25 focus:border-primary/40 focus:shadow-[0_0_0_4px_rgba(126,34,231,0.08)]",
            isHero ? "rounded-xl py-4 pl-12 pr-12 text-lg" : "rounded-lg px-4 py-3 pr-12",
            inputClassName,
          )}
        />
        {value.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onClear?.();
            }}
            className={cn(
              "absolute inset-y-0 right-0 px-4 text-sm font-medium text-muted hover:text-primary",
              focusRingClassName,
              interactiveTransitionClassName,
            )}
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
