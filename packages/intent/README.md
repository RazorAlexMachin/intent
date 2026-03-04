# @tanstack/intent

Ship compositional knowledge for AI coding agents alongside your npm packages.

Skills are npm packages of knowledge — encoding how tools work together, what patterns apply for which goals, and what to avoid. Skills travel with the tool via `npm update`, not the model's training cutoff.

`@tanstack/intent` is the toolkit for generating, discovering, and maintaining skills for your library.

## Quick Start

### For library consumers

Set up skill-to-task mappings in your project's agent config files (CLAUDE.md, .cursorrules, etc.):

```bash
npx @tanstack/intent install
```

List available skills from installed packages:

```bash
npx @tanstack/intent list
```

### For library maintainers

Generate skills for your library by telling your AI coding agent to run:

```bash
npx @tanstack/intent scaffold
```

This prints a prompt that walks the agent through domain discovery, skill tree generation, and skill creation — one step at a time with your review at each stage.

Validate your skill files:

```bash
npx @tanstack/intent validate
```

Copy CI workflow templates into your repo:

```bash
npx @tanstack/intent setup
```

## CLI Commands

| Command                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `intent install`        | Set up skill-to-task mappings in agent config files |
| `intent list [--json]`  | Discover intent-enabled packages                    |
| `intent meta`           | List meta-skills for library maintainers            |
| `intent scaffold`       | Print the guided skill generation prompt            |
| `intent validate [dir]` | Validate SKILL.md files                             |
| `intent setup`          | Copy CI templates, generate shim, create labels     |
| `intent stale [--json]` | Check skills for version drift                      |

## License

[MIT](./LICENSE)
