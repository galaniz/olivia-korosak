/**
 * Column output
 *
 * @param {object} args {
 *  @param {string} tag
 *  @param {string} width
 *  @param {string} widthSmall
 *  @param {string} widthLarge
 *  @param {string} justify
 *  @param {string} align
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')

/* Function */

const column = (args) => {
  let {
    tag = 'Div', // optionValues.tag
    width = 'None', // optionValues.width
    widthSmall = 'None', // optionValues.width
    widthLarge = 'None', // optionValues.width
    justify = 'None', // optionValues.justify
    align = 'None' // optionValues.align
  } = args

  /* Normalize options */

  tag = optionValues.tag[tag]
  width = optionValues.width[width]
  widthSmall = optionValues.width[widthSmall]
  widthLarge = optionValues.width[widthLarge]
  justify = optionValues.justify[justify]
  align = optionValues.align[align]

  /* Classes */

  const classes = []

  /* Width */

  if (width) {
    classes.push(`l-width-${width}`)
  } else {
    classes.push('l-width-1-1')
  }

  if (widthSmall && widthSmall !== width) {
    classes.push(`l-width-${width}-s`)
  }

  if (widthLarge && widthLarge !== widthSmall) {
    classes.push(`l-width-${widthLarge}-m`)
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
