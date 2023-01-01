/**
 * Image output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Imports */

const { getImage } = require('../utils/functions')
const { optionValues } = require('../utils/constants')

/* Function */

const image = (args = {}, parents = []) => {
  let {
    image = {},
    aspectRatio = '100%', // optionValues.aspectRatio
    caption = {}
  } = args

  /* Normalize options */

  aspectRatio = optionValues.aspectRatio[aspectRatio]

  /* Image */

  let imageOutput = ''
  let imageData = {}

  if (image?.fields) {
    imageData = image.fields.file
  }

  if (imageData) {
    imageOutput = getImage({
      data: imageData,
      classes: aspectRatio ? 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover' : ''
    })

    if (aspectRatio) {
      imageOutput = `<div class="l-relative l-overflow-hidden l-aspect-ratio-${aspectRatio}">${imageOutput}</div>`
    }
  }

  /* Output */

  return imageOutput
}

/* Exports */

module.exports = image
