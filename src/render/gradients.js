/**
 * Render: gradients
 *
 * @param {object} args {
 *  @param {string} from
 *  @param {string} to
 *  @param {string} type
 *  @param {boolean} bottom
 * }
 * @return {string} HTML - div
 */

/* Imports */

const { getRgba } = require('../utils')

/* Function */

const gradients = ({ from = '', to = '', type = 'page', bottom = true }) => {
  if (!from && !to) {
    return ''
  }

  const colorFrom = getRgba(from)
  const colorTo = getRgba(to, 0)
  const style = `style="--from:${colorFrom};--to:${colorTo}"`

  if (type === 'card') {
    return `
      <div class="l-aspect-ratio-56">
        <div class="l-before l-after bg-gradient-0 bg-gradient-135-before" data-overlay ${style}></div>
      </div>
    `
  }

  let classes = 'l-width-100-pc l-height-100-pc l-absolute l-top-0 l-left-0 l-overflow-hidden l-z-index--1 l-before c-gradients'

  if (bottom) {
    classes += ' l-after'
  }

  return `
    <div class="${classes}" ${style}></div>
  `
}

/* Exports */

module.exports = gradients
