import type { ExtendUnion } from './utils'

/**
 * @see https://code.visualstudio.com/api/references/activation-events
 */
export type ExtensionActivationEvent =
  | '*'
  | 'onDebug'
  | 'onDebugDynamicConfigurations'
  | 'onDebugInitialConfigurations'
  | 'onIssueReporterOpened'
  | 'onOpenExternalUri'
  | 'onStartupFinished'
  | 'onUri'
  | ExtendUnion<'onAuthenticationRequest'>
  | ExtendUnion<'onChatParticipant'>
  | ExtendUnion<'onCommand', true>
  | ExtendUnion<'onCustomEditor'>
  | ExtendUnion<'onDebugAdapterProtocolTracker'>
  | ExtendUnion<'onDebugResolve'>
  | ExtendUnion<'onEditSession'>
  | ExtendUnion<'onFileSystem'>
  | ExtendUnion<'onLanguage', true>
  | ExtendUnion<'onLanguageModelTool'>
  | ExtendUnion<'onNotebook'>
  | ExtendUnion<'onRenderer'>
  | ExtendUnion<'onSearch'>
  | ExtendUnion<'onTaskType'>
  | ExtendUnion<'onTerminalProfile'>
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
 */
export type ExtensionMenuKind =
  | 'commandPalette'
  | 'comments/comment/context'
  | 'comments/comment/editorActions'
  | 'comments/comment/title'
  | 'comments/commentThread/additionalActions'
  | 'comments/commentThread/comment/context'
  | 'comments/commentThread/context'
  | 'comments/commentThread/title'
  | 'comments/commentThread/title/context'
  | 'debug/callstack/context'
  | 'debug/createConfiguration'
  | 'debug/lineNumber/context'
  | 'debug/toolbar'
  | 'debug/variables/context'
  | 'diffEditor/gutter/hunk'
  | 'diffEditor/gutter/selection'
  | 'editor/content'
  | 'editor/context'
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
  | 'multiDiffEditor/resource/title'
  | 'notebook/cell/execute'
  | 'notebook/cell/title'
  | 'notebook/kernelSource'
  | 'notebook/toolbar'
  | 'notebook/variables/context'
  | 'ports/item/context'
  | 'ports/item/origin/inline'
  | 'ports/item/port/inline'
  | 'scm/change/title'
  | 'scm/history/title'
  | 'scm/historyItem/context'
  | 'scm/inputBox'
  | 'scm/resourceFolder/context'
  | 'scm/resourceGroup/context'
  | 'scm/resourceState/context'
  | 'scm/sourceControl'
  | 'scm/sourceControl/title'
  | 'scm/title'
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

export type ExtensionProblemMatcherFileLocation =
  | 'absolute'
  | 'autoDetect'
  | 'relative'
  | 'search'
  | ['autoDetect', '${workspaceFolder}']
  | ['relative', '${workspaceFolder}']
  | [
      'search',
      {
        exclude: string[]
        include: '${workspaceFolder}'
      },
    ]
  | [
      'search',
      {
        include: '${workspaceFolder}'
      },
    ]
