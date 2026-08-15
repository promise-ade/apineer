import { LoadingState } from "@/components/loading-state";

export default function CategoryDetailLoading() {
  return <LoadingState variant="cards" count={3} label="Loading category providers" />;
}
