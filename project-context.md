# BMAD Project Context - Sauce Demo Playwright POC

## 1. Project Overview
This project automates end-to-end testing of the Sauce Demo web application using Playwright.

Application URL:
https://www.saucedemo.com

---

## 2. Purpose
To validate how structured project context (BMAD approach) improves AI-generated test consistency and reduces rework in test automation.

---

## 3. Application Flow
The core user journey is:

1. User logs in
2. User views product inventory
3. User adds products to cart
4. User proceeds to checkout
5. User completes purchase flow

---

## 4. Testing Scope

### In Scope
- Login functionality
- Product listing page
- Add to cart functionality
- Checkout flow

### Out of Scope
- Performance testing
- Security testing
- API testing
- UI design validation

---

## 5. Automation Guidelines
- Use Playwright with TypeScript
- Each test should represent one user flow
- Keep tests simple and readable
- Avoid unnecessary abstraction
- Prefer stable selectors (data-testid or semantic locators)

---

## 6. AI Usage Rule (BMAD Concept)
When generating tests using AI:

- Always refer to this project context
- Ensure consistency in test structure
- Avoid random or generic test generation
- Maintain alignment with defined user flows

---

## 7. Goal of This POC
Compare AI-generated test outputs:
- Without project context
- With structured BMAD context

Measure improvement in:
- Consistency
- Maintainability
- Rework reduction