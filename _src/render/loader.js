/**
 * Render - loader
 */

/**
 * Function - output loader
 *
 * @param {object} args {
 *  @prop {boolean} hide
 *  @prop {boolean} ariaHidden
 *  @prop {string} a11yHideText
 * }
 * @return {string} HTML - span
 */

const loader = (args = {}) => {
  let {
    hide = true,
    classes = '',
    ariaHidden = true,
    a11yHideText = ''
  } = args

  /* Attributes */

  let attr = ''

  if (hide) {
    attr += ' data-hide'
  }

  if (ariaHidden) {
    attr += ' aria-hidden="true"'
  }

  if (a11yHideText) {
    a11yHideText = `<span class="a11y-visually-hidden reduce-motion-hide">${a11yHideText}</span>`
  }

  /* Classes */

  classes = `o-loader absolute top-0 left-0 right-0 bottom-0 flex align-center justify-center e-transition b-radius-s${classes ? ` ${classes}` : ''}`

  /* Output */

  return `
    <span class="${classes}"${attr}>
      <span class="h-s flex align-center justify-center reduce-motion-hide">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span class="text-m-flex wt-medium none reduce-motion-show">Loading</span>
      ${a11yHideText}
    </span>
  `
}

/* Exports */

module.exports = loader
