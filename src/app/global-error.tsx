"use client";

import { ErrorState } from "@/components/error-state";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <ErrorState
            headingLevel="h1"
            title="Apineer is unavailable"
            description="A critical application error occurred. Please refresh the page or try again shortly."
            onRetry={reset}
          />
        </div>
      </body>
    </html>
  );
}
