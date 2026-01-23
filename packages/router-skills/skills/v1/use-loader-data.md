---
id: use-loader-data
title: useLoaderData
versions:
  - latest
  - ">=1 <2"
summary: Read data returned by a route loader.
resources:
  - https://tanstack.com/router/latest/docs/guide/loaders
  - https://tanstack.com/router/latest/docs/api/router/use-loader-data
---

# useLoaderData

Purpose:

- Read data returned by a route loader.

Scope:

- Use inside route components that rely on loader results.

Guidelines:

- Pair with a loader defined on the same route.
- Avoid fetching the same data in components.
- Treat loader data as the source of truth.

Example:

```ts
const data = route.useLoaderData()
```
