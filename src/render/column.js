/**
 * Column output
 *
 * @param {object} args {
 *  @param {string} tag
 *  @param {string} width
 *  @param {string} widthSmall
 *  @param {string} widthMedium
 *  @param {string} widthLarge
 *  @param {string} justify
 *  @param {string} align
 *  @param {string} classes
 * }
 */

/* Imports */

const { optionValues } = require('../utils/variables')

/* Function */

const column = (args = {}) => {
  let {
    tag = 'Div', // optionValues.tag
    width = 'None', // optionValues.width
    widthSmall = 'None', // optionValues.width
    widthMedium = 'None', // optionValues.width
    widthLarge = 'None', // optionValues.width
    justify = 'None', // optionValues.justify
    align = 'None', // optionValues.align
    classes = ''
  } = args

  /* Normalize options */

  tag = optionValues.tag[tag]
  width = optionValues.width[width]
  widthSmall = optionValues.width[widthSmall]
  widthMedium = optionValues.width[widthMedium]
  widthLarge = optionValues.width[widthLarge]
  justify = optionValues.justify[justify]
  align = optionValues.align[align]

  /* Classes */

  classes = [classes]

  /* Width */

  if (!width) {
    width = '1-1'
  }

  if (width) {
    classes.push(`l-width-${width}`)
  }

  if (widthSmall && widthSmall !== width) {
    classes.push(`l-width-${widthSmall}-s`)
  }

  if (widthMedium && widthMedium !== widthSmall) {
    classes.push(`l-width-${widthMedium}-m`)
  }

  if (widthLarge && widthLarge !== widthMedium) {
    classes.push(`l-width-${widthLarge}-l`)
  }

  /* Justify */

  if (justify) {
    classes.push(`l-justify-${justify}`)
  }

  /* Align */

  if (align) {
    classes.push(`l-align-${align}`)
  }

  /* Output */

  return {
    start: `<${tag} class="${classes.join(' ')}">`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = column
