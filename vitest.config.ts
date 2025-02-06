import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['dot'],
    watch: false,
    coverage: {
      include: ['**/src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
    typecheck: {
      enabled: true,
    },
  },
})
