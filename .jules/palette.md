## 2023-10-27 - Keyboard Scrolling for Overflow Containers

**Learning:** Scrollable areas (`overflow: auto` or `overflow: scroll`) that do not contain focusable elements are inherently inaccessible to keyboard-only users because they cannot be focused to scroll using arrow keys.
**Action:** Always add `tabIndex={0}`, `role="region"`, and an appropriate `aria-label` to containers with `overflow-y: auto` or `overflow-x: auto` to ensure they are keyboard focusable and correctly announced by screen readers.

## 2025-02-14 - Improve accessibility of global toast notifications

**Learning:** The default `react-hot-toast` Toaster component may not have the best accessibility ARIA attributes for screen readers. Using `toastOptions={{ ariaProps: { role: 'status', 'aria-live': 'polite' } }}` on the `<Toaster />` correctly announces all toasts across the application.
**Action:** Always verify third-party notification or toast libraries have `role="alert"` or `role="status"` and an `aria-live` attribute configured either internally or via props for screen reader users.
