/**
 * Render - gradients
 */

/* Imports */

const { getRgba } = require('../utils')

/**
 * Function - output gradients for page or card
 * 
 * @param {object} args {
 *  @prop {string} from
 *  @prop {string} to
 *  @prop {string} type
 *  @prop {boolean} bottom
 * }
 * @return {string} HTML - div
 */

const gradients = ({ from = '', to = '', type = 'page', bottom = true }) => {
  /* From and to required */

  if (!from && !to) {
    return ''
  }

  /* Get colors as rgba */

  const colorFrom = getRgba(from, 1)
  const colorBetween = getRgba(to, 0.25)
  const colorTo = getRgba(to, 0)
  const style = `style="--from:${colorFrom};--to:${colorTo}${type === 'page' ? `;--between:${colorBetween}` : ''}"`

  /* Card gradient */

  if (type === 'card') {
    return `
      <div class="l-aspect-ratio-56">
        <div class="l-before l-after bg-gradient-0 bg-gradient-135-before" data-overlay ${style}></div>
      </div>
    `
  }

  /* Classes */

  let classes = 'l-width-100-pc l-height-100-pc l-absolute l-top-0 l-left-0 l-overflow-hidden l-z-index--1 l-before c-gradients'

  if (bottom) {
    classes += ' l-after'
  }

  /* Output */

  return `
    <div class="${classes}" ${style}></div>
  `
}

/* Exports */

module.exports = gradients
