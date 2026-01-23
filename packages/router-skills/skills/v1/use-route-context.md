---
id: use-route-context
title: useRouteContext
versions:
  - latest
  - ">=1 <2"
summary: Read shared router context values.
resources:
  - https://tanstack.com/router/latest/docs/guide/router-context
  - https://tanstack.com/router/latest/docs/api/router/use-route-context
---

# useRouteContext

Purpose:

- Read shared router context values.

Scope:

- Use when you need dependencies provided at router creation.

Guidelines:

- Keep context stable across navigations.
- Prefer context over module globals.
- Keep context values serializable for SSR.

Example:

```ts
const { api } = route.useRouteContext()
```
