/**
 * 11ty config
 */

/* Imports */

require('dotenv').config()
const htmlmin = require("html-minifier")

/* Config */

module.exports = (eleventyConfig) => {
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

  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/svg');

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
