
## 2024-05-19 - Focus trap on initial wrapper focus
**Learning:** Focus traps implemented with `keydown` event handlers inside custom modal or dialog components must account for the initial focus state when the wrapper element itself is focused. If a user presses `Shift+Tab` when focus is on the container instead of the first focusable element inside it, the focus might escape the dialog if not explicitly handled.
**Action:** When implementing or modifying custom focus traps, verify the `document.activeElement` against both the first/last focusable elements and the container ref itself.
