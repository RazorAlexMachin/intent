---
id: use-matches
title: useMatches
versions:
  - latest
  - ">=1 <2"
summary: Read all active route matches.
resources:
  - https://tanstack.com/router/latest/docs/guide/matching
  - https://tanstack.com/router/latest/docs/api/router/use-matches
---

# useMatches

Purpose:

- Read all active route matches.

Scope:

- Use when you need data from multiple matched routes.

Guidelines:

- Keep match-derived UI minimal.
- Prefer route-level hooks where possible.
- Avoid heavy computation over matches.

Example:

```ts
const matches = useMatches()
```
