/**
 * Any value
 */
export type ExtensionAnyValue = any

/**
 * Extension configuration key
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L39-L46}
 */
export type ExtensionConfigurationKey = string

/**
 * Extension debugger OS options
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debug.ts#L938-L943}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/node/debugAdapter.ts#L364-L389}
 */
export type ExtensionDebuggerOS = {
  program?: string
  args?: string[]
  runtime?: string
  runtimeArgs?: string[]
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
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/colorExtensionPoint.ts#L29-L110}
 */
export type ExtensionThemeableColor = string

/**
 * Built-in icon or icon path or icon object with dark and light properties
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L793-L833}
 */
export type ExtensionThemeableIcon =
  // relative path icon and extension product icon
  // TODO: use Template Literal type to describe a relative path icon
  | string
  // | ExtensionProductIcon
  | {
      dark: string
      light: string
    }
