import { describe, expect, it } from 'vitest'
import { resolve } from '../scripts/utils'
import { readExtensionManifest, readExtensionManifestSync, validateExtensionManifest } from '../src'

const FIXTURE_VSCODE_DEV_HELPER = resolve('tests/fixtures/vscode-dev-helper')
const FIXTURE_VSCODE_EXTENSION_MANIFEST = resolve('tests/fixtures/vscode-extension-manifest')

describe('vscode extension', () => {
  it('should readExtensionManifest work', async () => {
    expect(await readExtensionManifest({ cwd: FIXTURE_VSCODE_DEV_HELPER })).toMatchSnapshot()
  })

  it('should readExtensionManifestSync work', () => {
    expect(readExtensionManifestSync({ cwd: FIXTURE_VSCODE_DEV_HELPER })).toMatchSnapshot()
  })

  it('should validateExtensionManifest return false', () => {
    const manifest = readExtensionManifestSync({ cwd: FIXTURE_VSCODE_DEV_HELPER })
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
    expect(readExtensionManifestSync({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST })).toMatchSnapshot()
  })

  it('should validateExtensionManifest return false', () => {
    const manifest = readExtensionManifestSync({ cwd: FIXTURE_VSCODE_EXTENSION_MANIFEST })
    expect(validateExtensionManifest(manifest)).toBeFalsy()
  })
})
