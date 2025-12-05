import type { ExtensionIdentifier } from './common'
import type { ExtensionContributes } from './contributes'
import type { ExtensionActivationEvent, ExtensionCategory } from './union'
import type { LiteralUnion } from './utils'

export type ExtensionBadge = {
  description: string
  href: string
  url: string
}

/**
 * Extension Manifest
 *
 * @see {@link https://code.visualstudio.com/api/references/extension-manifest}
 */
export type ExtensionManifest = {
  /**
   * The name of the extension - should be all lowercase with no spaces. The name must be unique to the Marketplace.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  name: string

  /**
   * The [publisher identifier](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  publisher: string

  /**
   * [SemVer](https://semver.org/) compatible version.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  version: string

  /**
   * An array of the [activation events](https://code.visualstudio.com/api/references/activation-events) for this extension.
   *
   * @see {@link https://code.visualstudio.com/api/references/activation-events}
   */
  activationEvents?: ExtensionActivationEvent[]

  /**
   * Array of approved [badges](https://code.visualstudio.com/api/references/extension-manifest#approved-badges) to display in the sidebar of the Marketplace's extension page. Each badge is an object containing 3 properties: url for the badge's image URL, href for the link users will follow when clicking the badge and description.
   *
   * @see {@link https://code.visualstudio.com/api/references/activation-events}
   */
  badges?: ExtensionBadge[]

  /**
   * The entry point to your [Web extension](https://code.visualstudio.com/api/extension-guides/web-extensions).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  browser?: string

  /**
   * The categories you want to use for the extensions. Allowed values: [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  categories?: ExtensionCategory[]

  /**
   * An object describing the extension's [contributions](https://code.visualstudio.com/api/references/contribution-points).
   *
   * @see {@link https://code.visualstudio.com/api/references/contribution-points}
   */
  contributes?: ExtensionContributes

  /**
   * 	Any runtime Node.js dependencies your extensions needs. Exactly the same as [npm's dependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  dependencies?: Record<string, string>

  /**
   * A short description of what your extension is and does.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  description?: string

  /**
   * Any development Node.js dependencies your extension needs. Exactly the same as [npm's devDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  devDependencies?: Record<string, string>

  /**
   * The display name for the extension used in the Marketplace. The display name must be unique to the Marketplace.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  displayName?: string

  /**
   * An array with the ids of extensions that this extension depends on. The id of an extension is always ${publisher}.${name}. For example: vscode.csharp.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionDependencies?: ExtensionIdentifier[]

  /**
   * An array that indicates where the extension should run in remote configurations. Values are ui (run locally), workspace (run on remote machine) or both, with the order setting the preference. For example: [ui, workspace] indicates the extension can run in either location but prefers to run on the local machine. See [here](https://code.visualstudio.com/api/advanced-topics/extension-host#preferred-extension-location) for more details.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionKind?: ('ui' | 'workspace')[]

  /**
   * An array with the ids of extensions that can be installed together. The id of an extension is always ${publisher}.${name}. For example: vscode.csharp.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  extensionPack?: ExtensionIdentifier[]

  /**
   * The path to the icon of at least 128x128 pixels (256x256 for Retina screens).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  icon?: string

  /**
   * An array of keywords to make it easier to find the extension. These are included with other extension Tags on the Marketplace. This list is currently limited to 5 keywords.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  keywords?: string[]

  /**
   * Refer to [npm's documentation](https://docs.npmjs.com/cli/v7/configuring-npm/package-json/#license). If you do have a LICENSE file in the root of your extension, the value for license should be "SEE LICENSE IN <filename>".
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  license?: string

  /**
   * The entry point to your extension.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  main?: string

  /**
   * Controls the Markdown rendering engine used in the Marketplace. Either github (default) or standard.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `github`
   */
  markdown?: 'github' | 'standard'

  /**
   * Sets the extension to be flagged as a Preview in the Marketplace.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  preview?: boolean

  /**
   * The pricing information for the extension. Allowed values: Free, Trial. Default: Free. See [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#extension-pricing-label) for more details.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `Free`
   */
  pricing?: 'Free' | 'Trial'

  /**
   * Controls the Q & A link in the Marketplace. Set to marketplace to enable the default Marketplace Q & A site. Set to a string to provide the URL of a custom Q & A site. Set to false to disable Q & A altogether.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   * @default `marketplace`
   */
  qna?: false | LiteralUnion<'marketplace'>

  /**
   * Exactly the same as [npm's scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts) but with extra VS Code specific fields such as [vscode:prepublish](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#prepublish-step) or [vscode:uninstall](https://code.visualstudio.com/api/references/extension-manifest#extension-uninstall-hook).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  scripts?: Record<string, string>

  /**
   * An object containing at least the vscode key matching the versions of VS Code that the extension is compatible with. Cannot be *. For example: ^0.10.5 indicates compatibility with a minimum VS Code version of 0.10.5.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  engines: {
    vscode: string
    [key: string]: string
  }

  /**
   * An object describing the extension's capabilities in limited workspaces: [untrustedWorkspaces](https://code.visualstudio.com/api/extension-guides/workspace-trust#static-declarations), [virtualWorkspaces](https://code.visualstudio.com/api/extension-guides/virtual-workspaces#signal-whether-your-extension-can-handle-virtual-workspaces).
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  capabilities?: {
    untrustedWorkspaces:
      | {
          supported: 'limited'
          description?: string
          restrictedConfigurations?: string[]
        }
      | {
          supported: false
          description?: string
        }
      | {
          supported: true
        }
    virtualWorkspaces?:
      | true
      | {
          supported: 'limited'
          description?: string
        }
      | {
          supported: false
          description?: string
        }
      | {
          supported: true
        }
  }

  /**
   * Helps format the Marketplace header to match your icon. See details below.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  galleryBanner?: {
    color?: string
    theme?: 'dark' | 'light'
  }

  /**
   * Specify the location from where users can sponsor your extension. This is an object with a single property url, which links to a page where users can sponsor your extension.
   *
   * @see {@link https://code.visualstudio.com/api/references/extension-manifest#fields}
   */
  sponsor?: {
    url: string
  }
}
