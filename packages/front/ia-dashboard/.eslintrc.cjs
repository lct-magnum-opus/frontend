const internalImportTypes = ['components', 'features', 'hooks', 'routes', 'store', 'utils'];

module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: {
    react: {
      // если это поле не заполнено,
      // то eslint-plugin-react показывает warning
      version: 'detect'
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'warn',
      {
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroupsExcludedImportTypes: internalImportTypes,
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          // внутренние библиотеки после внешних
          { pattern: '@*/*', group: 'external', position: 'after' },
          // импорт SCSS-модулей всегда в самом низу
          { pattern: './*.module.scss', group: 'sibling', position: 'after' },
          // отделяет внутренние импорты от внешних
          ...internalImportTypes.map((internalImportType) => ({
            pattern: `${internalImportType}/**/*`,
            group: 'internal'
          }))
        ]
      }
    ]
  }
};
