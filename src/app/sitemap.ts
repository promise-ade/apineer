import type { MetadataRoute } from "next";

import { listCategories, listProviders } from "@/db/queries";
import { appRoutes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [providers, categories] = await Promise.all([listProviders(), listCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}${appRoutes.home}`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}${appRoutes.providers}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${appRoutes.categories}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${appRoutes.compare}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}${appRoutes.about}`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const providerRoutes: MetadataRoute.Sitemap = providers.map((provider) => ({
    url: `${siteUrl}${appRoutes.provider(provider.slug)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}${appRoutes.category(category.slug)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...providerRoutes, ...categoryRoutes];
}
