"use client";

import Link from "next/link";

import { cn } from "@/lib/cn";

import { cardClassName, focusRingClassName, interactiveTransitionClassName, primaryButtonClassName } from "./styles";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  homeHref?: string;
  className?: string;
  headingLevel?: "h1" | "h2";
};

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content right now. Please try again or return to browsing.",
  onRetry,
  homeHref = "/",
  className,
  headingLevel = "h2",
}: ErrorStateProps) {
  const Heading = headingLevel;

  return (
    <section
      role="alert"
      aria-label={title}
      className={cn(cardClassName, "px-6 py-10 text-center", className)}
    >
      <Heading className="text-lg font-semibold tracking-tight text-foreground">{title}</Heading>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className={primaryButtonClassName}
          >
            Try again
          </button>
        ) : null}
        <Link
          href={homeHref}
          className={cn(
            "rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50",
            focusRingClassName,
            interactiveTransitionClassName,
          )}
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
