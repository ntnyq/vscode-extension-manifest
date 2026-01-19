# vscode-extension-manifest

[![CI](https://github.com/ntnyq/vscode-extension-manifest/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-extension-manifest/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-extension-manifest.svg)](https://github.com/ntnyq/vscode-extension-manifest/blob/main/LICENSE)

Type definitions, validation, and IO utilities for VS Code extension manifests (package.json).

> [!NOTE]
> This package only covers fields listed in the VS Code Extension Manifest docs.
> For a generic Node.js package.json type, use type-fest's package-json.d.ts.

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
- `cache?: boolean | Map<string, Record<string, any>>`

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

- Type: `(manifest: ExtensionManifest) => boolean`
- Description: currently only checks that `publisher` is a non-empty string.

## Usage Notes

- Customize JSON output with `stringify` or `space`.
- Use `cache: true` or provide a custom `Map` for frequent reads.
- `cwd` supports `URL`, useful in ESM/URL-based environments.

## Contributing

- Add new manifest fields under `src/types` and update tests.
- Missing or mismatched types are welcome as issues or PRs.

## Links

- Extension Manifest: https://code.visualstudio.com/api/references/extension-manifest
- Contribution Points: https://code.visualstudio.com/api/references/contribution-points
- VS Code source types: https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensions/common/extensions.ts

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
