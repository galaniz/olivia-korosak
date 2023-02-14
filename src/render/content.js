/**
 * Render: content
 *
 * @param {object} args {
 *  @param {string} align
 *  @param {string} gap
 *  @param {string} gapLarge
 *  @param {boolean} richTextStyles
 *  @param {string} classes
 * }
 * @return {object}
 */

/* Imports */

const { enumOptions } = require('../vars/enums')

/* Function */

const content = ({ args = {} }) => {
  let {
    align = 'Left', // enumOptions.content.heading
    gap = 'Default', // enumOptions.gap
    gapLarge = 'Default', // enumOptions.gap
    richTextStyles = true,
    classes = ''
  } = args

  /* Normalize options */

  align = enumOptions.content.align[align]
  gap = enumOptions.gap[gap]
  gapLarge = enumOptions.gap[gapLarge]

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
