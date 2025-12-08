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
  const style = `style="--bg-from:${colorFrom};--bg-to:${colorTo}${type === 'page' ? `;--bg-between:${colorBetween}` : ''}"`

  /* Card gradient */

  if (type === 'card') {
    return `
      <div class="ar-16-9">
        <div class="before after bg-fade-up bg-diagonal-before" data-overlay ${style}></div>
      </div>
    `
  }

  /* Classes */

  let classes = 'gradients w-full h-full absolute top-0 left-0 overflow-hidden z-index--1 before'

  if (bottom) {
    classes += ' after'
  }

  /* Output */

  return `
    <div class="${classes}" ${style}></div>
  `
}

/* Exports */

module.exports = gradients
