# Type Update History

This history records type updates completed against pinned VS Code source, newest first. Each successful update keeps a separate record with source files and line ranges for every change, and explicitly identifies full or partial scope. Inspections with no changes, incomplete investigations, and skill maintenance do not refresh the last type update timestamp.

- **2026-09-03 (Asia/Shanghai, preserving the original date precision)** · `success` · Full `src/types` · VS Code [`9a92570`](https://github.com/microsoft/vscode/commit/9a9257010666f5e886b2e2b095fe9febd5a5c13c) · [Initial source audit and individual changes](../vscode-source-audit.md). This entry registers the completed audit; creating the skill did not perform another upstream type synchronization.

Use the project skill [`update-vscode-manifest-types`](../../.agents/skills/update-vscode-manifest-types/SKILL.md) for subsequent updates. Records include the completion time, source baseline, scope, individual changes, compatibility, and verification results. See the [record conventions](../../.agents/skills/update-vscode-manifest-types/references/update-record.md) for the format.
