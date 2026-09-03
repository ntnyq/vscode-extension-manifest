import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, onTestFinished } from 'vitest'
import { resolve } from '../scripts/utils'
import {
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from '../src'

const FIXTURE_VSCODE_DEV_HELPER = resolve('tests/fixtures/vscode-dev-helper')
const FIXTURE_VSCODE_EXTENSION_MANIFEST = resolve(
  'tests/fixtures/vscode-extension-manifest',
)

const devHelperManifest = readExtensionManifestSync({
  cwd: FIXTURE_VSCODE_DEV_HELPER,
})
const extensionManifest = readExtensionManifestSync({
  cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
})

function createTemporaryDirectory(): string {
  const cwd = mkdtempSync(join(tmpdir(), 'extension-manifest-'))
  onTestFinished(() => rmSync(cwd, { recursive: true, force: true }))
  return cwd
}

describe('vscode extension', () => {
  it('should readExtensionManifest work', async () => {
    await expect(
      readExtensionManifest({ cwd: FIXTURE_VSCODE_DEV_HELPER }),
    ).resolves.toMatchSnapshot()
  })

  it('should readExtensionManifestSync work', () => {
    expect(
      readExtensionManifestSync({ cwd: FIXTURE_VSCODE_DEV_HELPER }),
    ).toStrictEqual(devHelperManifest)
  })

  it('should writeExtensionManifestSync work', () => {
    const cwd = createTemporaryDirectory()

    writeExtensionManifestSync(devHelperManifest, { cwd })
    expect(readExtensionManifestSync({ cwd })).toStrictEqual(devHelperManifest)
  })

  it('should writeExtensionManifest work', async () => {
    const cwd = createTemporaryDirectory()

    await writeExtensionManifest(devHelperManifest, { cwd })
    await expect(readExtensionManifest({ cwd })).resolves.toStrictEqual(
      devHelperManifest,
    )
  })

  it('should validateExtensionManifest return true', () => {
    const manifest = readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_DEV_HELPER,
    })
    expect(validateExtensionManifest(manifest)).toBeTruthy()
  })
})

describe('node package', () => {
  it('should readExtensionManifest work', async () => {
    await expect(
      readExtensionManifest({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST }),
    ).resolves.toMatchSnapshot()
  })

  it('should readExtensionManifestSync work', () => {
    expect(
      readExtensionManifestSync({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST }),
    ).toStrictEqual(extensionManifest)
  })

  it('should validateExtensionManifest return false', () => {
    const manifest = readExtensionManifestSync({
      cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST,
    })
    expect(validateExtensionManifest(manifest)).toBeFalsy()
  })
})
