---
id: navigate-options
title: Navigate Options
versions:
  - latest
  - ">=1 <2"
summary: Control navigation with replace, state, and hash.
resources:
  - https://tanstack.com/router/latest/docs/guide/navigation
  - https://tanstack.com/router/latest/docs/api/router/navigate
---

# Navigate Options

Purpose:

- Control navigation with replace, state, and hash.

Scope:

- Use when you need custom navigation behavior.

Guidelines:

- Use `replace` for non-history transitions.
- Use `state` for transient UI intent.
- Keep hashes for in-page targets.

Example:

```ts
navigate({ to: "/projects", replace: true })
```
