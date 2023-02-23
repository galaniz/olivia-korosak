/**
 * Render - container
 */

/* Imports */

const { enumOptions } = require('../vars/enums')

/**
 * Function - output container wrapper
 * 
 * @param {object} args {
 *  @prop {string} tag
 *  @prop {string} layout
 *  @prop {string} maxWidth
 *  @prop {string} paddingTop
 *  @prop {string} paddingTopLarge
 *  @prop {string} paddingBottom
 *  @prop {string} paddingBottomLarge
 *  @prop {string} gap
 *  @prop {string} gapLarge
 *  @prop {string} justify
 *  @prop {string} align
 *  @prop {string} classes
 * }
 * @return {object}
 */

const container = ({ args = {} }) => {
  let {
    tag = 'Div', // enumOptions.tag
    layout = 'Column', // enumOptions.layout
    maxWidth = 'None', // enumOptions.maxWidth
    paddingTop = 'None', // enumOptions.padding
    paddingTopLarge = 'None', // enumOptions.padding
    paddingBottom = 'None', // enumOptions.padding
    paddingBottomLarge = 'None', // enumOptions.padding
    gap = 'None', // enumOptions.gap
    gapLarge = 'None', // enumOptions.gap
    justify = 'None', // enumOptions.justify
    align = 'None', // enumOptions.align
    classes = '' // Back end option
  } = args

  /* Normalize options */

  tag = enumOptions.tag[tag]
  layout = enumOptions.layout[layout]
  maxWidth = enumOptions.maxWidth[maxWidth]
  paddingTop = enumOptions.padding[paddingTop]
  paddingTopLarge = enumOptions.padding[paddingTopLarge]
  paddingBottom = enumOptions.padding[paddingBottom]
  paddingBottomLarge = enumOptions.padding[paddingBottomLarge]
  gap = enumOptions.gap[gap]
  gapLarge = enumOptions.gap[gapLarge]
  justify = enumOptions.justify[justify]
  align = enumOptions.align[align]

  /* Classes */

  classes = [classes]

  /* Attributes */

  const attr = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    attr.push('role="list"')
    classes.push('t-list-style-none')
  }

  /* Max width */

  if (maxWidth) {
    classes.push(`l-${maxWidth}`)
  }

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
      classes.push(`l-margin-bottom-${gapLarge}-all-m`)
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
    classes.push(`l-padding-top-${paddingTopLarge}-m`)
  }

  if (paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottom}`)
  }

  if (paddingBottomLarge && paddingBottomLarge !== paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottomLarge}-m`)
  }

  /* Output */

  return {
    start: `<${tag} class="${classes.join(' ')}"${attr ? ` ${attr.join(' ')}` : ''}>`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = container
