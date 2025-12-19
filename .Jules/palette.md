## 2024-05-22 - Accessibility in Modal Components
**Learning:** Modal components like ApolloErrorComponent often lack basic a11y features (role, aria-modal, focus management).
**Action:** When implementing or reviewing modals, always check for role='dialog', aria-modal='true', and Escape key support.
