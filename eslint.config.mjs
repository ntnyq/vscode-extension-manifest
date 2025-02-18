// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  javascript: {
    overrides: {
      // VSCode use raw string '${workspaceFolder}'
      'no-template-curly-in-string': 'off',
    },
  },
  test: {
    overridesVitestRules: {
      'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'assertType', 'expectTypeOf'],
        },
      ],
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
})
