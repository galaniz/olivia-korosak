/**
 * Layouts - Column
 */

/* Imports */

import type { ColumnProps } from './ColumnTypes.js'
import type { ConfigTagLabel, ConfigColumnLabel } from '../../config/configTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configTag, configJustify, configAlign, configColumns } from '../../config/configOptions.js'

/**
 * Filter formation column props.
 *
 * @param {ColumnProps} props
 * @return {ColumnProps}
 */
const Column = (props: ColumnProps): ColumnProps => {
  /* Props and args */

  const { args } = props
  const newArgs = { ...args }
  const {
    tag = 'Div',
    width = '1/1',
    widthSmall,
    widthMedium,
    widthLarge,
    justify,
    align,
    classes
  } = newArgs

  /* Tag */

  const newTag = configTag.get(tag as ConfigTagLabel) || tag
  newArgs.tag = newTag

  /* Classes */

  const classesArr: string[] = []

  /* Width */

  if (isStringStrict(width)) {
    classesArr.push(`col-${configColumns.get(width as ConfigColumnLabel) || width}`)
  }

  if (isStringStrict(widthSmall)) {
    classesArr.push(`col-${configColumns.get(widthSmall as ConfigColumnLabel) || widthSmall}-s`)
  }

  if (isStringStrict(widthMedium)) {
    classesArr.push(`col-${configColumns.get(widthMedium as ConfigColumnLabel) || widthMedium}-m`)
  }

  if (isStringStrict(widthLarge)) {
    classesArr.push(`col-${configColumns.get(widthLarge as ConfigColumnLabel) || widthLarge}-l`)
  }

  /* Flex */

  const hasJustify = isStringStrict(justify)
  const hasAlign = isStringStrict(align)

  if (hasJustify || hasAlign) {
    classesArr.push('flex col')
  }

  /* Justify */

  if (hasJustify) {
    classesArr.push(`justify-${configJustify.get(justify)}`)
  }

  /* Align */

  if (hasAlign) {
    classesArr.push(`align-${configAlign.get(align)}`)
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/* Exports */

export { Column }
