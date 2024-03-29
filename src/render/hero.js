/**
 * Render - hero
 */

/* Imports */

const { getImage } = require('../utils')
const controlSvg = require('./svg/control')
const arrowSvg = require('./svg/arrow')

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

    if (!index) {
      container = 'medium'
    }

    padding = 'l-padding-top-xl l-padding-bottom-2xl l-padding-top-2xl-m'

    if (container === 'default') {
      padding += ' l-padding-bottom-4xl-m'
    }

    imageOutput = getImage({
      data: image?.fields,
      classes: 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover',
      returnAspectRatio: true,
      lazy: false,
      max: container === 'medium' ? 800 : 1200
    })
  }

  /* Arrow jump link */

  const arrow = index && type === 'media-text'

  /* Text */

  let textOutput = `<h1 class="l-margin-0">${title}</h1>`

  if (text) {
    let textClasses = 'l-margin-0'
    let preText = ''

    if (contentType === 'project') {
      textClasses += ' t t-weight-medium l-relative l-padding-top-3xs l-padding-top-2xs-m e-underline-reverse'
      preText = '<span class="a11y-visually-hidden">Types: </span>'
    } else {
      textClasses += ' t-m l-padding-top-4xs l-padding-top-3xs-m'
    }

    textOutput += `<p class="${textClasses}">${preText}${text}</p>`
  }

  if (arrow) {
    textOutput = `
      <div class="l-margin-auto l-padding-top-2xl-m">
        ${textOutput}
      </div>
      <a href="#main-content" class="l-none l-block-m l-width-m l-padding-top-m" aria-label="Jump to main content">
        <span class="l-flex l-width-m l-height-m l-svg">
          ${arrowSvg()}
        </span>
      </a>
    `
  }

  /* Single track */

  if (contentType === 'track') {
    padding = 'l-padding-top-xl l-padding-bottom-xl l-padding-top-2xl-m'
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
      <div class="l-flex l-flex-wrap l-gap-margin-m l-gap-margin-2xl-l${!arrow ? ' l-align-center' : ''}">
        <div class="${container === 'medium' ? 'l-width-1-2-s l-width-3-5-m' : 'l-width-1-2-m'}${arrow ? ' l-flex l-flex-column' : ''}">
          ${textOutput}
        </div>
        <div class="l-width-1-1 ${container === 'medium' ? 'l-width-1-2-s l-width-2-5-m l-order-first-s' : 'l-width-1-2-m l-order-first-m'}">
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

  /* Arrow */

  if (arrow) {
    output += `
      <a href="#main-content" class="l-block l-none-m l-width-m l-padding-top-m" aria-label="Jump to main content">
        <span class="l-flex l-width-m l-height-m l-svg">
          ${arrowSvg()}
        </span>
      </a>
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
