/**
 * Info output
 *
 * @param {string} text
 */

/* Imports */

const infoSvg = require('./svg/info')

/* Function */

const info = (text = '') => {
  /* Output */

  return `
    <div class="o-info-neutral bg-gradient-135 l-overflow-hidden bg-gradient-135 l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
      <div class="l-flex l-gap-margin-3xs">
        <div>
          <div class="l-width-s l-height-m l-width-m-m l-svg">
            ${infoSvg()}
          </div>
        </div>
        <div>
          <p class="t-m t-weight-medium l-margin-0 l-padding-top-5xs l-padding-bottom-5xs">${text}</p>
        </div>
      </div>
    </div>
  `
}

/* Exports */

module.exports = info
