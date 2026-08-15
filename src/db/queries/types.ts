export type NamedSlugItem = {
  name: string;
  slug: string;
};

export type CountryItem = {
  name: string;
  code: string | null;
};

export type CategoryRecord = {
  name: string;
  slug: string;
  description: string | null;
};

export type CategoryWithProviderCount = CategoryRecord & {
  providerCount: number;
};

export type ProviderSummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  apiStyle: string | null;
  sandboxAvailable: boolean | null;
  coverageSummary: string | null;
  categories: NamedSlugItem[];
  countries: CountryItem[];
};

export type ProviderDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  apiStyle: string | null;
  authentication: string | null;
  sandboxAvailable: boolean | null;
  webhooksAvailable: boolean | null;
  pricingModel: string | null;
  freeTier: string | null;
  documentationUrl: string;
  coverageSummary: string | null;
  lastVerified: string | null;
  source: string | null;
  categories: CategoryRecord[];
  products: NamedSlugItem[];
  features: NamedSlugItem[];
  countries: CountryItem[];
  sdkLanguages: NamedSlugItem[];
};
