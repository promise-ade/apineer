import Link from "next/link";

import type { CategoryWithProviderCount } from "@/db/queries";
import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/cn";

import {
  focusRingClassName,
  linkArrowClassName,
  linkClassName,
  mutedTextClassName,
  researchCardClassName,
} from "./styles";

export type CategoryCardProps = CategoryWithProviderCount;

export function CategoryCard({ name, slug, description, providerCount }: CategoryCardProps) {
  const href = appRoutes.category(slug);

  return (
    <article className={cn(researchCardClassName, "group flex h-full flex-col p-5")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="mt-1 h-2 w-2 shrink-0 rounded-full border border-primary/30 bg-primary/10 motion-safe:group-hover:border-primary/50 motion-safe:group-hover:bg-primary/15"
          />
          <h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">
            <Link
              href={href}
              className={cn(
                "rounded-sm motion-safe:group-hover:text-primary",
                focusRingClassName,
              )}
            >
              {name}
            </Link>
          </h2>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
          {providerCount}
        </span>
      </div>

      {description ? (
        <p className={cn("mt-3 line-clamp-2 flex-1", mutedTextClassName)}>{description}</p>
      ) : (
        <p className={cn("mt-3 flex-1", mutedTextClassName)}>Browse providers in this category.</p>
      )}

      <Link href={href} className={cn("group/link mt-5 inline-flex w-fit text-sm", linkClassName)}>
        View category
        <span className={linkArrowClassName} aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  );
}
