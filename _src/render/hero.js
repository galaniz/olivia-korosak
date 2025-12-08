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

  let padding = 'pt-xl pb-2xl pt-2xl-m pb-3xl-m'

  if (breadcrumbs) {
    padding = 'pt-2xl pb-2xl'
  }

  /* Image */

  let imageOutput = ''

  if (image?.fields) {
    type = 'media-text'

    if (!index) {
      container = 'medium'
    }

    padding = 'pt-xl pb-2xl pt-2xl-m'

    if (container === 'default') {
      padding += ' pb-4xl-m'
    }

    imageOutput = getImage({
      data: image?.fields,
      classes: 'absolute top-0 left-0 w-full h-full object-cover',
      returnAspectRatio: true,
      lazy: false,
      max: container === 'medium' ? 800 : 1200
    })
  }

  /* Arrow jump link */

  const arrow = index && type === 'media-text'

  /* Text */

  let textOutput = `<h1 class="m-0">${title}</h1>`

  if (text) {
    let textClasses = 'm-0'
    let preText = ''

    if (contentType === 'project') {
      textClasses += ' text-m wt-medium relative pt-3xs pt-2xs-m e-underline-reverse'
      preText = '<span class="a11y-visually-hidden">Types: </span>'
    } else {
      textClasses += ' text-l pt-4xs pt-3xs-m'
    }

    textOutput += `<p class="${textClasses}">${preText}${text}</p>`
  }

  if (arrow) {
    textOutput = `
      <div class="m-auto pt-2xl-m">
        ${textOutput}
      </div>
      <a href="#main-content" class="none block-m w-m pt-m" aria-label="Jump to main content">
        <span class="flex w-m h-m l-svg">
          ${arrowSvg()}
        </span>
      </a>
    `
  }

  /* Single track */

  if (contentType === 'track') {
    padding = 'pt-xl pb-xl pt-2xl-m'
    fullWidth = true

    textOutput = `
      <div class="flex col row-l gap-s gap-m-l" id=${id}>
        <div>
          <button type="button" id="b-${id}" class="o-play w-xl h-xl w-2xl-m h-2xl-m l-svg sharp bg-background-light b-radius-100-pc" aria-label="Play ${title}" data-state="play">
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
      <div class="flex wrap gap-m gap-2xl-l${!arrow ? ' align-center' : ''}">
        <div class="${container === 'medium' ? 'col-6-s col-7-m' : 'col-6-m'}${arrow ? ' flex col' : ''}">
          ${textOutput}
        </div>
        <div class="col-12 ${container === 'medium' ? 'col-6-s col-5-m order-first-s' : 'col-6-m order-first-m'}">
          <div class="relative overflow-hidden" style="padding-top:${imageOutput.aspectRatio * 100}%">
            ${imageOutput.output}
          </div>
        </div>
      </div>
    `
  } else {
    output = `
      ${fullWidth ? '' : '<div class="col-8-m">'}
        ${textOutput}
      ${fullWidth ? '' : '</div>'}
    `
  }

  /* Arrow */

  if (arrow) {
    output += `
      <a href="#main-content" class="block none-m w-m pt-m" aria-label="Jump to main content">
        <span class="flex w-m h-m l-svg">
          ${arrowSvg()}
        </span>
      </a>
    `
  }

  /* Outer classes */

  const classes = `${container === 'medium' ? 'container-m' : 'container'} ${padding}`

  /* Output */

  return `
    <section class="${classes}">
      ${output}
    </section>
  `
}

/* Exports */

module.exports = hero
