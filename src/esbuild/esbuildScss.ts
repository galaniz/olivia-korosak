/**
 * Esbuild - Scss
 */

/* Imports */

import type { Plugin } from 'esbuild'
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Transform SCSS content.
 *
 * @return {Plugin}
 */
const esbuildScss = (): Plugin => {
  return {
    name: 'esbuildScss',
    setup (build) {
      build.onLoad({ filter: /\.scss$/ }, async (args) => {
        const { path } = args

        let styles = ''

        const sassContents = await readFile(path, 'utf8')
        const sassRes = sass.compileString(`@forward "config/config";${sassContents}`, {
          loadPaths: [
            'node_modules',
            './src'
          ],
          style: 'compressed',
          url: pathToFileURL(path)
        })

        const sassCss = sassRes.css

        if (isStringStrict(sassCss)) {
          styles = sassCss
        }

        const { css } = await postcss([
          autoprefixer
        ]).process(styles, {
          from: undefined,
          to: undefined
        })

        print('[OK] Success getting SCSS contents', path, 'success')

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
