import Link from "next/link";

import { cn } from "@/lib/cn";

import { CategoryBadge } from "./category-badge";
import {
  focusRingClassName,
  linkArrowClassName,
  linkClassName,
  mutedTextClassName,
  researchCardClassName,
} from "./styles";

export type ProviderCardCategory = {
  name: string;
  slug: string;
};

export type ProviderCardProps = {
  name: string;
  description: string;
  categories: ProviderCardCategory[];
  summaryAttributes?: string[];
  href: string;
  compareHref?: string;
  className?: string;
};

export function ProviderCard({
  name,
  description,
  categories,
  summaryAttributes = [],
  href,
  compareHref,
  className,
}: ProviderCardProps) {
  return (
    <article className={cn(researchCardClassName, "group flex h-full flex-col p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
          <Link
            href={href}
            className={cn(
              "rounded-sm motion-safe:transition-colors motion-safe:group-hover:text-primary",
              focusRingClassName,
            )}
          >
            {name}
          </Link>
        </h3>
      </div>

      <p className={cn("mt-3 line-clamp-3 flex-1 leading-6", mutedTextClassName)}>{description}</p>

      {categories.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryBadge key={category.slug} name={category.name} slug={category.slug} />
          ))}
        </div>
      ) : null}

      {summaryAttributes.length > 0 ? (
        <p className={cn("mt-3 font-mono text-xs text-muted")}>{summaryAttributes.join(" · ")}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
        <Link href={href} className={cn("group/link text-sm", linkClassName)}>
          View provider
          <span className={linkArrowClassName} aria-hidden="true">
            →
          </span>
        </Link>
        {compareHref ? (
          <Link
            href={compareHref}
            className={cn(
              "text-sm font-medium text-muted underline-offset-4 motion-safe:hover:text-accent motion-safe:hover:underline",
              focusRingClassName,
            )}
          >
            Compare
          </Link>
        ) : null}
      </div>
    </article>
  );
}
