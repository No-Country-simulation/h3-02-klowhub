module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: { config: './tailwind.config.cjs' },
    autoprefixer: {},
    'tailwindcss/nesting': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
