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
}
