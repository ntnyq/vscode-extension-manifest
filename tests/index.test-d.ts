import { assertType, describe, expectTypeOf, it } from 'vitest'
import {
  defineExtensionManifest,
  readExtensionManifest,
  readExtensionManifestSync,
  validateExtensionManifest,
  writeExtensionManifest,
  writeExtensionManifestSync,
} from '../src'
import type { ExtensionManifest, ReadOptions, WriteOptions } from '../src'

describe('typecheck', () => {
  it('should types match', () => {
    assertType<(manifest: ExtensionManifest) => boolean>(validateExtensionManifest)
    assertType<(manifest: ExtensionManifest) => ExtensionManifest>(defineExtensionManifest)

    assertType<(options?: ReadOptions) => ExtensionManifest>(readExtensionManifestSync)
    assertType<(options?: ReadOptions) => Promise<ExtensionManifest>>(readExtensionManifest)

    assertType<(path: string, manifest: ExtensionManifest, options?: WriteOptions) => void>(
      writeExtensionManifestSync,
    )
    assertType<
      (path: string, manifest: ExtensionManifest, options?: WriteOptions) => Promise<void>
    >(writeExtensionManifest)
  })

  it('should return type match', () => {
    expectTypeOf(validateExtensionManifest).returns.toMatchTypeOf<boolean>()
    expectTypeOf(defineExtensionManifest).returns.toMatchTypeOf<ExtensionManifest>()

    expectTypeOf(readExtensionManifestSync).returns.toMatchTypeOf<ExtensionManifest>()
    expectTypeOf(readExtensionManifest).returns.toMatchTypeOf<Promise<ExtensionManifest>>()

    expectTypeOf(writeExtensionManifestSync).returns.toMatchTypeOf<void>()
    expectTypeOf(writeExtensionManifest).returns.toMatchTypeOf<Promise<void>>()
  })

  it('should params type match', () => {
    expectTypeOf(validateExtensionManifest).parameters.toEqualTypeOf<[ExtensionManifest]>()
    expectTypeOf(defineExtensionManifest).parameters.toEqualTypeOf<[ExtensionManifest]>()

    expectTypeOf(readExtensionManifest).parameters.toEqualTypeOf<[ReadOptions?]>()
    expectTypeOf(readExtensionManifestSync).parameters.toEqualTypeOf<[ReadOptions?]>()

    expectTypeOf(writeExtensionManifest).parameters.toEqualTypeOf<
      [string, ExtensionManifest, WriteOptions?]
    >()
    expectTypeOf(writeExtensionManifestSync).parameters.toEqualTypeOf<
      [string, ExtensionManifest, WriteOptions?]
    >()
  })
})
