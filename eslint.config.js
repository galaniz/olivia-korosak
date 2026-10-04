/**
 * Eslint
 */

import tseslint from 'typescript-eslint'

/* Config */

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/*',
      '**/lib/*',
      '**/site/*',
      '**/worker-configuration.d.ts'
    ]
  },
  {
    files: [
      'src/**/*.ts'
    ],
    rules: {
      semi: [ // Prefer no semicolons
        'warn',
        'never'
      ],
      'comma-dangle': [ // Prefer no trailing commas
        'warn',
        'never'
      ],
      quotes: [ // Prefer single quotes
        'warn',
        'single',
        {
          avoidEscape: true
        }
      ],
      '@typescript-eslint/restrict-template-expressions': [ // Allow numbers in template expressions
        'error',
        {
          allowNumber: true
        }
      ]
    },
    extends: [
      tseslint.configs.strictTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json'
      }
    }
  },
  {
    files: [ // Workers run against the workers runtime types, not the DOM
      'src/workers/**/*.ts'
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: './src/workers/tsconfig.json'
      }
    }
  }
)
