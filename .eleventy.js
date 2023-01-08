/**
 * 11ty config
 */

/* Imports */

require('dotenv').config()
const htmlmin = require("html-minifier")
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')

/* Config */

module.exports = (eleventyConfig) => {
  /* Serverless */

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './netlify/functions/'
  })

  /* Minify HTML */

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
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

  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy('src/assets/svg')
  eleventyConfig.addPassthroughCopy('src/assets/favicon')

  /* Output */

  return {
    dir: {
      input: 'src',
      output: 'site',
      includes: 'includes',
      data: 'data'
    }
  }
}
