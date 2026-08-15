import type { CategoryRecord, ProviderDetail } from "./types";
import { getProviderBySlug } from "./providers";

export type ComparisonRequest = {
  providerASlug?: string;
  providerBSlug?: string;
  categorySlug?: string;
};

export type ResolvedComparison = {
  status: "incomplete" | "needs-category" | "invalid" | "ready";
  message?: string;
  sharedCategories: CategoryRecord[];
  category?: CategoryRecord;
  providerA?: ProviderDetail;
  providerB?: ProviderDetail;
};

export function getSharedCategories(
  providerA: ProviderDetail,
  providerB: ProviderDetail,
): CategoryRecord[] {
  const providerBCategorySlugs = new Set(providerB.categories.map((category) => category.slug));

  return providerA.categories.filter((category) =>
    providerBCategorySlugs.has(category.slug),
  );
}

function resolveCategoryContext(
  sharedCategories: CategoryRecord[],
  categorySlug?: string,
): { status: "needs-category" | "invalid" | "ready"; category?: CategoryRecord; message?: string } {
  if (sharedCategories.length === 0) {
    return {
      status: "invalid",
      message:
        "These providers do not share a category. Choose two providers that offer capabilities in the same category.",
    };
  }

  if (categorySlug) {
    const category = sharedCategories.find((item) => item.slug === categorySlug);

    if (!category) {
      return {
        status: "invalid",
        message:
          "The selected category does not apply to both providers. Choose a shared category to compare them fairly.",
      };
    }

    return { status: "ready", category };
  }

  if (sharedCategories.length === 1) {
    return { status: "ready", category: sharedCategories[0] };
  }

  return {
    status: "needs-category",
    message: "These providers share multiple categories. Select the category context for this comparison.",
  };
}

export async function resolveComparison(
  request: ComparisonRequest,
): Promise<ResolvedComparison> {
  const providerASlug = request.providerASlug?.trim() ?? "";
  const providerBSlug = request.providerBSlug?.trim() ?? "";
  const categorySlug = request.categorySlug?.trim() ?? "";

  if (!providerASlug || !providerBSlug) {
    return {
      status: "incomplete",
      sharedCategories: [],
    };
  }

  if (providerASlug === providerBSlug) {
    return {
      status: "invalid",
      message: "Choose two different providers to compare.",
      sharedCategories: [],
    };
  }

  const [providerA, providerB] = await Promise.all([
    getProviderBySlug(providerASlug),
    getProviderBySlug(providerBSlug),
  ]);

  if (!providerA || !providerB) {
    return {
      status: "invalid",
      message: "One or both selected providers could not be found.",
      sharedCategories: [],
    };
  }

  const sharedCategories = getSharedCategories(providerA, providerB);
  const categoryResolution = resolveCategoryContext(sharedCategories, categorySlug || undefined);

  if (categoryResolution.status !== "ready" || !categoryResolution.category) {
    return {
      status: categoryResolution.status,
      message: categoryResolution.message,
      sharedCategories,
      providerA,
      providerB,
    };
  }

  return {
    status: "ready",
    sharedCategories,
    category: categoryResolution.category,
    providerA,
    providerB,
  };
}
