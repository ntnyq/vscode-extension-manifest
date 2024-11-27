# vscode-extension-manifest

[![CI](https://github.com/ntnyq/vscode-extension-manifest/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-extension-manifest/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![CODECOV](https://codecov.io/github/ntnyq/vscode-extension-manifest/branch/main/graph/badge.svg)](https://codecov.io/github/ntnyq/vscode-extension-manifest)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-extension-manifest.svg)](https://github.com/ntnyq/vscode-extension-manifest/blob/main/LICENSE)

> VSCode extension manifest type definitions, validators, and utilities.

> [!NOTE]
> This package only provide types for VSCode extension manifest related fields listed in [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest).
>
> If you need types support NodeJs package.json file, please check [type-fest - package-json.d.ts](https://github.com/sindresorhus/type-fest/blob/main/source/package-json.d.ts).

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

## Usage

```ts
import {
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
} from 'vscode-extension-manifest'

console.log(await readExtensionManifest())
//=> VSCode extension manifest with types definition

console.log(validateExtensionManifest(readExtensionManifestSync()))
// => true if valid, false otherwise
```

## API

### readExtensionManifest

- Type: `(options?: Options) => Promise<ExtensionManifest>`

Returns a `Promise` for VSCode extension manifest with type definition.

#### Options

for `readExtensionManifest` and `readExtensionManifestSync`

##### filename

- Type: `string`
- Default: `package.json`
- Required: `false`

The filename of the extension manifest.

##### cwd

- Type: `string | URL`
- Default: `process.cwd()`
- Required: `false`

The current working directory of the extension manifest.

### readExtensionManifestSync

- Type: `(options?: Options) => ExtensionManifest`

Returns VSCode extension manifest with type definition.

#### Options

Same as **readExtensionManifest**

### validateExtensionManifest

- Type: `(manifest: ExtensionManifest) => boolean`

Returns `true` if the extension manifest is valid, `false` otherwise.

By checking the following properties:

- `publisher`

#### Parameters

##### manifest

- Type: `ExtensionManifest`
- Required: `true`

Read by `readExtensionManifest` or `readExtensionManifestSync`.

## Links

- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [Contribution Points](https://code.visualstudio.com/api/references/contribution-points)

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
