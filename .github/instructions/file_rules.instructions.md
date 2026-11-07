---
description: "Use when creating, editing, answering questions about, or reviewing TypeScript source files under src directories. Covers this repository's types, imports, naming, formatting, and validation conventions."
applyTo: "**/src/**/*.ts"
---

# TypeScript Source Guidelines

- Follow the existing patterns in the package you are changing; avoid introducing a new abstraction or dependency when an established helper fits.
- Prefer named exports. Re-export public modules from the package's `index.ts` barrel, and use `export type` for type-only exports.
- Define clear public shapes with `interface` or `type`; use string-literal unions for finite value sets. Keep types precise and let TypeScript infer straightforward local values.
- Use `import type` for type-only imports. Keep imports alphabetized and grouped with blank lines as required by the ESLint configuration.
- Match the repository's formatting: single quotes, semicolons, and two-space indentation. Use camelCase for values and functions, PascalCase for types, and kebab-case for multiword source filenames.
- Handle errors explicitly; do not silently swallow failures or return success-shaped fallbacks.
- Before finishing, run the relevant package lint and test scripts when available. Follow existing test patterns rather than introducing a new framework or test convention.
