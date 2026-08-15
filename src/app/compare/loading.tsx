import { LoadingState } from "@/components/loading-state";

export default function CompareLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-9 w-64 animate-pulse rounded-md bg-zinc-200/80" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-zinc-200/80" />
      </div>
      <LoadingState variant="table" label="Loading comparison" />
    </div>
  );
}
