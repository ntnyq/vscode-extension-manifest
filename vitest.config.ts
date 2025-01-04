import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['dot'],
    coverage: {
      include: ['**/src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
  },
})
