/**
 * Objects - Button
 */

/* Imports */

import type { ButtonProps } from './ButtonTypes.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configJustify, configPadding } from '../../config/configOptions.js'

/**
 * Output link button.
 *
 * @param {ButtonProps} props
 * @return {string} HTMLAnchorElement|HTMLDivElement
 */
const Button = (props: ButtonProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    title,
    internalLink,
    externalLink,
    type = 'Primary',
    size,
    justify,
    paddingTop,
    paddingBottom
  } = args

  let { link } = args

  /* Link and title required */

  if (!link) {
    link = getLink(internalLink, externalLink)
  }

  if (!isStringStrict(link) || !isStringStrict(title)) {
    return ''
  }

  /* Classes */

  let linkClasses =
    `button ${type === 'Primary' ? 'button-primary' : 'button-secondary b-all b-current'} b-radius-s e-trans-quad`

  if (size === 'Large') {
    linkClasses += ' button-l'
  }

  /* Layout */

  const classes: string[] = []

  if (isStringStrict(paddingTop)) {
    classes.push(`pt-${configPadding.get(paddingTop)}`)
  }

  if (isStringStrict(paddingBottom)) {
    classes.push(`pt-${configPadding.get(paddingBottom)}`)
  }

  if (isStringStrict(justify)) {
    classes.push(`flex justify-${configJustify.get(justify)}`)
  }

  /* Output */

  let output = `<a class="${linkClasses}" href="${link}">${title}</a>`

  if (classes.length) {
    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export { Button }
