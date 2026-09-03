import { mkdtempSync, rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, onTestFinished } from 'vitest'
import type { ExtensionManifest, ReadOptions } from '../src'
import {
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from '../src'

function createManifest(version = '1.0.0'): ExtensionManifest {
  return {
    name: 'cache-regression',
    publisher: 'test',
    version,
    engines: { vscode: '^1.100.0' },
  }
}

function createFixture() {
  const cwd = mkdtempSync(join(tmpdir(), 'extension-manifest-'))
  const filename = join(cwd, 'package.json')
  onTestFinished(() => rmSync(cwd, { recursive: true, force: true }))
  writeFileSync(filename, JSON.stringify(createManifest()))
  return { cwd, filename }
}

describe.each([
  { name: 'async', read: readExtensionManifest },
  { name: 'sync', read: readExtensionManifestSync },
])('$name manifest reads', ({ read }) => {
  it.each([
    {
      label: 'omitted',
      createOptions: (cwd: string): ReadOptions => ({ cwd }),
    },
    {
      label: 'false',
      createOptions: (cwd: string): ReadOptions => ({ cwd, cache: false }),
    },
  ])(
    'bypasses and does not populate the cache when $label',
    async ({ createOptions }) => {
      const { cwd, filename } = createFixture()
      const readOptions = createOptions(cwd)
      await read(readOptions)
      writeFileSync(filename, JSON.stringify(createManifest('2.0.0')))
      const cachedManifest = await read({ cwd, cache: true })
      expect(cachedManifest.version).toBe('2.0.0')

      writeFileSync(filename, JSON.stringify(createManifest('3.0.0')))
      const freshManifest = await read(readOptions)
      const preservedCache = await read({ cwd, cache: true })
      expect(freshManifest.version).toBe('3.0.0')
      expect(preservedCache).toBe(cachedManifest)
    },
  )

  it('reuses the built-in cache without reading the file again', async () => {
    const { cwd, filename } = createFixture()
    const manifest = await read({ cwd, cache: true })
    unlinkSync(filename)
    const cachedManifest = await read({ cwd, cache: true })
    expect(cachedManifest).toBe(manifest)
  })

  it('populates and reuses a caller-owned cache', async () => {
    const { cwd, filename } = createFixture()
    const cache = new Map<string, ExtensionManifest>()
    const manifest = await read({ cwd, cache })
    expect(cache.get(filename)).toBe(manifest)

    unlinkSync(filename)
    const cachedManifest = await read({ cwd, cache })
    expect(cachedManifest).toBe(manifest)
  })

  it.each([
    { name: 'async', write: writeExtensionManifest },
    { name: 'sync', write: writeExtensionManifestSync },
  ])(
    'invalidates the built-in cache after a $name write',
    async ({ write }) => {
      const { cwd } = createFixture()
      await read({ cwd, cache: true })
      await write(createManifest('2.0.0'), { cwd })
      const updatedManifest = await read({ cwd, cache: true })
      expect(updatedManifest.version).toBe('2.0.0')

      await write(createManifest(), {
        cwd,
        stringify: () => JSON.stringify(createManifest('3.0.0')),
      })
      const serializedManifest = await read({ cwd, cache: true })
      expect(serializedManifest.version).toBe('3.0.0')
    },
  )

  it('returns false when validating a file containing null', async () => {
    const { cwd, filename } = createFixture()
    writeFileSync(filename, 'null')
    expect(validateExtensionManifest(await read({ cwd }))).toBeFalsy()
  })
})

describe(validateExtensionManifest, () => {
  it.each([
    null,
    undefined,
    false,
    0,
    '',
    'publisher',
    [],
    {},
    { publisher: null },
    { publisher: 1 },
    { publisher: '' },
  ])('returns false for invalid input %j', manifest => {
    expect(validateExtensionManifest(manifest)).toBeFalsy()
  })

  it('keeps the documented publisher-only validation', () => {
    expect(validateExtensionManifest({ publisher: 'test' })).toBeTruthy()
  })
})
