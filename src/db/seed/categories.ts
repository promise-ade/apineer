export const CANONICAL_CATEGORIES = [
  {
    name: "Cards",
    slug: "cards",
    description:
      "APIs and infrastructure for issuing, managing, and processing card-based payment products and transactions.",
  },
  {
    name: "Payments",
    slug: "payments",
    description:
      "APIs and infrastructure for accepting, sending, and managing digital payments across different payment methods and channels.",
  },
  {
    name: "Open Banking",
    slug: "open-banking",
    description:
      "APIs that enable secure access to financial account data and account-based payment capabilities through open banking infrastructure.",
  },
  {
    name: "Identity Verification",
    slug: "identity-verification",
    description:
      "APIs and tools for verifying customer identities, validating identity information, and supporting digital onboarding and KYC processes.",
  },
  {
    name: "Lending & Credit",
    slug: "lending-credit",
    description:
      "APIs and infrastructure for lending, credit assessment, loan management, and related credit products.",
  },
  {
    name: "Fraud & Risk",
    slug: "fraud-risk",
    description:
      "APIs and tools for detecting fraud, assessing transaction or customer risk, and protecting financial products and transactions.",
  },
  {
    name: "Virtual Accounts",
    slug: "virtual-accounts",
    description:
      "APIs for creating and managing virtual bank accounts and using account-based infrastructure for payments, collections, and reconciliation.",
  },
  {
    name: "Banking-as-a-Service",
    slug: "banking-as-a-service",
    description:
      "APIs and infrastructure that enable businesses to embed banking and financial services into their own products and experiences.",
  },
  {
    name: "Foreign Exchange (FX)",
    slug: "foreign-exchange",
    description:
      "APIs and infrastructure for foreign exchange, currency conversion, exchange rates, and cross-border financial transactions.",
  },
  {
    name: "Wallets",
    slug: "wallets",
    description:
      "APIs and infrastructure for creating, managing, funding, and transacting with digital wallets.",
  },
] as const;

export const CATEGORY_NAME_SET = new Set<string>(
  CANONICAL_CATEGORIES.map((category) => category.name),
);
