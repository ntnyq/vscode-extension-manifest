/**
 * @file Json schema types
 */

import type { LiteralUnion } from './utils'

export type TJsonSchemaAnyValue = unknown
/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L43-L43}
 */
export type TJsonSchemaFormat = LiteralUnion<
  'date' | 'email' | 'ipv4' | 'time' | 'uri'
>
export type TJsonSchemaScope =
  | 'application'
  | 'language-overridable'
  | 'machine-overridable'
  | 'machine'
  | 'resource'
  | 'window'
export type TJsonSchemaType =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'null'
  | 'number'
  | 'object'
  | 'string'

/**
 * @deprecated These properties are supported. Use TJsonSchemaBase instead.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L43}
 */
export type TJsonSchemaUnSupported = Pick<
  TJsonSchemaBase,
  '$ref' | 'definitions'
>

/**
 * Official schema properties
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L47}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L102-L112}
 */
export type TJsonSchemaBase = {
  id?: string
  $id?: string
  $schema?: string
  $ref?: string
  definitions?: Record<string, ExtensionJsonSchema>
  additionalItems?: boolean | ExtensionJsonSchema
  additionalProperties?: boolean | ExtensionJsonSchema
  allOf?: ExtensionJsonSchema[]
  anyOf?: ExtensionJsonSchema[]
  default?: TJsonSchemaAnyValue
  description?: string
  editPresentation?: 'singlelineText' | 'multilineText'
  enum?: TJsonSchemaAnyValue[]
  /**
   * Null entries use the enum value as the label.
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/preferences/browser/settingsTree.ts#L1919-L1947}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/typescript-language-features/package.json#L423-L445}
   */
  enumItemLabels?: (string | null)[]
  examples?: TJsonSchemaAnyValue[]
  exclusiveMaximum?: boolean | number
  exclusiveMinimum?: boolean | number
  format?: TJsonSchemaFormat
  items?: ExtensionJsonSchema | ExtensionJsonSchema[]
  maximum?: number
  maxItems?: number
  maxLength?: number
  maxProperties?: number
  minimum?: number
  minItems?: number
  minLength?: number
  minProperties?: number
  multipleOf?: number
  not?: ExtensionJsonSchema
  oneOf?: ExtensionJsonSchema[]
  pattern?: string
  readOnly?: boolean
  required?: string[]
  tags?: string[]
  title?: string
  type?: TJsonSchemaType | TJsonSchemaType[]
  uniqueItems?: boolean
  writeOnly?: boolean
  dependencies?: Record<string, ExtensionJsonSchema> | Record<string, string[]>
  patternProperties?: Record<string, ExtensionJsonSchema>
  properties?: Record<string, ExtensionJsonSchema>
}
export type TJsonSchemaV6 = {
  const?: TJsonSchemaAnyValue
  contains?: ExtensionJsonSchema
  contentEncoding?: string
  contentMediaType?: string
  contentSchema?: ExtensionJsonSchema
  maxContains?: number
  minContains?: number
  propertyNames?: ExtensionJsonSchema
}
/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L51-L55}
 */
export type TJsonSchemaV7 = {
  $comment?: string
  else?: ExtensionJsonSchema
  if?: ExtensionJsonSchema
  then?: ExtensionJsonSchema
}

/**
 * VSCode extends schema properties
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L76-L90}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L217-L327}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L323-L337}
 */
export type TJsonSchemaVSCode = {
  allowComments?: boolean
  allowTrailingCommas?: boolean
  defaultSnippets?: TJsonSchemaVSCodeSnippet[]
  deprecationMessage?: string
  doNotSuggest?: boolean
  enumDescriptions?: string[]
  errorMessage?: string
  ignoreSync?: boolean
  markdownDeprecationMessage?: string
  markdownDescription?: string
  markdownEnumDescriptions?: string[]
  secret?: boolean
  restricted?: boolean
  included?: boolean
  disallowSyncIgnore?: boolean
  disallowConfigurationDefault?: boolean
  keywords?: string[]
  experiment?: { mode: 'startup' | 'auto'; name?: string }
  /**
   * Requires the agentsWindowConfiguration API proposal.
   */
  agentsWindow?: { default?: unknown; readOnly?: boolean }
  order?: number
  patternErrorMessage?: string
  scope?: TJsonSchemaScope
  suggestSortText?: string
} &
  /**
   * A setting can own a policy or refer to an existing policy, but cannot do both.
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L1135-L1139}
   */
  (
    | { policy?: TJsonSchemaPolicy; policyReference?: never }
    | { policy?: never; policyReference: { name: string } }
  )

/**
 * Serializable policy metadata. Runtime value callbacks cannot be declared in JSON.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/policy.ts#L14-L35}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/policy.ts#L68-L146}
 */
export type TJsonSchemaPolicy = {
  name: string
  category:
    | 'Extensions'
    | 'IntegratedTerminal'
    | 'InteractiveSession'
    | 'Telemetry'
    | 'Update'
  minimumVersion: `${number}.${number}`
  localization: {
    description: { key: string; value: string }
    enumDescriptions?: { key: string; value: string }[]
  }
  managedSettings?: Record<string, { type: 'string' | 'number' | 'boolean' }>
  restrictedValue?: string | number | boolean
}
export type TJsonSchemaVSCodeSnippet = {
  body?: TJsonSchemaAnyValue
  bodyText?: string
  description?: string
  label?: string
}

/**
 * json-schema types for VSCode extension
 *
 * @see {@link https://json-schema.org/overview/what-is-jsonschema}
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L98}
 */
export type ExtensionJsonSchema = TJsonSchemaBase &
  TJsonSchemaV6 &
  TJsonSchemaV7 &
  TJsonSchema2019 &
  TJsonSchema2020 &
  TJsonSchemaVSCode

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L57-L69}
 */
export type TJsonSchema2019 = {
  unevaluatedProperties?: boolean | ExtensionJsonSchema
  unevaluatedItems?: boolean | ExtensionJsonSchema
  deprecated?: boolean
  dependentRequired?: Record<string, string[]>
  dependentSchemas?: Record<string, ExtensionJsonSchema>
  $defs?: Record<string, ExtensionJsonSchema>
  $anchor?: string
  $recursiveRef?: string
  $recursiveAnchor?: string
  $vocabulary?: unknown
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L71-L74}
 */
export type TJsonSchema2020 = {
  prefixItems?: ExtensionJsonSchema[]
  $dynamicRef?: string
  $dynamicAnchor?: string
}
