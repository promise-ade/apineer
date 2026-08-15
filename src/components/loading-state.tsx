import { cn } from "@/lib/cn";

import { cardClassName } from "./styles";

export type LoadingStateVariant = "cards" | "detail" | "table";

export type LoadingStateProps = {
  variant?: LoadingStateVariant;
  count?: number;
  label?: string;
  className?: string;
};

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-zinc-200/80", className)}
    />
  );
}

function CardSkeleton() {
  return (
    <div className={cn(cardClassName, "space-y-4 p-5")}>
      <SkeletonBlock className="h-6 w-2/5" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-11/12" />
      <SkeletonBlock className="h-4 w-3/5" />
      <div className="flex gap-2 pt-2">
        <SkeletonBlock className="h-6 w-20 rounded-full" />
        <SkeletonBlock className="h-6 w-24 rounded-full" />
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-1/3" />
        <SkeletonBlock className="h-4 w-full max-w-2xl" />
        <SkeletonBlock className="h-4 w-5/6 max-w-2xl" />
      </div>
      <div className={cn(cardClassName, "space-y-4 p-5")}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[12rem_1fr]">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className={cn(cardClassName, "overflow-hidden p-4")}>
      <SkeletonBlock className="mb-4 h-6 w-1/4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function LoadingState({
  variant = "cards",
  count = 3,
  label = "Loading content",
  className,
}: LoadingStateProps) {
  return (
    <section aria-busy="true" aria-live="polite" aria-label={label} className={className}>
      <span className="sr-only">{label}</span>
      {variant === "cards" ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: count }).map((_, index) => (
            <li key={index}>
              <CardSkeleton />
            </li>
          ))}
        </ul>
      ) : null}
      {variant === "detail" ? <DetailSkeleton /> : null}
      {variant === "table" ? <TableSkeleton /> : null}
    </section>
  );
}
