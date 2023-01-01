/**
 * Content output
 *
 * @param {object} args {
 *  @param {boolean} linkListStyles
 *  @param {string} align
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')

/* Function */

const content = (args = {}) => {
  let {
    linkListStyles = false,
    align = 'Left' // optionValues.content.heading
  } = args

  /* Normalize options */

  align = optionValues.content.align[align]

  /* Classes */

  let classes = ['t-rich-text']

  if (align === 'center') {
    classes.push('t-align-center')
  }

  classes = classes.join(' ')

  /* Output */

  return {
    start: `<div${classes ? ` class="${classes}"` : ''}>`,
    end: '</div>'
  }
}

/* Exports */

module.exports = content
