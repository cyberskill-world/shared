## 2023-10-27 - Keyboard Scrolling for Overflow Containers

**Learning:** Scrollable areas (`overflow: auto` or `overflow: scroll`) that do not contain focusable elements are inherently inaccessible to keyboard-only users because they cannot be focused to scroll using arrow keys.
**Action:** Always add `tabIndex={0}`, `role="region"`, and an appropriate `aria-label` to containers with `overflow-y: auto` or `overflow-x: auto` to ensure they are keyboard focusable and correctly announced by screen readers.

## 2025-02-14 - Improve accessibility of global toast notifications

**Learning:** The default `react-hot-toast` Toaster component may not have the best accessibility ARIA attributes for screen readers. Using `toastOptions={{ ariaProps: { role: 'status', 'aria-live': 'polite' } }}` improves announcements for the specific `<Toaster />` instance it is applied to, so every `<Toaster />` provider in the application must use the same configuration for consistent screen reader behavior.
**Action:** Always verify third-party notification or toast libraries have `role="alert"` or `role="status"` and an `aria-live` attribute configured either internally or via props for screen reader users, and when multiple toast providers exist, configure each one consistently or centralize toast rendering behind a shared provider.
