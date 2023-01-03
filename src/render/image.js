/**
 * Image output
 *
 * @param {object} args {
 *  @param {object} image
 *  @param {string} aspectRatio
 *  @param {object} caption
 * }
 * @param {array} parents
 */

/* Imports */

const { getImage } = require('../utils/functions')
const { optionValues } = require('../utils/constants')

/* Function */

const image = (args = {}, parents = []) => {
  let {
    image = {},
    aspectRatio = '1:1', // optionValues.aspectRatio
    caption = {}
  } = args

  /* Check card parent */

  let card = false

  if (parents.length) {
    if (parents[0].type === 'card') {
      card = true
    }
  }

  /* Normalize options */

  aspectRatio = optionValues.aspectRatio[aspectRatio]

  /* Image */

  let imageOutput = ''
  let imageData = false

  if (image?.fields) {
    imageData = image.fields.file
  }

  if (imageData) {
    const imageClasses = []

    if (aspectRatio) {
      imageClasses.push('l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover')
    }

    if (card) {
      imageClasses.push('e-transition')
    }

    imageOutput = getImage({
      data: imageData,
      classes: imageClasses.join(' '),
      attr: card ? 'data-scale' : ''
    })

    let classes = 'l-relative l-overflow-hidden'

    if (aspectRatio) {
      classes += ` l-aspect-ratio-${aspectRatio}`
    }

    if (card) {
      classes += ' l-after bg-gradient'
    }

    imageOutput = `<div class="${classes}">${imageOutput}</div>`
  }

  /* Card wrapper */

  if (imageOutput && card) {
    imageOutput = `<div class="l-relative l-overflow-hidden l-after bg-overlay" data-overlay>${imageOutput}</div>`
  }

  /* Output */

  return imageOutput
}

/* Exports */

module.exports = image
