/**
 * Button output
 *
 * @param {object} args {
 *  @param {string} title
 *  @param {object/boolean} internalLink
 *  @param {string} externalLink
 *  @param {string} type
 *  @param {string} size
 *  @param {string} justify
 * }
 */

/* Imports */

const { optionValues } = require('../_utils/variables')
const { getLink } = require('../_utils/functions')

/* Function */

const button = (args = {}) => {
  let {
    title = '',
    internalLink = false,
    externalLink = '',
    type = 'Main', // optionValues.button.type
    size = 'Default', // optionValues.button.size
    justify = 'None', // optionValues.justify
    paddingTop = 'None', // optionValues.padding
    paddingBottom = 'None' // optionValues.padding
  } = args

  /* Link and title required */

  const link = getLink(internalLink, externalLink)

  if (!link || !title) {
    return ''
  }

  /* Check if external */

  const external = externalLink || false

  /* Normalize options */

  type = optionValues.button.type[type]
  size = optionValues.button.size[size]
  justify = optionValues.justify[justify]
  paddingTop = optionValues.padding[paddingTop]
  paddingBottom = optionValues.padding[paddingBottom]

  /* Classes */

  let linkClasses = 'o-button b-radius-s e-transition-quad'

  if (type === 'main') {
    linkClasses += ' bg-background-light t-foreground-base'
  } else if (type === 'secondary') {
    linkClasses += ' o-button-secondary t-background-light b-all b-current'
  }

  if (size === 'large') {
    linkClasses += ' o-button-large'
  }

  /* Attributes */

  let linkAttrs = ' data-button'

  if (external) {
    linkAttrs = ' target="_blank" rel="noreferrer"'
  }

  /* Output */

  let output = `<a class="${linkClasses}" href="${link}"${linkAttrs}>${title}</a>`

  if (justify || paddingTop || paddingBottom) {
    const classes = []

    if (paddingTop) {
      classes.push(`l-padding-top-${paddingTop}`)
    }

    if (paddingBottom) {
      classes.push(`l-padding-top-${paddingBottom}`)
    }

    if (justify) {
      classes.push(`l-flex l-justify-${justify}`)
    }

    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

module.exports = button
