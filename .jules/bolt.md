## 2024-05-22 - Manual Deep Clone vs StructuredClone
**Learning:** The codebase prefers manual `deepClone` over `structuredClone` to handle custom classes (like Mongoose ObjectId) by reference, whereas `structuredClone` might fail or clone them incorrectly.
**Action:** When optimizing object manipulation, verify if custom types are involved before switching to native implementations.
