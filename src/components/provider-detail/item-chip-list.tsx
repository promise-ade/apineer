import { cn } from "@/lib/cn";
import { formatTextValue } from "@/lib/display";

type ItemChipListProps = {
  items: string[];
  className?: string;
};

export function ItemChipList({ items, className }: ItemChipListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-foreground">{formatTextValue(null)}</p>;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex rounded-full border border-border bg-zinc-50 px-2.5 py-1 text-xs font-medium text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
