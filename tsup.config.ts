import { defineConfig } from 'tsup'
import Quansync from 'unplugin-quansync/esbuild'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  esbuildPlugins: [Quansync()],
  format: ['cjs', 'esm'],
  target: 'es2022',
})
