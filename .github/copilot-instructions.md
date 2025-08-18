# Copilot Instructions for vscode-extension-manifest

## Project Overview

- This package provides type definitions, validators, and utilities for VSCode extension manifests (`package.json` for extensions).
- Main goal: Enable type-safe, validated, and programmatic manipulation of VSCode extension manifests.

## Architecture & Key Files

- Source code is in `src/`:
  - `core.ts`, `index.ts`, `utils.ts`: Core logic and utilities for manifest operations.
  - `types/`: Contains granular type definitions for manifest fields (see `manifest.ts`, `contributes.ts`, etc.).
- Scripts for checks/utilities are in `scripts/`.
- Tests are in `tests/`, using [Vitest](https://vitest.dev/). Snapshots in `__snapshots__`.

## Developer Workflows

- **Build:** No explicit build step; package is type-focused and uses TypeScript.
- **Test:** Run all tests with `pnpm test` (see `vitest.config.ts`).
- **Lint/Format:** Use `pnpm lint` and `pnpm format` (see `eslint.config.mjs`, `prettier.config.mjs`).
- **Type Check:** Use `pnpm check` (see `scripts/check.ts`).

## Patterns & Conventions

- All manifest operations are exposed as named exports (see README usage examples).
- Type definitions are modularized by manifest field (e.g., `types/contributes.ts`).
- Functions accept options objects for flexibility (e.g., `cwd`, `filename`, `cache`).
- Prefer async APIs, but sync variants are available for file IO.
- Validation is explicit: `validateExtensionManifest(manifest)` returns a boolean.

## Integration Points

- No runtime dependencies; only type and dev dependencies (see `package.json`).
- Designed to integrate with VSCode extension development workflows and tooling.
- External references: [VSCode Manifest Docs](https://code.visualstudio.com/api/references/extension-manifest).

## Examples

- See `README.md` for usage patterns and API details.
- Example: `defineExtensionManifest({...})` to create a manifest object, then `writeExtensionManifest()` to save it.

## Contributing

- Extend types in `src/types/` for new manifest fields.
- Add tests in `tests/` and snapshots in `__snapshots__/`.

---

For questions or missing types, open an issue or PR. See [README.md](../README.md) for more details.
