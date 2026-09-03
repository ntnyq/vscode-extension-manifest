# Source Navigation and Decision Criteria

These are search starting points, not a fixed statement of the current contract. Check that paths still exist, then use `rg` to find definitions and readers. The earlier audit is in `docs/vscode-source-audit.md` at the project root; its conclusions apply only to its recorded commit.

## Coverage starting points

| Library area                     | VS Code starting points and search terms                                                                                                                                                                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `manifest.ts`                    | `IRelaxedExtensionManifest` and capabilities in `src/vs/platform/extensions/common/extensions.ts`; the manifest schema in `src/vs/workbench/services/extensions/common/extensionsRegistry.ts`; reading and normalization in `extensionManifestPropertiesService.ts` and the extension scanner |
| `contributes.ts`                 | Repository-wide `registerExtensionPoint`, `extensionPoint:`, and `activationEventsGenerator`; handlers in `src/vs/workbench/api`, `src/vs/workbench/contrib`, and `src/vs/workbench/services`                                                                                                 |
| `union.ts`                       | `apiMenus` in `menusExtensionPoint.ts`; every `activateByEvent`, `activationEventsGenerator`, and event constant; internal `MenuId` values are not all author-accessible contribution menus                                                                                                   |
| `json-schema.ts`                 | `src/vs/base/common/jsonSchema.ts`, `configurationRegistry.ts`, `configurationExtensionPoint.ts`, the settings editor, and concrete schema consumers                                                                                                                                          |
| `common.ts`                      | Validators for raw JSON fields such as icons, colors, and debuggers; distinguish JSON paths from API objects such as URI and ThemeIcon                                                                                                                                                        |
| Built-in extension contributions | `extensions/*/package.json` and code under `extensions` that reads `packageJSON.contributes`, especially CSS, HTML, JSON, Markdown, and TypeScript                                                                                                                                            |
| Public interfaces and utilities  | Exports in `src/types/index.ts` and `src/index.ts`; `utils.ts` contains library utilities and need not match VS Code declaration names                                                                                                                                                        |

Search dynamic registration, dotted keys, and nested objects, including registry wrappers, `contributes['markdown.previewScripts']`, and `contributes.css.customData`. Searching only `extensionPoint: 'literal'` misses dynamic entries; searching only workbench directories misses built-in language extensions.

For incremental audits, compare upstream changes between the historical baseline and target SHA, then rescan the registration inventory and activation triggers. Follow moved symbols and callers; an old path disappearing does not justify deleting a type.

## Reading order for each candidate field

1. Locate the JSON nesting, value type, and entry point used by extension authors.
2. Read the schema's `required`, `oneOf`/`anyOf`, `additionalProperties`, defaults, and proposal notes.
3. Read the raw contribution interface and the handler's runtime validation, filtering, defaults, and transformations.
4. Trace the final consumer: whether the value affects behavior, is merely stored or ignored, and is restricted by version, platform, or proposal.
5. Where useful, inspect built-in manifests and source tests at that commit, construct minimal valid and invalid examples, and explain the chosen type.

A schema is one source of evidence; being source code does not make its consumers irrelevant. Interfaces may describe transformed objects or retain old fields. Built-in manifests can contain obsolete or generator-private data and are not a complete specification.

## Common sources of mistakes

- **Raw JSON and internal data**: Scanner-injected identifiers or translations, function callbacks, URI instances, and service-private fields do not automatically belong in manifest types. Conversely, a field also injected by product configuration may still be author-declarable; inspect its reader.
- **Validation and tolerance**: Ignoring an unknown field does not establish support. Schema typos, outdated required fields, and overly narrow interfaces do not justify mechanical edits either; record conflicting evidence and the consumer's actual requirements.
- **Legacy forms**: Runtime code may retain string shorthand, old-field fallbacks, and deprecated branches. Preserve them when they still work and explain their semantics. Missing registries require a search across the full relevant scope.
- **Union relationships**: Check command versus submenu entries, standalone versus extending renderers, support levels and descriptions, and platform configuration separately. Do not simply make every field optional or apply one consumer's constraints to another.
- **JSON Schema dialects**: Review each schema consumption context in this library. Explain differences between VS Code interfaces and the standard; adding several keywords does not establish support for an entire specification version.
- **Activation and menus**: Event constants may produce `name:value` or parameterless forms, and case must match. Do not infer an entire event from a documentation heading, internal enum, or the prefix of a template string.
- **Versions and proposals**: A main snapshot is not the latest stable release. Do not guess a field's first released version; inspect tags or historical source when a version claim is needed. Read proposal names from their actual gates and record them in type comments and update records.
- **Actual test collection**: Do not assume a temporary type file starting with a dot is included by default globs. Use the existing `.test-d.ts` pattern and confirm typecheck/test output. When a real sample fails, distinguish a type omission from private sample metadata.

## Mechanical source link checks

`../scripts/verify_source_links.py` only reads reports and previously retrieved source. It does not access the network or change types or timestamps. It checks the selected repository's blob URLs, full 40-character SHAs, referenced files, and line ranges, supporting multiple `--snapshot SHA=DIRECTORY` arguments. The default repository is `microsoft/vscode`; check external dependencies separately with `--repository owner/repo`.

For Git workspaces it reads `git show SHA:FILE`, so uncommitted file contents do not affect verification. For archives it reads the supplied directory; the caller must verify that the archive's provenance matches the SHA. The script cannot prove that from a directory name. Blob links from other repositories are listed as unchecked and must receive separate attention.

Add `--show-excerpts` to inspect the cited text. Even when the script passes, read each range to confirm that it contains the claimed field or behavior. A range may be within the file while pointing to unrelated adjacent code.
