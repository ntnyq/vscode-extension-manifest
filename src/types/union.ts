/**
 * @see {@link https://code.visualstudio.com/api/references/contribution-points#contributes.menus}
 */
export type ExtensionMenuKind =
  | 'commandPalette'
  | 'comments/comment/context'
  | 'comments/comment/title'
  | 'comments/commentThread/title'
  | 'commnets/commnetThread/context'
  | 'debug/callstack/context'
  | 'debug/toolbar'
  | 'debug/variables/context'
  | 'editor/context'
  | 'editor/linenumber/context'
  | 'editor/title'
  | 'editor/title/context'
  | 'explorer/context'
  | 'extension/context'
  | 'file/newFile'
  | 'interactive/cell/title'
  | 'interactive/toobar'
  | 'notebook/cell/execute'
  | 'notebook/cell/title'
  | 'notebook/toobar'
  | 'scm/change/title'
  | 'scm/resourceFolder/context'
  | 'scm/resourceGroup/context'
  | 'scm/resourceState/context'
  | 'scm/sourceControl'
  | 'scm/title'
  | 'terminal/context'
  | 'terminal/title/context'
  | 'testing/item/context'
  | 'testing/item/gutter'
  | 'timeline/item/context'
  | 'timeline/title'
  | 'touchBar'
  | 'view/item/context'
  | 'view/title'
  | 'webview/context'
// TODO: contributed.submenu

export type ExtensionCategory =
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

export type ExtensionProblemMatcherFileLocation =
  | 'absolute'
  | 'autoDetect'
  | 'relative'
  | 'search'
  // eslint-disable-next-line no-template-curly-in-string
  | ['autoDetect', '${workspaceFolder}']
  // eslint-disable-next-line no-template-curly-in-string
  | ['relative', '${workspaceFolder}']
  | [
      'search',
      {
        // eslint-disable-next-line no-template-curly-in-string
        include: '${workspaceFolder}'
      },
    ]
  | [
      'search',
      {
        exclude: string[]
        // eslint-disable-next-line no-template-curly-in-string
        include: '${workspaceFolder}'
      },
    ]
