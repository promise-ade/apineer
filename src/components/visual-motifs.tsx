import { cn } from "@/lib/cn";

type VisualMotifProps = {
  className?: string;
};

export function HeroNetworkMotif({ className }: VisualMotifProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative h-full min-h-[280px] w-full", className)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(126,34,231,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,34,231,0.04)_1px,transparent_1px)] bg-[length:24px_24px]" />

      <svg
        viewBox="0 0 320 280"
        className="absolute inset-0 h-full w-full text-primary/25"
        fill="none"
      >
        <circle cx="48" cy="56" r="4" fill="currentColor" />
        <circle cx="160" cy="40" r="4" fill="currentColor" />
        <circle cx="272" cy="72" r="4" fill="#FF773E" fillOpacity="0.85" />
        <circle cx="96" cy="140" r="4" fill="currentColor" />
        <circle cx="224" cy="128" r="4" fill="currentColor" />
        <circle cx="160" cy="208" r="4" fill="currentColor" />
        <circle cx="48" cy="220" r="4" fill="#FF773E" fillOpacity="0.7" />

        <path d="M48 56 L160 40 L272 72" stroke="currentColor" strokeWidth="1" />
        <path d="M48 56 L96 140 L160 208" stroke="currentColor" strokeWidth="1" />
        <path d="M160 40 L224 128 L160 208" stroke="currentColor" strokeWidth="1" />
        <path d="M272 72 L224 128" stroke="currentColor" strokeWidth="1" />
        <path d="M96 140 L224 128" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <div className="absolute right-8 top-8 h-16 w-16 border border-primary/20" />
      <div className="absolute bottom-10 left-6 h-10 w-10 border border-accent/30" />
    </div>
  );
}

export function SectionRule({ className }: VisualMotifProps) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-2", className)}>
      <span className="h-px w-10 bg-primary/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
    </div>
  );
}
