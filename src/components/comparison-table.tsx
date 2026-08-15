import type { ReactNode } from "react";
import Link from "next/link";

import { TrackedExternalLink } from "@/components/analytics/tracked-external-link";
import { cn } from "@/lib/cn";

import { cardClassName, linkClassName, mutedTextClassName } from "./styles";

export type ComparisonTableRow = {
  attribute: string;
  providerA: ReactNode;
  providerB: ReactNode;
};

export type ComparisonTableProps = {
  providerAName: string;
  providerBName: string;
  providerASlug?: string;
  providerBSlug?: string;
  rows: ComparisonTableRow[];
  providerADetailHref?: string;
  providerBDetailHref?: string;
  providerADocumentationHref?: string;
  providerBDocumentationHref?: string;
  className?: string;
};

export function ComparisonTable({
  providerAName,
  providerBName,
  providerASlug,
  providerBSlug,
  rows,
  providerADetailHref,
  providerBDetailHref,
  providerADocumentationHref,
  providerBDocumentationHref,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn(cardClassName, "overflow-hidden", className)}>
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Side-by-side comparison
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of {providerAName} and {providerBName}
          </caption>
          <thead>
            <tr className="border-b border-border bg-zinc-50/80">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-[10rem] border-r border-border bg-zinc-50/95 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Attribute
              </th>
              <th
                scope="col"
                className="min-w-[12rem] px-4 py-3 text-sm font-semibold tracking-[-0.01em] text-foreground"
              >
                {providerAName}
              </th>
              <th
                scope="col"
                className="min-w-[12rem] px-4 py-3 text-sm font-semibold tracking-[-0.01em] text-foreground"
              >
                {providerBName}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.attribute}
                className={cn(
                  "border-b border-border last:border-b-0",
                  index % 2 === 1 && "bg-zinc-50/40",
                )}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-r border-border bg-white px-4 py-3 align-top text-sm font-medium text-foreground"
                >
                  {row.attribute}
                </th>
                <td className="px-4 py-3 align-top text-sm text-foreground">{row.providerA}</td>
                <td className="px-4 py-3 align-top text-sm text-foreground">{row.providerB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(providerADetailHref ||
        providerBDetailHref ||
        providerADocumentationHref ||
        providerBDocumentationHref) && (
        <div className="grid gap-4 border-t border-border px-4 py-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{providerAName}</p>
            <div className="flex flex-wrap gap-3">
              {providerADetailHref ? (
                <Link href={providerADetailHref} className={cn("text-sm", linkClassName)}>
                  View provider
                </Link>
              ) : null}
              {providerADocumentationHref ? (
                <TrackedExternalLink
                  href={providerADocumentationHref}
                  eventName="documentation_click"
                  providerSlug={providerASlug}
                  className={cn("text-sm", linkClassName)}
                >
                  Documentation
                </TrackedExternalLink>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{providerBName}</p>
            <div className="flex flex-wrap gap-3">
              {providerBDetailHref ? (
                <Link href={providerBDetailHref} className={cn("text-sm", linkClassName)}>
                  View provider
                </Link>
              ) : null}
              {providerBDocumentationHref ? (
                <TrackedExternalLink
                  href={providerBDocumentationHref}
                  eventName="documentation_click"
                  providerSlug={providerBSlug}
                  className={cn("text-sm", linkClassName)}
                >
                  Documentation
                </TrackedExternalLink>
              ) : null}
            </div>
          </div>
          <p className={cn("sm:col-span-2", mutedTextClassName)}>
            Comparison presents attributes side by side without ranking either provider.
          </p>
        </div>
      )}
    </div>
  );
}
