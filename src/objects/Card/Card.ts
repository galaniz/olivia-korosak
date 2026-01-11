/**
 * Objects - Card
 */

/* Imports */

import type { CardProps } from './CardTypes.js'
import type { PostsItemArgs } from '../Posts/PostsTypes.js'
import { getPermalink, getSlug } from '@alanizcreative/formation-static/utils/link/link.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { getArchiveLabels } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { RichText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import { getGradient } from '../../utils/gradient/gradient.js'
import { getStoreCount } from '../../store/store.js'
import { configGap } from '../../config/configOptions.js'
import { Embed } from '../Embed/Embed.js'
import { Image } from '../Image/Image.js'

/**
 * Output card.
 *
 * @param {CardProps} props
 * @return {string|string[]} HTMLDivElement
 */
const Card = (props: CardProps): string | string[] => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return []
  }

  const { args, parents, children } = props

  if (!isObjectStrict(args)) {
    return []
  }

  /* Args */

  const {
    gap,
    gapLarge,
    externalLink,
    embed = false,
    embedTitle,
    embedText
  } = args

  /* Classes */

  let classes = 'relative flex col grow-1 e-overlay e-title'

  /* Gap */

  if (isStringStrict(gap)) {
    classes += ` gap-${configGap.get(gap)}`
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    classes += ` gap-${configGap.get(gapLarge)}-m`
  }

  /* Embed */

  if (embed) {
    return Embed({
      args: {
        link: externalLink,
        title: embedTitle,
        text: embedText
      },
      parents,
      children
    })
  } else {
    classes += ' z-1'
  }

  /* Output */

  return [
    `<div class="${classes}">`,
    '</div>'
  ]
}

/**
 * Output card list item.
 *
 * @param {PostsItemArgs} args
 * @return {string} HTMLLIElement
 */
const CardColumn = (args: PostsItemArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    post,
    primaryContentType,
    contentType,
    headingLevel = 'h3',
    archive,
    parents
  } = args

  const {
    id,
    title,
    heroImage,
    colorFrom,
    projectType
  } = post

  /* Title and ID required */

  if (!isStringStrict(title) || !isStringStrict(id)) {
    return ''
  }

  /* Types */

  const isTaxonomy = contentType === 'taxonomy'
  const isTerm = contentType === 'term'
  const isArchive = archive === 'project' || isTaxonomy || isTerm

  /* Parents */

  const newParents = [
    {
      renderType: 'card',
      args: {
        internalLink: post
      }
    },
    {
      renderType: 'column',
      args: {
        width: '12',
        widthSmall: '6',
        widthMedium: '4',
        widthLarge: isArchive ? '3' : undefined
      }
    },
    ...(parents || [])
  ]

  /* Image */

  let imageOutput = ''

  if (heroImage) {
    imageOutput = Image({
      args: {
        image: heroImage,
        aspectRatio: '1-1'
      },
      parents: newParents
    })
  }

  const hasImage = !!imageOutput

  /* Classes */

  let classes = 'flex col col-12 col-6-s col-4-m'
  let contentClasses = 'flex col grow-1 gap-5xs gap-4xs-m'

  if (!heroImage) {
    contentClasses += ' isolate py-s px-s'
  }

  if (isArchive) {
    classes += ' col-3-l'
  }

  /* Text */

  let textOutput = ''

  if (!isTerm && isArrayStrict(projectType)) {
    const types: string[] = []

    projectType.forEach(type => {
      const {
        title: typeTitle,
        slug: typeSlug
      } = type

      if (!isStringStrict(typeTitle) || !isStringStrict(typeSlug)) {
        return
      }

      const typeLink = getPermalink(getSlug({
        ...type,
        slug: typeSlug
      }))

      types.push(`<a href="${typeLink}" data-rich>${title}</a>`)
    })

    textOutput = /* html */`
      <p class="text-s lead-base relative mt-auto e-line-in e-line-thin">
        <span class="a-hide-vis">Types: </span>
        ${types.join(', ')}
      </p>
    `
  }
  
  if (isTaxonomy) {
    const count = getStoreCount(id)
    const { singular, plural } = getArchiveLabels(primaryContentType)

    textOutput = `<p class="text-s num-normal">${count} ${count === 1 ? singular : plural}</p>`
  }

  /* Gradient */

  let gradientOutput = ''

  if (!hasImage) {
    gradientOutput = /* html */`
      <div class="ar-16-9">
        <div
          class="before after bg-fade-up bg-diagonal-before e-overlay-item"
          style="${getGradient(colorFrom?.value || '#4e515f')}"
        ></div>
      </div>
    `
  }

  /* Output */

  const [cardStart, cardEnd] = Card({
    args: {
      ...post
    },
    parents: newParents
  })

  return /* html */`
    <li class="${classes}">
      ${cardStart}
        ${gradientOutput}
        <div class="${contentClasses}">
          ${RichText({
            args: {
              tag: headingLevel,
              content: title
            },
            parents: [
              {
                renderType: 'content',
                args: {
                  headingStyle: 'Heading Four'
                }
              },
              ...newParents
            ]
          })}
          ${textOutput}
        </div>
        ${imageOutput}
      ${cardEnd}
    </li>
  `
}

/**
 * Output card list.
 *
 * @param {string} output
 * @return {string} HTMLUListElement
 */
const CardContainer = (output: string): string => {
  return /* html */`
    <ul class="ls-none flex wrap gap-m gap-xl-m-s" role="list">
      ${output}
    </ul>
  `
}

/* Exports */

export {
  Card,
  CardColumn,
  CardContainer
}
