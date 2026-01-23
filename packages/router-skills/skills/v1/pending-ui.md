---
id: pending-ui
title: Pending UI
versions:
  - latest
  - ">=1 <2"
summary: Show pending indicators during navigation.
resources:
  - https://tanstack.com/router/latest/docs/guide/pending-ui
  - https://tanstack.com/router/latest/docs/api/router/use-router-state
---

# Pending UI

Purpose:

- Show pending indicators during navigation.

Scope:

- Use when showing global or route-level loading states.

Guidelines:

- Prefer route-level pending UI where possible.
- Avoid blocking navigation for long loads.
- Keep pending UI minimal to prevent flicker.

Example:

```ts
const isLoading = useRouterState().isLoading
```
