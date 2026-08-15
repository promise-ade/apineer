import { cn } from "@/lib/cn";

import { mutedTextClassName } from "./styles";

export type SectionHeaderProps = {
  title: string;
  description?: string;
  id?: string;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
};

export function SectionHeader({
  title,
  description,
  id,
  className,
  headingLevel = "h2",
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <header className={cn("space-y-2", className)}>
      <Heading
        id={id}
        className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl"
      >
        {title}
      </Heading>
      {description ? <p className={cn("max-w-2xl", mutedTextClassName)}>{description}</p> : null}
    </header>
  );
}
