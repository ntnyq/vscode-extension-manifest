/**
 * Any value
 */
export type ExtensionAnyValue = any

/**
 * Extension configuration key
 */
export type ExtensionConfigurationKey = `${string}.${string}`

/**
 * Extension debugger OS options
 */
export type ExtensionDebuggerOS = {
  runtime?: string
}

/**
 * Unique identifier for an extension
 */
export type ExtensionIdentifier = `${string}.${string}`

/**
 * VSCode built-in product icons
 * @see {@link https://code.visualstudio.com/api/references/icons-in-labels#icon-listing}
 */
export type ExtensionProductIcon = `$(${string})`

/**
 * Extension specified language key
 */
export type ExtensionSpecifiedLanguageKey = `[${string}]`

/**
 * HexColor or themeable color identifier
 */
export type ExtensionThemeableColor = `#${string}` | `${string}.${string}`

/**
 * Built-in icon or icon path or icon object with dark and light properties
 */
export type ExtensionThemeableIcon =
  // | string
  | ExtensionProductIcon
  | {
      dark?: string
      light?: string
    }
