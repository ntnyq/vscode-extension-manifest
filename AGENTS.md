# Repository Guidelines

## Project Structure & Module Organization

- `src/types/` contains manifest definitions; export public types through `src/types/index.ts`.
- `src/core.ts` implements manifest IO and validation; `src/utils.ts` contains filesystem helpers. `src/index.ts` is the public entry point.
- `tests/` contains runtime and type tests, JSON fixtures, and snapshots.
- `docs/` stores audits and update history. `.agents/skills/` contains maintenance workflows.
- `dist/` contains generated output; never edit it manually.

## Build, Test, and Development Commands

Use Node.js LTS and the pnpm version pinned in `package.json`.

| Command                          | Purpose                                  |
| -------------------------------- | ---------------------------------------- |
| `pnpm install --frozen-lockfile` | Install locked dependencies.             |
| `pnpm run dev`                   | Rebuild with tsdown in watch mode.       |
| `pnpm run build`                 | Generate ESM output and declarations.    |
| `pnpm typecheck`                 | Check TypeScript without emitting files. |
| `pnpm run test`                  | Run Vitest runtime and type tests once.  |
| `pnpm run lint`                  | Run Oxlint.                              |
| `pnpm run format`                | Format with Oxfmt.                       |
| `pnpm run format:check`          | Check formatting without changes.        |

## Coding Style & Naming Conventions

Use strict TypeScript, ESM imports, and `import type`. Prefer type aliases, PascalCase types, camelCase functions, and kebab-case filenames. Follow Oxfmt: two-space indentation, single quotes, no semicolons, trailing commas, and LF endings. Write documentation in English.

## Testing Guidelines

Name runtime tests `*.test.ts` and type tests `*.test-d.ts`. Import public APIs from `../src`; use `assertType`, `expectTypeOf`, and targeted `@ts-expect-error` checks for accepted and rejected contracts. Add meaningful regressions; review snapshot changes. No numeric coverage threshold is configured. Before submission, run formatting, lint, typecheck, tests, and build.

## Manifest Type Updates

Follow the [type update skill](.agents/skills/update-vscode-manifest-types/SKILL.md). Check upstream schemas, interfaces, and runtime consumers at a pinned commit; documentation alone is insufficient. Every type change needs a source permalink with commit SHA and line range. Record proposal requirements and compatibility effects. After verification succeeds, add a `docs/type-updates/` record, update its index, and refresh the README timestamp. Documentation-only edits and no-change inspections preserve that timestamp.

## Commit & Pull Request Guidelines

Use English Conventional Commits, such as `fix(types): ...` or `chore(skill): ...`; mark breaking changes with `!` and explain them. Keep type changes and skill maintenance in separate commits. PRs should describe behavior, compatibility impacts, checks, and related issues. Keep Husky hooks enabled.

## Agent Commands

Prefix shell commands with `rtk`, for example `rtk proxy pnpm run test`, except `pnpm typecheck`.
