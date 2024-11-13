/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import path from 'path';

//@ts-ignore
import tsconfig from './tsconfig.json';

const raw: any = tsconfig.compilerOptions.paths;
const alias: any = {};

for (const x in raw) {
  alias[x.replace('/*', '')] = raw[x].map((p: string) =>
    path.resolve(__dirname, p.replace('/*', ''))
  );
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  test: {
    globals: true,
    include: ['__test__/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.{js,jsx,ts,tsx}', '**/*.d.ts'],
    },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
});
