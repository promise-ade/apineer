import { cn } from "@/lib/cn";

import { Navbar } from "./navbar";
import { focusRingClassName } from "./styles";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground",
          focusRingClassName,
        )}
      >
        Skip to main content
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-6xl px-6 py-10 focus:outline-none"
      >
        {children}
      </main>
    </>
  );
}
