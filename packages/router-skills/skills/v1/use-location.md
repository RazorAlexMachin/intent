---
id: use-location
title: useLocation
versions:
  - latest
  - ">=1 <2"
summary: Read the current location and search hash.
resources:
  - https://tanstack.com/router/latest/docs/guide/location
  - https://tanstack.com/router/latest/docs/api/router/use-location
---

# useLocation

Purpose:

- Read the current location and URL state.

Scope:

- Use when syncing UI with the full location.

Guidelines:

- Prefer route-scoped hooks when possible.
- Use location for hash or pathname-based UI.
- Avoid heavy work on every location change.

Example:

```ts
const location = useLocation()
```
