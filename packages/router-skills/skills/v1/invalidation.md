---
id: invalidation
title: Invalidation
versions:
  - latest
  - ">=1 <2"
summary: Revalidate or invalidate route data.
resources:
  - https://tanstack.com/router/latest/docs/guide/invalidation
  - https://tanstack.com/router/latest/docs/api/router/invalidate
---

# Invalidation

Purpose:

- Revalidate or invalidate route data.

Scope:

- Use after mutations or data changes.

Guidelines:

- Invalidate the smallest scope needed.
- Pair invalidation with loader caching.
- Avoid refetch loops.

Example:

```ts
router.invalidate({ to: "/projects" })
```
