import type { ExtendUnion } from './utils'

/**
 * @see https://code.visualstudio.com/api/references/activation-events
 */
export type ExtensionActivationEvent =
  | '*'
  | ExtendUnion<'onAuthenticationRequest'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L45-L48}
   */
  | ExtendUnion<'onChatContextProvider'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatOutputItemRenderer.ts#L294-L299}
   */
  | ExtendUnion<'onChatOutputRenderer'>
  | ExtendUnion<'onChatParticipant'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.ts#L252-L255}
   */
  | ExtendUnion<'onChatSession'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadCommands.ts#L86-L90}
   */
  | ExtendUnion<'onCommand'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67}
   */
  | 'onCustomAgentProvider'
  | ExtendUnion<'onCustomEditor'>
  | 'onDebug'
  /**
   * Activates trackers for all debugger types or one specific type.
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/common/debugger.ts#L114-L120}
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/browser/debugAdapterManager.ts#L488-L498}
   */
  | ExtendUnion<'onDebugAdapterProtocolTracker', true>
  /**
   * Activates dynamic configuration providers for all debugger types or one specific type.
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/browser/debugConfigurationManager.ts#L200-L243}
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/browser/debugAdapterManager.ts#L488-L498}
   */
  | ExtendUnion<'onDebugDynamicConfigurations', true>
  | 'onDebugInitialConfigurations'
  /**
   * Activates configuration resolvers for all debugger types or one specific type.
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/browser/debugConfigurationManager.ts#L148-L156}
   * @see {@link https://github.com/microsoft/vscode/blob/dc85eaf99d21fb62cc4d8b43a21625a93863cf1e/src/vs/workbench/contrib/debug/browser/debugAdapterManager.ts#L488-L498}
   */
  | ExtendUnion<'onDebugResolve', true>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debugVisualizers.ts#L292-L299}
   */
  | ExtendUnion<'onDebugVisualizer'>
  | ExtendUnion<'onEditSession'>
  | ExtendUnion<'onFileSystem'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67}
   */
  | 'onInstructionsProvider'
  | 'onIssueReporterOpened'
  | ExtendUnion<'onLanguage', true>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/languageModels.ts#L868-L884}
   */
  | ExtendUnion<'onLanguageModelChatProvider'>
  | ExtendUnion<'onLanguageModelTool'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L106-L111}
   */
  | ExtendUnion<'onLinkPresentation'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/mcp/common/mcpConfiguration.ts#L18-L22}
   */
  | ExtendUnion<'onMcpCollection'>
  | ExtendUnion<'onNotebook'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/notebookExtensionPoint.ts#L245-L253}
   */
  | ExtendUnion<'onNotebookSerializer'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadUriOpeners.ts#L52-L59}
   */
  | ExtendUnion<'onOpenExternalUri', true>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/userDataProfile/browser/userDataProfileImportExportService.ts#L418-L427}
   */
  | ExtendUnion<'onProfile', true>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67}
   */
  | 'onPromptFileProvider'
  | ExtendUnion<'onRenderer'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/extHostExtensionService.ts#L866-L875}
   */
  | ExtendUnion<'onResolveRemoteAuthority'>
  | ExtendUnion<'onSearch'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67}
   */
  | 'onSkillProvider'
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatSlashCommands.ts#L156-L162}
   */
  | ExtendUnion<'onSlash'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/speech/browser/speechService.ts#L229-L234}
   */
  | 'onSpeech'
  | 'onStartupFinished'
  | ExtendUnion<'onTaskType'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/browser/terminalService.ts#L1082-L1094}
   */
  | ExtendUnion<'onTerminal'>
  | ExtendUnion<'onTerminalProfile'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminalContrib/quickFix/browser/terminalQuickFixService.ts#L94-L101}
   */
  | ExtendUnion<'onTerminalQuickFixRequest'>
  /**
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadTerminalShellIntegration.ts#L113-L121}
   */
  | ExtendUnion<'onTerminalShellIntegration'>
  | 'onUri'
  | ExtendUnion<'onView'>
  | ExtendUnion<'onWalkthrough'>
  | ExtendUnion<'onWebviewPanel'>
  | ExtendUnion<'workspaceContains'>

/**
 * `EXTENSION_CATEGORIES`
 *
 * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
 * @see {@link https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensions/common/extensions.ts}
 */
export type ExtensionCategory =
  | 'AI'
  | 'Azure'
  | 'Chat'
  | 'Data Science'
  | 'Debuggers'
  | 'Education'
  | 'Extension Packs'
  | 'Formatters'
  | 'Keymaps'
  | 'Language Packs'
  /**
   * @deprecated Use Programming Languages instead.
   * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L198-L211}
   */
  | 'Languages'
  | 'Linters'
  | 'Machine Learning'
  | 'Notebooks'
  | 'Other'
  | 'Programming Languages'
  | 'SCM Providers'
  | 'Snippets'
  | 'Testing'
  | 'Themes'
  | 'Visualization'

/**
 * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.menus}
 *
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L37-L580}
 */
export type ExtensionMenuKind =
  | 'agents/change/inline'
  | 'agents/changes/actions'
  | 'agents/changes/actions/primary'
  | 'chat/chatSessions'
  | 'chat/contextUsage/actions'
  | 'chat/customizations/create'
  | 'chat/customizations/item'
  | 'chat/editor/inlineGutter'
  | 'chat/input/editing/sessionTitleToolbar'
  | 'chat/input/editing/sessionToolbar'
  | 'chat/input/status'
  | 'chat/multiDiff/context'
  | 'chat/newSession'
  | 'chatSessions/item/context'
  | 'chatSessions/newSession'
  | 'commandPalette'
  | 'comments/comment/context'
  | 'comments/comment/editorActions'
  | 'comments/comment/title'
  | 'comments/commentThread/additionalActions'
  | 'comments/commentThread/comment/context'
  | 'comments/commentThread/context'
  | 'comments/commentThread/title'
  | 'comments/commentThread/title/context'
  | 'commentsView/commentThread/context'
  | 'debug/callstack/context'
  | 'debug/createConfiguration'
  | 'debug/toolBar'
  | 'debug/variables/context'
  | 'debug/watch/context'
  | 'diffEditor/gutter/hunk'
  | 'diffEditor/gutter/selection'
  | 'editor/content'
  | 'editor/context'
  | 'editor/context/chat'
  | 'editor/context/copy'
  | 'editor/context/share'
  | 'editor/inlineCompletions/actions'
  | 'editor/lineNumber/context'
  | 'editor/title'
  | 'editor/title/context'
  | 'editor/title/context/share'
  | 'editor/title/run'
  | 'explorer/context'
  | 'explorer/context/share'
  | 'extension/context'
  | 'file/newFile'
  | 'file/share'
  | 'interactive/cell/title'
  | 'interactive/toolbar'
  | 'issue/reporter'
  | 'menuBar/edit/copy'
  | 'menuBar/home'
  | 'mergeEditor/result/title'
  | 'modalEditor/editorTitle'
  | 'multiDiffEditor/content'
  | 'multiDiffEditor/resource/title'
  | 'notebook/cell/execute'
  | 'notebook/cell/title'
  | 'notebook/kernelSource'
  | 'notebook/toolbar'
  | 'notebook/variables/context'
  | 'ports/item/context'
  | 'ports/item/origin/inline'
  | 'ports/item/port/inline'
  | 'scm/artifact/context'
  | 'scm/artifactGroup/context'
  | 'scm/change/title'
  | 'scm/history/title'
  | 'scm/historyItem/context'
  | 'scm/historyItemRef/context'
  | 'scm/inputBox'
  | 'scm/repositories/title'
  | 'scm/repository'
  | 'scm/resourceFolder/context'
  | 'scm/resourceGroup/context'
  | 'scm/resourceState/context'
  | 'scm/sourceControl'
  | 'scm/title'
  | 'searchPanel/aiResults/commands'
  | 'statusBar/remoteIndicator'
  | 'terminal/context'
  | 'terminal/title/context'
  | 'testing/item/context'
  | 'testing/item/gutter'
  | 'testing/item/result'
  | 'testing/message/content'
  | 'testing/message/context'
  | 'testing/profiles/context'
  | 'timeline/item/context'
  | 'timeline/title'
  | 'touchBar'
  | 'view/item/context'
  | 'view/title'
  | 'viewContainer/title'
  | 'webview/context'

/**
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1277-L1339}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L916-L919}
 * @see {@link https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1680-L1710}
 */
export type ExtensionProblemMatcherFileLocation =
  | 'absolute'
  | 'autoDetect'
  | 'relative'
  | 'search'
  | ['absolute']
  | ['autoDetect' | 'relative', string]
  | ['search', { include?: string | string[]; exclude?: string | string[] }]
