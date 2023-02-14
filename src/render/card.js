/**
 * Render: card
 *
 * @param {object} args {
 *  @param {string} gap
 *  @param {string} gapLarge
 * }
 * @return {object}
 */

/* Imports */

const { enumOptions } = require('../vars/enums')

/* Function */

const card = ({ args = {} }) => {
  let {
    gap = 'None', // enumOptions.gap
    gapLarge = 'None' // enumOptions.gap
  } = args

  /* Normalize options */

  gap = enumOptions.gap[gap]
  gapLarge = enumOptions.gap[gapLarge]

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
