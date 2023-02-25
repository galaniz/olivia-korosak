/**
 * Render - hero
 */

/* Imports */

const { getImage } = require('../utils')
const controlSvg = require('./svg/control')

/**
 * Function - output hero
 *
 * @param {object} args {
 *  @prop {string} id
 *  @prop {string} contentType
 *  @prop {string} title
 *  @prop {string} text
 *  @prop {object} image
 *  @prop {boolean} index
 *  @prop {boolean} breadcrumbs
 * }
 * @return {string} HTML - section
 */

const hero = ({
  id = '',
  contentType = 'page',
  title = '',
  text = '',
  image = {},
  index = false,
  breadcrumbs = false
}) => {
  /* Type */

  let type = 'text'

  /* Container */

  let container = 'default'

  /* Full width container */

  let fullWidth = false

  /* Padding */

  let padding = 'l-padding-top-xl l-padding-bottom-2xl l-padding-top-2xl-m l-padding-bottom-3xl-m'

  if (breadcrumbs) {
    padding = 'l-padding-top-2xl l-padding-bottom-2xl'
  }

  /* Image */

  let imageOutput = ''

  if (image?.fields) {
    type = 'media-text'

    if (index) {
      container = 'medium'
    }

    padding = 'l-padding-top-xl l-padding-bottom-2xl l-padding-top-2xl-m'

    if (container === 'default') {
      padding += ' l-padding-bottom-4xl-m'
    }

    imageOutput = getImage({
      data: image?.fields,
      classes: 'l-absolute l-top-0 l-left-0 l-height-100-pc l-width-1-1',
      returnAspectRatio: true
    })
  }

  /* Text */

  let textOutput = `
    <h1 class="l-margin-0">${title}</h1>
    ${text ? `<p class="t-m l-margin-0 l-padding-top-4xs l-padding-top-3xs-m">${text}</p>` : ''}
  `

  /* Track */

  if (contentType === 'track') {
    fullWidth = true

    textOutput = `
      <div class="l-flex l-flex-column l-flex-row-l l-gap-margin-s l-gap-margin-m-l" id=${id}>
        <div>
          <button type="button" id="b-${id}" class="o-play l-width-xl l-height-xl l-width-2xl-m l-height-2xl-m l-svg t-foreground-base bg-background-light b-radius-100-pc" aria-label="Play ${title}" data-state="play">
            ${controlSvg('play')}
            ${controlSvg('pause')}
          </button>
        </div>
        <div>
          ${textOutput}
        </div>
      </div>
    `
  }

  /* Main output */

  let output = ''

  if (type === 'media-text') {
    output = `
      <div class="l-flex l-flex-wrap l-gap-margin-m l-gap-margin-2xl-l l-align-center">
        <div class="${container === 'medium' ? 'l-width-1-2-s l-width-3-5-m' : 'l-width-1-2-m'}">
          ${textOutput}
        </div>
        <div class="${container === 'medium' ? 'l-width-1-2-s l-width-2-5-m l-order-first-s' : 'l-width-1-2-m l-order-first-m'}">
          <div class="l-relative l-overflow-hidden" style="padding-top:${imageOutput.aspectRatio * 100}%">
            ${imageOutput.output}
          </div>
        </div>
      </div>
    `
  } else {
    output = `
      ${fullWidth ? '' : '<div class="l-width-2-3-m">'}
        ${textOutput}
      ${fullWidth ? '' : '</div>'}
    `
  }

  /* Outer classes */

  const classes = `${container === 'medium' ? 'l-container-m' : 'l-container'} ${padding}`

  /* Output */

  return `
    <section class="${classes}">
      ${output}
    </section>
  `
}

/* Exports */

module.exports = hero
