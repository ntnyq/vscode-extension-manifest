// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  extensions: [],
  javascript: {
    overrides: {
      // VSCode use raw string '${workspaceFolder}'
      'no-template-curly-in-string': 'off',
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      // '@typescript-eslint/no-duplicate-type-constituents': 'error',
    },
  },
})
