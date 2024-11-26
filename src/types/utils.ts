/**
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609}
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never })

export type NonEmptyString = string & {}

/**
 * Extendable string to union, either with it self
 */
export type ExtendUnion<T extends string, S extends boolean = false> = S extends false
  ? `${T}:${NonEmptyString}`
  : `${T}:${NonEmptyString}` | T
