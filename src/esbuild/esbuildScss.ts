/**
 * Esbuild - Scss
 */

/* Imports */

import type { Plugin } from 'esbuild'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Transform scss content.
 *
 * @return {Plugin}
 */
const esbuildScss = (): Plugin => {
  return {
    name: 'esbuildScss',
    setup (build) {
      build.onLoad({ filter: /\.scss$/ }, async (args) => {
        let styles = ''

        const sassRes = sass.compile(args.path, {
          loadPaths: [
            'node_modules',
            './src'
          ],
          style: 'compressed'
        })

        const sassCss = sassRes.css

        if (isStringStrict(sassCss)) {
          styles = sassCss
        }

        const { css } = await postcss([autoprefixer]).process(styles, { from: undefined, to: undefined })

        print('[OK] Success getting scss contents', args.path, 'success')

        return {
          contents: css,
          loader: 'css'
        }
      })
    }
  }
}

/* Exports */

export { esbuildScss }
