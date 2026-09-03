---
name: update-vscode-manifest-types
description: Audit, synchronize, and complete this project's src/types against VS Code source, trace every change, and maintain README timestamps and docs history after verification. Use for manifest type updates, missing contribution points, and upstream compatibility checks; authoring an extension package.json or fixing runtime IO alone is outside this workflow.
---

# Update VS Code Manifest Types

Align `src/types` with a specified VS Code source snapshot. Deliver type corrections, regression checks for valid and invalid structures, evidence for every change, and a traceable update timestamp.

Paths in this skill are relative to the project root. Follow the current conversation and applicable `AGENTS.md` instructions; commands below use this project's RTK convention. The user's scope, version, and authorization take precedence. Write repository documentation, audit records, templates, and skill metadata in English.

## Establish scope and baselines

1. Read the working tree status, `package.json`, the `vscode-types-update` block in `README.md`, `docs/type-updates/README.md`, and recent relevant records. Preserve existing user changes and distinguish this update from earlier uncommitted work.
2. Determine whether the request is for an update or an inspection, and whether its scope is full or partial. When no version is specified, resolve `microsoft/vscode`'s `refs/heads/main` to a full 40-character commit SHA at the start and use that snapshot throughout the run. Resolve user-specified tags or branches to a SHA as well.
3. Download or fetch the source into a temporary directory outside this project or an existing source cache. Record the repository, requested ref, resolved SHA, and retrieval method. For Git snapshots, read that commit's contents. Source archives must come from an official repository URL containing that SHA. Do not treat a moving branch page, directory name, or old cache as a verified latest version, and do not run upstream installation or build scripts.
4. Use the last **successful full audit**, including a full `no-change` inspection with recorded verification, as the historical baseline for a full scan. Partial records supplement only their corresponding areas. Comparing upstream changes can focus the reading, but does not replace checking new contribution points, actual consumers, and existing errors in this library. Perform a complete inventory when no trustworthy baseline exists.

An inspection-only request does not authorize type edits or update timestamp changes. If the requested source is unavailable, continue useful local investigation, identify the unverified scope, and do not claim synchronization with the latest upstream version.

## Review the source

Read [Source navigation and decision criteria](references/source-review.md) when starting the scan. Files may move; relocate definitions by registries, field names, and callers. Treat this guide and earlier audit conclusions as historical context, not current facts.

- A full audit covers all type files in `src/types`, public exports, contribution registration, activation event generators and callers, and manifest fields consumed by built-in extensions. Limit conclusions from partial audits to their stated scope.
- For each candidate change, inspect the raw manifest structure, schema, interfaces, runtime reads and validation, and relevant real examples. A matching field name, residual interface, or documentation example alone does not establish support. An ignored field is not a supported field.
- When schema and runtime behavior disagree, trace the concrete consumer and record the discrepancy and decision. Distinguish author-supplied data from scanner injections, API objects, product-internal configuration, and generator metadata. Do not copy every internal type field into the manifest.
- Check required versus optional fields, single values versus arrays, nested versus dotted keys, union branches, platform overrides, defaults and fallbacks, proposal gates, and deprecated compatibility. Record restrictions; do not automatically edit this project's or the user's extension's `enabledApiProposals` to enable a proposal.
- If an old contribution cannot be found, also search dynamic registration and built-in extension consumers. Removing a public field or alias requires concrete evidence and a compatibility explanation; usually prefer an explained deprecated compatibility entry. Correct definite type errors and required fields directly, documenting how stricter types may reject older usage.

Limit edits to types, necessary public exports, related tests, and the update's documentation. This skill does not add authorization to change runtime validators, dependencies or lockfiles, package versions, publishing, or commits. Follow the existing TypeScript style; do not bypass contract errors with `any`, arbitrary index signatures, or unsupported type assertions.

## Evidence for every change

Draft the update record alongside the type edits using [Record format and completion rules](references/update-record.md).

- Each entry identifies the library symbol or field, its before and after shapes, why the source supports the change, compatibility and proposal implications, and verification. Group fields only when they share the same rationale and supporting sources.
- Link every change to a **specific source file and accurate line range**, using `https://github.com/microsoft/vscode/blob/<FULL_SHA>/<PATH>#LSTART-LEND`. A single line may use `#LLINE`. Moving branches or tags, repository homepages, search results, documentation sites, and bare commit links are not field evidence.
- Open the original text at that SHA and confirm that the range contains the relevant declaration, validation, or read. A working link does not prove a claim. For missing or removed features, record the search scope and old source, and cite the new replacement implementation or validation behavior. One file without a field cannot establish its absence across the repository.
- Add accurate `@see` links beside new or changed public types or fields. Unchanged historical references need not be mechanically moved to the new SHA. For dependencies in other repositories, record the exact version used by VS Code and pin that repository's source; do not mix versions to infer one contract.
- Use `scripts/verify_source_links.py` to check pinned SHAs, file existence, and line ranges in reports. It does not verify archive provenance, coverage of the changes, or citation meaning, and does not replace source reading. Supply an additional snapshot when citing an older commit.

```sh
rtk proxy python3 .agents/skills/update-vscode-manifest-types/scripts/verify_source_links.py --snapshot 'FULL_SHA=/absolute/path/to/vscode-snapshot' docs/type-updates/REPORT.md
```

## Verification and success criteria

Read the current test configuration and scripts. The following are this repository's current gates; use equivalent checks if the scripts change, and do not copy results or counts from an earlier record.

```sh
pnpm typecheck
rtk proxy pnpm run test
rtk proxy pnpm run lint
rtk proxy pnpm run format:check
rtk proxy pnpm run build
rtk git diff --check
```

Add type regressions for contracts that actually change: valid forms previously rejected, invalid forms that must be rejected, and relationships or platform branches. Verify exports through the public entry point and the declaration build, not only internal types. Confirm that TypeScript and Vitest collect the test files; hidden or excluded temporary files do not count as passing verification.

Real extension samples help reveal omissions but are not definitive proof of runtime validity. If private or legacy fields are excluded from sample checks, record each exclusion, its reason, and the original count. Do not claim that all unmodified samples passed. Rebuilding the full sample set is not required every time; choose relevant samples or broaden checking according to the current risk.

Success requires all mandatory checks to pass, read source evidence for every type difference, and resolution of issues within the stated scope. Existing lint warnings may remain if confirmed unchanged and reported accurately. Failed, skipped, or uncertain checks cannot be marked as passed. State areas excluded from partial work; passing tests do not replace a full source audit.

## Write timestamps and history last

1. After completing the type changes and verification, read the actual completion time and use ISO 8601 with a timezone offset, defaulting to `Asia/Shanghai`. This is the update's completion time, not the upstream commit time. Preserve the precision of historical dates rather than inventing hours, minutes, or seconds.
2. When type changes succeed, create `docs/type-updates/YYYY-MM-DD-HHmmss-<sha7>.md` with full or partial scope, previous and current source baselines, individual changes, verification results, and status. Add a suffix if the filename already exists. Preserve earlier records; record historical corrections with their own date and evidence rather than silently replacing conclusions.
3. Prepend an entry to `docs/type-updates/README.md` and update the root README's `vscode-types-update` block with the completion time, explicit scope, upstream commit, and record link. Label partial updates as partial; they must not imply that all of `src/types` is synchronized.
4. Check the final documentation's formatting, source links, and diff. If finalization fails, withdraw only the success timestamp and index state introduced by **this run**, retain reviewable type edits and an incomplete draft, and report the concrete blocker. Do not revert other user work. The final response states the scope, main changes, record link, verification results, and relevant compatibility effects.

When no types change, preserve the last type update timestamp. If the inspection needs a record, create a separate `no-change` entry without presenting it as a type update. Creating or editing this skill, failed checks, and incomplete inspections must not refresh the type update timestamp either.
