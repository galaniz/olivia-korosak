/**
 * 11ty config
 */

/* Imports */

require('dotenv').config()
const htmlmin = require('html-minifier')
const fs = require('fs')
const esbuild = require('esbuild')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')
const { sassPlugin } = require('esbuild-sass-plugin')
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')

/* Config */

module.exports = (eleventyConfig) => {
  /* Check/build json files */

  const paths = [
    './_json/slugs.json',
    './_json/slug-parents.json',
    './_json/durations.json',
    './_json/archive-counts.json'
  ]

  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify({}))
    }
  })

  /* Process scss and js files */

  eleventyConfig.on('afterBuild', () => {
    const entryPoints = {}
    const namespace = 'ok'

    entryPoints[`js/${namespace}`] = '_assets/index.js'
    entryPoints[`css/${namespace}`] = '_assets/index.scss'

    return esbuild.build({
      entryPoints,
      outdir: '_site/assets',
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

  eleventyConfig.addWatchTarget('./_assets/')

  /* Minify HTML */

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
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

  eleventyConfig.addPassthroughCopy({
    '_assets/fonts': 'assets/fonts'
  })

  eleventyConfig.addPassthroughCopy({
    '_assets/svg': 'assets/svg'
  })

  eleventyConfig.addPassthroughCopy({
    '_assets/img': 'assets/img'
  })

  eleventyConfig.addPassthroughCopy({
    '_assets/favicon': 'assets/favicon'
  })

  /* Serverless */

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './netlify/functions/'
  })
}
