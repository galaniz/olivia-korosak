/**
 * 11ty config
 */

/* Imports */

require('dotenv').config()
const htmlmin = require('html-minifier')
const fs = require('fs')
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

  /* Serverless */

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './netlify/functions/',
    excludeDependencies: [
      'ffprobe',
      'ffprobe-static'
    ]
  })

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

  eleventyConfig.addPassthroughCopy('assets/fonts')
  eleventyConfig.addPassthroughCopy('assets/svg')
  eleventyConfig.addPassthroughCopy('assets/img')
  eleventyConfig.addPassthroughCopy('assets/favicon')

  /* Directories */

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
