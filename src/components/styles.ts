import { cn } from "@/lib/cn";

export const focusRingClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const interactiveTransitionClassName =
  "motion-safe:transition-[color,background-color,border-color,box-shadow,transform] motion-safe:duration-200";

export const cardClassName = cn(
  "relative overflow-hidden rounded-md border border-border bg-white",
  interactiveTransitionClassName,
);

export const researchCardClassName = cn(
  cardClassName,
  "motion-safe:transition-[border-color,box-shadow,transform] motion-safe:duration-200",
  "motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/35 motion-safe:hover:shadow-[0_8px_24px_-12px_rgba(126,34,231,0.18)]",
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-0 before:bg-primary before:content-[''] motion-safe:before:transition-transform motion-safe:before:duration-200 motion-safe:hover:before:scale-x-100",
);

export const primaryButtonClassName = cn(
  "rounded-md border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-white",
  focusRingClassName,
  interactiveTransitionClassName,
  "motion-safe:hover:border-primary/90 motion-safe:hover:bg-primary/90",
);

export const secondaryDocumentationButtonClassName = cn(
  "rounded-md border border-primary/25 bg-white px-4 py-2.5 text-sm font-medium text-primary",
  focusRingClassName,
  interactiveTransitionClassName,
  "motion-safe:hover:border-primary/40 motion-safe:hover:bg-primary/5",
);

export const secondaryWebsiteButtonClassName = cn(
  "rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground",
  focusRingClassName,
  interactiveTransitionClassName,
  "motion-safe:hover:border-primary/25 motion-safe:hover:bg-zinc-50",
);

export const linkClassName = cn(
  "inline-flex items-center gap-1 font-medium text-primary underline-offset-4 motion-safe:hover:underline",
  focusRingClassName,
  interactiveTransitionClassName,
);

export const linkArrowClassName =
  "inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5";

export const mutedTextClassName = "text-sm leading-6 text-muted";

export const sectionSpacingClassName = "space-y-4";

export const eyebrowClassName =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-muted";

export const selectFieldClassName = cn(
  "w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-foreground",
  focusRingClassName,
  interactiveTransitionClassName,
  "enabled:hover:border-primary/30 enabled:focus:border-primary/45 enabled:focus:shadow-[0_0_0_3px_rgba(126,34,231,0.08)]",
);
