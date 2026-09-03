# vscode-extension-manifest

[![CI](https://github.com/ntnyq/vscode-extension-manifest/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-extension-manifest/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-extension-manifest.svg)](https://github.com/ntnyq/vscode-extension-manifest/blob/main/LICENSE)

Type definitions, validation, and IO utilities for VS Code extension manifests (package.json).

> [!NOTE]
> Types are checked against VS Code source: contribution schemas, interfaces, and runtime consumers.
> See the [type update history](./docs/type-updates/README.md) for pinned revisions, source evidence, proposal requirements, and compatibility notes.
> For a generic Node.js package.json type, use type-fest's package-json.d.ts.

<!-- vscode-types-update:start -->

Last successful type update: **2026-09-03T11:47:00+08:00** (Asia/Shanghai). Scope: **partial — debugger activation event forms**.

VS Code source: [`dc85eaf`](https://github.com/microsoft/vscode/commit/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e) · [Changes](./docs/type-updates/2026-09-03-114700-dc85eaf.md) · [History](./docs/type-updates/README.md).

<!-- vscode-types-update:end -->

## Features

- Strongly typed `ExtensionManifest` plus contributes types
- Async and sync APIs for reading and writing manifests
- Optional cache and custom stringify support
- Minimal validation: only checks `publisher` to stay flexible

## Install

```shell
npm install vscode-extension-manifest -D
```

```shell
yarn add vscode-extension-manifest -D
```

```shell
pnpm add vscode-extension-manifest -D
```

```shell
bun add vscode-extension-manifest -D
```

## Quick Start

```ts
import {
  defineExtensionManifest,
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from 'vscode-extension-manifest'

console.log(await readExtensionManifest())
// => VS Code extension manifest with types

console.log(validateExtensionManifest(readExtensionManifestSync()))
// => true / false

const extensionManifest = defineExtensionManifest({
  name: 'vscode-extension-manifest',
  version: '1.0.0',
  publisher: 'ntnyq',
  engines: {
    vscode: '^1.96.0',
  },
})

await writeExtensionManifest(extensionManifest, {
  cwd: 'packages/extension',
})

writeExtensionManifestSync(extensionManifest, {
  cwd: 'vscode',
})
```

## API Overview

### readExtensionManifest

- Type: `(options?: ReadOptions) => Promise<ExtensionManifest>`
- Description: read and parse the extension manifest.

#### ReadOptions

Used by `readExtensionManifest` and `readExtensionManifestSync`.

- `filename?: string` default `package.json`
- `cwd?: string | URL` default `process.cwd()`
- `cache?: boolean | Map<string, Record<string, any>>` default `false`

### readExtensionManifestSync

- Type: `(options?: ReadOptions) => ExtensionManifest`

### writeExtensionManifest

- Type: `(manifest: ExtensionManifest, options?: WriteOptions) => Promise<void>`

#### WriteOptions

Used by `writeExtensionManifest` and `writeExtensionManifestSync`.

- `filename?: string` default `package.json`
- `cwd?: string | URL` default `process.cwd()`
- `replacer?: (number | string)[] | null` default `null`
- `space?: number | string` default `2`
- `stringify?: (value: any) => string` default `JSON.stringify`

### writeExtensionManifestSync

- Type: `(manifest: ExtensionManifest, options?: WriteOptions) => void`

### defineExtensionManifest

- Type: `(manifest: ExtensionManifest) => ExtensionManifest`
- Description: for type inference only; no runtime behavior.

### validateExtensionManifest

- Type: `(manifest: unknown) => boolean`
- Description: checks that the input is an object with a non-empty string `publisher`; returns `false` for null, arrays, and non-object inputs.

## Usage Notes

- Customize JSON output with `stringify` or `space`.
- Use `cache: true` or provide a custom `Map` for frequent reads.
- Omitting `cache` or setting it to `false` reads from disk without populating or updating a cache.
- Successful writes invalidate the built-in cache for the written path. Callers manage invalidation of custom maps using the resolved absolute file path as the key.
- `cwd` supports `URL`, useful in ESM/URL-based environments.

## Contributing

- Add new manifest fields under `src/types` and update tests.
- Use the project skill [`update-vscode-manifest-types`](./.agents/skills/update-vscode-manifest-types/SKILL.md) for source audits and type updates. Successful updates include a timestamp and a separate record with pinned source links for every change.
- Missing or mismatched types are welcome as issues or PRs.

## Links

- Extension Manifest: https://code.visualstudio.com/api/references/extension-manifest
- Contribution Points: https://code.visualstudio.com/api/references/contribution-points
- VS Code source types: https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensions/common/extensions.ts

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
