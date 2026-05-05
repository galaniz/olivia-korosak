/**
 * Text - Content
 */

/* Imports */

import type { ContentProps } from './ContentTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configGap, configTextStyle } from '../../config/configOptions.js'

/**
 * Output content wrapper.
 *
 * @param {ContentProps} props
 * @return {string[]} HTMLDivElement
 */
const Content = (props: ContentProps): string[] => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return []
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return []
  }

  /* Args */

  const {
    align = 'Left',
    gap,
    gapLarge,
    richTextStyles = true,
    textStyle = 'Extra Large',
    classes
  } = args

  /* Classes */

  const classesArr: string[] = []

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  /* Rich text styles */

  if (richTextStyles) {
    classesArr.push('rich-text e-line-out')

    if (isStringStrict(textStyle)) {
      classesArr.push(`text-${configTextStyle.get(textStyle)}`)
    }

    addStyle('text/RichText/RichText')
  }

  /* Align */

  if (align === 'Center') {
    classesArr.push('text-center')
  }

  /* Gap */

  if (isStringStrict(gap)) {
    classesArr.push(`mb-${configGap.get(gap)}-all`)
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    classesArr.push(`mb-${configGap.get(gapLarge)}-all-m`)
  }

  /* Output */

  if (!classesArr.length) {
    return []
  }

  return [
    `<div class="${classesArr.join(' ')}">`,
    '</div>'
  ]
}

/* Exports */

export { Content }
