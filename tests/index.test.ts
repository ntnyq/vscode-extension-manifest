import { describe, expect, it } from 'vitest'
import { resolve } from '../scripts/utils'
import {
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from '../src'
import type { ExtensionManifest } from '../src'

const FIXTURE_VSCODE_DEV_HELPER = resolve('tests/fixtures/vscode-dev-helper')
const FIXTURE_VSCODE_EXTENSION_MANIFEST = resolve(
  'tests/fixtures/vscode-extension-manifest',
)

const cacheDevHelper = new Map<string, ExtensionManifest>([
  [
    `${FIXTURE_VSCODE_DEV_HELPER}/package.json`,
    readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_DEV_HELPER,
      cache: false,
    }),
  ],
])
const cacheExtensionManifest = new Map<string, ExtensionManifest>([
  [
    `${FIXTURE_VSCODE_EXTENSION_MANIFEST}/package.json`,
    readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
      cache: false,
    }),
  ],
])

describe('vscode extension', () => {
  const CACHED_DEV_HELPER_MANIFEST = cacheDevHelper.get(
    `${FIXTURE_VSCODE_DEV_HELPER}/package.json`,
  )!

  it('should readExtensionManifest work', async () => {
    expect(
      await readExtensionManifest({ cwd: FIXTURE_VSCODE_DEV_HELPER }),
    ).toMatchSnapshot()
  })

  it('should readExtensionManifestSync work', () => {
    expect(
      readExtensionManifestSync({ cwd: FIXTURE_VSCODE_DEV_HELPER }),
    ).toMatchSnapshot()
  })

  it('should writeExtensionManifestSync work', () => {
    const CURRENT_CWD = resolve('tests/fixtures/temp/async')

    writeExtensionManifestSync(CACHED_DEV_HELPER_MANIFEST, {
      cwd: CURRENT_CWD,
    })
    expect(readExtensionManifestSync({ cwd: CURRENT_CWD })).toMatchSnapshot()
  })

  it('should writeExtensionManifest work', async () => {
    const CURRENT_CWD = resolve('tests/fixtures/temp/async')

    await writeExtensionManifest(CACHED_DEV_HELPER_MANIFEST, {
      cwd: CURRENT_CWD,
    })
    expect(await readExtensionManifest({ cwd: CURRENT_CWD })).toMatchSnapshot()
  })

  it('options - cache - true', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_DEV_HELPER,
        cache: true,
      }),
    ).toMatchSnapshot()
  })

  it('options - cache - false', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_DEV_HELPER,
        cache: false,
      }),
    ).toMatchSnapshot()
  })

  it('options - cache - map', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_DEV_HELPER,
        cache: cacheDevHelper,
      }),
    ).toMatchSnapshot()
  })

  it('should validateExtensionManifest return false', () => {
    const manifest = readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_DEV_HELPER,
    })
    expect(validateExtensionManifest(manifest)).toBeTruthy()
  })
})

describe('node package', () => {
  it('should readExtensionManifest work', async () => {
    expect(
      await readExtensionManifest({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST }),
    ).toMatchSnapshot()
  })

  it('should readExtensionManifestSync work', () => {
    expect(
      readExtensionManifestSync({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST }),
    ).toMatchSnapshot()
  })

  it('options - cache - true', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
        cache: true,
      }),
    ).toMatchSnapshot()
  })

  it('options - cache - false', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
        cache: false,
      }),
    ).toMatchSnapshot()
  })

  it('options - cache - map', () => {
    expect(
      readExtensionManifestSync({
        cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
        cache: cacheExtensionManifest,
      }),
    ).toMatchSnapshot()
  })

  it('should validateExtensionManifest return false', () => {
    const manifest = readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
    })
    expect(validateExtensionManifest(manifest)).toBeFalsy()
  })
})
