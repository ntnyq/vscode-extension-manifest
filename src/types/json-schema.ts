/**
 * @file Json schema types
 */

export type TJsonSchemaAnyValue = any
export type TJsonSchemaFormat = 'date' | 'email' | 'ipv4' | 'time' | 'uri'
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
 * These properties are not supported by VSCode
 */
export type TJsonSchemaUnSupported = {
  $ref?: string
  definition?: string
}

/**
 * Official schema properties
 * @pg
 */
export type TJsonSchemaBase = {
  additionalItems?: boolean | ExtensionJsonSchema
  additionalProperties?: boolean | ExtensionJsonSchema
  allOf?: ExtensionJsonSchema[]
  anyOf?: ExtensionJsonSchema[]
  default?: TJsonSchemaAnyValue
  description?: string
  editPresentation?: boolean
  enum?: TJsonSchemaAnyValue[]
  enumItemLabels?: string[]
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
  dependencies?:
    | {
        [key: string]: ExtensionJsonSchema
      }
    | { [key: string]: string[] }
  patternProperties?: {
    [key: string]: ExtensionJsonSchema
  }
  properties?: {
    [key: string]: ExtensionJsonSchema
  }
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
export type TJsonSchemaV7 = {
  else?: ExtensionJsonSchema
  if?: ExtensionJsonSchema
  then?: ExtensionJsonSchema
}

/**
 * VSCode extends schema properties
 * @pg
 */
export type TJsonSchemaVSCode = {
  allowComments?: boolean
  allowTrailingCommas?: boolean
  defaultSnippets?: TJsonSchemaVSCodeSnippet[]
  deprecationMessage?: string
  doNotSuggest?: boolean
  enumDescriptions?: string[]
  errorMessage?: string
  markdownDeprecationMessage?: string
  markdownDescription?: string
  markdownEnumDescriptions?: string[]
  patternErrorMessage?: string
  scope?: TJsonSchemaScope
  suggestSortText?: string
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
 * @pg
 */
export type ExtensionJsonSchema = TJsonSchemaBase
  & TJsonSchemaV6
  & TJsonSchemaV7
  & TJsonSchemaVSCode
