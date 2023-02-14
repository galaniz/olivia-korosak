/**
 * Render: column
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
 * @return {object}
 */

/* Imports */

const { enumOptions } = require('../vars/enums')

/* Function */

const column = ({ args = {} }) => {
  let {
    tag = 'Div', // enumOptions.tag
    width = 'None', // enumOptions.width
    widthSmall = 'None', // enumOptions.width
    widthMedium = 'None', // enumOptions.width
    widthLarge = 'None', // enumOptions.width
    justify = 'None', // enumOptions.justify
    align = 'None', // enumOptions.align
    classes = ''
  } = args

  /* Normalize options */

  tag = enumOptions.tag[tag]
  width = enumOptions.width[width]
  widthSmall = enumOptions.width[widthSmall]
  widthMedium = enumOptions.width[widthMedium]
  widthLarge = enumOptions.width[widthLarge]
  justify = enumOptions.justify[justify]
  align = enumOptions.align[align]

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
