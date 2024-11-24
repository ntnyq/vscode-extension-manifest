import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  javascript: {
    overrides: {
      // VSCode use raw string '${workspaceFolder}'
      'no-template-curly-in-string': 'off',
    },
  },
  typescript: {
    // FIXME: support ts in markdown
    // tsconfigPath: './tsconfig.json',
    // overrides: {
    //   '@typescript-eslint/no-duplicate-type-constituents': 'error',
    // },
  },
  perfectionist: {
    overrides: {
      'perfectionist/sort-interfaces': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
          groupKind: 'required-first',
          partitionByComment: false,
          newlinesBetween: 'ignore',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
          groupKind: 'required-first',
          partitionByComment: false,
          newlinesBetween: 'ignore',
        },
      ],
    },
  },
})
