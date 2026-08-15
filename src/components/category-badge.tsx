import Link from "next/link";

import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName } from "./styles";

export type CategoryBadgeProps = {
  name: string;
  slug?: string;
  href?: string;
  className?: string;
};

export function CategoryBadge({ name, slug, href, className }: CategoryBadgeProps) {
  const resolvedHref = href ?? (slug ? appRoutes.category(slug) : undefined);
  const classNames = cn(
    "inline-flex items-center rounded-sm border border-border bg-zinc-50/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted",
    interactiveTransitionClassName,
    "motion-safe:hover:border-primary/25 motion-safe:hover:bg-primary/5 motion-safe:hover:text-foreground",
    className,
  );

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className={cn(classNames, focusRingClassName)}>
        {name}
      </Link>
    );
  }

  return <span className={classNames}>{name}</span>;
}
