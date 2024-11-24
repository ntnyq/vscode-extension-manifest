import { expect, it } from 'vitest'
import { readExtensionManifest, readExtensionManifestSync, validateExtensionManifest } from '../src'

it('should readExtensionManifest work', async () => {
  expect(await readExtensionManifest()).toMatchSnapshot()
})

it('should readExtensionManifestSync work', () => {
  expect(readExtensionManifestSync()).toMatchSnapshot()
})

it('should validateExtensionManifest return false', () => {
  const manifest = readExtensionManifestSync()
  expect(validateExtensionManifest(manifest)).toBeFalsy()
})
