"use client";

import { ErrorState } from "@/components/error-state";
import { appRoutes } from "@/lib/routes";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <ErrorState
      headingLevel="h1"
      title="Something went wrong"
      description="We could not load this page right now. Please try again or return to browsing."
      onRetry={reset}
      homeHref={appRoutes.home}
    />
  );
}
