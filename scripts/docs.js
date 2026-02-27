/**
 * Scripts - Docs
 */

/* Imports */

import { renderMarkdownDocs } from '@alanizcreative/formation-docs/docs.js'

/* Create README */

await renderMarkdownDocs({
  include: 'src/**/*.ts',
  docsExclude: 'src/**/!(*global)Types.ts', // 'src/**/!(*global|*config)Types.ts'
  docsTypes: 'src/**/*Types.ts',
  index: `
  /**
   * @file
   * title: Olivia Korosak
   * Static site for Olivia Korosak using [Formation Static](https://github.com/galaniz/formation-static).
   *
   * @example
   * title: Installation
   * shell: pnpm install --optional
   *
   * @example
   * title: Local Development
   * desc: To launch the local server:
   * shell:
   * pnpm clean
   * pnpm build
   * pnpm start
   *
   * @index
   */
  `
})
