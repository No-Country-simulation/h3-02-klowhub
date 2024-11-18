import swc from 'unplugin-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    loader: 'ts',
    target: 'esnext',
    tsconfigRaw: './tsconfig.json',
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
  },
  optimizeDeps: {
    include: ['@nestjs/*', 'reflect-metadata'],
  },
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: true,
        },
      },
    }),
  ],
});
