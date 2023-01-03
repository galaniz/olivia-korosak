/**
 * Card output
 *
 * @param {object} args {
 *  @param {string} gap
 *  @param {string} gapLarge
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')

/* Function */

const card = (args = {}) => {
  let {
    gap = 'None', // optionValues.gap
    gapLarge = 'None' // optionValues.gap
  } = args

  /* Normalize options */

  gap = optionValues.gap[gap]
  gapLarge = optionValues.gap[gapLarge]

  /* Classes */

  let classes = 'l-relative e-scale e-overlay e-transition-quad'

  /* Gap */

  if (gap) {
    classes += ` l-margin-bottom-${gap}-all`
  }

  if (gapLarge && gapLarge !== gap) {
    classes += ` l-margin-bottom-${gapLarge}-all-m`
  }

  /* Output */

  return {
    start: `<div class="${classes}">`,
    end: '</div>'
  }
}

/* Exports */

module.exports = card
