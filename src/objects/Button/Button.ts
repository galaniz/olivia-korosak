/**
 * Objects - Button
 */

import type { ButtonProps } from './ButtonTypes.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configJustify, configPadding } from '../../config/configOptions.js'
import { getAttr } from '../../utils/attr/attr.js'

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

  const { args, previewData } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    id,
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

  let classes =
    `button ${type === 'Primary' ? 'button-primary' : 'button-secondary b-all b-current'} b-radius-s e-trans-quad`

  if (size === 'Large') {
    classes += ' button-l'
  }

  /* Layout */

  const containerClasses: string[] = []

  if (isStringStrict(paddingTop)) {
    containerClasses.push(`pt-${configPadding.get(paddingTop)}`)
  }

  if (isStringStrict(paddingBottom)) {
    containerClasses.push(`pt-${configPadding.get(paddingBottom)}`)
  }

  if (isStringStrict(justify)) {
    containerClasses.push(`flex justify-${configJustify.get(justify)}`)
  }

  /* Attributes */

  const attr = [
    `href="${link}"`,
    `class="${classes}"`
  ]

  /* Output */

  let output = `<a ${getAttr(attr, !!previewData, id, 'title')}>${title}</a>`

  if (containerClasses.length) {
    output = `<div class="${containerClasses.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export { Button }
