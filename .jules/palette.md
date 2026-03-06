## 2024-05-18 - Improve Keyboard Accessibility and Tooltips for Interactive Elements

**Learning:** Found that custom buttons in modal components, specifically in `ApolloErrorComponent`, lacked explicit visual focus indicators (`:focus-visible`), hindering keyboard navigation accessibility. Additionally, icon-only or generic buttons can benefit from `title` tooltips for hover discovery, alongside their `aria-label` screen reader equivalents.
**Action:** Always ensure that any interactive elements (buttons, links) define `:focus-visible` styles to provide clear visual feedback to keyboard users. When creating buttons that are icon-only or have brief text, add `title` attributes to assist mouse users.

## 2024-05-15 - [Apollo Error Dialog Accessibility Improvements]
**Learning:** Found that Apollo error toast and dialog were using invalid Tailwind-like pseudo-classes (`ring`, `ring-color`) in standard SCSS modules, preventing keyboard focus visibility. Additionally, the `aria-labelledby` id on the dialog encompassed a "Reload" button, causing screen readers to improperly announce "Reload" as part of the dialog's title.
**Action:** Always ensure `aria-labelledby` targets a dedicated text-only element (like a `span`) rather than wrapper `div`s that contain interactive elements. Standardize focus states using `:focus-visible` with `outline` properties rather than relying on pseudo-classes in `.module.scss` files. Added explicit keyboard hints (`aria-keyshortcuts="Escape"` and `title` text) for modal close actions.
