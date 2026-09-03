import { assertType, describe, expectTypeOf, it } from 'vitest'
import type {
  ExtensionActivationEvent,
  ExtensionChatContext,
  ExtensionChatParticipantDisambiguation,
  ExtensionChatViewWelcome,
  ExtensionCodeAction,
  ExtensionContributes,
  ExtensionCustomEditor,
  ExtensionDebugger,
  ExtensionJsonSchema,
  ExtensionJsonValidation,
  ExtensionLanguage,
  ExtensionLanguageModelTool,
  ExtensionManifest,
  ExtensionMarkdownCodeBlockEditorProvider,
  ExtensionMenu,
  ExtensionMenuKind,
  ExtensionNotebookRenderer,
  ExtensionProblemMatcher,
  ExtensionProblemMatcherFileLocation,
  ExtensionProblemPattern,
  ExtensionSemanticTokenModifier,
  ExtensionSpeechProvider,
  ExtensionStatusBarItem,
  ExtensionTaskDefinition,
  ExtensionThemeableIcon,
  ExtensionWalkThroughStep,
} from '../src'
import { defineExtensionManifest } from '../src'

// These regressions follow the pinned runtime/schema sources in docs/vscode-source-audit.md.
describe('vscode source contracts', () => {
  it('accepts manifest capabilities independently and legacy extension kind strings', () => {
    defineExtensionManifest({
      name: 'source-audit',
      publisher: 'test',
      version: '1.0.0',
      engines: { vscode: '^1.100.0' },
      api: 'none',
      enabledApiProposals: ['agentsWindowActivation'],
      extensionAffinity: ['vscode.git'],
      extensionKind: 'ui',
      capabilities: {
        virtualWorkspaces: false,
        agentsWindow: { supported: true },
      },
    })
    assertType<ExtensionManifest['capabilities']>({
      untrustedWorkspaces: {
        supported: 'limited',
        description: 'Workspace commands are disabled.',
        restrictedConfigurations: ['audit.command'],
      },
    })
    expectTypeOf<{ untrustedWorkspaces: { supported: false } }>().not.toExtend<
      NonNullable<ExtensionManifest['capabilities']>
    >()
    expectTypeOf<'web'>().not.toExtend<ExtensionManifest['extensionKind']>()
  })

  it('accepts sparse menus, submenu entries, and custom view containers', () => {
    assertType<ExtensionContributes>({
      menus: {
        'editor/title': [{ submenu: 'audit.menu', group: 'navigation' }],
        'audit.menu': [{ command: 'audit.open', alt: 'audit.openAside' }],
      },
      views: {
        explorer: [{ id: 'audit.explorer', name: 'Audit' }],
        audit: [{ id: 'audit.preview', name: 'Preview', type: 'webview' }],
        remote: [
          {
            id: 'audit.remote',
            name: 'Remote',
            remoteName: ['ssh-remote', 'dev-container'],
            virtualWorkspace: 'github',
            icon: 'media/remote.svg',
          },
        ],
      },
      viewsContainers: {
        secondarySidebar: [
          { id: 'audit', title: 'Audit', icon: 'media/audit.svg' },
        ],
      },
    })
    expectTypeOf<{
      command: string
      submenu: string
    }>().not.toExtend<ExtensionMenu>()
    expectTypeOf<{ group: string }>().not.toExtend<ExtensionMenu>()
    expectTypeOf<{
      views: { audit: { id: string; name: string } }
    }>().not.toExtend<ExtensionContributes>()
    assertType<ExtensionMenuKind>('debug/toolBar')
    assertType<ExtensionMenuKind>('scm/repositories/title')
    assertType<ExtensionMenuKind>('chatSessions/newSession')
    assertType<ExtensionMenuKind>('agents/changes/actions')
    expectTypeOf<'debug/toolbar'>().not.toExtend<ExtensionMenuKind>()
  })

  it('accepts singleton contributions and platform-only keybindings', () => {
    assertType<ExtensionContributes>({
      commands: { command: 'audit.open', title: 'Open Audit' },
      keybindings: { command: 'audit.open', mac: 'cmd+shift+a' },
      statusBarItems: {
        id: 'audit.status',
        name: 'Audit',
        text: 'Ready',
        alignment: 'left',
        accessibilityInformation: { label: 'Audit is ready' },
      },
    })
    expectTypeOf<{
      id: string
      name: string
      text: string
      alignment: 'center'
    }>().not.toExtend<ExtensionStatusBarItem>()
    expectTypeOf<{
      id: string
      name: string
      text: string
      alignment: 'left'
      accessibilityInformation: { role: string }
    }>().not.toExtend<ExtensionStatusBarItem>()
    expectTypeOf<{ dark: string }>().not.toExtend<ExtensionThemeableIcon>()
  })

  it('models named multiline problem patterns and background monitors', () => {
    assertType<ExtensionContributes>({
      problemPatterns: [
        {
          name: 'audit-single',
          regexp: '^(.*):(.*)$',
          file: 1,
          message: 2,
          kind: 'file',
        },
        {
          name: 'audit-multi',
          patterns: [
            { regexp: '^(.*)$', file: 1 },
            { regexp: '^(\\d+): (.*)$', line: 1, message: 2, loop: true },
          ],
        },
      ],
      problemMatchers: [
        {
          name: 'audit',
          pattern: '$audit-multi',
          applyTo: 'closedDocuments',
          fileLocation: ['relative', '${workspaceFolder}/src'],
          background: {
            activeOnStart: true,
            beginsPattern: { regexp: '^Starting (.*)$', file: 1 },
            endsPattern: '^Finished$',
          },
        },
      ],
    })
    assertType<ExtensionProblemMatcher>({
      pattern: [{ regexp: '^(.*)$', kind: 'file' }],
    })
    assertType<ExtensionProblemMatcherFileLocation>(['absolute'])
    assertType<ExtensionProblemMatcherFileLocation>([
      'search',
      { include: ['/src'], exclude: '/generated' },
    ])
    expectTypeOf<
      ['relative']
    >().not.toExtend<ExtensionProblemMatcherFileLocation>()
    expectTypeOf<{ regexp: number }>().not.toExtend<ExtensionProblemPattern>()
    expectTypeOf<{
      regexp: string
      loop: number
    }>().not.toExtend<ExtensionProblemPattern>()
    expectTypeOf<{
      applyTo: 'closeDocuments'
    }>().not.toExtend<ExtensionProblemMatcher>()
    expectTypeOf<{
      problemPatterns: [{ regexp: string }]
    }>().not.toExtend<ExtensionContributes>()
  })

  it('accepts recursive schemas and settings editor metadata', () => {
    assertType<ExtensionJsonSchema>({
      $id: 'https://example.com/audit.schema.json',
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $defs: { value: { type: 'string', format: 'date-time' } },
      properties: { timestamp: { $ref: '#/$defs/value' } },
      dependencies: { timestamp: ['enabled'] },
      dependentSchemas: { timestamp: { required: ['enabled'] } },
      dependentRequired: { enabled: ['timestamp'] },
      prefixItems: [{ type: 'string' }],
      unevaluatedProperties: false,
      deprecated: true,
      secret: true,
    })
    assertType<ExtensionJsonSchema>({
      type: 'boolean',
      policy: {
        name: 'AuditEnabled',
        category: 'Extensions',
        minimumVersion: '1.100',
        localization: {
          description: { key: 'auditEnabled', value: 'Enable auditing.' },
        },
        managedSettings: { 'audit.enabled': { type: 'boolean' } },
        restrictedValue: false,
      },
    })
    assertType<ExtensionContributes>({
      configuration: {
        properties: {
          'audit.message': {
            type: 'string',
            editPresentation: 'multilineText',
            keywords: ['message'],
            restricted: true,
            included: true,
            disallowSyncIgnore: true,
            disallowConfigurationDefault: true,
            agentsWindow: { default: '', readOnly: true },
            enum: ['auto', 'js'],
            enumItemLabels: [null, 'JavaScript'],
            policyReference: { name: 'AuditMessage' },
          },
        },
      },
      configurationDefaults: {
        launch: { configurations: [] },
        '[typescript][javascript]': { 'editor.tabSize': 2 },
      },
    })
    expectTypeOf<{
      editPresentation: boolean
    }>().not.toExtend<ExtensionJsonSchema>()
    expectTypeOf<{
      policy: NonNullable<ExtensionJsonSchema['policy']>
      policyReference: { name: string }
    }>().not.toExtend<ExtensionJsonSchema>()
  })

  it('supports global snippets, inherited icons, semantic tokens, and code action arrays', () => {
    assertType<ExtensionContributes>({
      snippets: [{ path: './snippets/global.code-snippets' }],
      icons: { 'audit-status': { description: 'Status', default: 'check' } },
      colors: [
        {
          id: 'audit.status',
          description: 'Status',
          defaults: { dark: 'foreground', light: '#000000' },
        },
      ],
      semanticTokenTypes: [{ id: 'auditToken', description: 'Audit token' }],
      semanticTokenModifiers: [
        { id: 'auditModifier', description: 'Audit modifier' },
      ],
      semanticTokenScopes: [{ scopes: { auditToken: ['entity.name'] } }],
      codeActions: [
        {
          languages: ['typescript'],
          actions: [{ kind: 'source.audit', title: 'Audit' }],
        },
      ],
    })
    expectTypeOf<{
      languages: string[]
      actions: { kind: string; title: string }
    }>().not.toExtend<ExtensionCodeAction>()
    expectTypeOf<{
      description: string
    }>().not.toExtend<ExtensionSemanticTokenModifier>()
    expectTypeOf<{ extensions: string[] }>().not.toExtend<ExtensionLanguage>()
    expectTypeOf<{ url: string }>().not.toExtend<ExtensionJsonValidation>()
    expectTypeOf<{
      description: string
    }>().not.toExtend<ExtensionSpeechProvider>()
    expectTypeOf<{
      required: string[]
    }>().not.toExtend<ExtensionTaskDefinition>()
  })

  it('supports all runtime walkthrough media and renderer inheritance', () => {
    assertType<ExtensionWalkThroughStep>({
      id: 'markdown',
      title: 'Read',
      media: { markdown: './intro.md' },
    })
    assertType<ExtensionWalkThroughStep>({
      id: 'image',
      title: 'Look',
      media: {
        image: { light: './light.png', dark: './dark.png', hc: './hc.png' },
        altText: 'Overview',
      },
    })
    assertType<ExtensionWalkThroughStep>({
      id: 'video',
      title: 'Watch',
      media: { video: './demo.mp4', altText: 'Demo' },
    })
    assertType<ExtensionWalkThroughStep>({
      id: 'svg',
      title: 'Look',
      media: { svg: './demo.svg', altText: 'Demo' },
    })
    assertType<ExtensionNotebookRenderer>({
      id: 'audit',
      displayName: 'Audit',
      entrypoint: { extends: 'vscode.builtin-renderer', path: './index.js' },
    })
    assertType<ExtensionContributes>({
      notebooks: [{ type: 'audit', displayName: 'Audit' }],
    })
    expectTypeOf<{
      id: string
      displayName: string
      entrypoint: string
    }>().not.toExtend<ExtensionNotebookRenderer>()
    expectTypeOf<{
      id: string
      title: string
      media: { image: string; markdown: string; altText: string }
    }>().not.toExtend<ExtensionWalkThroughStep>()
  })

  it('supports platform debugger executables and per-editor custom editor priorities', () => {
    assertType<ExtensionDebugger>({
      type: 'audit',
      windows: { program: './adapter.exe', args: ['--debug'] },
      linux: {
        program: './adapter.js',
        runtime: 'node',
        runtimeArgs: ['--inspect'],
      },
      winx86: { program: './adapter32.exe' },
      configurationSnippets: [
        { label: 'Audit', body: { type: 'audit', request: 'launch' } },
      ],
    })
    assertType<ExtensionCustomEditor>({
      viewType: 'audit',
      displayName: 'Audit',
      selector: [{ filenamePattern: '*.audit' }],
      priority: { textEditor: 'default', diffEditor: 'explicit' },
    })
    assertType<ExtensionCustomEditor>({
      viewType: 'audit.builtin',
      displayName: 'Built-in Audit',
      selector: [{ filenamePattern: '*.audit' }],
      priority: 'builtin',
    })
    expectTypeOf<{ args: string[] }>().not.toExtend<ExtensionDebugger>()
    expectTypeOf<{
      type: string
      runtimeArgs: number[]
    }>().not.toExtend<ExtensionDebugger>()
  })

  it('covers chat file metadata, participant proposals, sessions, and tool validation', () => {
    assertType<ExtensionContributes>({
      chatAgents: [
        {
          path: './audit.agent.md',
          sessionTypes: ['local'],
          when: 'audit.enabled',
        },
      ],
      chatInstructions: [
        { path: './audit.instructions.md', when: 'audit.enabled' },
      ],
      chatPromptFiles: [{ path: './audit.prompt.md', sessionTypes: ['local'] }],
      chatSkills: [{ path: './audit/SKILL.md', when: 'audit.enabled' }],
      chatPlugins: [{ path: './plugin', when: 'audit.enabled' }],
      chatContext: [{ id: 'audit', displayName: 'Audit', icon: '$(check)' }],
      chatViewsWelcome: [
        {
          icon: '$(check)',
          title: 'Audit',
          when: 'audit.enabled',
          content: 'Start here',
        },
      ],
      chatParticipants: [
        {
          id: 'audit',
          name: 'audit',
          isDefault: true,
          modes: ['ask', 'agent'],
          locations: ['panel', 'editor', 'editing-session'],
          disambiguation: [
            {
              categoryName: 'legacy-audit',
              description: 'Audit a project',
              examples: ['Audit this project'],
            },
          ],
        },
      ],
      chatSessions: [
        {
          type: 'audit',
          name: 'audit',
          displayName: 'Audit',
          description: 'Audit',
          icon: { dark: './dark.svg', light: './light.svg' },
          capabilities: {
            supportsPromptAttachments: true,
            supportsHandOffs: true,
          },
          commands: [{ name: 'start' }],
          requiresCustomModels: true,
          supportsAutoModel: true,
          requiresCopilotSignIn: false,
          autoAttachReferences: true,
          useRequestToPopulateBuiltInPickers: true,
        },
      ],
      chatOutputRenderers: [
        { viewType: 'audit', codeBlockLanguageIdentifiers: ['audit'] },
      ],
      languageModelTools: [
        {
          name: 'audit',
          displayName: 'Audit',
          modelDescription: 'Run an audit',
          canBeReferencedInPrompt: true,
          toolReferenceName: 'audit',
        },
      ],
      languageModelToolSets: [
        {
          name: 'audit',
          description: 'Audit',
          tools: ['audit'],
          legacyFullNames: ['old/audit'],
        },
      ],
      languageModelChatProviders: {
        vendor: 'audit',
        displayName: 'Audit',
        deprecation: { link: 'vscode:extension/test.replacement' },
        configuration: {
          properties: { apiKey: { type: 'string', secret: true } },
        },
      },
    })
    expectTypeOf<{ name: string }>().not.toExtend<ExtensionLanguageModelTool>()
    expectTypeOf<{
      name: string
      displayName: string
      modelDescription: string
      canBeReferencedInPrompt: true
    }>().not.toExtend<ExtensionLanguageModelTool>()
    expectTypeOf<{
      id: string
      displayName: string
      icon: 'media/icon.svg'
    }>().not.toExtend<ExtensionChatContext>()
    expectTypeOf<{
      title: string
      when: string
    }>().not.toExtend<ExtensionChatViewWelcome>()
    expectTypeOf<{
      category: string
      description: string
      examples: number[]
    }>().not.toExtend<ExtensionChatParticipantDisambiguation>()
  })

  it('covers built-in language and markdown extension consumers', () => {
    assertType<ExtensionContributes>({
      html: { customData: ['./html.json'] },
      css: { customData: ['./css.json'] },
      jsonLanguageParticipants: [{ languageId: 'audit-json', comments: true }],
      jsonValidationRegistry: [{ url: 'https://example.com/catalog.json' }],
      typescriptServerPlugins: [
        {
          name: 'audit-ts-plugin',
          languages: ['audit'],
          configNamespace: 'audit',
        },
      ],
      'markdown.previewScripts': [
        './preview.js',
        { path: './preview.mjs', type: 'module' },
      ],
      'markdown.codeBlockEditorProviders': [
        {
          id: 'audit',
          selector: { languagePrefix: 'audit-' },
          source: { kind: 'exportApi', apiVersion: 1 },
          contentType: 'json',
          sandbox: { clipboardWrite: true },
        },
      ],
      'markdown.codeBlockEditors': [
        { id: 'legacy', language: 'audit', entrypoint: './legacy.js' },
      ],
    })
    assertType<ExtensionContributes>({ css: [{ path: './theme.css' }] })
    expectTypeOf<{
      id: string
      selector: { language: string; languagePrefix: string }
      source: { kind: 'static'; entrypoint: string }
    }>().not.toExtend<ExtensionMarkdownCodeBlockEditorProvider>()
  })

  it('covers source-only link, terminal, and remote metadata', () => {
    assertType<ExtensionContributes>({
      linkPresentationProviders: [
        {
          id: 'audit',
          uriPattern: '^https://example.com/',
          kind: 'pullRequest',
          enablement: 'audit.enabled',
        },
      ],
      terminal: {
        profiles: [
          {
            id: 'audit',
            title: 'Audit',
            titleTemplate: '${process} (${sequence})',
            color: 'terminal.ansiGreen',
          },
        ],
        completionProviders: [{ description: 'Audit shell completions' }],
      },
      authentication: [
        {
          id: 'audit',
          label: 'Audit',
          authorizationServerGlobs: ['https://example.com/*'],
        },
      ],
      remoteHelp: {
        getStarted: { id: 'audit.walkthrough' },
        remoteName: ['ssh-remote'],
        virtualWorkspace: 'github',
      },
      continueEditSession: [
        {
          command: 'audit.continue',
          documentation: 'https://example.com',
          category: 'Audit',
        },
      ],
      resourceLabelFormatters: [
        {
          scheme: 'audit',
          priority: true,
          formatting: {
            authorityPrefix: '@',
            normalizeDriveLetter: true,
            stripPathSegments: 2,
            workspaceTooltip: 'Audit',
          },
        },
      ],
    })
  })

  it('accepts events emitted by source-only consumers', () => {
    assertType<ExtensionActivationEvent[]>([
      'onChatContextProvider:audit',
      'onChatOutputRenderer:audit',
      'onChatSession:audit',
      'onCustomAgentProvider',
      'onInstructionsProvider',
      'onPromptFileProvider',
      'onSkillProvider',
      'onDebugVisualizer:audit',
      'onLanguageModelChatProvider:audit',
      'onLinkPresentation:audit',
      'onMcpCollection:audit',
      'onNotebookSerializer:audit',
      'onOpenExternalUri:https',
      'onProfile',
      'onProfile:audit',
      'onResolveRemoteAuthority:ssh-remote',
      'onSlash:audit',
      'onSpeech',
      'onTerminal:bash',
      'onTerminalQuickFixRequest:audit',
      'onTerminalShellIntegration:*',
    ])
    expectTypeOf<'onCommand'>().not.toExtend<ExtensionActivationEvent>()
    expectTypeOf<'onNotebookSerializer'>().not.toExtend<ExtensionActivationEvent>()
  })
})
