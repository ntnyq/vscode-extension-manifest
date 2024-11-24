import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
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
