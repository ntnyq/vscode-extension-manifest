# Copilot Instructions for vscode-extension-manifest

## Project Overview

- Library for type-safe VS Code extension manifest (`package.json`) types plus read/write/validate utilities.
- Goal: programmatic manifest IO with strong TypeScript types; no runtime framework layers.

## Architecture & Key Files

- Public API lives in [src/index.ts](../src/index.ts) (re-exports from core + types).
- IO and helpers in [src/core.ts](../src/core.ts): `readExtensionManifest`, `writeExtensionManifest`, sync variants, and `validateExtensionManifest`.
- Shared filesystem helpers in [src/utils.ts](../src/utils.ts) (`fsEnsureDir`, `fsEnsureDirSync`, async/sync parity).
- Types are modularized by manifest field in [src/types](../src/types); large schemas in [src/types/manifest.ts](../src/types/manifest.ts) and [src/types/contributes.ts](../src/types/contributes.ts).

## Developer Workflows

- Tests: `pnpm test` (Vitest config in [vitest.config.ts](../vitest.config.ts)).
- Lint/format: `pnpm lint` and `pnpm format`.
- Type check: `pnpm check` runs [scripts/check.ts](../scripts/check.ts).

## Project-Specific Conventions

- All exports are named and surface through [src/index.ts](../src/index.ts); add new APIs there.
- IO functions accept options objects (`cwd`, `filename`, `cache`, `space`, `stringify`). Keep this pattern for new helpers.
- `readExtensionManifest` uses an internal `Map` cache keyed by resolved file path; optional custom cache map is supported.
- URL support: `cwd` can be a `URL` or string; `toPath` resolves `file://` URLs before `path.resolve`.
- Validation is intentionally minimal: `validateExtensionManifest` only checks `publisher` presence and type.

## Integration Points

- The library mirrors VS Code manifest docs and types: external references in README.
- Scripts use the same public API (see [scripts/check.ts](../scripts/check.ts)) to validate repo `package.json` for unexpected extension fields.

## Examples

- Typical flow: `defineExtensionManifest({...})` then `writeExtensionManifest()`; see [README.md](../README.md) for full examples.

## Contributing Notes

- Add new manifest fields under [src/types](../src/types) and update tests in [tests](../tests).
- Snapshot updates live in [tests/**snapshots**](../tests/__snapshots__).
