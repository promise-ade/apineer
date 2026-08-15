"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useId, useState } from "react";

import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName, primaryButtonClassName } from "./styles";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
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

export function HomeSearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(appRoutes.providersWithFilters({ q: query }));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <label htmlFor={inputId} className="sr-only">
        Search providers, APIs, and categories
      </label>
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-md border border-border bg-white sm:flex-row sm:items-stretch",
          interactiveTransitionClassName,
          "focus-within:border-primary/40 focus-within:shadow-[0_0_0_4px_rgba(126,34,231,0.07)]",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 sm:py-0">
          <SearchIcon className="h-5 w-5 shrink-0 text-primary/70" />
          <input
            id={inputId}
            name="search"
            type="search"
            value={query}
            autoComplete="off"
            placeholder="Search providers, APIs, categories..."
            onChange={(event) => setQuery(event.target.value)}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted sm:text-[17px]",
              focusRingClassName,
            )}
          />
          {query.length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className={cn(
                "shrink-0 text-sm font-medium text-muted motion-safe:hover:text-primary sm:hidden",
                focusRingClassName,
              )}
            >
              Clear
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          className={cn(
            "rounded-none border-t border-border px-6 py-3.5 sm:border-t-0 sm:border-l",
            primaryButtonClassName,
          )}
        >
          Search
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">Start your provider research here.</p>
    </form>
  );
}
