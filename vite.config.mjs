import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    watch: false,
    globals: true,
    silent: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['**/node_modules/**', '.next/**', 'dist/**'],
    coverage: {
      exclude: ['**/node_modules/**', '.next/**', 'dist/**', '**/index.ts'],
    },
  },
})
