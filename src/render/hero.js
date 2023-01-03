/**
 * Hero output
 *
 * @param {object} args {
 *  @param {string} title
 *  @param {string} text
 *  @param {object} image
 *  @param {boolean} index
 *  @param {boolean} breadcrumbs
 * }
 */

/* Imports */

const { getImage } = require('../utils/functions')

/* Function */

const hero = ({
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

  /* Padding */

  let padding = 'l-padding-top-xl l-padding-bottom-2xl l-padding-top-2xl-m l-padding-bottom-3xl-m'

  if (breadcrumbs) {
    padding = 'l-padding-top-2xl l-padding-bottom-2xl'
  }

  /* Image */

  let imageOutput = ''

  if (image) {
    type = 'media-text'

    if (index) {
      container = 'medium'
    }

    if (breadcrumbs) {
      padding = 'l-padding-top-xl l-padding-bottom-2xl l-padding-top-2xl-m'
    } else {
      padding = 'l-padding-top-m l-padding-bottom-2xl l-padding-top-2xl-m'
    }

    if (container === 'default') {
      padding += ' l-padding-bottom-4xl-m'
    }

    imageOutput = getImage({
      data: image,
      classes: 'l-width-1-1'
    })
  }

  /* Text */

  const textOutput = `
    <h1 class="l-margin-0">${title}</h1>
    ${text ? `<p class="l-margin-0 l-padding-top-4xs l-padding-top-3xs-m">${text}</p>` : ''}
  `

  /* Main output */

  let output = ''

  if (type === 'media-text') {
    output = `
      <div class="l-flex l-flex-wrap l-gap-margin-m l-gap-margin-2xl-l l-align-center">
        <div class="${container === 'medium' ? 'l-width-3-5-m' : 'l-width-1-2-m'}">
          ${textOutput}
        </div>
        <div class="${container === 'medium' ? 'l-width-2-5-m l-order-first-m' : 'l-width-1-2-m l-order-first-m'}">
          ${imageOutput}
        </div>
      </div>
    `
  } else {
    output = textOutput
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
