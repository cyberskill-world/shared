## 2026-02-06 - Recursive Array Slicing Performance
**Learning:** Using array destructuring `[head, ...rest]` in recursive functions causes O(N²) memory allocation due to creating new arrays at every step.
**Action:** Use an index pointer argument (e.g., `index = 0`) to traverse the array in O(N) space/time without modifying the original array.
