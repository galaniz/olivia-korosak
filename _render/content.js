/**
 * Content output
 *
 * @param {object} args {
 *  @param {string} align
 *  @param {string} gap
 *  @param {string} gapLarge
 *  @param {boolean} richTextStyles
 *  @param {string} classes
 * }
 */

/* Imports */

const { optionValues } = require('../_utils/variables')

/* Function */

const content = (args = {}) => {
  let {
    align = 'Left', // optionValues.content.heading
    gap = 'Default', // optionValues.gap
    gapLarge = 'Default', // optionValues.gap
    richTextStyles = true,
    classes = ''
  } = args

  /* Normalize options */

  align = optionValues.content.align[align]
  gap = optionValues.gap[gap]
  gapLarge = optionValues.gap[gapLarge]

  /* Classes */

  classes = [classes]

  /* Rich text styles */

  if (richTextStyles) {
    classes.push('t-rich-text e-underline')
  }

  /* Align */

  if (align === 'center') {
    classes.push('t-align-center')
  }

  /* Gap */

  if (gap) {
    classes.push(`l-margin-bottom-${gap}-all`)
  }

  if (gapLarge && gapLarge !== gap) {
    classes.push(`l-margin-bottom-${gapLarge}-all-m`)
  }

  /* Output */

  classes = classes.join(' ')

  return {
    start: `<div${classes ? ` class="${classes}"` : ''}>`,
    end: '</div>'
  }
}

/* Exports */

module.exports = content
