import path from 'node:path';

const buildEslintCommand = filenames =>
  `eslint --fix --report-unused-disable-directives --max-warnings 0 --no-warn-ignored ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')}`;

const buildPrettierCommand = filenames =>
  `prettier --no-cache --write ${filenames
    .filter((file) => /\.(ts|js|mts|tsx)$/.test(file))
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')} --ignore-path .prettierignore`;

const config = {
  './*.{js,ts,cjs}': [buildEslintCommand],
  './src/**/*.{js,ts,tsx}': [buildPrettierCommand, buildEslintCommand],
};

export default config;
