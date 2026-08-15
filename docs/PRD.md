### **Product Name**

Apineer

### **Problem Statement**

Developers and product teams sometimes struggle to choose the right fintech API for their products. They spend hours going through multiple documentation, relying on peer recommendations, comparing pricing across providers and sometimes discover better APIs after committing to an integration.

### **Solution**

A research and comparison platform that helps developers and product teams discover, evaluate, and compare fintech API providers.

### **Primary Users**

The primary users for the product are:

* Developers integrating fintech APIs  
* Product teams working on fintech products

#### **Pain Points**

* Difficulty finding the right fintech API providers  
* Difficulty comparing existing fintech API providers  
* Loss of time and effort spent on researching fintech API providers  
* Difficulty discovering smaller but effective API providers  
* Difficulty finding affordable fintech API providers

### **Goals**

* Help developers easily discover fintech API providers for their use case  
* Help product teams evaluate and assess existing fintech API providers  
* Help developers discover relatively unknown but effective API providers  
* Help developers compare tradeoffs between fintech API providers  
* Save product teams time on research

### **User Stories**

| User Story | Acceptance Criteria |
| ----- | ----- |
| As a developer, I want to find fintech API providers easily so that I don’t lose time on research | Users can search for fintech API providers Search returns matching provider name Selecting a search result opens the provider’s details page  If no providers match the search, a ‘No results found’ message is displayed |
| As a developer, I want to compare fintech API providers so that I choose the most suitable one for my use case | Users can select two providers in the same category for comparison Selected providers are displayed side by side Users can remove a provider from the comparison  The comparison includes all provider information available on the platform  |
| As a developer, I want to assess fintech API providers so that I can make an informed decision when choosing a provider | Users can open a dedicated details page for each provider  The provider page displays all available information collected for that provider.  |
| As a product manager, I want to browse fintech API providers by category so that I can quickly identify providers my team can integrate | Providers are grouped into predefined fintech categories Users can view providers by selecting a category A provider can appear in multiple categories  Users can navigate from a category to a provider’s detail page |

### **Functional Requirements**

* The system shall allow users to search for API providers  
* The system shall allow users to browse providers by category   
* The system shall display detailed information for a selected provider  
* The system shall allow users to compare providers in the same category  
* The system shall display comparable provider attributes side by side   
* The system shall display "Not available" for undisclosed provider information  
* The system shall allow providers to appear in multiple categories when applicable  
* The system shall allow users to access a provider's official documentation and website from the provider details page

### **MVP Scope**

* Search API providers  
* Compare API providers  
* Categorise providers  
* View providers details

### **Out of Scope**

* User reviews  
* Provider rating  
* Submit provider profile  
* Claim provider profile  
* Admin dashboard to edit profiles

### **Success Metrics**

* Unique visitors  
* Returning visitor rate  
* API documentation clicks  
* Provider comparison sessions  
* % of visitors viewing 2+ providers  
* % of comparison sessions resulting in a documentation click 

### **Risks & Mitigations**

* Lack of adoption  
  Mitigation \- Start with a focused MVP that makes discovering and comparing fintech API providers easier, then validate with target users   
* Outdated provider data  
  Mitigation \- Include a last-verified date, link to official provider sources, and periodically review provider information   
* Limited pricing transparency  
  Mitigation \- Use "Talk to Sales" rather than guessing pricing and link users to the provider for current pricing information 

### **Assumptions**

* Provider information can be reliably sourced from official provider websites and documentation.  
* Developers and product teams currently find it time-consuming to compare fintech API providers.  
* Developers and product teams would find value in a centralized tool for discovering and evaluating fintech API providers.

