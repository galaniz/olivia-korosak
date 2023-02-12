/**
 * 11ty config
 */

/* Imports */

require('dotenv').config()
const htmlmin = require('html-minifier')
const esbuild = require('esbuild')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')
const { sassPlugin } = require('esbuild-sass-plugin')
const { writeFileSync, existsSync } = require('fs')
const { envData, jsonFileData } = require('./src/vars/data')

/* Config */

module.exports = (config) => {
  /* Add env ctfl variables */

  if (process) {
    const env = process.env

    envData.eleventyCache = env?.USE_11TY_CACHE ? true : false
    envData.dev = env.ENVIRONMENT === 'dev'
    envData.prod = env.ENVIRONMENT === 'production'
    envData.ctfl = {
      spaceId: env.CTFL_SPACE_ID,
      cpaToken: env.CTFL_CPA_TOKEN,
      cdaToken: env.CTFL_CDA_TOKEN
    }
  }

  console.log('ENV_DATA', envData)

  /* Check/build json files */

  Object.keys(jsonFileData).forEach((k) => {
    const path = `./src/json/${jsonFileData[k].name}`
    
    if (!existsSync(path)) {
      writeFileSync(path, JSON.stringify({}))
    }
  })

  /* Process scss and js files */

  config.on('afterBuild', () => {
    const entryPoints = {}
    const namespace = 'ok'

    entryPoints[`js/${namespace}`] = 'src/assets/index.js'
    entryPoints[`css/${namespace}`] = 'src/assets/index.scss'

    return esbuild.build({
      entryPoints,
      outdir: 'site/assets',
      minify: true,
      bundle: true,
      sourcemap: false,
      target: 'es6',
      external: ['*.woff', '*.woff2'],
      plugins: [sassPlugin({
        async transform(source) {
          const {css} = await postcss(
            [
              autoprefixer,
              postcssPresetEnv({
                stage: 4
              })
            ]
          ).process(
            source,
            {
              from: `css/${namespace}.css`
            }
          )
  
          return css
        }
      })]
    })
  })

  config.addWatchTarget('./src/assets/')

  /* Minify HTML */

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })

      return minified
    }

    return content
  })

  /* Copy static asset folders */

  config.addPassthroughCopy({
    'src/assets/fonts': 'assets/fonts'
  })

  config.addPassthroughCopy({
    'src/assets/img': 'assets/img'
  })

  config.addPassthroughCopy({
    'src/assets/favicon': 'assets/favicon'
  })

  /* Folder structure */

  return {
    dir: {
      data: 'data',
      output: 'site'
    }
  }
}
