/**
 * VSCode built-in product icons
 * @see {@link https://code.visualstudio.com/api/references/icons-in-labels#icon-listing}
 */
export type ExtensionProductIcon = `$(${string})`

/**
 * Unique identifier for an extension
 */
export type ExtensionIdentifier = `${string}.${string}`

/**
 * Any value
 */
export type ExtensionAnyValue = any

/**
 * HexColor or themeable color identifier
 */
export type ExtensionThemeableColor = `#${string}` | `${string}.${string}`

/**
 * Extension debugger OS options
 */
export type ExtensionDebuggerOS = {
  runtime?: string
}

/**
 * Extension configuration key
 */
export type ExtensionConfigurationKey = `${string}.${string}`

/**
 * Extension specified language key
 */
export type ExtensionSpecifiedLanguageKey = `[${string}]`

/**
 * Built-in icon or icon path or icon object with dark and light properties
 */
export type ExtensionThemeableIcon =
  | {
      dark?: string
      light?: string
    }
  | ExtensionProductIcon
  | string
