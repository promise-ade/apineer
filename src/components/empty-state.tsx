import Link from "next/link";

import { cn } from "@/lib/cn";

import { cardClassName, focusRingClassName, interactiveTransitionClassName } from "./styles";

export type EmptyStateAction = {
  label: string;
  href: string;
};

export type EmptyStateProps = {
  title: string;
  description: string;
  actions?: EmptyStateAction[];
  className?: string;
  headingLevel?: "h1" | "h2";
};

export function EmptyState({
  title,
  description,
  actions = [],
  className,
  headingLevel = "h2",
}: EmptyStateProps) {
  const Heading = headingLevel;

  return (
    <section
      aria-label={title}
      className={cn(cardClassName, "px-6 py-10 text-center", className)}
    >
      <Heading className="text-lg font-semibold tracking-tight text-foreground">{title}</Heading>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">{description}</p>
      {actions.length > 0 ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={cn(
                "rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50",
                focusRingClassName,
                interactiveTransitionClassName,
              )}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
