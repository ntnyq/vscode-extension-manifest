# Update Records and README Conventions

## Successful update record

Create `docs/type-updates/YYYY-MM-DD-HHmmss-<sha7>.md` under the project root, using the timezone of the actual completion time. Reuse the following structure and remove inapplicable example lines. Do not copy test results from a previous record.

```markdown
# VS Code Type Update — YYYY-MM-DD

- Status: success
- Completed at: YYYY-MM-DDTHH:mm:ss+08:00 (Asia/Shanghai)
- Scope: full src/types / partial: specific areas
- Upstream repository: [microsoft/vscode](https://github.com/microsoft/vscode)
- Requested baseline: main / user-specified tag or ref
- Current baseline: [full SHA](https://github.com/microsoft/vscode/commit/FULL_SHA)
- Previous full baseline: [historical record](RELATIVE_PATH); relevant partial baselines: list as needed
- Source retrieval: official commit archive / Git checkout with confirmed provenance
- Excluded scope: none / list explicitly

## Individual changes

### 1. Library type or complete field name

- Library location: relative path and symbol.
- Before: previous shape or absent.
- After: final shape.
- Rationale: concrete registration, validation, or consumer behavior; describe both sides and the decision if the schema and interface disagree.
- Source: [file and lines](https://github.com/microsoft/vscode/blob/FULL_SHA/PATH#LSTART-LEND). Add separate registry, consumer, or previous implementation links when needed.
- Compatibility: additive / stricter typing and affected forms / deprecated compatibility; proposal or platform restrictions.
- Verification: relevant regression cases, real samples, or declaration checks.

## Verification

Record the commands actually run, their results, and relevant test counts or warnings.
Describe source citation checks, excluded sample fields, and remaining limitations.
```

A generic entry such as "source" or "fix types" cannot be the only evidence for several independent changes. Menu and event members may be grouped by shared implementation, but list every exact string and line ranges covering those members. A new file lacking a field does not by itself justify its removal.

Record the final change for a field rather than intermediate attempts that were reverted. Avoid copying large source passages; links and necessary short excerpts are sufficient.

## Index and README

Use a newest-first list in `docs/type-updates/README.md`, including at least the time, status, scope, source commit, and record link. The initial historical baseline is `../vscode-source-audit.md`. Preserve its original date precision and content; do not invent a time or imply that creating the skill performed another type synchronization.

Update only the following block in the root `README.md`, preserving the rest:

```markdown
<!-- vscode-types-update:start -->

Last successful type update: **YYYY-MM-DDTHH:mm:ss+08:00** (Asia/Shanghai). Scope: **full src/types / partial: areas**.

VS Code source: [`SHORT_SHA`](https://github.com/microsoft/vscode/commit/FULL_SHA) · [Changes](./docs/type-updates/REPORT.md) · [History](./docs/type-updates/README.md).

<!-- vscode-types-update:end -->
```

When adding the block for the first time, it may register an already completed type update supported by an existing record; preserve the original timestamp precision. If the block is missing, duplicated, or edited by the user, read its surrounding content and merge locally rather than replacing the whole README.

## No changes, partial scope, and incomplete work

- **No type changes**: Use status `no-change`. If a record is needed, include the reviewed scope, target SHA, and verification actually performed. Do not invent change entries or refresh the last type update timestamp. A fully verified record may serve as the next source comparison baseline, separately from the last type modification time.
- **Inspection only**: Preserve the read-only intent. Write a report only if the user requests one; do not change types or the success timestamp.
- **Partial success**: Use status `success` with specific scope. Explicitly mark the README entry as partial. This record does not replace the historical baseline for the next full audit.
- **Incomplete or failed work**: Use status `incomplete` and record the investigation or attempt time, completed work, unmet gates, and blockers. Preserve the last success marker rather than marking the attempt as successful; a draft is not a successful update.
- **Skill or documentation maintenance only**: Do not refresh the type update timestamp. When registering a previously completed update, state that its existing date is being reused rather than using the maintenance time.

After writing success metadata, complete the documentation formatting, citation, and diff checks. Withdraw this run's success marker if the final files fail, so the README does not claim an unfinished state is complete.
