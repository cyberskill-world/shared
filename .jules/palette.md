## 2023-10-27 - Keyboard Scrolling for Overflow Containers

**Learning:** Scrollable areas (`overflow: auto` or `overflow: scroll`) that do not contain focusable elements are inherently inaccessible to keyboard-only users because they cannot be focused to scroll using arrow keys.
**Action:** Always add `tabIndex={0}`, `role="region"`, and an appropriate `aria-label` to containers with `overflow-y: auto` or `overflow-x: auto` to ensure they are keyboard focusable and correctly announced by screen readers.
