/**
 * Render - button
 */

/* Imports */

const { enumOptions } = require('../vars/enums')
const { getLink } = require('../utils')

/**
 * Function - output link button
 *
 * @param {object} args {
 *  @prop {string} title
 *  @prop {string} link
 *  @prop {object|boolean} internalLink
 *  @prop {string} externalLink
 *  @prop {string} type
 *  @prop {string} size
 *  @prop {string} justify
 *  @prop {string} paddingTop
 *  @prop {string} paddingBottom
 * }
 * @return {string} HTML - a || div
 */

const button = ({ args = {} }) => {
  let {
    title = '',
    link = '', // Back end option
    internalLink = false,
    externalLink = '',
    type = 'Main', // enumOptions.button.type
    size = 'Default', // enumOptions.button.size
    justify = 'None', // enumOptions.justify
    paddingTop = 'None', // enumOptions.padding
    paddingBottom = 'None' // enumOptions.padding
  } = args

  /* Link and title required */

  link = link || getLink(internalLink, externalLink)

  if (!link || !title) {
    return ''
  }

  /* Check if external */

  const external = externalLink || false

  /* Normalize options */

  type = enumOptions.button.type[type]
  size = enumOptions.button.size[size]
  justify = enumOptions.justify[justify]
  paddingTop = enumOptions.padding[paddingTop]
  paddingBottom = enumOptions.padding[paddingBottom]

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

  if (!external) {
    linkClasses += ' js-pt-link'
  }

  /* Attributes */

  const linkAttrs = ' data-button'

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
