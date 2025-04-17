import type {
  ExtensionAnyValue,
  ExtensionConfigurationKey,
  ExtensionDebuggerOS,
  ExtensionSpecifiedLanguageKey,
  ExtensionThemeableColor,
  ExtensionThemeableIcon,
} from './common'
import type { ExtensionJsonSchema } from './json-schema'
import type {
  ExtensionMenuKind,
  ExtensionProblemMatcherFileLocation,
} from './union'

export type ExtensionStatusBarItem = {
  alignment: string
  id: string
  name: string
  text: string
  command?: string
  priority?: number
  tooltip?: string
  accessibilityInformation?: {
    label?: string
    role?: string
  }
}

export type ExtensionKeybinding = {
  command: string
  key: string
  args?: ExtensionAnyValue
  linux?: string
  mac?: string
  when?: string
  win?: string
}

export type ExtensionLanguage = {
  aliases?: string[]
  configuration?: string
  extensions?: string[]
  filenamePatterns?: string[]
  filenames?: string[]
  firstLine?: string
  icon?: Exclude<ExtensionThemeableIcon, string>
  id?: string
  mimetypes?: string[]
}

export type ExtensionLanguageModel = {
  vendor: string
}

export type ExtensionConfiguration = {
  order?: number
  title?: string
  properties?: {
    [key: string]: ExtensionJsonSchema
  }
}

export type ExtensionConfigurationDefaults = {
  [key: ExtensionConfigurationKey]: ExtensionAnyValue
  [key: ExtensionSpecifiedLanguageKey]: {
    [key: ExtensionConfigurationKey]: ExtensionAnyValue
  }
}

export type ExtensionContinueEditSession = {
  command: string
  description?: string
  group?: string
  qualifiedName?: string
  remoteGroup?: string
  when?: string
}

export type ExtensionCustomEditor = {
  displayName: string
  viewType: string
  priority?: 'default' | 'option'
  selector: Array<{
    filenamePattern: string
  }>
}

export type ExtensionLanguageModelTool = {
  name: string
  canBeReferencedInPrompt?: boolean
  displayName?: string
  icon?: ExtensionThemeableIcon
  inputSchema?: ExtensionJsonSchema
  modelDescription?: string
  tags?: string[]
  toolReferenceName?: string
  userDescription?: string
  when?: string
}

export type ExtensionLocalization = {
  languageId: string
  translations: ExtensionLocalizationTranslation[]
  languageName?: string
  localizedLanguageName?: string
}

export type ExtensionDocumentation = {
  refactoring: Array<{
    command: string
    title: string
    when: string
  }>
}

export type ExtensionGrammer = {
  path: string
  scopeName: string
  balancedBracketScopes?: string[]
  injectTo?: string[]
  language?: string
  unbalancedBracketScopes?: string[]
  embeddedLanguages?: {
    [key: string]: string
  }
  tokenTypes?: {
    [key: string]: 'comment' | 'other' | 'string'
  }
}

export type ExtensionHtmlLanguageParticipant = {
  languageId: string
  autoInsert?: boolean
}

export type ExtensionChatViewWelcome = {
  content?: string
  icon?: string
  title?: string
  when?: string
}

export type ExtensionChatParticipant = ExtensionChatParticipantCommand & {
  id: string
  commands?: ExtensionChatParticipantCommand[]
  fullName?: string
}

export type ExtensionChatParticipantCommand = {
  name: string
  description?: string
  disambiguation?: ExtensionChatParticipantDisambiguation[]
  isSticky?: boolean
  sampleRequest?: string
  when?: string
}

export type ExtensionChatParticipantDisambiguation = {
  category: string
  description: string
  examples: ExtensionAnyValue[]
}

export type ExtensionCodeAction = {
  languages: string[]
  actions: {
    kind: string
    title: string
    description?: string
  }
}

export type ExtensionColor = {
  description: string
  id: string
  defaults: {
    dark: ExtensionThemeableColor
    light: ExtensionThemeableColor
    highContrast?: ExtensionThemeableColor
    highContrastLight?: ExtensionThemeableColor
  }
}

export type ExtensionDebugger = {
  args?: ExtensionAnyValue[]
  configurationSnippets?: ExtensionAnyValue[]
  deprecated?: string
  hiddenWhen?: string
  initialConfigurations?: string | ExtensionAnyValue[]
  label?: string
  languages?: string[]
  linux?: ExtensionDebuggerOS
  osx?: ExtensionDebuggerOS
  program?: string
  runtime?: string
  runtimeArgs?: ExtensionAnyValue[]
  type?: string
  when?: string
  windows?: ExtensionDebuggerOS
  configurationAttributes?: {
    [key: string]: ExtensionJsonSchema
  }
  strings?: {
    unverifiedBreakpoints?: string
  }
  variables?: {
    [key: string]: string
  }
}

export type ExtensionJsonValidation = {
  fileMatch?: string | string[]
  url?: string
}

export type ExtensionDebugVisualizer = {
  id: string
  when: string
}

export type ExtensionSemanticTokenModifier = {
  description?: string
  id?: string
}

export type ExtensionCommand = {
  command: string
  title: string
  category?: string
  enablement?: string
  icon?: ExtensionThemeableIcon
  shortTitle?: string
}

export type ExtensionSemanticTokenType = {
  description: string
  id: string
  superType: string
}

export type ExtensionSemanticTokeScope = {
  language?: string
  scopes?: {
    [key: string]: string[]
  }
}

export type ExtensionSnippet = {
  language: string
  path: string
}

export type ExtensionViewsWelcome = {
  contents: string
  view: string
  enablement?: string
  group?: string
  when?: string
}

export type ExtensionIconTheme = {
  id: string
  path: string
  label?: string
}

export type ExtensionWalkThrough = {
  description: string
  id: string
  steps: ExtensionWalkThroughStep[]
  title: string
  featuredFor?: string[]
  icon?: string
  when?: string
}

export type ExtensionBreakpoint = {
  language: string
  when?: string
}

export type ExtensionWalkThroughStep = {
  id: string
  title: string
  completionEvents?: string[]
  description?: string
  when?: string
  media: {
    altText: string
    image: string
    markdown?: string
    svg?: string
  }
}

export type ExtensionSpeechProvider = {
  description?: string
  name?: string
}

export type ExtensionTerminalProfile = {
  id: string
  title: string
  icon?: ExtensionThemeableIcon
}

export type ExtensionIcon = {
  description: string
  default: {
    fontCharacter: string
    fontPath: string
  }
}

export type ExtensionTerminalQuickFix = {
  commandExitResult: 'error' | 'success'
  commandLineMatcher: string
  id: string
  kind?: 'default' | 'explain'
  outputMatcher: {
    anchor: 'bottom' | 'top'
    length: number
    lineMatcher: string
    offset: number
  }
}

export type ExtensionAuthentication = {
  id: string
  label: string
}

export type ExtensionMenu = {
  command: string
  alt?: string
  group?: string
  submenu?: string
  when?: string
}

export type ExtensionSubmenu = {
  id: string
  label: string
  icon?: ExtensionThemeableIcon
}

export type ExtensionTaskDefinition = {
  required?: string[]
  type?: string
  when?: string
  properties?: {
    [key: string]: ExtensionJsonSchema
  }
}

export type ExtensionTheme = {
  path: string
  uiTheme: 'hc-black' | 'hc-light' | 'vs-dark' | 'vs'
  id?: string
  label?: string
}

export type ExtensionTypescriptServerPlugin = {
  enableForWorkspaceTypeScriptVersions?: boolean
  name?: string
}

export type ExtensionViewCommon = {
  id: string
  name: string
  accessibilityHelpContent?: string
  contextualTitle?: string
  icon?: string
  initialSize?: number
  type?: 'tree' | 'webview'
  visibility?: 'collapsed' | 'hidden' | 'visible'
  when?: string
}
export type ExtensionViewRemote = Pick<
  ExtensionViewCommon,
  'id' | 'name' | 'when'
> & {
  group?: string
  remoteName?: string
}
export type ExtensionViewsContainer = {
  icon: string
  id: string
  title: string
}

export type ExtensionProductIconTheme = {
  id: string
  path: string
  label?: string
}

export type ExtensionRemoteHelp = {
  documentation?: string
  feedback?: string
  getStarted?: string
  issues?: string
  reportIssue?: string
}

export type ExtensionResourceLabelFormatter = {
  scheme: string
  authority?: string
  formatting: {
    label?: string
    separator?: string
    stripPathStartingSeparator?: boolean
    tildify?: boolean
    workspaceSuffix?: string
  }
}

export type ExtensionNotebookPreload = {
  entrypoint: string
  type: string
  localResourceRoots?: string[]
}

export type ExtensionNotebookRenderer = {
  displayName: string
  entrypoint: string
  id: string
  mimeTypes: string[]
  dependencies?: string[]
  optionalDependencies?: string[]
  requiresMessaging?: 'always' | 'never' | 'optional'
}

export type ExtensionProblemPattern = {
  code?: number
  column?: number
  endColumn?: number
  endLine?: number
  file?: number
  kind?: number
  line?: number
  location?: number
  loop?: number
  message?: number
  name?: number
  patterns?: number
  regexp?: number
  severity?: number
}

export type ExtensionProblemMatcher = {
  applyTo?: 'allDocuments' | 'closeDocuments' | 'openDocuments'
  base?: string
  fileLocation?: ExtensionProblemMatcherFileLocation
  label?: string
  name?: string
  owner?: string
  pattern?: ExtensionProblemPattern
  severity?: 'error' | 'info' | 'warning'
  source?: string
  background?: {
    activeOnStart?: boolean
    beginsPattern?: string
    endsPattern?: string
  }
}

export type ExtensionLocalizationTranslation = {
  id: string
  path: string
}

export type ExtensionNotebook = {
  displayName: string
  type: string
  priority?: 'default' | 'option'
  selector: Array<{
    excludeFileNamePattern?: string
    filenamePattern?: string
  }>
}

/**
 * An object describing the extension's [contributions](https://code.visualstudio.com/api/references/contribution-points).
 *
 * @see {@link https://code.visualstudio.com/api/references/contribution-points}
 */
export interface ExtensionContributes {
  /**
   * Contributes an authentication provider. This will set up an activation event for your provider and display it in your extension's features.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.authentication}
   */
  authentication?: ExtensionAuthentication[]

  /**
   * Usually a debugger extension will also have a contributes.breakpoints entry where the extension lists the language file types for which setting breakpoints will be enabled.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.breakpoints}
   */
  breakpoints?: ExtensionBreakpoint[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatParticipants}
   */
  chatParticipants?: ExtensionChatParticipant[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatViewsWelcome}
   */
  chatViewsWelcome?: ExtensionChatViewWelcome[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.codeActions}
   */
  codeActions?: ExtensionCodeAction[]

  /**
   * Contributes new themable colors. These colors can be used by the extension in editor decorators and in the status bar. Once defined, users can customize the color in the workspace.colorCustomization setting and user themes can set the color value.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.colors}
   */
  colors?: ExtensionColor[]

  /**
   * Contribute the UI for a command consisting of a title and (optionally) an icon, category, and enabled state. Enablement is expressed with [when clauses](https://code.visualstudio.com/api/references/when-clause-contexts). By default, commands show in the Command Palette (⇧⌘P) but they can also show in other [menus](https://code.visualstudio.com/api/references/contribution-points#contributes.menus).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.commands}
   */
  commands?: ExtensionCommand[]

  /**
   * Contribute settings that will be exposed to the user. The user will be able to set these configuration options in the Settings editor or by editing a settings.json file directly.
   *
   * This section can either be a single object, representing a single category of settings, or an array of objects, representing multiple categories of settings. If there are multiple categories of settings, the Settings editor will show a submenu in the table of contents for that extension, and the title keys will be used for the submenu entry names.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.configuration}
   */
  configuration?: ExtensionConfiguration | ExtensionConfiguration[]

  /**
   * Contribute default values for other registered configurations and override their defaults.
   *
   * The following example overrides the default behavior of files.autoSave setting to AutoSave files on focus change.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.configurationDefaults}
   */
  configurationDefaults?: ExtensionConfigurationDefaults

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.continueEditSession}
   */
  continueEditSession?: ExtensionContinueEditSession[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.css.customData}
   */
  'css.customData'?: string[]

  /**
   * The customEditors contribution point is how your extension tells VS Code about the custom editors that it provides. For example, VS Code needs to know what types of files your custom editor works with as well as how to identify your custom editor in any UI.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.customEditors}
   */
  customEditors?: ExtensionCustomEditor[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.debuggers}
   */
  debuggers?: ExtensionDebugger[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.debugVisualizers}
   */
  debugVisualizers?: ExtensionDebugVisualizer[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.documentation}
   */
  documentation?: ExtensionDocumentation

  /**
   * Contribute a TextMate grammar to a language. You must provide the language this grammar applies to, the TextMate scopeName for the grammar and the file path.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.grammars}
   */
  grammars?: ExtensionGrammer[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.html.customData}
   */
  'html.customData'?: string[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.htmlLanguageParticipants}
   */
  htmlLanguageParticipants?: ExtensionHtmlLanguageParticipant[]

  /**
   * Contribute a file icon theme to VS Code. File icons are shown next to file names, indicating the file type.
   *
   * You must specify an id (used in the settings), a label and the path to the file icon definition file.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.iconThemes}
   */
  iconThemes?: ExtensionIconTheme[]

  /**
   * Contribute a validation schema for a specific type of json file. The url value can be either a local path to a schema file included in the extension or a remote server URL such as a [json schema store](https://www.schemastore.org/json).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.jsonValidation}
   */
  jsonValidation?: ExtensionJsonValidation[]

  /**
   * Contribute a key binding rule defining what command should be invoked when the user presses a key combination. See the [Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings) topic where key bindings are explained in detail.
   *
   * Contributing a key binding will cause the Default Keyboard Shortcuts to display your rule, and every UI representation of the command will now show the key binding you have added. And, of course, when the user presses the key combination the command will be invoked.
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings}
   */
  keybindings?: ExtensionKeybinding[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModels}
   */
  languageModels?: ExtensionLanguageModel[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModelTools}
   */
  languageModelTools?: ExtensionLanguageModelTool[]

  /**
   * Contribute definition of a programming language. This will introduce a new language or enrich the knowledge VS Code has about a language.
   *
   * The main effects of contributes.languages are:
   *
   * - Define a languageId that can be reused in other parts of VS Code API, such as vscode.TextDocument.languageId and the onLanguage Activation Events.
   *    - You can contribute a human-readable using the aliases field. The first item in the list will be used as the human-readable label.
   * - Associate file name extensions (extensions), file names (filenames), file name [glob patterns](https://code.visualstudio.com/docs/editor/glob-patterns) (filenamePatterns), files that begin with a specific line (such as hashbang) (firstLine), and mimetypes to that languageId.
   * - Contribute a set of Declarative Language Features for the contributed language. Learn more about the configurable editing features in the Language Configuration Guide.
   * - Contribute an icon which can be used as in file icon themes if theme does not contain an icon for the language
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languages}
   */
  languages?: ExtensionLanguage[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.localizations}
   */
  localizations?: ExtensionLocalization[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.markdownItPlugins}
   */
  'markdown.markdownItPlugins'?: boolean

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.previewScripts}
   */
  'markdown.previewScripts'?: string[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.previewStyles}
   */
  'markdown.previewStyles'?: string[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.notebookPreload}
   */
  notebookPreload?: ExtensionNotebookPreload[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.notebookRenderer}
   */
  notebookRenderer?: ExtensionNotebookRenderer[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.notebooks}
   */
  notebooks?: ExtensionNotebook[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.problemMatchers}
   */
  problemMatchers?: ExtensionProblemMatcher[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.problemPatterns}
   */
  problemPatterns?: ExtensionProblemPattern[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.productIconThemes}
   */
  productIconThemes?: ExtensionProductIconTheme[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.remoteHelp}
   */
  remoteHelp?: ExtensionRemoteHelp

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.resourceLabelFormatters}
   */
  resourceLabelFormatters?: ExtensionResourceLabelFormatter[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.semanticTokenModifiers}
   */
  semanticTokenModifiers?: ExtensionSemanticTokenModifier[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.semanticTokenScopes}
   */
  semanticTokenScopes?: ExtensionSemanticTokeScope[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.semanticTokenTypes}
   */
  semanticTokenTypes?: ExtensionSemanticTokenType[]

  /**
   * Contribute snippets for a specific language. The language attribute is the [language identifier](https://code.visualstudio.com/docs/languages/identifiers) and the path is the relative path to the snippet file, which defines snippets in the [VS Code snippet format](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.snippets}
   */
  snippets?: ExtensionSnippet[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.speechProviders}
   */
  speechProviders?: ExtensionSpeechProvider[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.statusBarItems}
   */
  statusBarItems?: ExtensionStatusBarItem[]

  /**
   * Contribute a submenu as a placeholder onto which menu items can be contributed. A submenu requires a label to be shown in the parent menu.
   *
   * In addition to a title, commands can also define icons that VS Code will show in the editor title menu bar.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.submenus}
   */
  submenus?: ExtensionSubmenu[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.taskDefinitions}
   */
  taskDefinitions?: ExtensionTaskDefinition[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.terminalQuickFixes}
   */
  terminalQuickFixes?: ExtensionTerminalQuickFix[]

  /**
   * Contribute a color theme to VS Code, defining workbench colors and styles for syntax tokens in the editor.
   *
   * You must specify a label, whether the theme is a dark theme or a light theme (such that the rest of VS Code changes to match your theme) and the path to the file (JSON format).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.themes}
   */
  themes?: ExtensionTheme[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins}
   */
  typescriptServerPlugins?: ExtensionTypescriptServerPlugin[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.viewsWelcome}
   */
  viewsWelcome?: ExtensionViewsWelcome[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.walkthroughs}
   */
  walkthroughs?: ExtensionWalkThrough[]

  /**
   * Contribute a new icon by ID, along with a default icon. The icon ID can then be used by the extension (or any other extensions that depend on the extension) anywhere a ThemeIcon can be used new ThemeIcon("iconId"), in [Markdown strings](https://code.visualstudio.com/api/references/icons-in-labels#icon-in-labels) ($(iconId)), and as icons in certain contribution points.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.icons}
   */
  icons?: {
    [key: string]: ExtensionIcon
  }

  /**
   * Contribute a menu item for a command to the editor or Explorer. The menu item definition contains the command that should be invoked when selected and the condition under which the item should show. The latter is defined with the when clause, which uses the key bindings [when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.menus}
   */
  menus?: {
    [key: string]: ExtensionMenu[]
  } & {
    [key in ExtensionMenuKind]: ExtensionMenu[]
  }

  /**
   * Contribute a terminal profile to VS Code, allowing extensions to handle the creation of the profiles. When defined, the profile should appear when creating the terminal profile
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.terminal}
   */
  terminal?: {
    profiles?: ExtensionTerminalProfile[]
  }

  /**
   * Contribute a view to VS Code. You must specify an identifier and name for the view. You can contribute to following view containers:
   *
   * - explorer: Explorer view container in the Activity Bar
   * - scm: Source Control Management (SCM) view container in the Activity Bar
   * - debug: Run and Debug view container in the Activity Bar
   * - test: Test view container in the Activity Bar
   * - Custom view containers contributed by Extensions.
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.views}
   */
  views?: {
    [key: string]: ExtensionViewCommon
  } & {
    debug?: ExtensionViewCommon[]
    explorer?: ExtensionViewCommon[]
    remote?: ExtensionViewRemote[]
    scm?: ExtensionViewCommon[]
    test?: ExtensionViewCommon[]
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers}
   */
  viewsContainers?: {
    activitybar?: ExtensionViewsContainer[]
    panel?: ExtensionViewsContainer[]
  }
}
