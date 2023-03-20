/**
 * Render - gradients
 */

/* Imports */

const { getHue } = require('../utils')

/**
 * Function - output gradients for page or card
 *
 * @param {object} args {
 *  @prop {string} from
 *  @prop {string} type
 *  @prop {boolean} bottom
 * }
 * @return {string} HTML - div
 */

const gradients = ({ from = '', type = 'page', bottom = true }) => {
  /* From required */

  if (!from) {
    return ''
  }

  /* Get colors as hsla */

  const rotate = -30
  const fromHue = getHue(from)
  const fromSat = fromHue >= 330 || fromHue <= 10 ? 45 : 35
  let toHue = fromHue + rotate

  if (toHue < 0) {
    toHue = 360 + toHue
  }

  const toSat = toHue >= 330 || toHue <= 10 ? 45 : 35
  const colorFrom = `${fromHue}, ${fromSat}%, 25%, 1`
  const colorBetween = `${toHue}, ${toSat}%, 25%, 0.25`
  const colorTo = `${toHue}, ${toSat}%, 25%, 0`
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
