import { assertType, describe, expectTypeOf, it } from 'vitest'
import { readExtensionManifest, readExtensionManifestSync, validateExtensionManifest } from '../src'
import type { ExtensionManifest, ReadOptions } from '../src'

describe('typecheck', () => {
  it('should types match', () => {
    assertType<(manifest: ExtensionManifest) => boolean>(validateExtensionManifest)
    assertType<(options?: ReadOptions) => ExtensionManifest>(readExtensionManifestSync)
    assertType<(options?: ReadOptions) => Promise<ExtensionManifest>>(readExtensionManifest)
  })

  it('should return type match', () => {
    expectTypeOf(validateExtensionManifest).returns.toMatchTypeOf<boolean>()
    expectTypeOf(readExtensionManifestSync).returns.toMatchTypeOf<ExtensionManifest>()
    expectTypeOf(readExtensionManifest).returns.toMatchTypeOf<Promise<ExtensionManifest>>()
  })

  it('should params type match', () => {
    expectTypeOf(validateExtensionManifest).parameter(0).toMatchTypeOf<ExtensionManifest>()
    expectTypeOf(readExtensionManifest).parameter(0).toMatchTypeOf<ReadOptions | undefined>()
    expectTypeOf(readExtensionManifestSync).parameter(0).toMatchTypeOf<ReadOptions | undefined>()
  })
})
