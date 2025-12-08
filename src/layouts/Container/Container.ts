/**
 * Layouts - Container
 */

/* Imports */

import type { ContainerProps } from './ContainerTypes.js'
import type { ConfigTagLabel, ConfigContainerLabel } from '../../config/configTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import {
  configTag,
  configJustify,
  configAlign,
  configGap,
  configPadding,
  configContainer
} from '../../config/configOptions.js'

/**
 * Filter formation container props.
 *
 * @param {ContainerProps} props
 * @return {ContainerProps}
 */
const Container = (props: ContainerProps): ContainerProps => {
  /* Props and args */

  const { args } = props
  const newArgs = { ...args }
  const {
    tag = 'Div',
    layout = 'Block',
    maxWidth,
    paddingTop,
    paddingTopLarge,
    paddingBottom,
    paddingBottomLarge,
    gap,
    gapLarge,
    justify,
    align,
    classes
  } = newArgs

  /* Tag */

  const newTag = configTag.get(tag as ConfigTagLabel) || tag
  newArgs.tag = newTag

  /* Classes */

  const classesArr: string[] = []
  const layoutClassesArr: string[] = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    classesArr.push('list-none')
    newArgs.attr = 'role="list"'
  }

  /* Layout */

  const isRow = layout === 'Row'
  const isCol = layout === 'Column'

  if (isCol) {
    layoutClassesArr.push('flex col')
  }

  if (isRow) {
    layoutClassesArr.push('flex wrap')
  }

  /* Justify */

  if (isStringStrict(justify)) {
    layoutClassesArr.push(`justify-${configJustify.get(justify)}`)
  }

  /* Align */

  if (isStringStrict(align)) {
    layoutClassesArr.push(`align-${configAlign.get(align)}`)
  }

  /* Gap */

  if (isStringStrict(gap)) {
    layoutClassesArr.push(`gap-${configGap.get(gap)}`)
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    layoutClassesArr.push(`gap-${configGap.get(gapLarge)}-${isRow ? 'l' : 'm'}`)
  }

  /* Container */

  const container = configContainer.get(maxWidth as ConfigContainerLabel) || maxWidth

  if (isStringStrict(container)) {
    classesArr.push(`container${container !== 'default' ? `-${container}` : ''}`)
  }

  /* Padding */

  const hasPaddingTop = isStringStrict(paddingTop)
  const hasPaddingBottom = isStringStrict(paddingBottom)
  const hasPaddingTopLarge = isStringStrict(paddingTopLarge)
  const hasPaddingBottomLarge = isStringStrict(paddingBottomLarge)
  const hasPaddingY = hasPaddingTop && hasPaddingBottom && paddingTop === paddingBottom
  const hasPaddingLargeY = hasPaddingTopLarge && hasPaddingBottomLarge && paddingTopLarge === paddingBottomLarge

  if (hasPaddingY) {
    classesArr.push(`py-${configPadding.get(paddingTop)}`)
  }

  if (hasPaddingLargeY) {
    classesArr.push(`py-${configPadding.get(paddingTopLarge)}-m`)
  }

  if (hasPaddingTop && !hasPaddingY) {
    classesArr.push(`pt-${configPadding.get(paddingTop)}`)
  }

  if (hasPaddingTopLarge && !hasPaddingLargeY) {
    classesArr.push(`pt-${configPadding.get(paddingTopLarge)}-m`)
  }

  if (hasPaddingBottom && !hasPaddingY) {
    classesArr.push(`pb-${configPadding.get(paddingBottom)}`)
  }

  if (hasPaddingBottomLarge && !hasPaddingLargeY) {
    classesArr.push(`pb-${configPadding.get(paddingBottomLarge)}-m`)
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')
  newArgs.layoutClasses = layoutClassesArr.join(' ')

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/* Exports */

export { Container }
