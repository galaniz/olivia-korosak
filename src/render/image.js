/**
 * Render - image
 */

/* Imports */

const { getImage } = require('../utils')
const { enumOptions } = require('../vars/enums')

/**
 * Function - output image
 *
 * @param {object} args {
 *  @prop {object} image
 *  @prop {string} aspectRatio
 *  @prop {object} caption
 * }
 * @param {array} parents
 * @return {string} HTML - div
 */

const image = ({ args = {}, parents = [] }) => {
  let {
    image = {},
    aspectRatio = '1:1', // enumOptions.aspectRatio
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

  aspectRatio = enumOptions.aspectRatio[aspectRatio]

  /* Image */

  let imageOutput = ''
  let imageData = false

  if (image?.fields) {
    imageData = image.fields
  }

  if (imageData) {
    const imageClasses = []

    if (aspectRatio) {
      imageClasses.push('l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover')
    }

    if (card) {
      imageClasses.push('e-transition l-object-left-top')
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
      classes += ' l-after bg-gradient-0'
    }

    imageOutput = `<div class="${classes}">${imageOutput}</div>`
  }

  /* Card wrapper */

  if (imageOutput && card) {
    imageOutput = `<div class="l-relative l-z-index--1 l-overflow-hidden l-after bg-overlay l-order-first" data-overlay>${imageOutput}</div>`
  }

  /* Output */

  return imageOutput
}

/* Exports */

module.exports = image
