**APINEER**

**Data Model**

MVP Build Preparation • Version 1.0 • 11 August 2026

 

Defines how Apineer's normalized fintech provider information should be represented, related, queried, seeded, and displayed.

 

# **1\. Purpose**

This document defines the database-oriented data model for the Apineer MVP. It translates the normalized Provider Information dataset into a structure that can support provider discovery, category browsing, provider detail pages, and two-provider comparison.

The model is intentionally designed around the existing 32-provider dataset. The Provider Information document contains 32 provider records, not 30; the two additional providers are included in this model and must be included in the initial seed data.

# **2\. Source and Data Principles**

The PRD requires providers to be searchable, categorized, viewable in detail, and comparable; it also requires providers to be able to appear in multiple categories and unavailable information to be displayed as “Not available”.

The normalized Provider Information document is the source of truth for the initial provider records. Its records use a consistent field set including Provider Name, Description, Website, API Categories, Core Products, Features, Countries Supported, API Style, Authentication, Sandbox, SDK Languages, Webhooks, Pricing Model, Free Tier, Documentation URL, Last Verified, and Source.

## **2.1 Core data principles**

·        Preserve the provider information as collected; do not infer missing values.  
·        Represent '-' from the source dataset as NULL/missing in the database, not as the literal string '-'.  
·        Render NULL/missing values as “Not available” in the user interface.  
·        Represent multi-valued fields through relationships rather than comma-separated strings.  
·        Keep provider categories reusable and controlled by the predefined ten-category taxonomy.  
·        Keep official website and documentation URLs as provider-level fields because each provider currently has one primary value for each.  
·        Keep last-verified information so freshness can be surfaced and maintained.  
·        Keep source/verification information so the origin of a record remains traceable.

# **3\. High-Level Entity Model**

The core relationship structure is:

Provider  
  ├── Provider Categories ──\> Category  
  ├── Provider Products  ──\> Product  
  ├── Provider Features  ──\> Feature  
  ├── Provider Countries  ──\> Country  
  └── Provider SDKs  	──\> SDK Language

Provider also contains its single-valued integration, pricing, verification, and resource fields.

# **4\. Entities and Tables**

## **4.1 providers**

One record per fintech API provider.

| Field | Type | Required | Rules / meaning |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Provider display name; unique. |
| slug | VARCHAR | Yes | URL-safe unique identifier generated from name. |
| description | TEXT | Yes | Normalized provider description from the source dataset. |
| website\_url | TEXT | Yes | Official provider website. |
| api\_style | VARCHAR / nullable | No | Current source value is generally REST; NULL when source is '-'. |
| authentication | VARCHAR / nullable | No | Preserve the source wording, e.g. API Key or OAuth 2.0. |
| sandbox\_available | BOOLEAN / nullable | No | TRUE for Yes, NULL when source is '-'. |
| webhooks\_available | BOOLEAN / nullable | No | TRUE for Yes, NULL when source is '-'. |
| pricing\_model | VARCHAR / nullable | No | Current controlled values: Pay-as-you-go or Talk to Sales. |
| free\_tier | VARCHAR / nullable | No | Text because source contains variants such as Yes, Yes (Sandbox), and Yes (Test Mode). NULL when '-'. |
| documentation\_url | TEXT | Yes | Official provider documentation/developer portal URL. |
| last\_verified | DATE / nullable | No | Verification date from provider dataset. |
| source | VARCHAR / nullable | No | Verification source wording from provider dataset. |
| created\_at | TIMESTAMP | Yes | Application record creation timestamp. |
| updated\_at | TIMESTAMP | Yes | Application record update timestamp. |

## **4.2 categories**

Controlled taxonomy of the ten fintech API categories used throughout Apineer.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Unique category display name. |
| slug | VARCHAR | Yes | Unique URL-safe category identifier. |
| description | TEXT / nullable | No | Category explanation for the category page. |

The initial category values are exactly:

·        Cards  
·        Payments  
·        Open Banking  
·        Identity verification  
·        Lending & Credit  
·        Fraud & Risk  
·        Virtual Accounts  
·        Banking-as-a-Service  
·        Foreign Exchange (FX)  
·        Wallets

## **4.3 provider\_categories**

Many-to-many relationship between providers and categories.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| provider\_id | UUID | Yes | Foreign key to providers.id. |
| category\_id | UUID | Yes | Foreign key to categories.id. |

Primary key: (provider\_id, category\_id). This prevents duplicate category assignments.

## **4.4 products**

Reusable catalog of core products appearing in provider records.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Canonical product label. |
| slug | VARCHAR | Yes | Unique URL-safe identifier. |

## **4.5 provider\_products**

Many-to-many relationship between providers and core products.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| provider\_id | UUID | Yes | Foreign key to providers.id. |
| product\_id | UUID | Yes | Foreign key to products.id. |

Primary key: (provider\_id, product\_id).

## **4.6 features**

Reusable catalog of provider features appearing in the normalized dataset.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Canonical feature label. |
| slug | VARCHAR | Yes | Unique URL-safe identifier. |

## **4.7 provider\_features**

Many-to-many relationship between providers and features.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| provider\_id | UUID | Yes | Foreign key to providers.id. |
| feature\_id | UUID | Yes | Foreign key to features.id. |

Primary key: (provider\_id, feature\_id).

## **4.8 countries**

Reusable country catalog for provider coverage.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Canonical country name. |
| code | CHAR(2) / nullable | No | ISO-style country code may be added for implementation consistency, but must not be inferred for provider coverage claims. |

## **4.9 provider\_countries**

Many-to-many relationship between providers and supported countries.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| provider\_id | UUID | Yes | Foreign key to providers.id. |
| country\_id | UUID | Yes | Foreign key to countries.id. |

Primary key: (provider\_id, country\_id).

## **4.10 sdk\_languages**

Reusable list of SDK/platform labels exactly as represented in the provider dataset.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| id | UUID / generated ID | Yes | Primary key. |
| name | VARCHAR | Yes | Canonical SDK/platform label, e.g. JavaScript, PHP, Flutter. |
| slug | VARCHAR | Yes | Unique URL-safe identifier. |

## **4.11 provider\_sdk\_languages**

Many-to-many relationship between providers and SDK/platform labels.

| Field | Type | Required | Rules |
| :---- | :---- | :---- | :---- |
| provider\_id | UUID | Yes | Foreign key to providers.id. |
| sdk\_language\_id | UUID | Yes | Foreign key to sdk\_languages.id. |

Primary key: (provider\_id, sdk\_language\_id).

# **5\. Why Some Fields Are Normalized and Others Are Not**

The model should normalize fields when the provider dataset contains multiple values that need to be searched, filtered, grouped, or related across providers. This is why categories, products, features, countries, and SDK languages use relationship tables.

Single-valued provider attributes such as API style, authentication, sandbox availability, webhooks, pricing model, free tier, and URLs remain on providers because the current dataset represents each as one provider-level value.

Free tier is deliberately stored as text rather than a simple boolean because the source distinguishes between values such as “Yes”, “Yes (Sandbox)”, and “Yes (Test Mode)”.

# **6\. Controlled Values and Missing Data**

## **6.1 Missing data**

| Source value | Database representation | UI representation |
| :---- | :---- | :---- |
| \- | NULL | Not available |
| Yes | TRUE (for boolean fields) | Yes / Available |
| Talk to Sales | Stored value | Talk to Sales |
| Pay-as-you-go | Stored value | Pay-as-you-go |

## **6.2 Important distinction**

“Not available” does not mean “No”. For example, if Webhooks is '-' in the source data, the database should not store FALSE. It should store NULL because the available source material does not establish that webhooks are absent.

# **7\. Provider Resource Model**

The MVP has two primary provider resources: the official website and official documentation. These can remain as columns on providers rather than a separate resource table.

| Field | Meaning |
| :---- | :---- |
| website\_url | Official provider website. |
| documentation\_url | Official documentation or developer portal used for integration details. |

This supports the product requirement that users can access the provider's official documentation and website from the provider detail page.

# **8\. Comparison Data Requirements**

Comparison should not require a separate comparison database table for the MVP. A comparison is a transient user interaction involving two provider IDs.

Comparison flow:

·        User selects Provider A.  
·        User selects Provider B.  
·        Application verifies both providers share the selected category.  
·        Application retrieves both provider records and their related categories/products/features/countries/SDKs.  
·        Application presents the agreed comparable fields side by side.  
·        NULL values are rendered as “Not available”.

Provider attributes that should be available to the comparison layer include:

·        Provider name  
·        Description  
·        API categories  
·        Core products  
·        Features  
·        Countries supported  
·        API style  
·        Authentication  
·        Sandbox  
·        SDK languages  
·        Webhooks  
·        Pricing model  
·        Free tier  
·        Documentation URL  
·        Website URL  
·        Last verified

# **9\. Search Data Requirements**

The initial dataset contains 32 providers. A database query is sufficient for MVP search; a dedicated search engine is not required.

Recommended searchable fields:

·        Provider name  
·        Category name  
·        Core product name  
·        Feature name

Provider description may be added to search later, but it is not necessary for the first implementation unless the UI/UX Specification explicitly requires it.

# **10\. Seed Data**

The initial seed dataset must contain all 32 providers currently present in Provider Information.md. No provider should be silently dropped because it has missing fields.

| \# | Provider |
| :---- | :---- |
| 1 | Paystack |
| 2 | Flutterwave |
| 3 | Monnify |
| 4 | Mono |
| 5 | Dojah |
| 6 | Prembly |
| 7 | OnePipe |
| 8 | Kora |
| 9 | Anchor |
| 10 | VerifyMe |
| 11 | VFD Tech |
| 12 | ALAT by Wema APIs |
| 13 | Fincra |
| 14 | Squad |
| 15 | Qore |
| 16 | Nomba |
| 17 | Woodcore |
| 18 | Smile ID |
| 19 | Interswitch |
| 20 | Duplo |
| 21 | Zeeh Africa |
| 22 | Youverify |
| 23 | Payvessel |
| 24 | Bachs |
| 25 | Advancly |
| 26 | Providus Bank |
| 27 | Payaza |
| 28 | HydrogenPay |
| 29 | Remita |
| 30 | Zest Payments |
| 31 | Sudo Africa |
| 32 | FossaPay |

The Provider Information document contains these 32 records from Paystack through FossaPay. The final two records, Zest Payments and Sudo Africa, were added in a later batch, and FossaPay is the additional provider now making the total 32\. The seed process should use the actual current Provider Information document as the definitive record source.

# **11\. Seed Data Validation Rules**

·        Every provider must have a unique name and slug.  
·        Every provider must have a website URL and documentation URL as supplied by the source.  
·        Every category assigned to a provider must exist in the categories table.  
·        Every multi-valued product, feature, country, and SDK value should map to a reusable reference record.  
·        A '-' source value must not become a fabricated value.  
·        Provider last\_verified should be populated where supplied.  
·        Seed scripts should be idempotent or safely rerunnable.  
·        Seed data should not create duplicate providers or duplicate many-to-many relationships.

# **12\. Indexing and Constraints**

| Table | Recommended indexes / constraints |
| :---- | :---- |
| providers | UNIQUE(name), UNIQUE(slug), index(name), index(last\_verified) |
| categories | UNIQUE(name), UNIQUE(slug) |
| products | UNIQUE(name), UNIQUE(slug) |
| features | UNIQUE(name), UNIQUE(slug) |
| countries | UNIQUE(name) |
| sdk\_languages | UNIQUE(name), UNIQUE(slug) |
| provider\_categories | PRIMARY KEY(provider\_id, category\_id), index(category\_id) |
| provider\_products | PRIMARY KEY(provider\_id, product\_id), index(product\_id) |
| provider\_features | PRIMARY KEY(provider\_id, feature\_id), index(feature\_id) |
| provider\_countries | PRIMARY KEY(provider\_id, country\_id), index(country\_id) |
| provider\_sdk\_languages | PRIMARY KEY(provider\_id, sdk\_language\_id), index(sdk\_language\_id) |

# **13\. Deletion and Update Behavior**

·        Do not delete a provider merely because a field is unavailable.  
·        Provider-category/product/feature/country/SDK relationships should use cascading deletion from the provider only if the implementation team confirms this is safe for seed-data workflows.  
·        Reference records should not be deleted while they are still referenced by providers.  
·        Provider updates should update updated\_at.  
·        last\_verified should change only when the provider information has actually been reviewed.

# **14\. Example Provider Record**

Conceptual representation of a provider after normalization:

Provider: Paystack  
 Categories: Payments, Virtual Accounts  
 Products: Payments, Transfers, Dedicated Virtual Accounts  
 Features: Recurring Payments, Payment Links, Split Payments, Terminal Payments, Invoicing, Subscriptions  
 Countries: Nigeria, Ghana, South Africa, Kenya  
 API Style: REST  
 Authentication: API Key  
 Sandbox: Yes  
 SDK Languages: JavaScript, PHP, Python, Java, Go, Ruby, .NET  
 Webhooks: Yes  
 Pricing: Pay-as-you-go  
 Free Tier: Yes (Test Mode)

# **15\. Data Flow into the Application**

Provider Information.md → seed data transformation → PostgreSQL → server-side data access → UI components

·        The source document remains the human-readable reference dataset.  
·        A seed script transforms its normalized records into relational rows.  
·        The database becomes the application's runtime data source.  
·        The UI consumes structured provider/category data rather than parsing markdown at runtime.  
·        Official provider URLs are rendered as external links.

# **16\. Data Model Boundaries**

This document deliberately does not define:

·        Exact visual representation of provider data.  
·        Exact comparison table layout.  
·        Exact search UI.  
·        Typography or visual design.  
·        Cursor implementation prompts.  
·        Future user accounts or saved comparisons.  
·        Future provider-submission workflows.

Those decisions belong to the UI/UX Specification and Cursor Build Plan, or to future product iterations.

# **17\. Data Model Readiness Checklist**

·        32 providers confirmed in the current source dataset.  
·        Ten-category taxonomy defined.  
·        Multi-valued provider fields identified.  
·        Missing-value handling defined.  
·        Comparison data requirements defined.  
·        Searchable fields defined.  
·        Seed-data validation rules defined.  
·        Primary keys, uniqueness, and relationship constraints defined.  
·        Provider website/documentation resources defined.

Next artifact: UI/UX Specification. It should use this model to define exactly how provider, category, integration, pricing, and comparison data are presented to users without introducing provider logos.

**Apineer — Data Model v1.0**

