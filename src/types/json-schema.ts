/**
 * @file Json schema types
 */

export type TJsonSchemaType =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'null'
  | 'number'
  | 'object'
  | 'string'

export type TJsonSchemaValue = any

export type TJsonSchemaScope =
  | 'application'
  | 'language-overridable'
  | 'machine-overridable'
  | 'machine'
  | 'resource'
  | 'window'

export type TJsonSchemaFormat = 'date' | 'email' | 'ipv4' | 'time' | 'uri'

export type TJsonSchemaBase = {
  type: TJsonSchemaType | TJsonSchemaType[]
  additionalItems?: boolean | ExtensionJsonSchema
  additionalProperties?: boolean | ExtensionJsonSchema
  allOf?: ExtensionJsonSchema[]
  anyOf?: ExtensionJsonSchema[]
  default?: TJsonSchemaValue
  dependencies?:
    | {
        [key: string]: ExtensionJsonSchema
      }
    | { [key: string]: string[] }
  description?: string
  editPresentation?: boolean
  enum?: TJsonSchemaValue[]
  enumItemLabels?: string[]
  examples?: TJsonSchemaValue[]
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
  patternProperties?: {
    [key: string]: ExtensionJsonSchema
  }
  properties?: {
    [key: string]: ExtensionJsonSchema
  }
  readOnly?: boolean
  required?: string[]
  tags?: string[]
  title?: string
  uniqueItems?: boolean
  writeOnly?: boolean
}

/**
 * These properties are not supported by VSCode
 */
export type TJsonSchemaUnSupported = {
  $ref?: string
  definition?: string
}

export type TJsonSchemaV6 = {
  const?: TJsonSchemaValue
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

export type TJsonSchemaVSCodeSnippet = {
  body?: TJsonSchemaValue
  bodyText?: string
  description?: string
  label?: string
}

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

/**
 * @see {@link https://json-schema.org/overview/what-is-jsonschema}
 */
export type ExtensionJsonSchema = TJsonSchemaBase &
  TJsonSchemaV6 &
  TJsonSchemaV7 &
  TJsonSchemaVSCode
