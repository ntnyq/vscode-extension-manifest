# vscode-extension-manifest

[![CI](https://github.com/ntnyq/vscode-extension-manifest/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-extension-manifest/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vscode-extension-manifest.svg)](https://www.npmjs.com/package/vscode-extension-manifest)
[![CODECOV](https://codecov.io/github/ntnyq/vscode-extension-manifest/branch/main/graph/badge.svg)](https://codecov.io/github/ntnyq/vscode-extension-manifest)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-extension-manifest.svg)](https://github.com/ntnyq/vscode-extension-manifest/blob/main/LICENSE)

> VSCode extension manifest type definitions, validators, and utilities.

> [!NOTE]
> This package only provides types for VSCode extension manifest related fields listed in [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest).
>
> If you need type support for a normal NodeJs package.json file, please check [type-fest - package-json.d.ts](https://github.com/sindresorhus/type-fest/blob/main/source/package-json.d.ts).

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
  defineExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from 'vscode-extension-manifest'

console.log(await readExtensionManifest())
//=> VSCode extension manifest with types definition

console.log(validateExtensionManifest(readExtensionManifestSync()))
// => true if valid, false otherwise

const extensionManifest = defineExtensionManifest({
  name: 'vscode-extension-manifest',
  version: '1.0.0',
  publisher: 'ntnyq',
  engines: {
    vscode: '^1.96.0',
  },
})

await writeExtensionManifest('package.json', extensionManifest)

writeExtensionManifestSync('package.json', extensionManifest)
```

## API

### readExtensionManifest

- Type: `(options?: ReadOptions) => Promise<ExtensionManifest>`

Returns a `Promise` for VSCode extension manifest with type definition.

#### ReadOptions

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

The current working directory.

##### cache

- Type: `boolean | Map<string, Record<string, any>>`
- Default: `undefined`
- Required: `false`

Specifies whether the read results should be cached. Can be a boolean or a map to hold the cached data.

### readExtensionManifestSync

- Type: `(options?: ReadOptions) => ExtensionManifest`

Returns VSCode extension manifest with type definition.

#### ReadOptions

Same as **readExtensionManifest**

### writeExtensionManifest

- Type: `(path: string, manifest: ExtensionManifest, options?: WriteOptions) => Promise<void>`

#### WriteOptions

for `writeExtensionManifest` and `writeExtensionManifestSync`

##### replacer

- Type: `(number | string)[] | null`
- Default: `null`
- Required: `false`

The replacer for JSON.stringify.

##### space

- Type: `number | string`
- Default: `2`
- Required: `false`

The space for JSON.stringify.

##### stringify

- Type: `(value: any) => string`
- Default: `JSON.stringify`
- Required: `false`

The stringify function.

### writeExtensionManifestSync

- Type: `(path: string, manifest: ExtensionManifest, options?: WriteOptions) => void`

#### WriteOptions

Same as **writeExtensionManifest**

### defineExtensionManifest

Define a vscode extension manifest.

#### Parameters

##### manifest

- Type: `ExtensionManifest`
- Required: `true`

The extension manifest.

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
