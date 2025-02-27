import { describe, expect, it } from 'vitest'
import { defineExtensionManifest } from '../src'

describe('defineExtensionManifest', () => {
  it('should work', () => {
    const manifest = defineExtensionManifest({
      name: 'vscode-extension-manifest',
      version: '1.0.0',
      publisher: 'ntnyq',
      activationEvents: ['*'],
      contributes: {},
      engines: {
        vscode: '^1.96.0',
      },
    })
    expect(manifest).toMatchSnapshot()
  })
})
