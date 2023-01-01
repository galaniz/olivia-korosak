/**
 * Gradients output
 *
 * @param {object} args {
 *  @param {string} from
 *  @param {string} to
 * }
 */

/* Imports */

const { getRgba } = require('../utils/functions')

/* Function */

const gradients = ({ from = '', to = '' }) => {
  if (!from && !to) {
    return ''
  }

  const colorFrom = getRgba(from)
  const colorTo = getRgba(to, 0)

  return `
    <div class="l-width-100-pc l-height-100-pc l-absolute l-top-0 l-left-0 l-overflow-hidden l-z-index--1 l-before l-after c-gradients" style="--from:${colorFrom};--to:${colorTo}"></div>
  `
}

/* Exports */

module.exports = gradients
