import { assertType, describe, expectTypeOf, it } from 'vitest'
import type {
  ExtensionActivationEvent,
  ExtensionChatResource,
  ExtensionContributes,
  ExtensionJsonSchema,
  ExtensionLanguageModelChatProvider,
  ExtensionMarkdownCodeBlockEditorProvider,
  ExtensionMenuKind,
} from '../src'

describe('manifest contracts on VS Code main', () => {
  it('accepts chat resource arrays with required identity and URI fields', () => {
    const resource = {
      id: 'summary',
      label: 'Summary',
      resource: 'chat-summary:/${chatSessionId}.md',
    } satisfies ExtensionChatResource

    assertType<ExtensionContributes>({
      chatResources: [
        resource,
        {
          id: 'pinned',
          label: resource.label,
          resource: resource.resource,
          mode: 'pinned',
          icon: '$(book)',
        },
        {
          id: 'above-input',
          label: resource.label,
          resource: resource.resource,
          mode: 'aboveInput',
        },
      ],
    })
    expectTypeOf<
      Omit<ExtensionChatResource, 'resource'>
    >().not.toExtend<ExtensionChatResource>()
    expectTypeOf<{
      chatResources: ExtensionChatResource
    }>().not.toExtend<ExtensionContributes>()
    expectTypeOf<
      Omit<ExtensionChatResource, 'mode'> & { mode: 'inline' }
    >().not.toExtend<ExtensionChatResource>()
  })

  it('accepts both title bar menu identifiers', () => {
    assertType<ExtensionMenuKind>('titleBar')
    assertType<ExtensionMenuKind>('agents/titleBar')
    assertType<ExtensionContributes>({
      menus: {
        titleBar: [{ command: 'sample.open' }],
        'agents/titleBar': [{ command: 'sample.openAgents' }],
      },
    })
    expectTypeOf<'agents/titlebar'>().not.toExtend<ExtensionMenuKind>()
  })

  it('accepts the bare artifact integration and tunnel activation events', () => {
    assertType<ExtensionActivationEvent>('onChatArtifactIntegration')
    assertType<ExtensionActivationEvent>('onTunnel')
    expectTypeOf<'onChatArtifactIntegration:sample'>().not.toExtend<ExtensionActivationEvent>()
    expectTypeOf<'onTunnel:http'>().not.toExtend<ExtensionActivationEvent>()
  })

  it('accepts provider theme icons, paths, and light/dark path pairs', () => {
    assertType<ExtensionContributes>({
      languageModelChatProviders: [
        { vendor: 'theme', displayName: 'Theme', icon: '$(zap)' },
        { vendor: 'path', displayName: 'Path', icon: 'icons/provider.svg' },
        {
          vendor: 'themed-path',
          displayName: 'Themed Path',
          icon: { light: 'icons/light.svg', dark: 'icons/dark.svg' },
        },
      ],
    })
    expectTypeOf<{
      vendor: string
      displayName: string
      icon: { light: string }
    }>().not.toExtend<ExtensionLanguageModelChatProvider>()
  })

  it('accepts Markdown code block editor presentation preferences', () => {
    const provider = {
      id: 'sample',
      selector: { language: 'sample' },
      source: { kind: 'exportApi', apiVersion: 2 },
      presentation: {
        resizable: true,
        fullWidth: false,
        fullView: true,
        minHeight: 160,
        maxAutomaticHeight: 400,
      },
    } satisfies ExtensionMarkdownCodeBlockEditorProvider

    assertType<ExtensionContributes>({
      'markdown.codeBlockEditorProviders': [provider],
    })
    expectTypeOf<
      Omit<typeof provider, 'presentation'> & {
        presentation: { minHeight: string }
      }
    >().not.toExtend<ExtensionMarkdownCodeBlockEditorProvider>()
  })

  it('accepts setting deprecation controls and keyed experiments', () => {
    assertType<ExtensionContributes>({
      configuration: {
        properties: {
          'sample.deprecated': {
            type: 'boolean',
            deprecationMessage: 'Use sample.options.',
            deprecationMessageSeverity: 'info',
            deprecationMessageShowInSettings: true,
          },
          'sample.options': {
            type: 'object',
            experiment: { mode: 'auto', keyed: true },
          },
        },
      },
    })
    assertType<ExtensionJsonSchema>({ deprecationMessageSeverity: 'warning' })
    // @ts-expect-error The Settings editor supports only warning and info.
    assertType<ExtensionJsonSchema>({ deprecationMessageSeverity: 'error' })
    expectTypeOf<{
      deprecationMessageShowInSettings: 'always'
    }>().not.toExtend<ExtensionJsonSchema>()
    // @ts-expect-error Keyed experiments still require a mode.
    assertType<ExtensionJsonSchema>({ experiment: { keyed: true } })
    // @ts-expect-error Keyed is a boolean flag.
    assertType<ExtensionJsonSchema>({ experiment: { mode: 'auto', keyed: 1 } })
  })
})
