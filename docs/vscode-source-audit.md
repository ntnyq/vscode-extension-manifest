# VS Code Source Type Audit

Audit date: 2026-09-03. The baseline is the `microsoft/vscode` main snapshot [`9a9257010666f5e886b2e2b095fe9febd5a5c13c`](https://github.com/microsoft/vscode/commit/9a9257010666f5e886b2e2b095fe9febd5a5c13c). This is not a compatibility guarantee for a particular stable release.

All type files in `src/types` were reviewed, together with contribution registrations, activation event generators and callers in `src/vs`, and contributions read by built-in extensions under `extensions`. Each change has permanent source links below, with `@see` links alongside the types. Documentation alone is insufficient to establish field support.

Decision criteria: prioritize how the raw manifest is read and validated, using contribution schemas and interfaces as additional evidence. A schema without required fields does not imply that runtime code permits them to be absent. Proposal fields still require the corresponding `enabledApiProposals` and a supporting VS Code environment. Types do not replace runtime checks for regular expressions, paths, nonempty strings, numeric ranges, or proposals.

## Changes and Sources

- `ExtensionMenu`: Model command and submenu entries as mutually exclusive branches; submenu entries no longer require command.

  [menusExtensionPoint.ts:L585-L605](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L585-L605)

- `contributes.menus`: Make every menu key optional while retaining built-in menu completion and custom submenu IDs.

  [menusExtensionPoint.ts:L762-L779](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L762-L779)

- `contributes.views`: Correct custom view container values to arrays, compatible with optional built-in containers.

  [viewsExtensionPoint.ts:L208-L259](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L208-L259)

- `contributes.viewsContainers`: Add the secondarySidebar container.

  [viewsExtensionPoint.ts:L60-L80](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L60-L80)

- `ExtensionViewRemote`: Inherit all common view properties for remote views; allow arrays for remoteName and add virtualWorkspace.

  [viewsExtensionPoint.ts:L89-L108](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/viewsExtensionPoint.ts#L89-L108)

- `ExtensionThemeableIcon`: Require both dark and light in object-form icons; the validator rejects missing properties.

  [menusExtensionPoint.ts:L793-L833](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L793-L833)

- `ExtensionThemeableColor`: Allow string color IDs without a dot, such as foreground.

  [colorExtensionPoint.ts:L29-L110](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/colorExtensionPoint.ts#L29-L110)

- `ExtensionDebuggerOS`: Add program, args, and runtimeArgs, which the runtime reads.

  [debug.ts:L938-L943](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debug.ts#L938-L943), [debugAdapter.ts:L364-L389](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/node/debugAdapter.ts#L364-L389)

- `ExtensionConfigurationKey`: Remove the requirement for a dot in setting names, allowing top-level names such as launch.

  [configurationExtensionPoint.ts:L39-L46](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L39-L46)

- `contributes.commands`: Allow a single command object.

  [menusExtensionPoint.ts:L897-L913](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L897-L913)

- `contributes.keybindings`: Allow a single keybinding object.

  [keybindingService.ts:L130-L142](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/keybinding/browser/keybindingService.ts#L130-L142)

- `ExtensionKeybinding`: Allow the runtime-supported form that omits the general key and specifies only mac/linux/win. The schema still requires key; follow the actual validator.

  [keybindingService.ts:L61-L90](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/keybinding/browser/keybindingService.ts#L61-L90)

- `contributes.statusBarItems`: Allow a single status bar item.

  [statusBarExtensionPoint.ts:L239-L252](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/statusBarExtensionPoint.ts#L239-L252)

- `ExtensionStatusBarItem`: Restrict alignment to left/right and require accessibilityInformation.label.

  [statusBarExtensionPoint.ts:L175-L237](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/statusBarExtensionPoint.ts#L175-L237)

- `ExtensionLanguage`: Require id because the language contribution validator rejects its absence.

  [languageService.ts:L330-L345](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/language/common/languageService.ts#L330-L345)

- `ExtensionCodeAction`: Correct actions to an array. The snapshot retains the interface, but no registry for this legacy contribution point was found.

  [extensions.ts:L96-L105](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/extensions/common/extensions.ts#L96-L105)

- `ExtensionJsonValidation`: Require fileMatch and url, matching runtime validation.

  [jsonValidationExtensionPoint.ts:L86-L107](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L86-L107)

- `ExtensionSemanticTokenModifier`: Require id and description.

  [tokenClassificationExtensionPoint.ts:L110-L128](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L110-L128)

- `ExtensionSemanticTokenType`: Make superType optional.

  [tokenClassificationExtensionPoint.ts:L10-L19](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L10-L19), [tokenClassificationExtensionPoint.ts:L119-L127](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L119-L127)

- `ExtensionSemanticTokenScope`: Require scopes.

  [tokenClassificationExtensionPoint.ts:L21-L24](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/tokenClassificationExtensionPoint.ts#L21-L24)

- `ExtensionSnippet`: Allow global .code-snippets files without language.

  [snippetsService.ts:L47-L74](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/snippets/browser/snippetsService.ts#L47-L74)

- `ExtensionIcon`: Allow an existing icon ID string as default.

  [iconExtensionPoint.ts:L15-L19](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/iconExtensionPoint.ts#L15-L19), [iconExtensionPoint.ts:L96-L99](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/common/iconExtensionPoint.ts#L96-L99)

- `ExtensionAuthentication`: Add authorizationServerGlobs.

  [authenticationService.ts:L54-L74](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/authentication/browser/authenticationService.ts#L54-L74)

- `ExtensionSpeechProvider`: Require name.

  [speechService.ts:L20-L45](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/speech/browser/speechService.ts#L20-L45)

- `ExtensionTaskDefinition`: Require type; the registry rejects contributions without it.

  [taskDefinitionRegistry.ts:L58-L65](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/taskDefinitionRegistry.ts#L58-L65)

- `ExtensionTypescriptServerPlugin`: Require name and add languages and configNamespace.

  [plugins.ts:L69-L83](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/typescript-language-features/src/tsServer/plugins.ts#L69-L83)

- `ExtensionContinueEditSession`: Add documentation and category, which the implementation reads but the registration schema omits.

  [editSessions.contribution.ts:L889-L915](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/editSessions/browser/editSessions.contribution.ts#L889-L915), [editSessions.contribution.ts:L1102-L1109](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/editSessions/browser/editSessions.contribution.ts#L1102-L1109)

- `ExtensionDebugger`: Require type; use string arrays for args/runtimeArgs and the snippet structure for configurationSnippets; add win, winx86, and legacy uiMessages.

  [debug.ts:L938-L970](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debug.ts#L938-L970), [debugAdapter.ts:L391-L446](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/node/debugAdapter.ts#L391-L446), [debugger.ts:L171-L173](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debugger.ts#L171-L173)

- `ExtensionRemoteHelp`: Allow a walkthrough ID object for getStarted and add remoteName and virtualWorkspace.

  [remoteExplorerService.ts:L65-L116](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/remote/common/remoteExplorerService.ts#L65-L116)

- `ExtensionResourceLabelFormatter`: Add priority, normalizeDriveLetter, authorityPrefix, stripPathSegments, and workspaceTooltip; preserve the default behavior of label/separator.

  [label.ts:L55-L94](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/label/common/label.ts#L55-L94), [labelService.ts:L92-L112](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/label/common/labelService.ts#L92-L112)

- `ExtensionNotebookRenderer`: Allow extending renderers with an extends/path entrypoint object; only a string entrypoint requires mimeTypes.

  [notebookExtensionPoint.ts:L118-L215](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/notebookExtensionPoint.ts#L118-L215)

- `ExtensionWalkThroughMediaPath`: Add themed walkthrough media paths; hcLight falls back to light at runtime.

  [gettingStartedService.ts:L297-L389](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedService.ts#L297-L389)

- `ExtensionWalkThroughStep`: Model media as mutually exclusive image/markdown/svg/video branches; support themed paths and video poster, which is optional at runtime; add deprecated doneOn.

  [gettingStartedService.ts:L297-L389](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedService.ts#L297-L389), [gettingStartedExtensionPoint.ts:L198-L210](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStartedExtensionPoint.ts#L198-L210)

- `ExtensionProblemPattern`: Require regexp as a string; use file/location for kind, boolean for loop, and string for name; add label and move multiline patterns into the named contribution union.

  [problemMatcher.ts:L591-L716](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L591-L716), [problemMatcher.ts:L947-L964](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L947-L964)

- `ExtensionProblemPatternContribution`: Distinguish an individual matching pattern from named single-line or multiline problemPatterns contributions.

  [problemMatcher.ts:L750-L774](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L750-L774), [problemMatcher.ts:L1430-L1441](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1430-L1441)

- `ExtensionProblemMatcherBackground`: Allow regexp/file objects for background beginsPattern/endsPattern.

  [problemMatcher.ts:L779-L813](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L779-L813), [problemMatcher.ts:L1343-L1370](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1343-L1370)

- `ExtensionProblemMatcher`: Correct closedDocuments; allow named references and multiline arrays for pattern; add background objects and legacy watching/watchedTask* fields.

  [problemMatcher.ts:L1271-L1276](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1271-L1276), [problemMatcher.ts:L889-L934](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L889-L934)

- `contributes.problemPatterns`: Require name on contributions and allow named multiline patterns.

  [problemMatcher.ts:L750-L774](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L750-L774), [problemMatcher.ts:L1430-L1441](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1430-L1441)

- `contributes.problemMatchers`: Require contributed matchers to be named while retaining the base type for inline matchers.

  [problemMatcher.ts:L923-L937](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L923-L937)

- `ExtensionProblemMatcherFileLocation`: Add the runtime-supported single-element absolute tuple; allow arbitrary path strings; allow strings or arrays for search include/exclude, with include optional per the Config interface. The schema also lists single-element relative/autoDetect/search tuples, but the parser rejects them, so they are excluded.

  [problemMatcher.ts:L1277-L1339](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1277-L1339), [problemMatcher.ts:L916-L919](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L916-L919), [problemMatcher.ts:L1680-L1710](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/tasks/common/problemMatcher.ts#L1680-L1710)

- `ExtensionChatFile`: Add the complete shared contribution structure for all four chat file types: path, when, sessionTypes, and legacy name/description.

  [chatPromptFilesContribution.ts:L23-L84](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84)

- `ExtensionChatAgent`: Use the complete chat file structure, adding when, sessionTypes, and deprecated name/description.

  [chatPromptFilesContribution.ts:L23-L84](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84)

- `ExtensionChatInstruction`: Use the complete chat file structure, adding when, sessionTypes, and deprecated name/description.

  [chatPromptFilesContribution.ts:L23-L84](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84)

- `ExtensionChatPromptFile`: Use the complete chat file structure, adding when, sessionTypes, and deprecated name/description.

  [chatPromptFilesContribution.ts:L23-L84](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84)

- `ExtensionChatSkill`: Use the complete chat file structure, adding when, sessionTypes, and deprecated name/description.

  [chatPromptFilesContribution.ts:L23-L84](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/chatPromptFilesContribution.ts#L23-L84)

- `ExtensionChatContext`: Remove the arbitrary any-valued field signature; restrict icon to the runtime-recognized $(iconId) form.

  [chatContext.contribution.ts:L15-L43](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L15-L43), [chatContext.contribution.ts:L60-L75](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L60-L75)

- `ExtensionChatViewWelcome`: Require icon/title/when and use product icons; preserve the optional content read by the implementation rather than copying the contents typo in the schema required list.

  [chatViewsWelcomeHandler.ts:L19-L41](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/viewsWelcome/chatViewsWelcomeHandler.ts#L19-L41), [chatViewsWelcomeHandler.ts:L61-L77](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/viewsWelcome/chatViewsWelcomeHandler.ts#L61-L77)

- `ExtensionChatParticipant`: Add the isDefault, modes, and locations proposal fields declared in the source.

  [chatParticipantContribTypes.ts:L17-L32](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatParticipantContribTypes.ts#L17-L32), [chatParticipant.contribution.ts:L247-L255](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L247-L255), [constants.ts:L143-L150](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/constants.ts#L143-L150), [constants.ts:L243-L268](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/constants.ts#L243-L268)

- `ExtensionChatParticipantDisambiguation`: Restrict examples to string[]; allow participants to provide only the legacy categoryName field, while commands still require category.

  [chatParticipant.contribution.ts:L294-L299](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L294-L299), [chatParticipantContribTypes.ts:L8-L32](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatParticipantContribTypes.ts#L8-L32), [chatParticipant.contribution.ts:L262-L271](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L262-L271)

- `ExtensionChatSession`: Allow themed icon objects; add five session flags and supportsPromptAttachments/supportsHandOffs; make command description optional.

  [chatSessions.contribution.ts:L63-L256](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.ts#L63-L256)

- `ExtensionLanguageModelTool`: Require displayName/modelDescription and require toolReferenceName when prompt references are enabled; add proposal-gated legacyToolReferenceFullNames.

  [languageModelToolsContribution.ts:L28-L40](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L28-L40), [languageModelToolsContribution.ts:L226-L253](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L226-L253)

- `ExtensionLanguageModelToolSet`: Add legacyFullNames and mark referenceName as deprecated.

  [languageModelToolsContribution.ts:L140-L150](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L140-L150), [languageModelToolsContribution.ts:L332-L380](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/tools/languageModelToolsContribution.ts#L332-L380)

- `ExtensionLanguageModelChatProvider`: Add deprecation.link and legacy managementCommand.

  [languageModels.ts:L772-L839](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/languageModels.ts#L772-L839)

- `ExtensionJsonValidationRegistry`: Add the JSON schema registry contribution structure.

  [jsonValidationExtensionPoint.ts:L53-L71](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L53-L71)

- `contributes.jsonValidationRegistry`: Add the jsonValidationRegistry contribution point.

  [jsonValidationExtensionPoint.ts:L53-L71](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/jsonValidationExtensionPoint.ts#L53-L71)

- `ExtensionChatPlugin`: Add the chat plugin directory contribution structure.

  [agentPluginServiceImpl.ts:L1025-L1055](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/plugins/agentPluginServiceImpl.ts#L1025-L1055)

- `contributes.chatPlugins`: Add the chatPlugins contribution point.

  [agentPluginServiceImpl.ts:L1025-L1055](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/plugins/agentPluginServiceImpl.ts#L1025-L1055)

- `ExtensionCss`: Add the workbench CSS path contribution structure.

  [cssExtensionPoint.ts:L20-L47](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/browser/cssExtensionPoint.ts#L20-L47)

- `contributes.css`: Add the css contribution point.

  [cssExtensionPoint.ts:L20-L47](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/themes/browser/cssExtensionPoint.ts#L20-L47)

- `ExtensionLinkPresentationProvider`: Add link presentation provider fields: id, uriPattern, kind, and enablement.

  [dataChannelService.ts:L63-L112](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L63-L112)

- `contributes.linkPresentationProviders`: Add the linkPresentationProviders contribution point.

  [dataChannelService.ts:L63-L112](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L63-L112)

- `ExtensionMarkdownCodeBlockEditor`: Add the legacy Markdown code block editor contribution, which the source still supports.

  [markdownExtensions.ts:L205-L238](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L205-L238)

- `contributes.markdown.codeBlockEditors`: Add the markdown.codeBlockEditors contribution point.

  [markdownExtensions.ts:L205-L238](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L205-L238)

- `ExtensionMarkdownCodeBlockEditorProvider`: Add Markdown code block provider selector/source unions, runtimeKey, contentType, initialHeight, and sandbox.

  [markdownExtensions.ts:L163-L281](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L163-L281)

- `contributes.markdown.codeBlockEditorProviders`: Add the markdown.codeBlockEditorProviders contribution point.

  [markdownExtensions.ts:L163-L281](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L163-L281)

- `ExtensionMarkdownPreviewScript`: Allow Markdown preview scripts as strings or objects with path and type: module.

  [markdownExtensions.ts:L311-L355](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L311-L355)

- `contributes.markdown.previewScripts`: Allow ES module script contributions.

  [markdownExtensions.ts:L311-L355](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/markdown-language-features/src/markdownExtensions.ts#L311-L355)

- `ExtensionManifest.api`: Add api: none.

  [extensionsRegistry.ts:L253-L260](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L253-L260)

- `ExtensionManifest.enabledApiProposals`: Add enabledApiProposals, retaining strings to support versioned proposal names.

  [Parser](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/extensions/common/extensions.ts#L563-L565), [extensionsRegistry.ts:L242-L251](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L242-L251)

- `ExtensionManifest.enableProposedApi`: Add legacy enableProposedApi, which remains in the schema.

  [extensionsRegistry.ts:L238-L241](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L238-L241)

- `ExtensionManifest.extensionAffinity`: Add extensionAffinity.

  [extensionsRegistry.ts:L484-L493](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L484-L493)

- `ExtensionManifest.extensionKind`: Allow the single ui/workspace strings accepted by the runtime; omit web because manifest reading filters it out.

  [extensionManifestPropertiesService.ts:L334-L338](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionManifestPropertiesService.ts#L334-L338), [extensionManifestPropertiesService.ts:L422-L426](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionManifestPropertiesService.ts#L422-L426)

- `ExtensionManifest.capabilities`: Make untrustedWorkspaces optional; allow false for virtualWorkspaces; require description on false/limited objects per the source interface; add agentsWindow.

  [extensions.ts:L252-L266](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/extensions/common/extensions.ts#L252-L266), [extensionsRegistry.ts:L591-L604](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L591-L604)

- `TJsonSchemaFormat`: Allow arbitrary format strings such as date-time, hostname, and regex.

  [jsonSchema.ts:L43-L43](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L43-L43)

- `TJsonSchemaBase`: Add id/$id/$schema/$ref/definitions and correct editPresentation to a string union.

  [jsonSchema.ts:L9-L47](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L47), [configurationExtensionPoint.ts:L102-L112](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L102-L112)

- `TJsonSchemaV7`: Add $comment.

  [jsonSchema.ts:L51-L55](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L51-L55)

- `TJsonSchema2019`: Add the 2019-09 fields from IJSONSchema; follow its string declaration for $recursiveAnchor without claiming equivalence to the JSON Schema standard.

  [jsonSchema.ts:L57-L69](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L57-L69)

- `TJsonSchema2020`: Add prefixItems, $dynamicRef, and $dynamicAnchor.

  [jsonSchema.ts:L71-L74](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L71-L74)

- `TJsonSchemaVSCode`: Add secret, restricted, included, disallowSyncIgnore, disallowConfigurationDefault, keywords, experiment, and agentsWindow; exclude agentHost, which the entry point rejects. See the later entries for policy and policyReference.

  [jsonSchema.ts:L76-L90](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L76-L90), [configurationRegistry.ts:L217-L327](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L217-L327), [configurationExtensionPoint.ts:L323-L337](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L323-L337)

- `ExtensionJsonSchema`: Include the added draft fields in the public schema type.

  [jsonSchema.ts:L9-L98](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L98)

- `TJsonSchemaUnSupported`: Correct the claim that VS Code does not support $ref/definition; retain the old type name as a compatibility alias and use the actual definitions field.

  [jsonSchema.ts:L9-L43](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L43)

- `types/index.ts`: Export JSON Schema types to expose the new recursive schema and configuration types.

  [jsonSchema.ts:L9-L98](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/jsonSchema.ts#L9-L98)

- `ExtensionConfiguration`: Add configuration node description/type and legacy allOf, which is still processed recursively.

  [configurationRegistry.ts:L335-L342](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L335-L342), [configurationExtensionPoint.ts:L338-L343](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/configurationExtensionPoint.ts#L338-L343)

- `ExtensionMenuKind`: Synchronize apiMenus: add agents/change/inline, agents/changes/actions, agents/changes/actions/primary, chat/chatSessions, chat/contextUsage/actions, chat/customizations/create, chat/customizations/item, chat/editor/inlineGutter, chat/input/editing/sessionTitleToolbar, chat/input/editing/sessionToolbar, chat/input/status, chat/multiDiff/context, chat/newSession, chatSessions/item/context, chatSessions/newSession, commentsView/commentThread/context, debug/toolBar, debug/watch/context, editor/context/chat, modalEditor/editorTitle, multiDiffEditor/content, scm/artifact/context, scm/artifactGroup/context, scm/historyItemRef/context, scm/repositories/title, scm/repository, searchPanel/aiResults/commands; remove or correct the unregistered debug/lineNumber/context, debug/toolbar, scm/sourceControl/title values.

  [menusExtensionPoint.ts:L37-L580](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L37-L580)

- `ExtensionMenuKind.modalEditor/editorTitle`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L56-L61](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L56-L61)

- `ExtensionMenuKind.debug/watch/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L114-L119](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L114-L119)

- `ExtensionMenuKind.debug/toolBar`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L119-L124](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L119-L124)

- `ExtensionMenuKind.chat/input/status`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L147-L152](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L147-L152)

- `ExtensionMenuKind.scm/repositories/title`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L163-L168](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L163-L168)

- `ExtensionMenuKind.scm/repository`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L169-L174](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L169-L174)

- `ExtensionMenuKind.scm/historyItemRef/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L212-L217](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L212-L217)

- `ExtensionMenuKind.scm/artifactGroup/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L218-L223](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L218-L223)

- `ExtensionMenuKind.scm/artifact/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L224-L229](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L224-L229)

- `ExtensionMenuKind.commentsView/commentThread/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L309-L314](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L309-L314)

- `ExtensionMenuKind.multiDiffEditor/content`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L452-L457](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L452-L457)

- `ExtensionMenuKind.searchPanel/aiResults/commands`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L476-L481](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L476-L481)

- `ExtensionMenuKind.editor/context/chat`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L481-L486](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L481-L486)

- `ExtensionMenuKind.chat/input/editing/sessionToolbar`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L488-L493](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L488-L493)

- `ExtensionMenuKind.chat/input/editing/sessionTitleToolbar`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L494-L499](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L494-L499)

- `ExtensionMenuKind.chat/chatSessions`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L501-L506](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L501-L506)

- `ExtensionMenuKind.chatSessions/item/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L508-L513](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L508-L513)

- `ExtensionMenuKind.chatSessions/newSession`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L515-L520](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L515-L520)

- `ExtensionMenuKind.chat/multiDiff/context`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L522-L527](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L522-L527)

- `ExtensionMenuKind.chat/customizations/create`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L529-L534](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L529-L534)

- `ExtensionMenuKind.chat/customizations/item`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L536-L541](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L536-L541)

- `ExtensionMenuKind.chat/editor/inlineGutter`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L543-L548](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L543-L548)

- `ExtensionMenuKind.chat/contextUsage/actions`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L550-L555](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L550-L555)

- `ExtensionMenuKind.chat/newSession`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L556-L561](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L556-L561)

- `ExtensionMenuKind.agents/changes/actions`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L562-L567](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L562-L567)

- `ExtensionMenuKind.agents/changes/actions/primary`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L568-L573](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L568-L573)

- `ExtensionMenuKind.agents/change/inline`: Add the menu ID declared in the registry.

  [menusExtensionPoint.ts:L574-L579](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L574-L579)

- `ExtensionActivationEvent.onChatContextProvider`: Add the activation event emitted or generated by the implementation.

  [chatContext.contribution.ts:L45-L48](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/contextContrib/chatContext.contribution.ts#L45-L48)

- `ExtensionActivationEvent.onChatOutputRenderer`: Add the activation event emitted or generated by the implementation.

  [chatOutputItemRenderer.ts:L294-L299](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatOutputItemRenderer.ts#L294-L299)

- `ExtensionActivationEvent.onChatSession`: Add the activation event emitted or generated by the implementation.

  [chatSessions.contribution.ts:L252-L255](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.ts#L252-L255)

- `ExtensionActivationEvent.onCustomAgentProvider`: Add the activation event emitted or generated by the implementation.

  [promptsService.ts:L64-L67](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67)

- `ExtensionActivationEvent.onInstructionsProvider`: Add the activation event emitted or generated by the implementation.

  [promptsService.ts:L64-L67](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67)

- `ExtensionActivationEvent.onPromptFileProvider`: Add the activation event emitted or generated by the implementation.

  [promptsService.ts:L64-L67](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67)

- `ExtensionActivationEvent.onSkillProvider`: Add the activation event emitted or generated by the implementation.

  [promptsService.ts:L64-L67](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/promptSyntax/service/promptsService.ts#L64-L67)

- `ExtensionActivationEvent.onDebugVisualizer`: Add the activation event emitted or generated by the implementation.

  [debugVisualizers.ts:L292-L299](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/debug/common/debugVisualizers.ts#L292-L299)

- `ExtensionActivationEvent.onLanguageModelChatProvider`: Add the activation event emitted or generated by the implementation.

  [languageModels.ts:L868-L884](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/languageModels.ts#L868-L884)

- `ExtensionActivationEvent.onLinkPresentation`: Add the activation event emitted or generated by the implementation.

  [dataChannelService.ts:L106-L111](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/dataChannel/browser/dataChannelService.ts#L106-L111)

- `ExtensionActivationEvent.onMcpCollection`: Add the activation event emitted or generated by the implementation.

  [mcpConfiguration.ts:L18-L22](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/mcp/common/mcpConfiguration.ts#L18-L22)

- `ExtensionActivationEvent.onNotebookSerializer`: Add the activation event emitted or generated by the implementation.

  [notebookExtensionPoint.ts:L245-L253](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/notebookExtensionPoint.ts#L245-L253)

- `ExtensionActivationEvent.onProfile`: Add the activation event emitted or generated by the implementation.

  [userDataProfileImportExportService.ts:L418-L427](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/userDataProfile/browser/userDataProfileImportExportService.ts#L418-L427)

- `ExtensionActivationEvent.onResolveRemoteAuthority`: Add the activation event emitted or generated by the implementation.

  [extHostExtensionService.ts:L866-L875](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/common/extHostExtensionService.ts#L866-L875)

- `ExtensionActivationEvent.onSlash`: Add the activation event emitted or generated by the implementation.

  [chatSlashCommands.ts:L156-L162](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/participants/chatSlashCommands.ts#L156-L162)

- `ExtensionActivationEvent.onSpeech`: Add the activation event emitted or generated by the implementation.

  [speechService.ts:L229-L234](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/speech/browser/speechService.ts#L229-L234)

- `ExtensionActivationEvent.onTerminal`: Add the activation event emitted or generated by the implementation.

  [terminalService.ts:L1082-L1094](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/browser/terminalService.ts#L1082-L1094)

- `ExtensionActivationEvent.onTerminalQuickFixRequest`: Add the activation event emitted or generated by the implementation.

  [terminalQuickFixService.ts:L94-L101](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminalContrib/quickFix/browser/terminalQuickFixService.ts#L94-L101)

- `ExtensionActivationEvent.onTerminalShellIntegration`: Add the activation event emitted or generated by the implementation.

  [mainThreadTerminalShellIntegration.ts:L113-L121](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadTerminalShellIntegration.ts#L113-L121)

- `ExtensionActivationEvent.onOpenExternalUri`: Add the emitted form with a scheme parameter; retain the legacy parameterless form from the schema.

  [mainThreadUriOpeners.ts:L52-L59](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadUriOpeners.ts#L52-L59)

- `ExtensionActivationEvent.onCommand`: Remove the bare onCommand form, which has no caller, and retain onCommand:<id>.

  [menusExtensionPoint.ts:L914-L919](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/actions/common/menusExtensionPoint.ts#L914-L919), [mainThreadCommands.ts:L86-L90](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/api/browser/mainThreadCommands.ts#L86-L90)

- `ExtensionCategory.Languages`: Add the deprecated Languages category explicitly retained in the schema.

  [extensionsRegistry.ts:L198-L211](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/services/extensions/common/extensionsRegistry.ts#L198-L211)

- `ExtensionCustomEditorPriority`: Add the explicit custom editor priority.

  [extensionPoint.ts:L25-L103](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/extensionPoint.ts#L25-L103)

- `ExtensionCustomEditor`: Allow explicit priority and textEditor/diffEditor priority objects; make selector.filenamePattern optional per the schema.

  [extensionPoint.ts:L25-L103](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/extensionPoint.ts#L25-L103)

- `ExtensionNotebook`: Allow selector to be omitted; the runtime uses an empty array.

  [notebookServiceImpl.ts:L120-L147](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/notebook/browser/services/notebookServiceImpl.ts#L120-L147)

- `ExtensionTerminalProfile`: Add color/titleTemplate, which the runtime passes through.

  [terminal.ts:L983-L989](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/terminal/common/terminal.ts#L983-L989), [terminalExtensionPoints.ts:L46-L49](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L46-L49)

- `ExtensionTerminalCompletionProvider`: Add terminal completion providers. The schema incorrectly requires an undeclared id; the runtime uses extensionIdentifier, so id is optional for compatibility.

  [terminal.ts:L1014-L1020](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/terminal/common/terminal.ts#L1014-L1020), [terminal.ts:L726-L743](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminal.ts#L726-L743), [terminalExtensionPoints.ts:L52-L59](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L52-L59)

- `contributes.terminal`: Add completionProviders, gated by the terminalCompletionProvider proposal.

  [terminalExtensionPoints.ts:L52-L59](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/terminal/common/terminalExtensionPoints.ts#L52-L59)

- `ExtensionChatOutputRenderer`: Make mimeTypes optional and add codeBlockLanguageIdentifiers.

  [chatOutputItemRenderer.ts:L264-L290](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatOutputItemRenderer.ts#L264-L290)

- `contributes.css`: Add the nested customData object read by the built-in CSS extension; retain the workbench CSS proposal array form.

  [customData.ts:L77-L87](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/css-language-features/client/src/customData.ts#L77-L87)

- `contributes.html`: Add the nested customData object read by the built-in HTML extension.

  [customData.ts:L127-L141](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/html-language-features/client/src/customData.ts#L127-L141)

- `contributes.css.customData`: Retain the old public key to avoid additional compatibility breakage and mark it deprecated; the source reads only nested css.customData.

  [customData.ts:L77-L87](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/css-language-features/client/src/customData.ts#L77-L87)

- `contributes.html.customData`: Retain the old public key to avoid additional compatibility breakage and mark it deprecated; the source reads only nested html.customData.

  [customData.ts:L127-L141](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/html-language-features/client/src/customData.ts#L127-L141)

- `ExtensionJsonLanguageParticipant`: Add the JSON language participant structure. The source still marks comments as TODO, so this does not guarantee server-side comment support.

  [languageParticipants.ts:L11-L60](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/json-language-features/client/src/languageParticipants.ts#L11-L60)

- `contributes.jsonLanguageParticipants`: Add jsonLanguageParticipants, which the built-in JSON extension reads.

  [languageParticipants.ts:L11-L60](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/json-language-features/client/src/languageParticipants.ts#L11-L60)

- `ExtensionChatParticipant.locations`: Add editor, which fromRaw recognizes; retain editing-session from RawChatParticipantLocation, which falls back to panel at runtime.

  [constants.ts:L243-L268](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/common/constants.ts#L243-L268), [chatParticipant.contribution.ts:L294-L296](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/chat/browser/chatParticipant.contribution.ts#L294-L296)

- `ExtensionCustomEditorPriority.builtin`: Add the runtime-supported builtin priority. Only built-in extensions retain that priority; other extensions fall back to default.

  [contributedCustomEditors.ts:L128-L145](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/customEditor/common/contributedCustomEditors.ts#L128-L145)

- `TJsonSchemaBase.enumItemLabels`: Allow null placeholders, which the settings editor replaces with the corresponding enum value; the built-in TypeScript extension uses this form.

  [settingsTree.ts:L1919-L1947](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/workbench/contrib/preferences/browser/settingsTree.ts#L1919-L1947), [package.json:L423-L445](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/typescript-language-features/package.json#L423-L445)

- `TJsonSchemaVSCode.policy / policyReference`: Add author-declarable policy/policyReference as mutually exclusive branches, matching registry restrictions. The Copilot manifest directly contributes policyReference, so it cannot be classified solely as product-injected data.

  [configurationRegistry.ts:L275-L286](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L275-L286), [configurationRegistry.ts:L847-L861](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L847-L861), [configurationRegistry.ts:L1135-L1139](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/platform/configuration/common/configurationRegistry.ts#L1135-L1139), [package.json:L5298-L5304](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/extensions/copilot/package.json#L5298-L5304)

- `TJsonSchemaPolicy`: Add serializable policy metadata: name, category, minimumVersion, localization, managedSettings, and restrictedValue; exclude the value callback, which JSON cannot represent.

  [policy.ts:L14-L35](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/policy.ts#L14-L35), [policy.ts:L68-L146](https://github.com/microsoft/vscode/blob/9a9257010666f5e886b2e2b095fe9febd5a5c13c/src/vs/base/common/policy.ts#L68-L146)

## Source Discrepancies and Scope

- The internal `extensionKind` union includes `web`, but the manifest reader filters it out. Keep the author-facing `ui`/`workspace` values and support the single-string form accepted by the reader.
- The `chatViewsWelcome` schema lists `contents` in required, while the property and consumer use `content`. Keep `content` without introducing the typo.
- The walkthrough schema omits video and requires `hcLight` in themed paths. The implementation supports video, permits an omitted `poster`, and falls back from `hcLight` to `light`.
- The parser rejects the single-element relative/autoDetect/search tuples listed in the `fileLocation` schema. Only add the supported absolute tuple. A search object without include searches no directories and subsequently falls back to an absolute path.
- The schema requires `notebooks.selector`, `keybindings.key`, and `views.icon`, but runtime code permits their omission. Preserve that runtime compatibility.
- The source interface explicitly includes `$ref`/`definitions` in general JSON Schema. Whether references are resolved depends on the consumer. The added `$recursiveAnchor` follows the string declaration in VS Code's IJSONSchema; this is not a claim of JSON Schema standards compliance.
- Exclude scanner-injected or runtime-only fields such as `originalEnabledApiProposals`, `extensionInfo`, and the resource formatter's `home` from author manifests. The configuration entry point also explicitly removes `agentHost`.
- Retain legacy types for `languageModels`, `modelContextServerCollections`, `startEntries`, `codeActions`, and `documentation`; no contribution registries for them were found in this snapshot. The retained ICodeActionContribution interface supports the array shape for `codeActions`, but does not establish that this legacy contribution point works on current main.
- Built-in CSS/HTML extensions read nested `contributes.css.customData`/`contributes.html.customData`; they do not read the old dotted top-level keys. The new workbench CSS proposal shares the `css` key with a different structure, so retain the forms used by both consumers.
- The `terminal.completionProviders` schema requires an undefined `id` property, while the consumer registers providers by extension identifier. Follow the runtime behavior with an optional id.
- `ILocalizationContribution.minimalTranslations` remains in the interface, but no reader of the manifest field was found. It was not added solely on the basis of that residual interface.
- `ExtensionAnyValue`, `LiteralUnion`, and `ExtendUnion` are library utilities rather than native VS Code declarations. Other unchanged fields were checked and retained. The audit did not expand the package to cover all generic npm package.json fields.

## Verification

- Added 12 groups of type regressions covering valid structures previously rejected and invalid structures previously accepted.
- Extracted 95 contributes objects from `extensions/*/package.json` at the pinned snapshot for additional type checking. They passed after removing the following reviewed private or residual fields: legacy contribution points `interactiveSession` (2 occurrences) and `iconFonts` (1); Copilot's `isEngine`/`isAgent` (1 each); the `$generated` marker (143); and extension-specific `original` (10) and `_watch` (1). Other contribution data in these samples was unchanged. This does not claim that every original package.json conforms to the current shared contribution contract.
- `pnpm typecheck` passed; `pnpm test` passed all 30 tests across 4 files, with no type errors.
- `pnpm lint` passed with the existing top-level await warning at `scripts/check.ts:31`.
- `pnpm format:check`, `pnpm build`, and `git diff --check` passed. The build tool reported the TypeScript 7 API as experimental; declaration files were generated successfully.
- Source links are pinned to a commit, with referenced files and line ranges checked. Stricter types may reject previously accepted invalid forms, especially required fields, mutually exclusive menu branches, problem matchers, and icon structures.
