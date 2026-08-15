"use client";

import type { ReactNode } from "react";

import { createAnalyticsEvent, trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { cn } from "@/lib/cn";

import { focusRingClassName, interactiveTransitionClassName } from "../styles";

type TrackedExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: Extract<AnalyticsEventName, "documentation_click" | "website_click">;
  providerSlug?: string;
};

export function TrackedExternalLink({
  href,
  children,
  className,
  eventName,
  providerSlug,
}: TrackedExternalLinkProps) {
  function handleClick() {
    trackEvent(
      createAnalyticsEvent(eventName, {
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
        className,
        focusRingClassName,
        interactiveTransitionClassName,
      )}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
