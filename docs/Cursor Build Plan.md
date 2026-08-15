**APINEER**

**Cursor Build Plan**

MVP Build Preparation • Version 1.0 • 11 August 2026

 

A staged implementation plan and prompt strategy for building Apineer with Cursor.

 

# **1\. Purpose**

This document translates the approved Apineer product artifacts into an implementation sequence for Cursor. It is intentionally staged: Cursor should not be asked to build the entire product in one prompt.

The plan uses the Product Brief, PRD, Information Architecture, Provider Information, Technical Specification, Data Model, and UI/UX Specification as the source material. The Technical Specification states that the PRD is the functional source of truth, the Information Architecture is the navigation/content source of truth, and Provider Information is the source for seed data. fileciteturn7file2L195-L217

# **2\. What Cursor Is Being Asked to Build**

Apineer is a public fintech API discovery and comparison web application. The MVP allows users to discover providers, browse ten API categories, search providers, view detailed provider information, compare two providers in the same category, and hand off to official provider websites/documentation.

The MVP does not include accounts, reviews, provider submissions, an admin dashboard, API execution/testing, embedded provider documentation, AI recommendations, automated provider onboarding, or provider logos. fileciteturn7file2L218-L240

# **3\. Implementation Source-of-Truth Hierarchy**

| Priority | Document | How Cursor should use it |
| :---- | :---- | :---- |
| 1 | PRD | Functional requirements, MVP scope, and acceptance criteria. |
| 2 | Information Architecture | Routes, navigation, content organization, and user flows. |
| 3 | Data Model | Database entities, fields, relationships, missing-data handling, and seed structure. |
| 4 | UI/UX Specification | Visual direction, page layouts, components, responsive behavior, accessibility, and interaction states. |
| 5 | Technical Specification | Recommended architecture, stack, testing, deployment, and technical constraints. |
| 6 | Provider Information | Actual initial provider data and official resource URLs. |
| 7 | Product Brief / Market Research | Product context and positioning; not permission to expand MVP scope. |

If two documents appear to conflict, Cursor should not silently choose a new product behavior. The implementation should pause for clarification, consistent with the Technical Specification and UI/UX guidance. fileciteturn7file0L81-L91

# **4\. Recommended Technical Baseline**

The Technical Specification recommends a single full-stack web application with a relational database and no microservices for the MVP. Its recommended stack is Next.js \+ React \+ TypeScript, Tailwind CSS, PostgreSQL, Drizzle ORM, Vercel, GitHub, and Cursor. These are implementation recommendations rather than requirements from the original product documents. fileciteturn7file2L241-L280

| Layer | Recommendation |
| :---- | :---- |
| Framework | Next.js \+ React \+ TypeScript |
| Styling | Tailwind CSS |
| UI | Reusable component layer |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Hosting | Vercel |
| Version control | GitHub |
| Development | Cursor |

# **5\. Before Opening Cursor: Prepare the Project Folder**

Do not start by asking Cursor to build pages. First prepare the workspace and source documents.

·        Create or open the Apineer project repository in Cursor.  
·        Place the approved product artifacts in a clearly named /docs directory if they are not already available to Cursor.  
·        Include Product Brief, PRD, Market Research, Information Architecture, Provider Information, Technical Specification, Data Model, and UI/UX Specification.  
·        Ensure Provider Information is the current 32-provider version.  
·        Confirm the working branch is clean or create a dedicated feature/build branch.  
·        Confirm the local Node/package-manager environment before allowing Cursor to modify dependencies.  
·        Do not manually create database tables before Cursor has reviewed the Data Model.

Recommended documentation folder:

/docs  
   Product Brief.md  
   PRD.md  
   Market Research.md  
   Information Architecture.md  
   Provider Information.md  
   Technical Specification.md  
   Data Model.md  
   UI UX Specification.md  
   Cursor Build Plan.md

# **6\. First Cursor Prompt: Repository and Product Context**

Use this as the first prompt after the repository and documents are available:

You are implementing Apineer, a fintech API discovery and comparison MVP.

 Before changing any code:  
 1\. Read every document in /docs.  
 2\. Summarize the product purpose, MVP scope, routes, data model, UI/UX rules, technical stack, and explicit out-of-scope items.  
 3\. Identify any contradictions between the documents.  
 4\. Do not make product decisions to resolve contradictions. Report them first.  
 5\. Inspect the existing repository and determine whether an application already exists.  
 6\. Do not install dependencies, create database tables, or build UI yet.

 Return:  
 \- Current repository state  
 \- Relevant existing files  
 \- Proposed implementation sequence  
 \- Any conflicts or missing information  
 \- The first implementation step you recommend

# **7\. Build Strategy**

Build vertically and verify each layer before moving on. The preferred order is foundation → database → seed data → reusable UI → discovery → provider pages → comparison → quality → deployment.

| Phase | Goal | Output |
| :---- | :---- | :---- |
| 0 | Understand repository and source documents | Implementation plan confirmed |
| 1 | Application foundation | Working Next.js app and base structure |
| 2 | Database foundation | Drizzle schema and migrations |
| 3 | Provider seed pipeline | 32 providers loaded and validated |
| 4 | Design system/components | Reusable UI primitives |
| 5 | Global shell | Navigation, layout, responsive foundation |
| 6 | Discovery | Homepage, search, provider directory |
| 7 | Categories | Category index and category detail pages |
| 8 | Provider details | Complete provider page and external resources |
| 9 | Comparison | Two-provider same-category comparison |
| 10 | Quality | Accessibility, errors, SEO, analytics, tests |
| 11 | Production | Vercel deployment and final acceptance |

# **8\. Phase 0 — Repository Audit**

Goal: understand what already exists before changing it.

Cursor task:

·        Inspect package.json and lockfiles.  
·        Inspect app/src structure and existing routes.  
·        Inspect configuration files.  
·        Inspect existing database or ORM setup if present.  
·        Inspect environment-variable conventions.  
·        Inspect Git state.  
·        Do not overwrite working code without explaining why.

Acceptance gate:

·        Cursor can identify the framework and current app structure.  
·        Dependencies are understood.  
·        No unnecessary dependency changes have been made.  
·        The implementation plan is consistent with the approved documents.

# **9\. Phase 1 — Application Foundation**

Goal: establish the agreed technical baseline without implementing product features.

Cursor should:

·        Create or stabilize the Next.js \+ React \+ TypeScript application.  
·        Configure Tailwind CSS.  
·        Set up the base application structure.  
·        Create a sensible src/app or equivalent route structure.  
·        Create environment-variable handling.  
·        Set up a basic error boundary strategy.  
·        Add formatting/linting/type-checking if not already present.  
·        Verify the app runs locally.

Do not build provider cards, search, comparison, or database features in this phase.

Phase 1 prompt:

Implement only the Apineer application foundation.

 Use the Technical Specification as the technical source and do not add product features yet.

 Requirements:  
 \- Next.js \+ React \+ TypeScript  
 \- Tailwind CSS  
 \- Clean application structure  
 \- Environment-variable handling  
 \- Basic error handling  
 \- Formatting/linting/type-checking where appropriate  
 \- Local development must work

 Do not implement provider data, search, comparison, or final page UI yet.

 After implementation:  
 1\. Run the available checks.  
 2\. Report files changed.  
 3\. Report commands run and their results.  
 4\. Identify anything that remains before the database phase.

# **10\. Phase 2 — Database and Drizzle Schema**

Goal: implement the Data Model exactly enough to support the MVP. The Data Model defines providers, categories, products, features, countries, SDK languages, and their many-to-many relationships. It also requires NULL for source values represented by '-' and “Not available” at the UI layer. fileciteturn7file9L908-L929

Cursor should create:

·        providers  
·        categories  
·        provider\_categories  
·        products  
·        provider\_products  
·        features  
·        provider\_features  
·        countries  
·        provider\_countries  
·        sdk\_languages  
·        provider\_sdk\_languages

Database implementation rules:

·        Use primary keys and uniqueness constraints from the Data Model.  
·        Use relational join tables for multi-valued fields.  
·        Do not store '-' as a database value for missing information.  
·        Use NULL for missing values.  
·        Use foreign keys.  
·        Add the recommended indexes.  
·        Create migrations rather than relying on an undocumented database state.  
·        Do not invent additional entities such as users, reviews, submissions, or admin records.

Phase 2 prompt:

Implement the Apineer database layer from the Data Model document.

 Requirements:  
 \- PostgreSQL  
 \- Drizzle ORM  
 \- Implement every MVP entity and relationship defined in the Data Model.  
 \- Preserve the distinction between NULL/missing and negative values.  
 \- Add primary keys, foreign keys, uniqueness constraints, and recommended indexes.  
 \- Create repeatable migrations.  
 \- Do not add out-of-scope entities.

 Before coding, map every Data Model entity to a database table and show the mapping.  
 After coding:  
 \- run type checks  
 \- run migration/schema validation  
 \- report the resulting tables and relationships  
 \- do not seed data yet.

# **11\. Phase 3 — Provider Seed Data**

Goal: transform the current Provider Information document into relational seed data. The Data Model explicitly states that the current source contains 32 providers and that all 32 must be included in the initial seed. fileciteturn7file4L903-L910

Seed rules:

·        Provider Information is the source of truth.  
·        Do not guess missing values.  
·        Convert '-' to NULL.  
·        Preserve provider wording where the normalized dataset specifies it.  
·        Normalize categories, products, features, countries, and SDK languages into reference rows.  
·        Create relationship rows without duplicates.  
·        Seed all 32 providers.  
·        Make the seed process idempotent or safely rerunnable.  
·        Do not silently omit a provider because some fields are unavailable.

The Data Model specifies that the source document should remain the human-readable reference, while the seed script transforms it into relational rows and the database becomes the runtime source for the UI. fileciteturn7file4L435-L441

Phase 3 prompt:

Implement the Apineer seed-data pipeline using Provider Information as the only source for provider facts.

 Requirements:  
 \- Seed all 32 providers in the current Provider Information document.  
 \- Seed the ten controlled categories.  
 \- Normalize products, features, countries, and SDK languages.  
 \- Create all relationship records.  
 \- Convert '-' to NULL.  
 \- Never infer or fabricate missing provider information.  
 \- Preserve official website and documentation URLs.  
 \- Preserve last\_verified and source values.  
 \- Make the seed process safely rerunnable.

 Before implementation, generate a validation report showing:  
 \- provider count  
 \- category count  
 \- providers with missing fields  
 \- relationship counts  
 \- duplicate names  
 \- duplicate relationships

 Then implement the seed process and run it against the local database.

# **12\. Phase 4 — Design System and Reusable Components**

Goal: implement the visual foundation from the UI/UX Specification before assembling full pages.

Create reusable components for:

·        Navbar  
·        SearchInput  
·        CategoryBadge  
·        ProviderCard  
·        ProviderList  
·        FilterControl  
·        SectionHeader  
·        DataRow  
·        AvailabilityBadge  
·        ExternalLinkButton  
·        CompareSelector  
·        ComparisonTable  
·        EmptyState  
·        ErrorState  
·        LoadingState

These components are explicitly defined by the UI/UX Specification. fileciteturn7file5L515-L531

Visual rules:

·        Modern, calm, trustworthy, technical, editorial.  
·        Neutral base with one restrained accent.  
·        Readable sans-serif typography.  
·        Subtle borders and restrained elevation.  
·        Moderate corner rounding.  
·        Minimal motion.  
·        No provider logos.  
·        No decorative UI that competes with provider information.

Phase 4 prompt:

Implement Apineer's reusable UI component foundation from the UI/UX Specification.

 Do not build complete pages yet.

 Create and document reusable components for:  
 Navbar, SearchInput, CategoryBadge, ProviderCard, ProviderList, FilterControl,  
 SectionHeader, DataRow, AvailabilityBadge, ExternalLinkButton, CompareSelector,  
 ComparisonTable, EmptyState, ErrorState, LoadingState.

 Requirements:  
 \- Consistent spacing and typography  
 \- Responsive behavior  
 \- Keyboard accessibility  
 \- Visible focus states  
 \- No provider logos  
 \- Minimal animation  
 \- Use “Not available” for missing data  
 \- Keep components generic enough to be reused across pages

 Create a simple internal showcase/test route only if useful for validating the components, and remove it if it is not needed for the final product.

# **13\. Phase 5 — Global Shell and Routes**

The Technical Specification defines the MVP routes as /, /about, /categories, /categories/\[category\], /providers, /providers/\[provider\], and /compare. fileciteturn7file2L281-L307

| Route | Build target |
| :---- | :---- |
| / | Home and primary discovery |
| /about | About Apineer |
| /categories | All ten API categories |
| /categories/\[category\] | Providers within a category |
| /providers | All providers and search |
| /providers/\[provider\] | Provider details and official resources |
| /compare | Two-provider comparison |

Cursor should create the route structure and global layout before implementing detailed page content.

# **14\. Phase 6 — Homepage and Provider Discovery**

Goal: make the product usable for the first discovery journey.

Homepage requirements:

·        Clear Apineer purpose.  
·        Search is the primary discovery interaction.  
·        Browse-by-category section.  
·        Provider discovery section.  
·        No signup.  
·        No provider logos.  
·        No promotional carousel.

Providers directory requirements:

·        Browse all 32 providers.  
·        Search providers.  
·        Category filtering.  
·        Provider cards with name, description, category badges, and selected high-value summary fields.  
·        Responsive layout.  
·        No provider ranking language.

The UI/UX Specification states that search should be the primary homepage interaction and that the directory should support browsing the 32 current providers. fileciteturn7file1L140-L158

Phase 6 prompt:

Implement Apineer's homepage and Providers directory.

 Use the UI/UX Specification exactly for layout and interaction direction.

 Homepage:  
 \- lightweight navigation  
 \- clear product purpose  
 \- prominent provider/API/category search  
 \- ten-category browsing section  
 \- “Explore providers” discovery section

 Providers:  
 \- searchable list/grid  
 \- category filtering  
 \- all 32 seeded providers  
 \- provider cards  
 \- loading, empty, and error states

 Search should prioritize provider names and may support category/product labels.  
 Do not add ranking, ratings, logos, login, or recommendations.

 After implementation, manually verify:  
 \- all 32 providers are reachable  
 \- category filtering works  
 \- empty search state works  
 \- mobile layout works.

# **15\. Phase 7 — Category Experience**

Goal: support category-led discovery.

Implement:

·        Categories index containing all ten categories.  
·        Category detail pages.  
·        Provider list filtered to the selected category.  
·        Category search where useful.  
·        Stable, human-readable category URLs.  
·        Correct handling of providers that belong to multiple categories.

A provider can belong to multiple categories, and category URLs should be stable/shareable. fileciteturn7file7L745-L752

Phase 7 prompt:

Implement the Categories experience.

 Requirements:  
 \- Display the ten predefined categories.  
 \- Each category links to /categories/\[category\].  
 \- Category detail pages show only providers assigned to that category.  
 \- A provider may appear in multiple categories.  
 \- Use the reusable ProviderCard and ProviderList components.  
 \- Support responsive layouts.  
 \- Handle invalid category slugs with the defined not-found state.  
 \- Do not introduce additional categories.

# **16\. Phase 8 — Provider Detail Page**

Goal: build the core evaluation page. The Technical Specification lists the normalized provider fields that must be exposed, including name, description, categories, products, features, countries, API style, authentication, sandbox, SDK languages, webhooks, pricing, free tier, last verified, website, and documentation. fileciteturn7file7L753-L771

Page sections:

·        Provider header  
·        Overview  
·        Products & Features  
·        Coverage  
·        Integration  
·        Pricing  
·        Official Resources  
·        Last verified

Integration section:

·        API Style  
·        Authentication  
·        Sandbox  
·        SDK Languages  
·        Webhooks

The UI/UX specification explicitly treats these as a concise integration summary and keeps detailed implementation instructions on the provider's official documentation. fileciteturn7file7L772-L778

Phase 8 prompt:

Implement the Apineer provider detail page.

 Use the Data Model for data shape and the UI/UX Specification for layout.

 Display:  
 \- Provider name  
 \- Description  
 \- Categories  
 \- Products  
 \- Features  
 \- Countries supported  
 \- API style  
 \- Authentication  
 \- Sandbox  
 \- SDK languages  
 \- Webhooks  
 \- Pricing model  
 \- Free tier  
 \- Last verified  
 \- Official website  
 \- Official documentation

 Rules:  
 \- Missing values display as “Not available”.  
 \- “Talk to Sales” remains “Talk to Sales”.  
 \- Do not turn missing data into “No”.  
 \- Do not reproduce provider documentation.  
 \- Documentation and website are external links.  
 \- Do not display a provider logo.  
 \- Include a Compare action.

 Add the appropriate loading, not-found, and error states.

# **17\. Phase 9 — Comparison**

Goal: implement the second major decision-support workflow. The MVP comparison is two providers in the same category, with comparable attributes displayed side by side. fileciteturn7file7L774-L778

Comparison fields should include:

·        Description  
·        Categories  
·        Products  
·        Features  
·        Coverage  
·        API Style  
·        Authentication  
·        Sandbox  
·        SDK Languages  
·        Webhooks  
·        Pricing  
·        Free Tier

Behavior:

·        Allow selection of Provider A and Provider B.  
·        Validate the same-category constraint.  
·        Allow a selected provider to be removed/replaced.  
·        Show “Not available” for NULL values.  
·        Do not declare a winner.  
·        Provide links to provider details and official documentation.  
·        Support horizontal scrolling on mobile.

Phase 9 prompt:

Implement the Apineer comparison experience.

 Requirements:  
 \- Compare exactly two providers for the MVP.  
 \- Enforce the same-category requirement.  
 \- Allow either provider to be replaced.  
 \- Display the comparison attributes defined in the UI/UX Specification.  
 \- Use a consistent row order.  
 \- Show “Not available” for NULL values.  
 \- Do not score, rank, recommend, or declare a winner.  
 \- Link to both provider detail pages and official documentation.  
 \- Make the table usable on mobile.

 Before implementation, confirm the comparison data can be queried efficiently from the existing relational model. Do not create a separate comparison database table.

# **18\. Phase 10 — Quality, Accessibility, SEO, and Analytics**

## **18.1 Accessibility**

·        Semantic HTML.  
·        Logical heading hierarchy.  
·        Keyboard-accessible controls.  
·        Visible focus states.  
·        Accessible search labels.  
·        Comparison table row and column headers.  
·        Descriptive external-link labels.  
·        Do not rely on color alone.

These requirements are explicitly defined in the UI/UX Specification. fileciteturn7file8L817-L825

## **18.2 Loading, empty, and error states**

·        No results → “No results found” plus browsing path.  
·        Missing provider field → “Not available”.  
·        Provider not found → friendly not-found page.  
·        Category not found → clear not-found state.  
·        Database failure → friendly error without stack traces.  
·        Incomplete comparison → prompt for required providers.

These states are also part of the Technical Specification testing requirements. fileciteturn7file0L22-L42

## **18.3 SEO**

·        Descriptive provider-page titles.  
·        Descriptive category-page titles.  
·        Human-readable URLs.  
·        Directly shareable provider and category pages.  
·        Important provider information rendered as accessible text.

## **18.4 Analytics**

The UI/UX Specification identifies the following events:

| Interaction | Event |
| :---- | :---- |
| Open provider | provider\_view |
| Use provider search | provider\_search |
| Open category | category\_view |
| Start comparison | comparison\_started |
| Remove/replace provider | provider\_removed\_from\_comparison |
| Click Documentation | documentation\_click |
| Click Website | website\_click |

The analytics vendor is intentionally not fixed in the Technical Specification; choose it during implementation without making it a blocker. fileciteturn7file0L11-L21

# **19\. Phase 11 — Testing**

Testing should happen continuously, not only at the end.

| Test layer | Minimum coverage |
| :---- | :---- |
| Type/data tests | Schema, provider records, category relationships, missing values, comparison validity. |
| Integration tests | Search, category pages, provider pages, official links, comparison. |
| Manual acceptance | All ten categories, multi-category providers, missing fields, comparison, mobile, desktop. |

These testing expectations are defined in the Technical Specification. fileciteturn7file0L45-L62

Cursor testing prompt:

Audit the current Apineer implementation against the approved product documents.

 Run:  
 \- type checking  
 \- linting  
 \- build  
 \- database/schema checks  
 \- automated tests  
 \- any available integration tests

 Then manually inspect:  
 \- all ten categories  
 \- representative providers with multiple categories  
 \- providers with missing fields  
 \- provider detail pages  
 \- two-provider comparison  
 \- search/no-results  
 \- mobile layout  
 \- desktop layout  
 \- external website/documentation links

 Report failures by severity and fix only issues that are within the approved MVP scope.

# **20\. Phase 12 — Production Preparation**

The Technical Specification defines Local, Preview, and Production environments and requires separate environment variables, maintained migrations, repeatable provider seed data, and build/tests before production deployment. fileciteturn7file0L63-L80

Before deployment:

·        Confirm production database.  
·        Apply migrations.  
·        Seed/verify the 32 providers.  
·        Set production environment variables.  
·        Run production build.  
·        Run tests.  
·        Verify external links.  
·        Verify all routes.  
·        Verify responsive behavior.  
·        Deploy preview first.  
·        Review preview before production.

# **21\. Cursor Rules: Non-Negotiable**

·        Read the relevant product documents before implementing a feature.  
·        PRD controls functional scope.  
·        Information Architecture controls navigation.  
·        Data Model controls database structure.  
·        UI/UX Specification controls interface behavior and visual direction.  
·        Provider Information controls provider facts.  
·        Do not invent provider information.  
·        Do not add provider logos.  
·        Do not add authentication.  
·        Do not add reviews or ratings.  
·        Do not add provider submissions or claiming.  
·        Do not add an admin dashboard.  
·        Do not re-host provider documentation.  
·        Do not add an API execution/testing environment.  
·        Do not add AI recommendations.  
·        Do not introduce a third-party search service for the MVP.  
·        Do not introduce microservices.  
·        Do not make large architectural changes without approval.  
·        Do not silently resolve contradictions between documents.  
·        Build and verify one phase at a time.

The Technical Specification explicitly instructs Cursor to read the product documents, treat the PRD as the functional source of truth, use Information Architecture for navigation, use Provider Information for seed data, avoid provider logos and out-of-scope features, and ask before changing architecture. fileciteturn7file0L81-L91

# **22\. Recommended Cursor Working Method**

Do not paste the entire build plan into Cursor repeatedly. Use it as the project plan and give Cursor focused prompts.

| Pattern | Recommended behavior |
| :---- | :---- |
| One phase at a time | Finish and verify the current phase before moving on. |
| Small prompts | Ask for one coherent implementation unit rather than the whole product. |
| Inspect before edit | Cursor should inspect existing files before changing them. |
| Show changes | Ask Cursor to report files changed and why. |
| Run checks | Every meaningful phase ends with typecheck/lint/build/tests as appropriate. |
| Commit often | Create logical Git commits after stable milestones. |
| Avoid speculative work | Do not implement future features “while you're here”. |
| Use acceptance criteria | Verify the phase against the relevant document before proceeding. |

# **23\. Suggested Git Milestones**

| Commit point | Suggested commit |
| :---- | :---- |
| After foundation | chore: establish app foundation |
| After database | feat: add provider data model |
| After seed pipeline | feat: seed provider dataset |
| After components | feat: add shared UI components |
| After shell | feat: add application navigation and layout |
| After discovery | feat: add provider discovery |
| After categories | feat: add category browsing |
| After provider pages | feat: add provider detail pages |
| After comparison | feat: add provider comparison |
| After quality pass | chore: complete MVP quality pass |
| Production-ready | chore: prepare production deployment |

# **24\. Master Cursor Context Prompt**

You are the implementation agent for Apineer.

 Project:  
 Apineer is a public fintech API discovery and comparison MVP.

 Source documents in /docs:  
 \- Product Brief  
 \- PRD  
 \- Market Research  
 \- Information Architecture  
 \- Provider Information  
 \- Technical Specification  
 \- Data Model  
 \- UI/UX Specification  
 \- Cursor Build Plan

 Source-of-truth rules:  
 \- PRD \= functional scope  
 \- Information Architecture \= navigation/content organization  
 \- Data Model \= database structure  
 \- UI/UX Specification \= interface and interaction behavior  
 \- Technical Specification \= technical architecture/constraints  
 \- Provider Information \= provider facts and seed data  
 \- Product Brief/Market Research \= context, not permission to expand scope

 MVP:  
 \- public web app  
 \- provider discovery  
 \- ten API categories  
 \- provider search  
 \- provider detail pages  
 \- two-provider comparison within the same category  
 \- official website/documentation links  
 \- last-verified information  
 \- responsive UI

 Explicitly out of scope:  
 \- authentication  
 \- accounts  
 \- reviews/ratings  
 \- provider submissions/claiming  
 \- admin dashboard  
 \- API execution/testing  
 \- re-hosted documentation  
 \- AI recommendations  
 \- automated onboarding  
 \- provider logos

 Implementation principles:  
 \- use the approved documents rather than guessing  
 \- do not fabricate provider data  
 \- missing source values become NULL and display as “Not available”  
 \- build reusable components  
 \- keep the interface text-first and neutral  
 \- verify each phase before proceeding  
 \- report conflicts rather than silently resolving them

 Do not implement anything until you have inspected the repository and read the relevant source documents for the current phase.

# **25\. Final Build Acceptance Gate**

Before calling the MVP build complete, verify all of the following:

·        All approved documents are reflected in the implementation.  
·        All 32 providers are present.  
·        All ten categories are present.  
·        Providers can belong to multiple categories.  
·        Provider search works.  
·        Category browsing works.  
·        Provider detail pages expose the normalized information.  
·        Missing information displays as “Not available”.  
·        Pricing can display “Talk to Sales”.  
·        Official documentation and website links work.  
·        Two providers can be compared when they share a category.  
·        Comparison does not declare a winner.  
·        Provider logos are not used.  
·        No out-of-scope MVP functionality has been introduced.  
·        Desktop and mobile layouts work.  
·        Accessibility basics pass.  
·        Loading, empty, and error states work.  
·        SEO metadata and shareable URLs are present.  
·        Analytics events are wired if an analytics provider has been selected.  
·        Database migrations are repeatable.  
·        Seed data is repeatable.  
·        Production build succeeds.  
·        Preview deployment has been reviewed before production.

# **26\. What You Should Do in Cursor, in Order**

1\.       Create/open the Apineer repository.  
2\.       Place the approved product/build documents in /docs.  
3\.       Give Cursor the Repository and Product Context prompt.  
4\.       Resolve any contradictions it identifies before coding.  
5\.       Run Phase 1: application foundation.  
6\.       Run Phase 2: database and Drizzle schema.  
7\.       Run Phase 3: 32-provider seed pipeline.  
8\.       Run Phase 4: reusable UI components.  
9\.       Run Phase 5: global shell and routes.  
10\.   Run Phase 6: homepage and provider discovery.  
11\.   Run Phase 7: category experience.  
12\.   Run Phase 8: provider detail pages.  
13\.   Run Phase 9: comparison.  
14\.   Run Phase 10: accessibility, SEO, analytics, and error states.  
15\.   Run Phase 11: testing and manual acceptance.  
16\.   Run Phase 12: preview deployment, review, then production.

Do not give Cursor a single “build the entire app” prompt. The staged approach makes it much easier to catch data-model, scope, and UI problems before they spread across the application.

# **27\. Relationship to the Other Artifacts**

| Artifact | Status / role |
| :---- | :---- |
| Product Brief | Product vision and problem context |
| Market Research | Market/context evidence |
| Information Architecture | Navigation and information organization |
| Provider Information | 32-provider source dataset |
| PRD | Functional MVP requirements and scope |
| Technical Specification | Architecture and technical requirements |
| Data Model | Database structure and data relationships |
| UI/UX Specification | Interface and interaction blueprint |
| Cursor Build Plan | Implementation sequence and Cursor operating instructions |

The Technical Specification identifies the Cursor Build Plan as the artifact responsible for implementation order and Cursor prompts. This document fulfills that role. fileciteturn7file0L92-L109

 

Apineer — Cursor Build Plan v1.0

