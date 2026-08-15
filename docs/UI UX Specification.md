**APINEER**

**UI/UX Specification**

MVP Build Preparation • Version 1.0 • 11 August 2026

 

A detailed text-based interface and interaction blueprint for implementation in Cursor. No static wireframes are required for the MVP.

 

# **1\. Purpose**

This document defines how the Apineer MVP should look, behave, and communicate information to users. It serves as the UI/UX blueprint for Cursor and replaces the need for separate low-fidelity wireframes.

The specification is derived from the existing Product Brief, PRD, Information Architecture, Provider Information, and Data Model. Airwallex and Stripe were reviewed as high-level design references for clarity, product grouping, developer-oriented calls to action, and documentation access. Their layouts, branding, wording, and visual identity are not copied.

# **2\. Product Experience Principles**

| Principle | What it means for Apineer |
| :---- | :---- |
| Clarity first | Users should understand what a provider does and whether it is relevant within a few seconds. |
| Decision support | The interface should help users evaluate tradeoffs rather than simply list providers. |
| Text-first | Provider names and structured information carry the experience; provider logos are excluded from the MVP. |
| Developer-friendly | Technical information should be easy to scan, while official documentation remains one click away. |
| Neutrality | Apineer should present providers consistently rather than visually favoring one provider. |
| Progressive disclosure | Show the most decision-useful information first, with deeper details further down the page. |
| Low friction | No login, no unnecessary onboarding, and minimal steps from discovery to provider details. |
| Trust through transparency | Show last-verified information and distinguish unavailable data from negative claims. |
| Responsive by default | Discovery and comparison must work on desktop and mobile. |

# **3\. Target Users and UX Jobs**

| User | Primary UX job |
| :---- | :---- |
| Developer | Find APIs that support a technical use case and quickly understand integration characteristics. |
| Product team / Product manager | Identify viable providers and compare product capabilities, coverage, and commercial considerations. |
| Startup founder | Quickly understand which providers may be relevant before committing engineering resources. |

Developers and product teams are the primary users in the PRD. Startup founders are retained as a secondary audience from the Product Brief, but they do not receive a separate workflow.

# **4\. Information Architecture**

| Navigation item | Destination |
| :---- | :---- |
| Home | / |
| About | /about |
| Categories | /categories |
| Providers | /providers |
| Compare | /compare |

The provider detail page is the central evaluation destination within the Providers experience.

Core user journey: Home → Search or Category → Provider List → Provider Detail → Compare or Official Documentation

Alternative journey: Providers → Search → Provider Detail → Compare

# **5\. Global Layout**

## **5.1 Desktop navigation**

·        Left: Apineer wordmark/text.  
·        Center/right: Home, Categories, Providers, Compare, About.  
·        Active section uses a subtle text, underline, or weight treatment.  
·        Do not use provider logos in the navigation.  
·        On narrower screens, collapse navigation into a compact menu.  
·        Keep Compare easy to reach because it is a core MVP function.

## **5.2 Header behavior**

·        Keep the header visually light and persistent where useful.  
·        Do not use a large promotional banner above the navigation.  
·        The header should not compete with the search/discovery experience.

# **6\. Visual Direction**

The visual direction should feel modern, calm, trustworthy, technical, and editorial. It should borrow useful principles from high-quality fintech/developer products without becoming visually similar to any single reference site.

| Area | Direction |
| :---- | :---- |
| Overall tone | Professional, clear, confident, understated. |
| Typography | Highly legible sans-serif with strong hierarchy. Avoid decorative display typography. |
| Color | Neutral base with one restrained accent color for links, actions, and selected states. |
| Surfaces | Clean backgrounds with subtle borders and restrained elevation. |
| Cards | Use cards where grouping helps scanning; avoid excessive card nesting. |
| Corners | Moderately rounded and consistent. |
| Icons | Simple utility icons only; icons support labels rather than replacing them. |
| Motion | Minimal; use short transitions for menus, filters, and comparison interactions. |
| Density | Information-rich but breathable; optimize for scanning rather than oversized marketing sections. |

Airwallex currently groups financial capabilities into product areas and provides dedicated developer resources, while Stripe combines product discovery with developer-oriented integration cues and documentation access. Apineer should adopt these broad usability lessons, not their designs.

# **7\. Homepage**

## **7.1 Purpose**

Help a first-time visitor understand Apineer immediately and begin discovering providers with minimal effort.

## **7.2 Text wireframe**

NAVIGATION  
 Apineer 	Categories  Providers  Compare  About

 Find the right fintech API  
 Discover, evaluate, and compare fintech API providers.

 \[ Search providers, APIs, categories... \]

 Browse by category  
 \[ Payments \] \[ Cards \] \[ Open Banking \] \[ Identity \]  
 \[ Lending \] \[ Fraud & Risk \] \[ Virtual Accounts \] ...

 Explore providers  
 Provider card   Provider card   Provider card

## **7.3 Hero**

·        Headline communicates discovery and comparison.  
·        Supporting text explains the value clearly.  
·        Primary action is the search field.  
·        No carousel.  
·        No large hero illustration as primary content.  
·        No signup or email capture.

## **7.4 Search field**

·        Large enough to be the obvious primary interaction.  
·        Placeholder such as “Search providers, APIs, categories...”  
·        Search accepts provider names and relevant category/product terms.  
·        Live suggestions are optional only if performance and accessibility remain strong.  
·        Support keyboard interaction and clearing.

## **7.5 Category section**

·        Display the ten categories as compact selectable items.  
·        Each category links to its category page.  
·        Use category names as the main labels.  
·        Do not add decorative category icons unless they have a clear usability purpose.

## **7.6 Provider discovery section**

Use “Explore providers” rather than “Top providers” or “Best providers” because Apineer does not yet have a ranking methodology.

# **8\. Providers Directory**

## **8.1 Purpose**

Provide a broad browseable view of the 32 providers in the current dataset.

## **8.2 Layout**

Desktop: page heading → search → category/filter controls → provider list/grid.  
 Mobile: page heading → search → filter control → provider list.

## **8.3 Provider card**

Provider Name  
 Short provider description

 \[Payments\] \[Virtual Accounts\]

 Nigeria · REST · Sandbox available

 View provider →

·        Provider name is the strongest visual element.  
·        Do not display provider logos.  
·        Description is concise and consistently truncated when necessary.  
·        Show category badges.  
·        Show only a small number of high-value summary attributes.  
·        The card is clickable, with a clear text action as well.

## **8.4 Filters**

·        Category is the primary filter.  
·        Country or sandbox filters may be added only if they improve the MVP without creating unnecessary complexity.  
·        Filters should be removable individually.  
·        On mobile, filters use a compact control or drawer.

# **9\. Category Pages**

Purpose: help developers and product teams explore providers relevant to one fintech API category.

Layout:  
 Category name  
 Short explanation

 Providers in this category  
 \[Search within category\]

 Provider card  
 Provider card  
 Provider card

·        Show only providers assigned to the category.  
·        A provider may appear in multiple category pages.  
·        Selecting a provider opens its detail page.  
·        Show the provider count where useful.  
·        Handle empty states gracefully.

# **10\. Provider Detail Page**

## **10.1 Purpose**

This is the most important page in Apineer. It should let a user understand a provider's relevance, integration characteristics, coverage, products, pricing, and official resources without visiting multiple pages first.

## **10.2 Page structure**

Provider name  
 Short description  
 \[Category\] \[Category\]

 \[Compare\] \[Provider Website\] \[Documentation\]

 Overview  
 Products & Features  
 Coverage  
 Integration  
 Pricing  
 Official Resources  
 Last verified

## **10.3 Provider header**

·        Provider name as page title.  
·        Short description directly below.  
·        Category badges visible.  
·        Primary actions: Compare, Documentation, Website.  
·        Documentation is the strongest developer-oriented external action.  
·        No provider logo.

## **10.4 Products & Features**

·        Products are readable labels.  
·        Features are scannable chips or compact lists.  
·        Avoid large comma-separated text blocks.  
·        Do not imply a feature exists when the source does not establish it.

## **10.5 Coverage**

·        Show supported countries as labels.  
·        Use a compact list for multiple countries.  
·        Do not use a geographic map in the MVP.  
·        Do not interpret missing country data as global availability.

## **10.6 Integration**

This section replaces the earlier idea of a separate “Developer Information” navigation area. It summarizes integration characteristics without reproducing documentation.

| Attribute | Display |
| :---- | :---- |
| API Style | Value or “Not available” |
| Authentication | Value or “Not available” |
| Sandbox | Available / Not available |
| SDK Languages | Language/platform labels or “Not available” |
| Webhooks | Available / Not available |

Detailed implementation instructions remain on the provider's official documentation.

## **10.7 Pricing**

·        Show the normalized pricing model.  
·        If the dataset says Talk to Sales, display “Talk to Sales”.  
·        If free-tier information is unavailable, show “Not available”.  
·        Where useful, link to the provider for current commercial details.

## **10.8 Official resources**

Official website →  
 Documentation →

·        Clearly label external destinations.  
·        Documentation opens the official documentation/developer portal.  
·        Apineer does not host or reproduce provider documentation.

## **10.9 Last verified**

Show metadata such as “Last verified: August 2026” without making it visually dominant.

# **11\. Comparison Experience**

## **11.1 Purpose**

Help users evaluate two providers against the same set of attributes. Comparison is a core MVP feature and should feel like a practical decision tool, not a marketing table.

## **11.2 Entry points**

·        Global Compare navigation.  
·        Compare button on provider detail.  
·        Optional compare action on provider cards.

## **11.3 Comparison setup**

Compare fintech API providers  
 Select two providers in the same category.

 \[ Provider A ▼ \]   \[ Provider B ▼ \]

 \[ Compare \]

## **11.4 Comparison table**

Attribute | Provider A | Provider B  
 Description | ... | ...  
 Categories | ... | ...  
 Products | ... | ...  
 Features | ... | ...  
 Coverage | ... | ...  
 API Style | ... | ...  
 Authentication | ... | ...  
 Sandbox | Available | Not available  
 SDKs | ... | ...  
 Webhooks | Available | ...  
 Pricing | ... | Talk to Sales  
 Free Tier | ... | Not available

·        Keep attribute names visible during mobile horizontal scrolling.  
·        Provider names are prominent in column headers.  
·        Use consistent row ordering.  
·        Do not visually declare a winner.  
·        Do not use green/red treatment to imply that one value is better.  
·        Allow each provider to be removed or replaced.  
·        Include links to both provider details and official documentation.

## **11.5 Same-category constraint**

If selected providers are not in the same category, explain the constraint and prompt the user to choose a compatible provider.

# **12\. About Page**

Keep the About page lightweight.

Suggested structure:  
 About Apineer  
 What Apineer helps you do  
 Who it's for  
 How provider information is sourced  
 Data freshness / last verified approach

Do not turn the MVP About page into a long company story.

# **13\. Search UX**

| State | Behavior |
| :---- | :---- |
| Empty | Show placeholder and no results panel. |
| Typing | Show matching results if live search is implemented. |
| Results | Show provider name, category context, and short description. |
| No results | Show “No results found” and suggest browsing categories/providers. |
| Clear | Restore the unfiltered discovery state. |

Search results should be compact and information-dense. Do not show the entire provider dataset in search results.

# **14\. Responsive Behavior**

| Area | Desktop | Mobile |
| :---- | :---- | :---- |
| Navigation | Horizontal navigation | Compact menu |
| Homepage hero | Wide search area | Full-width search |
| Provider cards | Multi-column grid or structured list | Single-column list |
| Category list | Grid/list | Stacked or scrollable list |
| Provider detail | Structured sections; optional two-column layout | Single-column sections |
| Comparison | Full table | Horizontally scrollable table; sticky attribute column if practical |
| Filters | Visible controls | Filter button/drawer |
| External actions | Inline buttons | Stacked/wrapped buttons |

Do not design a separate mobile product. Adapt the same information architecture and component system.

# **15\. Components**

| Component | Use |
| :---- | :---- |
| Navbar | Primary navigation. |
| SearchInput | Global/provider search. |
| CategoryBadge | Provider/category labels. |
| ProviderCard | Provider discovery. |
| ProviderList | Directory/category results. |
| FilterControl | Category and future filters. |
| SectionHeader | Consistent page sections. |
| DataRow | Provider attribute/value display. |
| AvailabilityBadge | Available / Not available states where useful. |
| ExternalLinkButton | Website/documentation actions. |
| CompareSelector | Provider selection. |
| ComparisonTable | Side-by-side comparison. |
| EmptyState | No-result and empty views. |
| ErrorState | Recoverable application errors. |
| LoadingState | Page/data loading. |

# **16\. Content and Copy Guidelines**

·        Use plain, direct language.  
·        Prefer concise descriptions over marketing-heavy copy.  
·        Do not call a provider “best”, “leading”, or “recommended” without an explicit methodology.  
·        Use “Not available” when information is missing.  
·        Use “Talk to Sales” when pricing is not publicly listed.  
·        Keep technical labels consistent with the provider dataset.  
·        Use “Documentation” for the official technical documentation/developer portal.  
·        Use “Website” for the provider's primary public website.

# **17\. Accessibility**

·        Use semantic HTML and a logical heading hierarchy.  
·        All controls must be keyboard accessible.  
·        Search fields require accessible labels.  
·        Focus states must be visible.  
·        Do not rely on color alone for availability or selection.  
·        Comparison tables require clear column and row headers.  
·        External links should have descriptive text.  
·        Text must remain readable at normal zoom and on small screens.

# **18\. Loading, Empty, and Error States**

| State | UI behavior |
| :---- | :---- |
| Loading | Use restrained skeletons/placeholders for major content blocks. |
| No search results | Explain that no providers matched and offer browsing actions. |
| No comparison provider | Prompt the user to select the missing provider. |
| Missing provider field | Show “Not available”. |
| Provider not found | Show a friendly message with links back to Providers and Categories. |
| Category not found | Show a friendly message with a link back to Categories. |
| External link failure | Keep the stored link; Apineer cannot control the provider site. |
| Unexpected app error | Show a friendly error state without technical details. |

# **19\. Interaction and Motion**

·        Use short transitions for menus, filters, selection, and hover/focus states.  
·        Avoid decorative animation.  
·        Do not use auto-playing video or moving hero content.  
·        Comparison changes should be visually clear but immediate.  
·        Focus and hover states should not unexpectedly change layout dimensions.

# **20\. Trust and Data Freshness UX**

·        Show “Last verified” on provider detail pages.  
·        Use official website and documentation links.  
·        Do not hide unavailable information.  
·        Do not visually treat missing data as a negative provider attribute.  
·        Do not imply that Apineer guarantees provider accuracy.

# **21\. SEO and Shareability UX**

·        Provider pages should have descriptive titles based on provider name.  
·        Category pages should have descriptive titles based on category.  
·        URLs should be human-readable.  
·        Provider and category pages should remain directly shareable.  
·        Important provider information should be accessible text rather than client-side graphics.

# **22\. Analytics-Related Interactions**

| Interaction | Track |
| :---- | :---- |
| Open provider | provider\_view |
| Use provider search | provider\_search |
| Open category | category\_view |
| Start comparison | comparison\_started |
| Remove/replace provider | provider\_removed\_from\_comparison |
| Click Documentation | documentation\_click |
| Click Website | website\_click |

# **23\. Explicit MVP Design Constraints**

·        No provider logos.  
·        No user login/signup.  
·        No reviews or ratings.  
·        No provider submission or claiming.  
·        No admin editing dashboard.  
·        No embedded provider documentation.  
·        No API testing environment.  
·        No AI recommendation interface.  
·        No complex map-based coverage visualization.  
·        No provider ranking or “best provider” labels without a defined methodology.

# **24\. Reference Research: Airwallex and Stripe**

Airwallex's current public product and developer experiences emphasize grouped capabilities, dedicated developer tooling, and clear access to APIs, SDKs, webhooks, testing, and documentation. Its API documentation also makes authentication, versioning, sandbox/testing, and API reference concepts easy to find.

Stripe's current payments experience combines product discovery with developer-centric integration cues, documentation access, test environments, webhooks, sample code, and clear pricing communication.

Apineer should take the underlying usability lessons—clear hierarchy, strong developer-resource access, structured product information, and concise calls to action—while maintaining its own neutral directory/comparison identity.

# **25\. Cursor Implementation Guidance**

·        Treat this document as the visual and interaction source of truth.  
·        Build reusable components rather than page-specific copies.  
·        Keep provider information text-first and logo-free.  
·        Use consistent spacing, typography, badges, buttons, and table patterns.  
·        Implement desktop and mobile behavior from the same component system.  
·        Do not add unrequested animations, illustrations, dashboards, or onboarding flows.  
·        If a visual decision is ambiguous, prefer simplicity and consistency over novelty.  
·        If a requirement conflicts with the PRD, stop and ask for clarification rather than silently changing scope.

# **26\. UI/UX Acceptance Checklist**

·        A first-time visitor can understand Apineer's purpose immediately.  
·        Search is the primary discovery interaction on the homepage.  
·        Users can browse all ten API categories.  
·        Users can browse all 32 providers.  
·        Provider cards do not use logos.  
·        Provider detail pages expose all available normalized provider information.  
·        Integration information is clearly summarized without reproducing documentation.  
·        Documentation and website links are prominent and external.  
·        Missing information displays as “Not available”.  
·        Pricing can display “Talk to Sales”.  
·        Users can compare two providers in the same category.  
·        Comparison attributes are presented consistently side by side.  
·        The interface does not declare a provider winner.  
·        Provider last-verified information is visible.  
·        Mobile layouts remain usable.  
·        Keyboard and accessibility basics are implemented.  
·        Loading, empty, and error states are designed.  
·        No out-of-scope MVP features have been introduced.

# **27\. Relationship to Other Product Documents**

| Document | Relationship |
| :---- | :---- |
| Product Brief | Provides product vision, users, and problem context. |
| PRD | Defines functional requirements and MVP boundary. |
| Information Architecture | Defines navigation and information organization. |
| Provider Information | Provides the provider content displayed by the UI. |
| Data Model | Defines how provider/category/product/feature/country/SDK data is structured. |
| Technical Specification | Defines application architecture and technical constraints. |
| Cursor Build Plan | Will translate this specification into a staged implementation sequence and prompts. |

Design direction summary: Apineer should feel like a focused research and decision-support tool for fintech APIs—not a fintech provider, not a documentation host, and not a generic SaaS dashboard.

