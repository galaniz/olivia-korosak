/**
 * Button output
 *
 * @param {object} args {
 *  @param {string} title
 *  @param {object/boolean} internalLink
 *  @param {string} externalLink
 *  @param {string} type
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')
const { getLink } = require('../utils/functions')

/* Function */

const button = (args) => {
  let {
    title = '',
    internalLink = false,
    externalLink = '',
    type = 'Main' // optionValues.button.type
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

  /* Classes */

  let linkClasses = 'o-button b-radius-s'

  if (type === 'main') {
    linkClasses += ' bg-background-light t-foreground-base'
  } else if (type === 'secondary') {
    linkClasses += ' t-background-light b-all b-current'
  }

  /* Attributes */

  let linkAttrs = ''

  if (external) {
    linkAttrs = ' target="_blank" rel="noreferrer"'
  }

  /* Output */

  return `<a class="${linkClasses}" href="${link}"${linkAttrs}>${title}</a>`
}

/* Exports */

module.exports = button
