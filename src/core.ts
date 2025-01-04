import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import type { ExtensionManifest } from './types'

const FILENAME_PACKAGE_JSON = 'package.json'

/**
 * Built-in cache
 */
const FILE_CACHE = new Map<string, ExtensionManifest>()

/**
 * Options for {@link readExtensionManifest} and {@link readExtensionManifestSync}
 */
export type ReadOptions = {
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
export function validateExtensionManifest(manifest: ExtensionManifest) {
  return typeof manifest.publisher === 'string' && manifest.publisher.length > 0
}

/**
 * Reads the manifest of vscode extension.
 *
 * @param options - The options.
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
export async function readExtensionManifest(options: ReadOptions = {}) {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options

  const cache = options.cache && typeof options.cache !== 'boolean' ? options.cache : FILE_CACHE
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
 * @param options - The options.
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
export function readExtensionManifestSync(options: ReadOptions = {}) {
  const { filename = FILENAME_PACKAGE_JSON, cwd = process.cwd() } = options

  const cache = options.cache && typeof options.cache !== 'boolean' ? options.cache : FILE_CACHE
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
