/**
 * Text - Rich Text
 */

/* Imports */

import type { ContentArgs } from '../Content/ContentTypes.js'
import type { CardArgs } from '../../objects/Card/CardTypes.js'
import type {
  RichTextPropsFilter,
  RichTextOutputFilter,
  RichTextContentItemFilter
} from '@alanizcreative/formation-static/text/RichText/RichTextTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isHeading } from '@alanizcreative/formation-static/utils/heading/heading.js'
import { getPlainText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { configTextStyle, configHeadingStyle } from '../../config/configOptions.js'
import { Overflow } from '../../layouts/Overflow/Overflow.js'
import { Table } from '../../objects/Table/Table.js'

/**
 * Filter formation rich text props.
 *
 * @type {RichTextPropsFilter}
 */
const RichTextProps: RichTextPropsFilter = (props) => {
  /* Props and args */

  const { args, parents } = props
  const newArgs = { ...args }
  const {
    tag = '',
    classes,
    content
  } = newArgs

  /* Types */

  const isSectionHeading = isHeading(tag)

  /* Classes */

  const classesArr: string[] = []

  /* Data attribute */

  let dataAttr = false

  /* Parents */

  const parent = parents?.[0]
  const grandParent = parents?.[1]

  /* List */

  if (tag === 'ol') {
    classesArr.push('num-normal')
  }

  /* Blockquote */

  if (tag === 'blockquote') {
    classesArr.push('text-italic text-quote')
  }

  /* Figcaption */

  if (tag === 'figcaption') {
    classesArr.push('text-italic text-s')
  }

  /* Content ascendant */

  if (isObjectStrict(parent) && parent.renderType === 'content') {
    const {
      textStyle = 'Extra Large',
      headingStyle,
      richTextStyles = true
    } = parent.args as ContentArgs

    if (isStringStrict(textStyle) && !isSectionHeading && !richTextStyles) {
      classesArr.push(`text-${configTextStyle.get(textStyle)}`)
    }

    if (isStringStrict(headingStyle) && isSectionHeading) {
      classesArr.push(`heading-${configHeadingStyle.get(headingStyle)}`)
    }

    dataAttr = richTextStyles
  }

  /* Card ascendant */

  if (isObjectStrict(grandParent) && grandParent.renderType === 'card') {
    const {
      internalLink,
      externalLink,
      embed = false
    } = grandParent.args as CardArgs

    const cardLink = getLink(internalLink, externalLink)

    if (!embed && cardLink) {
      const text = getPlainText(content).split(' ')
      const textLastIndex = text.length - 1
      const linkText = text.map((text, i) => {
        if (i === textLastIndex) {
          return `<span class="e-title-item">${text}</span>`
        }

        return text
      }).join(' ')

      newArgs.content = /* html */`
        <a class="before" href="${cardLink}">
          <span role="text">${linkText}</span>
        </a>
      `
    }

    if (tag === 'p') {
      classesArr.push('muted')
    }

    if (tag === 'a') {
      classesArr.push('current')
    }
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')

  /* Data attribute */

  newArgs.dataAttr = dataAttr

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/**
 * Filter formation rich text output.
 *
 * @type {RichTextOutputFilter}
 */
const RichTextOutput: RichTextOutputFilter = (output, item) => {
  const { props } = item
  const { args } = props
  const { tag = '' } = args

  if (tag === 'table') {
    output = Table(Overflow(output))
  }

  return output
}

/**
 * Filter formation rich text content item.
 *
 * @type {RichTextContentItemFilter}
 */
const RichTextContentItem: RichTextContentItemFilter = (item, props) => {
  const { tag } = item
  const { args } = props
  const newItem = { ...item }

  if (tag === 'th') {
    newItem.attr = 'scope="col"'
  }

  if ((args.tag === 'blockquote' || args.tag === 'figcaption') && !args.dataAttr && tag === 'p') {
    newItem.attr = 'class="text-inherit"'
  }

  return newItem
}

/* Exports */

export {
  RichTextProps,
  RichTextOutput,
  RichTextContentItem
}
