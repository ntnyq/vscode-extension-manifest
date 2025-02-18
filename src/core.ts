import { readFileSync, writeFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { fsEnsureDir, fsEnsureDirSync } from './utils'
import type { ExtensionManifest } from './types'

const FILENAME_PACKAGE_JSON = 'package.json'

/**
 * Built-in cache
 */
const FILE_CACHE = new Map<string, ExtensionManifest>()

/**
 * Shared options for {@link readExtensionManifest}, {@link readExtensionManifestSync}, {@link writeExtensionManifest} and {@link writeExtensionManifestSync}
 */
export type SharedOptions = {
  /**
   * The current working directory.
   *
   * @default process.cwd()
   */
  cwd?: string | URL

  /**
   * The name of the manifest file.
   *
   * @default "package.json"
   */
  filename?: string
}

/**
 * Options for {@link readExtensionManifest} and {@link readExtensionManifestSync}
 */
export type ReadOptions = SharedOptions & {
  /**
   * Specifies whether the read results should be cached.
   * Can be a boolean or a map to hold the cached data.
   */
  cache?: boolean | Map<string, Record<string, any>>
}

/**
 * @internal
 */
const toPath = (urlOrPath: string | URL) =>
  urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath

/**
 * Validates if given manifest is an VSCode extension.
 * @param manifest
 * @returns `true` if given manifest is an VSCode extension.
 *
 * @example
 *
 *```ts
 * import {
 *   validateExtensionManifest,
 *   readExtensionManifestSync
 * } from 'vscode-extension-manifest'
 *
 * console.log(validateExtensionManifest(readExtensionManifestSync())
 *```
 */
export function validateExtensionManifest(
  manifest: ExtensionManifest,
): boolean {
  return typeof manifest.publisher === 'string' && manifest.publisher.length > 0
}

/**
 * Define a vscode extension manifest.
 *
 * @param manifest - The extension manifest.
 * @returns The manifest of vscode extension with types.
 */
export function defineExtensionManifest(
  manifest: ExtensionManifest,
): ExtensionManifest {
  return manifest
}

/**
 * Reads the manifest of vscode extension.
 *
 * @param options - The options {@link ReadOptions}.
 * @returns A `Promise` resolves the manifest of vscode extension with types.
 *
 * @example
 *
 *```ts
 * import { readExtensionManifest } from 'vscode-extension-manifest'
 *
 * console.log(await readExtensionManifest())
 *```
 */
export async function readExtensionManifest(
  options: ReadOptions = {},
): Promise<ExtensionManifest> {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options

  const cache =
    options.cache && typeof options.cache !== 'boolean'
      ? options.cache
      : FILE_CACHE
  const resolvedPath = resolve(toPath(cwd), filename)

  if (options.cache && cache.has(resolvedPath)) {
    /* v8 ignore next */
    return cache.get(resolvedPath)! as ExtensionManifest
  }

  const manifest = await readFile(resolvedPath, 'utf-8')
  const parsed = JSON.parse(manifest) as ExtensionManifest

  cache.set(resolvedPath, parsed)

  return parsed
}

/**
 * Reads the manifest of vscode extension sync.
 *
 * @param options - The options {@link ReadOptions}.
 * @returns The manifest of vscode extension with types.
 *
 * @example
 *
 *```ts
 * import { readExtensionManifestSync } from 'vscode-extension-manifest'
 *
 * console.log(readExtensionManifestSync())
 *```
 */
export function readExtensionManifestSync(
  options: ReadOptions = {},
): ExtensionManifest {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options

  const cache =
    options.cache && typeof options.cache !== 'boolean'
      ? options.cache
      : FILE_CACHE
  const resolvedPath = resolve(toPath(cwd), filename)

  if (options.cache && cache.has(resolvedPath)) {
    /* v8 ignore next */
    return cache.get(resolvedPath)! as ExtensionManifest
  }

  const manifest = readFileSync(resolvedPath, 'utf-8')
  const parsed = JSON.parse(manifest) as ExtensionManifest

  cache.set(resolvedPath, parsed)

  return parsed
}

/**
 * Options for {@link writeExtensionManifest} and {@link writeExtensionManifestSync}
 */
export type WriteOptions = SharedOptions & {
  /**
   * The replacer for JSON.stringify.
   *
   * @default null
   */
  replacer?: (number | string)[] | null

  /**
   * The space for JSON.stringify.
   *
   * @default 2
   */
  space?: number | string

  /**
   * The stringify function.
   * @param value - The value to stringify.
   * @returns The stringified value.
   *
   * @default JSON.stringify
   */
  stringify?: (value: any) => string
}

/**
 * @internal
 */
const toResolvedStringify = (options: WriteOptions = {}) => {
  const { replacer = null, space = 2 } = options
  return (value: any) =>
    typeof options.stringify === 'function'
      ? options.stringify(value)
      : JSON.stringify(value, replacer, space)
}

/**
 * Writes the manifest of vscode extension to given path.
 * @param manifest - The manifest of vscode extension.
 * @param options - The options {@link WriteOptions}.
 *
 * @example
 *
 * ```ts
 * import { writeExtensionManifest } from 'vscode-extension-manifest'
 *
 * await writeExtensionManifest({
 *   name: 'vscode-extension-manifest',
 *   version: '1.0.0',
 *   publisher: 'ntnyq',
 *   engines: {
 *     vscode: '^1.96.0',
 *   },
 * })
 * ```
 */
export async function writeExtensionManifest(
  manifest: ExtensionManifest,
  options: WriteOptions = {},
): Promise<void> {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options
  const stringify = toResolvedStringify(options)
  const resolvedPath = resolve(toPath(cwd), filename)

  await fsEnsureDir(resolvedPath)

  await writeFile(resolvedPath, stringify(manifest))
}

/**
 * Writes the manifest of vscode extension to given path sync.
 * @param manifest - The manifest of vscode extension.
 * @param options - The options {@link WriteOptions}.
 *
 * @example
 *
 * ```ts
 * import { writeExtensionManifestSync } from 'vscode-extension-manifest'
 *
 * writeExtensionManifestSync({
 *   name: 'vscode-extension-manifest',
 *   version: '1.0.0',
 *   publisher: 'ntnyq',
 *   engines: {
 *     vscode: '^1.96.0',
 *   },
 * })
 * ```
 */
export function writeExtensionManifestSync(
  manifest: ExtensionManifest,
  options: WriteOptions = {},
): void {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options
  const stringify = toResolvedStringify(options)
  const resolvedPath = resolve(toPath(cwd), filename)

  fsEnsureDirSync(resolvedPath)

  writeFileSync(resolvedPath, stringify(manifest))
}
