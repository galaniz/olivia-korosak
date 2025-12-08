/**
 * Render - image
 */

/* Imports */

const { getImage } = require('../utils')
const { enumOptions } = require('../vars/enums')
const richText = require('./rich-text')

/**
 * Function - output image
 *
 * @param {object} args {
 *  @prop {object} image
 *  @prop {string} aspectRatio
 *  @prop {object} caption
 * }
 * @param {array<object>} parents
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
    const imageClasses = ['absolute top-0 left-0 w-full h-full object-cover']

    if (card) {
      imageClasses.push('e-transition')
    }

    imageOutput = getImage({
      data: imageData,
      classes: imageClasses.join(' '),
      attr: card ? 'data-scale' : '',
      returnAspectRatio: true,
      max: card ? 800 : 1200
    })

    let classes = 'relative overflow-hidden'

    if (aspectRatio) {
      classes += ` ar-${aspectRatio}`
    }

    if (card) {
      classes += ' after bg-fade-up'
    }

    imageOutput = `
      <div class="${classes}"${!aspectRatio ? ` style="padding-top:${imageOutput.aspectRatio * 100}%"` : ''}>
        ${imageOutput.output}
      </div>
    `
  }

  /* Card wrapper */

  if (imageOutput && card) {
    imageOutput = `
      <div class="relative z-index--1 overflow-hidden after bg-overlay order-first" data-overlay>
        ${imageOutput}
      </div>
    `
  }

  /* Figure caption */

  const { content } = caption

  if (content) {
    const captionContent = richText({
      type: 'paragraph',
      content: content[0].content,
      textStyle: 'Small',
      classes: 'pt-3xs pt-2xs-m'
    })

    if (captionContent) {
      imageOutput = `
        <figure>
          ${imageOutput}
          <figcaption data-rich>${captionContent}</figcaption>
        </figure>
      `
    }
  }

  /* Output */

  return imageOutput
}

/* Exports */

module.exports = image
