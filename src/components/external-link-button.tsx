"use client";

import { cn } from "@/lib/cn";
import { createAnalyticsEvent, trackEvent, type AnalyticsEventName } from "@/lib/analytics";

import {
  secondaryDocumentationButtonClassName,
  secondaryWebsiteButtonClassName,
} from "./styles";

export type ExternalLinkButtonProps = {
  href: string;
  label: string;
  variant?: "documentation" | "website";
  className?: string;
  providerSlug?: string;
  analyticsEvent?: Extract<AnalyticsEventName, "documentation_click" | "website_click">;
};

function ExternalLinkIcon() {
  return (
    <span aria-hidden="true" className="ml-1.5 text-current">
      ↗
    </span>
  );
}

export function ExternalLinkButton({
  href,
  label,
  variant = "documentation",
  className,
  providerSlug,
  analyticsEvent,
}: ExternalLinkButtonProps) {
  function handleClick() {
    if (!analyticsEvent) {
      return;
    }

    trackEvent(
      createAnalyticsEvent(analyticsEvent, {
        providerSlug,
        href,
      }),
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center",
        variant === "documentation"
          ? secondaryDocumentationButtonClassName
          : secondaryWebsiteButtonClassName,
        className,
      )}
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      <ExternalLinkIcon />
    </a>
  );
}
