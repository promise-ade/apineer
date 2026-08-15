import { LoadingState } from "@/components/loading-state";

export default function ProvidersLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-9 w-48 animate-pulse rounded-md bg-zinc-200/80" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-zinc-200/80" />
      </div>
      <LoadingState variant="cards" count={6} label="Loading providers" />
    </div>
  );
}
