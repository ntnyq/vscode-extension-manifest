import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['dot'],
    coverage: {
      reporter: ['lcov', 'text'],
      exclude: [
        ...defaultExclude,
        // don't test
        '**/scripts',
        // type test cant't be covered
        '**/*.test-d.ts',
      ],
    },
  },
})
