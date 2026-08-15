**APINEER**

**Technical Specification**

MVP Build Preparation • Version 1.0 • 11 August 2026

 

Technical bridge from the approved product documents to implementation in Cursor.

 

# **1\. Purpose**

This document defines how the Apineer MVP should be implemented. It translates the Product Brief, PRD, Information Architecture, Market Research, and Provider Information into a practical technical plan. The Data Model, UI/UX Specification, and Cursor Build Plan will build on this document.

# **2\. Source of Truth**

| Source | Role in implementation |
| :---- | :---- |
| Product Brief | Defines the product problem, users, goals, and overall solution. |
| PRD | Functional source of truth for MVP behavior and scope. |
| Information Architecture | Source of truth for navigation and information organization. |
| Provider Information | Source of truth for the initial normalized provider dataset. |
| Market Research | Context for positioning and product decisions; not a technical specification. |

The PRD requires provider search, category browsing, provider details, comparison, side-by-side attributes, unavailable-value handling, multi-category providers, and official website/documentation links. It defines reviews, ratings, provider submission/claiming, and an admin editing dashboard as out of scope. (Source: PRD.)

# **3\. MVP Technical Scope**

## **3.1 In scope**

·        Public web application with no user login.  
·        Provider directory and provider detail pages.  
·        Browsing by the ten predefined API categories.  
·        Provider search.  
·        Category browsing/filtering.  
·        Comparison of two providers in the same category.  
·        Side-by-side comparison of comparable provider attributes.  
·        Display of “Not available” when provider information is undisclosed.  
·        Links to official provider websites and documentation.  
·        Last-verified provider information.  
·        Responsive web experience.

## **3.2 Out of scope**

·        User accounts or profiles.  
·        Reviews and ratings.  
·        Provider profile submission or claiming.  
·        Admin dashboard for editing profiles.  
·        API testing/execution inside Apineer.  
·        Re-hosting provider documentation.  
·        AI recommendations.  
·        Automated provider onboarding.  
·        Provider logos in the MVP.

# **4\. Recommended Architecture**

Proposed implementation architecture: one full-stack web application backed by a relational database. No microservices are needed for the MVP.

| Layer | Recommendation | Purpose |
| :---- | :---- | :---- |
| Framework | Next.js \+ React \+ TypeScript | Application, routing, rendering, and typed frontend/backend code. |
| Styling | Tailwind CSS | Fast, consistent implementation of the UI specification. |
| UI | Reusable component layer | Consistent cards, badges, tables, buttons, navigation, and states. |
| Database | PostgreSQL | Structured provider data and many-to-many relationships. |
| ORM | Drizzle ORM | Typed relational schema and database access. |
| Hosting | Vercel | Deployment for the Next.js application. |
| Version control | GitHub | Source control and deployment workflow. |
| Development | Cursor | Primary AI-assisted development environment. |

These stack choices are recommendations for implementation; they are not requirements stated in the source documents.

# **5\. Application Structure**

| Route | Purpose |
| :---- | :---- |
| / | Home and primary discovery. |
| /about | Explain Apineer. |
| /categories | Browse all API categories. |
| /categories/\[category\] | Providers within a category. |
| /providers | Browse/search all providers. |
| /providers/\[provider\] | Provider details and official resources. |
| /compare | Compare two providers. |

The Information Architecture defines Home, About, Categories, Providers, and Compare as the primary navigation.

# **6\. Core Application Behavior**

## **6.1 Discovery**

·        Search should find provider names and may also support category/product labels where useful.  
·        A search result opens the provider detail page.  
·        An empty search displays “No results found”.  
·        Users can browse providers by predefined category.  
·        A provider can belong to multiple categories.  
·        Category URLs should be stable and shareable.

## **6.2 Provider details**

The provider page should expose the normalized fields already collected:

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
·        Last verified  
·        Official website  
·        Official documentation

Provider logos are excluded from the MVP. Provider names are sufficient as the visual identity.

## **6.3 Integration information**

API style, authentication, sandbox, SDK languages, and webhooks should appear as a concise integration summary. Apineer should not reproduce full provider documentation; the official documentation link is the handoff for detailed integration work.

## **6.4 Comparison**

·        Allow comparison of two providers in the same category.  
·        Display comparable provider attributes side by side.  
·        Allow a selected provider to be removed.  
·        Show “Not available” for missing/undisclosed values.

# **7\. Data Architecture Requirements**

The normalized provider dataset should become relational data rather than one large free-form record. The exact schema belongs in the separate Data Model document.

·        Provider  
·        Category  
·        Core Product  
·        Feature  
·        Country  
·        Provider–Category relationship  
·        Provider–Product relationship  
·        Provider–Feature relationship  
·        Provider–Country relationship  
·        Provider resource links

The source dataset contains fields including API Categories, Core Products, Features, Countries Supported, API Style, Authentication, Sandbox, SDK Languages, Webhooks, Pricing Model, Free Tier, Documentation URL, Last Verified, and Source.

# **8\. Search and Filtering**

With an initial dataset of 32 providers, a dedicated search engine is unnecessary for the MVP. Database-backed search is sufficient and keeps the architecture simple.

·        Normalize case and whitespace.  
·        Prioritize provider-name matching.  
·        Support category browsing.  
·        Keep search responsive.  
·        Add database indexes for provider-name and relationship lookups.  
·        Do not add a third-party search service unless the dataset or performance later makes it necessary.

# **9\. External Provider Resources**

·        Use the official documentation URL stored in each provider record.  
·        Use the official website URL stored in each provider record.  
·        Do not mirror provider documentation.  
·        Make external destinations visually clear.  
·        Verify stored links before production.

# **10\. Provider Data Freshness**

The PRD identifies outdated provider information as a risk and calls for a last-verified date, official sources, and periodic review.

·        Store last\_verified for every provider.  
·        Store official source URLs.  
·        Never infer an unavailable value.  
·        Keep missing values as missing in the data layer.  
·        Maintain a seed/re-import process so provider data can be updated cleanly.

# **11\. Security and Privacy**

·        Keep database credentials and private configuration in environment variables.  
·        Never expose server secrets to the browser.  
·        Use parameterized database queries through the ORM.  
·        Validate user-controlled search/filter input.  
·        Do not collect payment credentials, identity documents, or sensitive financial data.  
·        Because there is no admin UI, provider-data writes should be restricted to the development/deployment process.

# **12\. Performance**

·        Prefer server-rendered or static-friendly pages where appropriate.  
·        Keep provider pages lightweight.  
·        Minimize unnecessary client-side JavaScript.  
·        Use database indexes for common lookups.  
·        Keep the initial architecture simple.

# **13\. Accessibility**

·        Use semantic HTML.  
·        Make all interactive controls keyboard accessible.  
·        Provide visible focus states.  
·        Use labels for search and comparison controls.  
·        Do not rely on color alone for status.  
·        Use clear table headers for comparisons.  
·        Use descriptive labels for external links.

# **14\. SEO and Discoverability**

·        Use meaningful page titles and meta descriptions.  
·        Use stable URLs for providers and categories.  
·        Generate page-specific metadata.  
·        Provide sitemap and robots configuration.  
·        Use semantic headings.

# **15\. Analytics**

The PRD's success metrics include unique visitors, returning visitors, documentation clicks, comparison sessions, visitors viewing two or more providers, and documentation clicks following comparisons.

| Event | Purpose |
| :---- | :---- |
| provider\_view | Measure provider-detail engagement. |
| provider\_search | Measure discovery behavior. |
| category\_view | Measure category discovery. |
| comparison\_started | Measure comparison usage. |
| provider\_removed\_from\_comparison | Understand comparison interaction. |
| documentation\_click | Measure handoff to official documentation. |
| website\_click | Measure handoff to provider website. |

The analytics vendor is intentionally not fixed here. It should be selected during implementation without becoming a blocker.

# **16\. Loading, Empty, and Error States**

| Situation | Required behavior |
| :---- | :---- |
| No search results | Show “No results found” and a path back to browsing. |
| Missing provider field | Show “Not available”. |
| Provider not found | Show a friendly provider-not-found page. |
| Category not found | Show a clear not-found state. |
| Data/database failure | Show a friendly error state without exposing stack traces. |
| Incomplete comparison | Prompt the user to select the required providers. |

# **17\. Testing Strategy**

## **17.1 Data tests**

·        Provider records match the schema.  
·        Category relationships are valid.  
·        Missing values render correctly.  
·        Comparison accepts only valid provider combinations.

## **17.2 Integration tests**

·        Search returns expected providers.  
·        Category pages show correct providers.  
·        Provider pages show correct records.  
·        Official links use stored URLs.  
·        Comparison renders both selected providers.

## **17.3 Manual acceptance tests**

·        Test all ten categories.  
·        Test providers with multiple categories.  
·        Test providers with missing fields.  
·        Test two-provider comparison.  
·        Test mobile and desktop layouts.

# **18\. Deployment**

| Environment | Purpose |
| :---- | :---- |
| Local | Development and testing in Cursor. |
| Preview | Review changes before production. |
| Production | Public Apineer MVP. |

·        Keep environment variables separate across environments.  
·        Maintain database migrations.  
·        Maintain a repeatable provider seed-data process.  
·        Run build/tests before production deployment.

# **19\. Rules for Cursor**

·        Read the product documents before implementation.  
·        Treat the PRD as the functional source of truth.  
·        Treat the Information Architecture as the navigation/content source of truth.  
·        Treat Provider Information as the source for seed data.  
·        Do not add provider logos.  
·        Do not add authentication.  
·        Do not add reviews, ratings, submissions, claims, or an admin dashboard.  
·        Do not invent provider information when the source value is unavailable.  
·        Ask for approval before changing the database, routing, authentication, or deployment architecture.  
·        Build and verify one feature at a time.

# **20\. Decisions Deferred to the Next Documents**

| Decision | Document |
| :---- | :---- |
| Exact database tables, fields, types, keys, and relationships | Data Model |
| Exact page layouts and component hierarchy | UI/UX Specification |
| Typography, spacing, visual tokens, responsive behavior, and UI states | UI/UX Specification |
| Implementation order and Cursor prompts | Cursor Build Plan |
| Final analytics vendor | Implementation decision |

# **21\. Technical Readiness Gate**

·        Technical Specification approved.  
·        Data Model finalized against the 30-provider dataset.  
·        UI/UX Specification completed; detailed text-based UI specification replaces wireframes.  
·        Cursor Build Plan completed.  
·        Provider seed data verified by the product owner.

Source basis: Apineer Product Brief, PRD, Market Research, Information Architecture, and Provider Information documents supplied in this conversation. Technical stack and architecture recommendations are explicitly recommendations where the source documents do not prescribe a choice.

