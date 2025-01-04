import type {
  ExtensionAnyValue,
  ExtensionConfigurationKey,
  ExtensionDebuggerOS,
  ExtensionIdentifier,
  ExtensionSpecifiedLanguageKey,
  ExtensionThemeableColor,
  ExtensionThemeableIcon,
} from './common'
import type { ExtensionJsonSchema } from './json-schema'
import type {
  ExtensionActivationEvent,
  ExtensionCategory,
  ExtensionMenuKind,
  ExtensionProblemMatcherFileLocation,
} from './union'

export type ExtensionAuthentication = {
  id: string
  label: string
}

export type ExtensionBadge = {
  description: string
  href: string
  title: string
}

export type ExtensionBreakpoint = {
  language: string
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

export type ExtensionChatViewWelcome = {
  content?: string
  icon?: string
  title?: string
  when?: string
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

export type ExtensionCommand = {
  command: string
  title: string
  category?: string
  enablement?: string
  icon?: ExtensionThemeableIcon
  shortTitle?: string
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

export type ExtensionDebugger = {
  args?: ExtensionAnyValue[]
  configurationSnippets?: ExtensionAnyValue[]
  deprecated?: string
  hiddenWhen?: string
  initialConfigurations?: string | ExtensionAnyValue
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

export type ExtensionDebugVisualizer = {
  id: string
  when: string
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

export type ExtensionIcon = {
  description: string
  default: {
    fontCharacter: string
    fontPath: string
  }
}

export type ExtensionIconTheme = {
  id: string
  path: string
  label?: string
}

export type ExtensionJsonValidation = {
  fileMatch?: string | string[]
  url?: string
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

export type ExtensionLocalizationTranslation = {
  id: string
  path: string
}

export type ExtensionMenu = {
  command: string
  alt?: string
  group?: string
  submenu?: string
  when?: string
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

export type ExtensionSemanticTokenModifier = {
  description?: string
  id?: string
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

export type ExtensionSpeechProvider = {
  description?: string
  name?: string
}

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

export type ExtensionTerminalProfile = {
  id: string
  title: string
  icon?: ExtensionThemeableIcon
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
export type ExtensionViewRemote = Pick<ExtensionViewCommon, 'id' | 'name' | 'when'> & {
  group?: string
  remoteName?: string
}
export type ExtensionViewsContainer = {
  icon: string
  id: string
  title: string
}

export type ExtensionViewWelcome = {
  contents: string
  view: string
  enablement?: string
  group?: string
  when?: string
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

/**
 * Extension Manifest
 *
 * @see {@link https://code.visualstudio.com/api/references/extension-manifest}
 */
export type ExtensionManifest = {
  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  engines: {
    vscode: string
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  name: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  publisher: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  version: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/activation-events}
   */
  activationEvents?: ExtensionActivationEvent[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/activation-events}
   */
  badges?: ExtensionBadge[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  browser?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  capabilities?: {
    untrustedWorkspaces:
      | {
          description: string
          supported: 'limited'
          restrictedConfigurations?: string[]
        }
      | {
          description: string
          supported: false
        }
      | {
          supported: true
        }
    virtualWorkspaces?:
      | true
      | {
          description: string
          supported: 'limited'
        }
      | {
          description: string
          supported: false
        }
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  categories?: ExtensionCategory[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points}
   */
  contributes?: {
    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.authentication}
     */
    authentication?: ExtensionAuthentication[]

    /**
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
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.colors}
     */
    colors?: ExtensionColor[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.commands}
     */
    commands?: ExtensionCommand[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.configuration}
     */
    configuration?: ExtensionConfiguration | ExtensionConfiguration[]

    /**
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
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.icons}
     */
    icons?: {
      [key: string]: ExtensionIcon
    }

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.iconThemes}
     */
    iconThemes?: ExtensionIconTheme[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.jsonValidation}
     */
    jsonValidation?: ExtensionJsonValidation[]

    /**
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
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.menus}
     */
    menus?: {
      [key: string]: ExtensionMenu[]
    } & {
      [key in ExtensionMenuKind]: ExtensionMenu[]
    }

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
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.submenus}
     */
    submenus?: ExtensionSubmenu[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.taskDefinitions}
     */
    taskDefinitions?: ExtensionTaskDefinition[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.terminal}
     */
    terminal?: {
      profiles?: ExtensionTerminalProfile[]
    }

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.terminalQuickFixes}
     */
    terminalQuickFixes?: ExtensionTerminalQuickFix[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.themes}
     */
    themes?: ExtensionTheme[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins}
     */
    typescriptServerPlugins?: ExtensionTypescriptServerPlugin[]

    /**
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

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.viewsWelcome}
     */
    viewsWelcome?: ExtensionViewWelcome[]

    /**
     * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.walkthroughs}
     */
    walkthroughs?: ExtensionWalkThrough[]
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  dependencies?: Record<string, string>

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  description?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  devDependencies?: Record<string, string>

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  displayName?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionDependencies?: ExtensionIdentifier[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionKind?: ('ui' | 'workspace')[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionPack?: ExtensionIdentifier[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  galleryBanner?: {
    color?: string
    theme?: string
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  icon?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  keywords?: string[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  license?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  main?: string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `github`
   */
  markdown?: 'github' | 'standard'

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  preview?: boolean

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `Free`
   */
  pricing?: 'Free' | 'Trial'

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `markeplate`
   */
  qna?: 'markeplate' | false | string

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  scripts?: Record<string, string>

  /**
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  sponsor?: {
    url: string
  }
}

export * from './union'
export * from './common'
