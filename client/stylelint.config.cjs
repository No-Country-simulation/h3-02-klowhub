/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  ignoreFiles: [
    '**/node_modules/**',
    'dist/**',
    '.next/**',
    '__test__/**',
    '.vscode/**',
    'public/**'
  ],
  overrides: [
    {
      files: ['*.js'],
      customSyntax: 'postcss-lit',
    },
    {
      files: ['*.module.css'],
      rules: {
        'selector-class-pattern': [
          '^[a-z][a-zA-Z0-9]+$',
          {
            message: 'Expected custom property name to be lowerCamelCase',
          },
        ],
        "keyframes-name-pattern": [
          '^[a-z][a-zA-Z0-9]+$',
          {
            message: 'Expected custom property name to be lowerCamelCase',
          },
        ],
      },
    },
  ],
  rules: {
    'custom-property-pattern': null,
    'media-feature-range-notation': null,
    'hue-degree-notation': null,
    'number-max-precision': null,
    "declaration-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "color-hex-length": null
  },
};
