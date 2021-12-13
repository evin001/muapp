const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname, 
  },
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',  
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'prettier',
    'no-function-declare-after-return',
    'no-for-of-loops',
    'unused-imports',    
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "max-classes-per-file": 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'all',
        printWidth: 90,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    "unused-imports/no-unused-imports": "error",
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'no-void': ['error', { 'allowAsStatement': true }],
    'consistent-return': 'off',
    'no-param-reassign': 'error',
    'no-underscore-dangle': 'error',
    "no-restricted-syntax": 'error',
    'react/function-component-definition': 'off',    
    
    /* REACT RULES */
    'react/no-children-prop': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/no-array-index-key': 'warn',
    'react/require-default-props': 'off',
    'react/no-multi-comp': 'error',
    'react/jsx-props-no-spreading': 'error',
    'react/destructuring-assignment': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/exhaustive-deps': 'off',


    /* GLOBAL */    
    'no-for-of-loops/no-for-of-loops': 'warn',
    "no-function-declare-after-return/no-function-declare-after-return": 'error',
    "import/order": ["error", {
      "groups": ["index", "builtin", "external", "internal", "parent", "sibling", "object", "type"],
      "newlines-between": "always-and-inside-groups",
      "pathGroups": [
        {
          "pattern": "react",
          "group": "index",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["react"]
    }],
    'import/extensions': ['error', {
       ts: 'never',
       svg: 'always',
       ttf: 'always',       
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
  },
}
