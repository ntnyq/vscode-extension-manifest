import type {
  ExtensionAnyValue,
  ExtensionConfigurationKey,
  ExtensionDebuggerOS,
  ExtensionProductIcon,
  ExtensionSpecifiedLanguageKey,
  ExtensionThemeableColor,
  ExtensionThemeableIcon,
} from './common'
import type {
  ExtensionJsonSchema,
  TJsonSchemaVSCodeSnippet,
} from './json-schema'
import type {
  ExtensionMenuKind,
  ExtensionProblemMatcherFileLocation,
} from './union'
import type { LiteralUnion } from './utils'

export type ExtensionStartEntry = {
  category: 'file' | 'folder' | 'notebook'
  command: string
  description: string
  title: string
  when?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/statusBarExtensionPoint.ts#L175-L237}
 */
export type ExtensionStatusBarItem = {
  alignment: 'left' | 'right'
  id: string
  name: string
  text: string
  command?: string
  priority?: number
  tooltip?: string
  accessibilityInformation?: {
    label: string
    role?: string
  }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/keybinding/browser/keybindingService.ts#L61-L90}
 */
export type ExtensionKeybinding = {
  command: string
  key?: string
  args?: ExtensionAnyValue
  linux?: string
  mac?: string
  when?: string
  win?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/language/common/languageService.ts#L330-L345}
 */
export type ExtensionLanguage = {
  aliases?: string[]
  configuration?: string
  extensions?: string[]
  filenamePatterns?: string[]
  filenames?: string[]
  firstLine?: string
  id: string
  mimetypes?: string[]
  icon?: {
    dark: string
    light: string
  }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L335-L342}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L338-L343}
 */
export type ExtensionConfiguration = {
  id?: string
  description?: string
  type?: string | string[]
  order?: number
  title?: string
  /**
   * @deprecated Contribute an array of configuration sections instead.
   */
  allOf?: ExtensionConfiguration[]
  properties?: Record<string, ExtensionJsonSchema>
}

export type ExtensionConfigurationDefaults = {
  [key: ExtensionConfigurationKey]: ExtensionAnyValue
  [key: ExtensionSpecifiedLanguageKey]: Record<
    ExtensionConfigurationKey,
    ExtensionAnyValue
  >
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/editSessions/browser/editSessions.contribution.ts#L889-L915}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/editSessions/browser/editSessions.contribution.ts#L1102-L1109}
 */
export type ExtensionContinueEditSession = {
  command: string
  description?: string
  documentation?: string
  category?: string
  group?: string
  qualifiedName?: string
  remoteGroup?: string
  when?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/extensionPoint.ts#L25-L103}
 */
export type ExtensionCustomEditor = {
  displayName: string
  viewType: string
  priority?:
    | ExtensionCustomEditorPriority
    | {
        textEditor: ExtensionCustomEditorPriority
        diffEditor?: ExtensionCustomEditorPriority
      }
  selector: {
    filenamePattern?: string
  }[]
}

export type ExtensionLanguageModel = {
  vendor: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L28-L40}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L226-L253}
 */
export type ExtensionLanguageModelTool = {
  name: string
  displayName: string
  icon?: ExtensionThemeableIcon
  inputSchema?: ExtensionJsonSchema
  modelDescription: string
  tags?: string[]
  userDescription?: string
  when?: string
  /**
   * Requires the chatParticipantPrivate API proposal.
   */
  legacyToolReferenceFullNames?: string[]
} & (
  | { canBeReferencedInPrompt: true; toolReferenceName: string }
  | { canBeReferencedInPrompt?: false; toolReferenceName?: string }
)

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L140-L150}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L332-L380}
 */
export type ExtensionLanguageModelToolSet = {
  description: string
  name: string
  tools: string[]
  icon?: string
  /**
   * @deprecated Tool sets now use name as their reference name.
   */
  referenceName?: string
  /**
   * Requires the contribLanguageModelToolSets API proposal.
   */
  legacyFullNames?: string[]
}

export type ExtensionLocalization = {
  languageId: string
  translations: ExtensionLocalizationTranslation[]
  languageName?: string
  localizedLanguageName?: string
}

export type ExtensionDocumentation = {
  refactoring: {
    command: string
    title: string
    when: string
  }[]
}

export type ExtensionGrammer = {
  path: string
  scopeName: string
  balancedBracketScopes?: string[]
  injectTo?: string[]
  language?: string
  unbalancedBracketScopes?: string[]
  embeddedLanguages?: Record<string, string>
  tokenTypes?: Record<string, 'comment' | 'other' | 'string'>
}

export type ExtensionHtmlLanguageParticipant = {
  languageId: string
  autoInsert?: boolean
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84}
 */
export type ExtensionChatAgent = ExtensionChatFile

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L15-L43}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L60-L75}
 */
export type ExtensionChatContext = {
  displayName: string
  id: string
  icon: ExtensionProductIcon
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84}
 */
export type ExtensionChatInstruction = ExtensionChatFile

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/viewsWelcome/chatViewsWelcomeHandler.ts#L19-L41}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/viewsWelcome/chatViewsWelcomeHandler.ts#L61-L77}
 */
export type ExtensionChatViewWelcome = {
  content?: string
  icon: ExtensionProductIcon
  title: string
  when: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatOutputItemRenderer.ts#L264-L290}
 */
export type ExtensionChatOutputRenderer = {
  mimeTypes?: string[]
  codeBlockLanguageIdentifiers?: string[]
  viewType: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatParticipantContribTypes.ts#L17-L32}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L247-L255}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/constants.ts#L143-L150}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/constants.ts#L243-L268}
 */
export type ExtensionChatParticipant = Omit<
  ExtensionChatParticipantCommand,
  'disambiguation'
> & {
  id: string
  commands?: ExtensionChatParticipantCommand[]
  fullName?: string
  disambiguation?: ExtensionChatParticipantDisambiguation[]
  /**
   * Requires the defaultChatParticipant API proposal.
   */
  isDefault?: boolean
  /**
   * Requires the defaultChatParticipant API proposal; applies to default participants.
   */
  modes?: ('ask' | 'edit' | 'agent')[]
  /**
   * Requires the chatParticipantAdditions API proposal.
   */
  locations?: (
    | 'panel'
    | 'terminal'
    | 'notebook'
    | 'editor'
    | 'editing-session'
  )[]
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84}
 */
export type ExtensionChatSkill = ExtensionChatFile

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatParticipantContribTypes.ts#L8-L14}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L294-L299}
 */
export type ExtensionChatParticipantCommand = {
  name: string
  description?: string
  disambiguation?: (ExtensionChatParticipantDisambiguation & {
    category: string
  })[]
  isSticky?: boolean
  sampleRequest?: string
  when?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatParticipantContribTypes.ts#L8-L32}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L262-L271}
 */
export type ExtensionChatParticipantDisambiguation = {
  description: string
  examples: string[]
  /**
   * @deprecated Use category instead.
   */
  categoryName?: string
} & ({ category: string } | { category?: never; categoryName: string })

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84}
 */
export type ExtensionChatPromptFile = ExtensionChatFile

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.ts#L63-L256}
 */
export type ExtensionChatSession = {
  type: string
  name: string
  displayName: string
  description: string
  icon?: ExtensionThemeableIcon
  when?: string
  order?: number
  alternativeIds?: string[]
  canDelegate?: boolean
  requiresCustomModels?: boolean
  supportsAutoModel?: boolean
  requiresCopilotSignIn?: boolean
  autoAttachReferences?: boolean
  useRequestToPopulateBuiltInPickers?: boolean
  customAgentTarget?: string
  inputPlaceholder?: string
  welcomeMessage?: string
  welcomeTips?: string
  welcomeTitle?: string
  capabilities?: {
    supportsFileAttachments?: boolean
    supportsImageAttachments?: boolean
    supportsInstructionAttachments?: boolean
    supportsMCPAttachments?: boolean
    supportsProblemAttachments?: boolean
    supportsSearchResultAttachments?: boolean
    supportsSourceControlAttachments?: boolean
    supportsSymbolAttachments?: boolean
    supportsToolAttachments?: boolean
    supportsPromptAttachments?: boolean
    supportsHandOffs?: boolean
  }
  commands?: {
    name: string
    description?: string
    when?: string
  }[]
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/extensions/common/extensions.ts#L96-L105}
 */
export type ExtensionCodeAction = {
  languages: string[]
  actions: {
    kind: string
    title: string
    description?: string
  }[]
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

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debug.ts#L938-L970}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/node/debugAdapter.ts#L391-L446}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debugger.ts#L171-L173}
 */
export type ExtensionDebugger = {
  args?: string[]
  configurationSnippets?: TJsonSchemaVSCodeSnippet[]
  deprecated?: string
  hiddenWhen?: string
  initialConfigurations?: string | ExtensionAnyValue[]
  label?: string
  languages?: string[]
  linux?: ExtensionDebuggerOS
  osx?: ExtensionDebuggerOS
  program?: string
  runtime?: string
  runtimeArgs?: string[]
  type: string
  win?: ExtensionDebuggerOS
  winx86?: ExtensionDebuggerOS
  when?: string
  windows?: ExtensionDebuggerOS
  configurationAttributes?: Record<string, ExtensionJsonSchema>
  strings?: {
    unverifiedBreakpoints?: string
  }
  variables?: Record<string, string>
  /**
   * @deprecated Use strings instead.
   */
  uiMessages?: { unverifiedBreakpoints?: string }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L86-L107}
 */
export type ExtensionJsonValidation = {
  fileMatch: string | string[]
  url: string
}

export type ExtensionDebugVisualizer = {
  id: string
  when: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L110-L128}
 */
export type ExtensionSemanticTokenModifier = {
  description: string
  id: string
}

export type ExtensionCommand = {
  command: string
  title: string
  category?: string
  enablement?: string
  icon?: ExtensionThemeableIcon
  shortTitle?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L10-L19}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L119-L127}
 */
export type ExtensionSemanticTokenType = {
  description: string
  id: string
  superType?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L21-L24}
 */
export type ExtensionSemanticTokenScope = {
  language?: string
  scopes: Record<string, string[]>
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/snippets/browser/snippetsService.ts#L47-L74}
 */
export type ExtensionSnippet = {
  language?: string
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

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedService.ts#L297-L389}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedExtensionPoint.ts#L198-L210}
 */
export type ExtensionWalkThroughStep = {
  id: string
  title: string
  completionEvents?: string[]
  description?: string
  when?: string
  /**
   * @deprecated Use completionEvents instead.
   */
  doneOn?: { command: string }
  media:
    | {
        image: ExtensionWalkThroughMediaPath
        altText: string
        markdown?: never
        svg?: never
        video?: never
      }
    | { markdown: string; image?: never; svg?: never; video?: never }
    | {
        svg: string
        altText: string
        image?: never
        markdown?: never
        video?: never
      }
    | {
        video: ExtensionWalkThroughMediaPath
        poster?: ExtensionWalkThroughMediaPath
        altText: string
        image?: never
        markdown?: never
        svg?: never
      }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/speech/browser/speechService.ts#L20-L45}
 */
export type ExtensionSpeechProvider = {
  description?: string
  name: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/terminal/common/terminal.ts#L983-L989}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L46-L49}
 */
export type ExtensionTerminalProfile = {
  id: string
  title: string
  color?: string
  titleTemplate?: string
  icon?: ExtensionThemeableIcon
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/iconExtensionPoint.ts#L15-L19}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/iconExtensionPoint.ts#L96-L99}
 */
export type ExtensionIcon = {
  description: string
  default:
    | string
    | {
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

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/authentication/browser/authenticationService.ts#L54-L74}
 */
export type ExtensionAuthentication = {
  id: string
  label: string
  authorizationServerGlobs?: string[]
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L585-L605}
 */
export type ExtensionMenu = {
  group?: string
  when?: string
} & (
  | { command: string; alt?: string; submenu?: never }
  | { submenu: string; command?: never; alt?: never }
)

export type ExtensionRemoteCodingAgent = {
  command: string
  displayName: string
  id?: string
  description?: string
  when?: string
  followUpRegex?: string
}

export type ExtensionSubmenu = {
  id: string
  label: string
  icon?: ExtensionThemeableIcon
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/taskDefinitionRegistry.ts#L58-L65}
 */
export type ExtensionTaskDefinition = {
  required?: string[]
  type: string
  when?: string
  properties?: Record<string, ExtensionJsonSchema>
}

export type ExtensionTheme = {
  path: string
  uiTheme: 'hc-black' | 'hc-light' | 'vs-dark' | 'vs'
  id?: string
  label?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/typescript-language-features/src/tsServer/plugins.ts#L69-L83}
 */
export type ExtensionTypescriptServerPlugin = {
  enableForWorkspaceTypeScriptVersions?: boolean
  name: string
  languages?: string[]
  configNamespace?: string
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
/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L89-L108}
 */
export type ExtensionViewRemote = ExtensionViewCommon & {
  group?: string
  remoteName?: string | string[]
  virtualWorkspace?: string
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

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/remote/common/remoteExplorerService.ts#L65-L116}
 */
export type ExtensionRemoteHelp = {
  documentation?: string
  feedback?: string
  getStarted?: string | { id: string }
  issues?: string
  reportIssue?: string
  remoteName?: string | string[]
  virtualWorkspace?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/label/common/label.ts#L55-L94}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/label/common/labelService.ts#L92-L112}
 */
export type ExtensionResourceLabelFormatter = {
  scheme: string
  authority?: string
  priority?: boolean
  formatting: {
    label?: string
    separator?: string
    stripPathStartingSeparator?: boolean
    tildify?: boolean
    workspaceSuffix?: string
    normalizeDriveLetter?: boolean
    authorityPrefix?: string
    stripPathSegments?: number
    /**
     * Requires the contribLabelFormatterWorkspaceTooltip API proposal.
     */
    workspaceTooltip?: string
  }
}

export type ExtensionNotebookPreload = {
  entrypoint: string
  type: string
  localResourceRoots?: string[]
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/languageModels.ts#L772-L839}
 */
export type ExtensionLanguageModelChatProvider = {
  vendor: string
  displayName: string
  configuration?: ExtensionJsonSchema
  when?: string
  deprecation?: { link?: string }
  /**
   * @deprecated Use configuration instead.
   */
  managementCommand?: string
}

export type ExtensionMcpServerDefinitionProvider = {
  id: string
  label: string
  when?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/notebookExtensionPoint.ts#L118-L215}
 */
export type ExtensionNotebookRenderer = {
  displayName: string
  id: string
  dependencies?: string[]
  optionalDependencies?: string[]
  requiresMessaging?: 'always' | 'never' | 'optional'
} & (
  | { entrypoint: string; mimeTypes: string[] }
  | { entrypoint: { extends: string; path: string }; mimeTypes?: string[] }
)

export type ExtensionModelContextServerCollection = {
  id: string
  label: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L591-L716}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L947-L964}
 */
export type ExtensionProblemPattern = {
  code?: number
  column?: number
  endColumn?: number
  endLine?: number
  file?: number
  kind?: 'file' | 'location'
  line?: number
  location?: number
  loop?: boolean
  message?: number
  name?: string
  label?: string
  regexp: string
  severity?: number
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1271-L1276}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L889-L934}
 */
export type ExtensionProblemMatcher = {
  applyTo?: 'allDocuments' | 'closedDocuments' | 'openDocuments'
  base?: string
  fileLocation?: ExtensionProblemMatcherFileLocation
  label?: string
  name?: string
  owner?: string
  pattern?: string | ExtensionProblemPattern | ExtensionProblemPattern[]
  severity?: 'error' | 'info' | 'warning'
  source?: string
  background?: ExtensionProblemMatcherBackground
  /**
   * @deprecated Use background instead.
   */
  watching?: ExtensionProblemMatcherBackground
  /**
   * @deprecated Use background.beginsPattern instead.
   */
  watchedTaskBeginsRegExp?: string
  /**
   * @deprecated Use background.endsPattern instead.
   */
  watchedTaskEndsRegExp?: string
}

export type ExtensionLocalizationTranslation = {
  id: string
  path: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/services/notebookServiceImpl.ts#L120-L147}
 */
export type ExtensionNotebook = {
  displayName: string
  type: string
  priority?: 'default' | 'option'
  selector?: {
    excludeFileNamePattern?: string
    filenamePattern?: string
  }[]
}

/**
 * An object describing the extension's [contributions](https://code.visualstudio.com/api/references/contribution-points).
 *
 * @see {@link https://code.visualstudio.com/api/references/contribution-points}
 */
export type ExtensionContributes = {
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
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatAgents}
   */
  chatAgents?: ExtensionChatAgent[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatContexts}
   */
  chatContext?: ExtensionChatContext[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatInstructions}
   */
  chatInstructions?: ExtensionChatInstruction[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatOutputRenderers}
   */
  chatOutputRenderers?: ExtensionChatOutputRenderer[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatParticipants}
   */
  chatParticipants?: ExtensionChatParticipant[]

  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/plugins/agentPluginServiceImpl.ts#L1025-L1055}
   */
  chatPlugins?: ExtensionChatPlugin[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatPromptFiles}
   */
  chatPromptFiles?: ExtensionChatPromptFile[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatSessions}
   */
  chatSessions?: ExtensionChatSession[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.chatSkills}
   */
  chatSkills?: ExtensionChatSkill[]

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
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L897-L913}
   */
  commands?: ExtensionCommand | ExtensionCommand[]

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
   * The stylesheet array requires the css API proposal.
   * The customData object is read by the built-in CSS language extension.
   *
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/browser/cssExtensionPoint.ts#L20-L47}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/css-language-features/client/src/customData.ts#L77-L87}
   */
  css?: ExtensionCss[] | { customData?: string[] }

  /**
   * @deprecated Use the nested css.customData property instead.
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.css.customData}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/css-language-features/client/src/customData.ts#L77-L87}
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
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/html-language-features/client/src/customData.ts#L127-L141}
   */
  html?: { customData?: string[] }

  /**
   * @deprecated Use the nested html.customData property instead.
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.html.customData}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/html-language-features/client/src/customData.ts#L127-L141}
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
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/json-language-features/client/src/languageParticipants.ts#L11-L60}
   */
  jsonLanguageParticipants?: ExtensionJsonLanguageParticipant[]

  /**
   * Contribute a validation schema for a specific type of json file. The url value can be either a local path to a schema file included in the extension or a remote server URL such as a [json schema store](https://www.schemastore.org/json).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.jsonValidation}
   */
  jsonValidation?: ExtensionJsonValidation[]

  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L53-L71}
   */
  jsonValidationRegistry?: ExtensionJsonValidationRegistry[]

  /**
   * Contribute a key binding rule defining what command should be invoked when the user presses a key combination. See the [Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings) topic where key bindings are explained in detail.
   *
   * Contributing a key binding will cause the Default Keyboard Shortcuts to display your rule, and every UI representation of the command will now show the key binding you have added. And, of course, when the user presses the key combination the command will be invoked.
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/keybinding/browser/keybindingService.ts#L130-L142}
   */
  keybindings?: ExtensionKeybinding | ExtensionKeybinding[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModels}
   */
  languageModels?: ExtensionLanguageModel[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModelTools}
   */
  languageModelTools?: ExtensionLanguageModelTool[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModelToolSets}
   */
  languageModelToolSets?: ExtensionLanguageModelToolSet[]

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
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.languageModelChatProviders}
   */
  languageModelChatProviders?:
    | ExtensionLanguageModelChatProvider
    | ExtensionLanguageModelChatProvider[]

  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L63-L112}
   */
  linkPresentationProviders?: ExtensionLinkPresentationProvider[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.localizations}
   */
  localizations?: ExtensionLocalization[]

  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L163-L281}
   */
  'markdown.codeBlockEditorProviders'?: ExtensionMarkdownCodeBlockEditorProvider[]

  /**
   * @deprecated Use markdown.codeBlockEditorProviders instead.
   *
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L205-L238}
   */
  'markdown.codeBlockEditors'?: ExtensionMarkdownCodeBlockEditor[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.markdownItPlugins}
   */
  'markdown.markdownItPlugins'?: boolean

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.previewScripts}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L311-L355}
   */
  'markdown.previewScripts'?: ExtensionMarkdownPreviewScript[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.markdown.previewStyles}
   */
  'markdown.previewStyles'?: string[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.mcpServerDefinitionProviders}
   */
  mcpServerDefinitionProviders?: ExtensionMcpServerDefinitionProvider[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.modelContextServerCollections}
   */
  modelContextServerCollections?: ExtensionModelContextServerCollection[]

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
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L923-L937}
   */
  problemMatchers?: (ExtensionProblemMatcher & { name: string })[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.problemPatterns}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1430-L1441}
   */
  problemPatterns?: ExtensionProblemPatternContribution[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.productIconThemes}
   */
  productIconThemes?: ExtensionProductIconTheme[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.remoteCodingAgents}
   */
  remoteCodingAgents?: ExtensionRemoteCodingAgent[]

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
  semanticTokenScopes?: ExtensionSemanticTokenScope[]

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
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.startEntries}
   */
  startEntries?: ExtensionStartEntry[]

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.statusBarItems}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/statusBarExtensionPoint.ts#L239-L252}
   */
  statusBarItems?: ExtensionStatusBarItem | ExtensionStatusBarItem[]

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
  icons?: Record<string, ExtensionIcon>

  /**
   * Contribute a menu item for a command to the editor or Explorer. The menu item definition contains the command that should be invoked when selected and the condition under which the item should show. The latter is defined with the when clause, which uses the key bindings [when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.menus}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L762-L779}
   */
  menus?: Partial<Record<LiteralUnion<ExtensionMenuKind>, ExtensionMenu[]>>

  /**
   * Contribute a terminal profile to VS Code, allowing extensions to handle the creation of the profiles. When defined, the profile should appear when creating the terminal profile
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.terminal}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L52-L59}
   */
  terminal?: {
    profiles?: ExtensionTerminalProfile[]
    completionProviders?: ExtensionTerminalCompletionProvider[]
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
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L208-L259}
   */
  views?: Record<
    string,
    (ExtensionViewCommon | ExtensionViewRemote)[] | undefined
  > & {
    debug?: ExtensionViewCommon[]
    explorer?: ExtensionViewCommon[]
    remote?: ExtensionViewRemote[]
    scm?: ExtensionViewCommon[]
    test?: ExtensionViewCommon[]
  }

  /**
   * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers}
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L60-L80}
   */
  viewsContainers?: {
    activitybar?: ExtensionViewsContainer[]
    panel?: ExtensionViewsContainer[]
    secondarySidebar?: ExtensionViewsContainer[]
  }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedService.ts#L297-L389}
 */
export type ExtensionWalkThroughMediaPath =
  | string
  | { dark: string; light: string; hc: string; hcLight?: string }

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L750-L774}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1430-L1441}
 */
export type ExtensionProblemPatternContribution = {
  name: string
  label?: string
} & (ExtensionProblemPattern | { patterns: ExtensionProblemPattern[] })

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L779-L813}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1343-L1370}
 */
export type ExtensionProblemMatcherBackground = {
  activeOnStart?: boolean
  beginsPattern?: string | { regexp: string; file?: number }
  endsPattern?: string | { regexp: string; file?: number }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84}
 */
export type ExtensionChatFile = {
  path: string
  when?: string
  sessionTypes?: string[]
  /**
   * @deprecated Specify name in the file itself instead.
   */
  name?: string
  /**
   * @deprecated Specify description in the file itself instead.
   */
  description?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L53-L71}
 */
export type ExtensionJsonValidationRegistry = { url: string }

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/plugins/agentPluginServiceImpl.ts#L1025-L1055}
 */
export type ExtensionChatPlugin = { path: string; when?: string }

/**
 * Requires the css API proposal.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/browser/cssExtensionPoint.ts#L20-L47}
 */
export type ExtensionCss = { path: string }

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L63-L112}
 */
export type ExtensionLinkPresentationProvider = {
  id: string
  uriPattern: string
  kind:
    | 'resource'
    | 'issue'
    | 'pullRequest'
    | 'commit'
    | 'file'
    | 'folder'
    | 'session'
    | 'chat'
    | 'repository'
    | 'branch'
  enablement?: string
}

/**
 * @deprecated Use markdown.codeBlockEditorProviders instead.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L205-L238}
 */
export type ExtensionMarkdownCodeBlockEditor = {
  id: string
  language: string
  entrypoint: string
  contentType?: 'text' | 'json'
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L163-L281}
 */
export type ExtensionMarkdownCodeBlockEditorProvider = {
  id: string
  selector:
    | { language: string; languagePrefix?: never }
    | { languagePrefix: string; language?: never }
  source:
    | { kind: 'static'; entrypoint: string }
    | { kind: 'exportApi'; apiVersion: number }
  runtimeKey?: string
  contentType?: 'text' | 'json'
  initialHeight?: number
  sandbox?: {
    forms?: boolean
    downloads?: boolean
    pointerLock?: boolean
    clipboardWrite?: boolean
  }
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L311-L355}
 */
export type ExtensionMarkdownPreviewScript =
  | string
  | { path: string; type?: 'module' }

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/extensionPoint.ts#L25-L103}
 */
export type ExtensionCustomEditorPriority =
  | 'default'
  | 'option'
  | 'explicit'
  /**
   * Only honored for built-in extensions; other extensions fall back to default.
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/contributedCustomEditors.ts#L128-L145}
   */
  | 'builtin'

/**
 * Requires the terminalCompletionProvider API proposal.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/terminal/common/terminal.ts#L1014-L1020}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminal.ts#L726-L743}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L52-L59}
 */
export type ExtensionTerminalCompletionProvider = {
  id?: string
  description?: string
}

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/json-language-features/client/src/languageParticipants.ts#L11-L60}
 */
export type ExtensionJsonLanguageParticipant = {
  languageId: string
  comments?: boolean
}
