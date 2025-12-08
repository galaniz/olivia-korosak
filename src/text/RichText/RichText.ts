/**
 * Text - Rich Text
 */

/* Imports */

import type {
  RichTextContentItemFilter,
  RichTextPropsFilter
} from '@alanizcreative/formation-static/text/RichText/RichTextTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Filter formation rich text props.
 *
 * @type {RichTextPropsFilter}
 */
const RichTextProps: RichTextPropsFilter = (props) => {
  /* Props and args */

  const { args } = props
  const newArgs = { ...args }
  const {
    tag,
    color,
    align,
    type,
    classes
  } = newArgs

  /* Classes */

  const classesArr: string[] = []
  const stylesArr: string[] = []

  /* Type */

  if (type === 'normal') {
    classesArr.push('wt-normal')
  }

  if (type === 'columns') {
    classesArr.push('text-col-2')
  }

  /* Quote */

  if (tag === 'blockquote') {
    classesArr.push('text-quote')
  }

  /* Align */

  if (isStringStrict(align)) {
    newArgs.align = `text-${align}`
  }

  /* Color */

  if (isStringStrict(color)) {
    classesArr.push('themeable theme')
    stylesArr.push(`--theme-dark:var(--${color}-dark);--theme-light:var(--${color}-light)`)
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')

  /* Styles */

  if (stylesArr.length) {
    newArgs.style = stylesArr.join(';')
  }

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/**
 * Filter formation rich text content item.
 *
 * @type {RichTextOutputFilter}
 */
const RichTextContentItem: RichTextContentItemFilter = (item, props) => {
  const { tag } = item
  const { args } = props
  const { type } = args
  const newItem = { ...item }
  const isCols = type === 'columns'

  if (tag === 'th') {
    newItem.attr = 'scope="col"'
  }

  if (tag === 'cite') {
    newItem.attr = 'class="text-s mt-2xs block"'
  }

  if (isCols && tag === 'dd') {
    newItem.attr = 'class="text-no-br"'
  }

  if (isCols && tag === 'dt') {
    newItem.attr = 'class="text-span"'
  }

  return newItem
}

/* Exports */

export {
  RichTextProps,
  RichTextContentItem
}
