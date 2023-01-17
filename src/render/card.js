/**
 * Card output
 *
 * @param {object} args {
 *  @param {string} gap
 *  @param {string} gapLarge
 * }
 */

/* Imports */

const { optionValues } = require('../utils/variables')

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

  let classes = 'l-relative l-flex l-flex-column l-flex-grow-1 e-overlay e-title-line'

  /* Gap */

  if (gap) {
    classes += ` l-gap-margin-${gap}`
  }

  if (gapLarge && gapLarge !== gap) {
    classes += ` l-gap-margin-${gapLarge}-m`
  }

  /* Output */

  return {
    start: `<div class="${classes}">`,
    end: '</div>'
  }
}

/* Exports */

module.exports = card
