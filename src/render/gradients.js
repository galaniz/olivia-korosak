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

const gradients = ({ from = '', to = '', type = 'page' }) => {
  if (!from && !to) {
    return ''
  }

  const colorFrom = getRgba(from)
  const colorTo = getRgba(to, 0)
  const style = `style="--from:${colorFrom};--to:${colorTo}"`

  if (type === 'card') {
    return `
      <div class="l-aspect-ratio-56">
        <div class="l-before l-after bg-gradient-0 bg-gradient-135" data-overlay ${style}></div>
      </div>
    `
  }

  return `
    <div class="l-width-100-pc l-height-100-pc l-absolute l-top-0 l-left-0 l-overflow-hidden l-z-index--1 l-before l-after c-gradients" ${style}></div>
  `
}

/* Exports */

module.exports = gradients
