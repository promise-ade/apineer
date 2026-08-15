import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProviderDetailView } from "@/components/provider-detail";
import { ProviderViewTracker } from "@/components/analytics/page-view-tracker";
import { getProviderBySlug } from "@/db/queries";

export const dynamic = "force-dynamic";

type ProviderPageProps = {
  params: Promise<{ provider: string }>;
};

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    return { title: "Provider not found" };
  }

  return {
    title: provider.name,
    description: provider.description,
  };
}

export default async function ProviderDetailPage({ params }: ProviderPageProps) {
  const { provider: slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  return (
    <>
      <ProviderViewTracker providerSlug={provider.slug} />
      <ProviderDetailView provider={provider} />
    </>
  );
}
