/**
 * Container output
 *
 * @param {object} args {
 *  @param {string} tag
 *  @param {string} layout
 *  @param {string} maxWidth
 *  @param {string} paddingTop
 *  @param {string} paddingTopLarge
 *  @param {string} paddingBottom
 *  @param {string} paddingBottomLarge
 *  @param {string} gap
 *  @param {string} gapLarge
 *  @param {string} justify
 *  @param {string} align
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')

/* Function */

const container = (args) => {
  let {
    tag = 'Div', // optionValues.tag
    layout = 'Column', // optionValues.layout
    maxWidth = '100%', // optionValues.maxWidth
    paddingTop = 'None', // optionValues.padding
    paddingTopLarge = 'None', // optionValues.padding
    paddingBottom = 'None', // optionValues.padding
    paddingBottomLarge = 'None', // optionValues.padding
    gap = 'None', // optionValues.gap
    gapLarge = 'None', // optionValues.gap
    justify = 'None', // optionValues.justify
    align = 'None' // optionValues.align
  } = args

  /* Normalize options */

  tag = optionValues.tag[tag]
  layout = optionValues.layout[layout]
  maxWidth = optionValues.maxWidth[maxWidth]
  paddingTop = optionValues.padding[paddingTop]
  paddingTopLarge = optionValues.padding[paddingTopLarge]
  paddingBottom = optionValues.padding[paddingBottom]
  paddingBottomLarge = optionValues.padding[paddingBottomLarge]
  gap = optionValues.gap[gap]
  gapLarge = optionValues.gap[gapLarge]
  justify = optionValues.justify[justify]
  align = optionValues.align[align]

  /* Classes */

  const classes = [`l-${maxWidth}`]

  /* Flex */

  if (layout === 'column' && (justify || align)) {
    classes.push('l-flex l-flex-column')
  }

  if (layout === 'row') {
    classes.push('l-flex l-flex-wrap')
  }

  /* Gap */

  if (gap) {
    if (layout === 'row') {
      classes.push(`l-gap-margin-${gap}`)
    } else {
      classes.push(`l-margin-bottom-${gap}-all`)
    }
  }

  if (gapLarge && gapLarge !== gap) {
    if (layout === 'row') {
      classes.push(`l-gap-margin-${gapLarge}-l`)
    } else {
      classes.push(`l-margin-bottom-${gapLarge}-all-l`)
    }
  }

  /* Justify */

  if (justify) {
    classes.push(`l-justify-${justify}`)
  }

  /* Align */

  if (align) {
    classes.push(`l-align-${align}`)
  }

  /* Padding */

  if (paddingTop) {
    classes.push(`l-padding-top-${paddingTop}`)
  }

  if (paddingTopLarge && paddingTopLarge !== paddingTop) {
    classes.push(`l-padding-top-${paddingTopLarge}-l`)
  }

  if (paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottom}`)
  }

  if (paddingBottomLarge && paddingBottomLarge !== paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottomLarge}-l`)
  }

  /* Output */

  return {
    start: `<${tag} class="${classes.join(' ')}">`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = container
