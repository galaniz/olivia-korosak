/**
 * Render - cards
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { getSlug, getPermalink } = require('../utils')
const { enumOptions } = require('../vars/enums')
const { archiveData, termData } = require('../vars/data')
const container = require('./container')
const column = require('./column')
const image = require('./image')
const gradients = require('./gradients')
const content = require('./content')
const richText = require('./rich-text')
const controlSvg = require('./svg/control')
const closeSvg = require('./svg/close')

/**
 * Function - output post with card layout
 *
 * @private
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} headingLevel
 *  @prop {string} contentType
 *  @prop {boolean} includeProjectTypes
 *  @prop {boolean} isTerm
 *  @prop {number} columns
 * }
 * @return {string} - HTML list item
 */

const _card = ({
  item,
  headingLevel,
  contentType,
  includeProjectTypes = false,
  isTerm = false,
  columns = 4
}) => {
  const {
    title = '',
    slug = '',
    heroImage,
    cardFrom,
    projectType
  } = item.fields

  /* Store outputs */

  let output = ''
  let projectTypes = ''
  let text = ''

  /* Content classes */

  let contentClasses = 'l-flex l-flex-column l-flex-grow-1'

  if (!heroImage) {
    contentClasses += ' l-isolate l-padding-top-s l-padding-bottom-s l-padding-left-s l-padding-right-s'
  }

  /* Containers */

  const containers = {
    column: column({
      args: {
        tag: 'List Item',
        widthSmall: '1/2',
        widthMedium: '1/3',
        widthLarge: columns === 4 ? '1/4' : 'None',
        classes: 'l-flex l-flex-column'
      }
    }),
    card: card({
      args: {
        gap: heroImage ? '15px' : 'none'
      }
    }),
    content: content({
      args: {
        gap: '5px',
        gapLarge: '10px',
        richTextStyles: false,
        classes: contentClasses
      }
    })
  }

  /* Parents */

  const parents = [
    {
      type: 'content',
      fields: {
        textStyle: 'Extra Small',
        headingStyle: 'Heading Four'
      }
    },
    {
      type: 'card',
      fields: {
        internalLink: item
      }
    }
  ]

  /* Heading */

  const heading = richText({
    type: headingLevel,
    content: [
      {
        nodeType: 'text',
        value: title
      }
    ],
    parents
  })

  /* Project types text */

  if (includeProjectTypes && projectType) {
    projectTypes = projectType.map(pt => {
      const projectTypeTitle = pt?.fields?.title || ''
      const projectTypeSlug = pt?.fields?.slug || ''

      if (!projectTypeSlug) {
        return {
          nodeType: 'text',
          value: ''
        }
      }

      const projectTypePermalink = getPermalink(
        getSlug({
          id: pt.sys.id,
          contentType: 'projectType',
          slug: projectTypeSlug
        })
      )

      return {
        nodeType: 'hyperlink',
        data: {
          uri: projectTypePermalink
        },
        content: [
          {
            nodeType: 'text',
            value: projectTypeTitle
          }
        ]
      }
    })

    const projectTypesLength = projectTypes.length

    for (let i = 0; i < projectTypesLength; i++) {
      if (i !== projectTypesLength - 1) {
        projectTypes.splice(i + 1, 0, {
          nodeType: 'text',
          value: ', '
        })
      }
    }

    text = richText({
      type: 'paragraph',
      content: projectTypes,
      parents,
      classes: 't-xs t-line-height-130-pc l-relative l-margin-top-auto e-underline-reverse e-underline-thin'
    })
  }

  /* Count text */

  if (isTerm) {
    const count = archiveData.counts[slug] || 0
    const label = count === 1 ? termData[contentType].count.singular : termData[contentType].count.title

    text = richText({
      type: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: `${count} ${label}`
        }
      ],
      parents,
      classes: 't-xs t-number-normal'
    })
  }

  /* Gradient */

  if (!heroImage) {
    output += gradients({
      from: cardFrom?.value || '#4e515f',
      type: 'card'
    })
  }

  /* Content output */

  output += (
    containers.content.start +
    heading +
    text +
    containers.content.end
  )

  /* Image */

  if (heroImage) {
    output += image({
      args: {
        image: heroImage
      },
      parents: [
        {
          type: 'card'
        }
      ]
    })
  }

  /* Output */

  return (
    containers.column.start +
    containers.card.start +
    output +
    containers.card.end +
    containers.column.end
  )
}

/**
 * Function - output card container
 *
 * @param {object} args {
 *  @prop {string} gap
 *  @prop {string} gapLarge
 *  @prop {string} externalLink
 *  @prop {boolean} embed
 *  @prop {string} embedTitle
 *  @prop {object} embedText
 * }
 * @return {object}
 */

const card = ({ args = {} }) => {
  let {
    gap = 'None', // enumOptions.gap
    gapLarge = 'None', // enumOptions.gap
    externalLink,
    embed,
    embedTitle,
    embedText
  } = args

  /* Normalize options */

  gap = enumOptions.gap[gap]
  gapLarge = enumOptions.gap[gapLarge]

  /* Classes */

  let classes = 'l-relative l-flex l-flex-column l-flex-grow-1 e-overlay e-title-line'

  /* Gap */

  if (gap) {
    classes += ` l-gap-margin-${gap}`
  }

  if (gapLarge && gapLarge !== gap) {
    classes += ` l-gap-margin-${gapLarge}-m`
  }

  /* Embed */

  let embedOutput = ''

  if (embed && embedTitle && externalLink) {
    const modalId = `m-${uuidv4()}`

    embedOutput = `
      <div class="l-absolute l-top-0 l-left-0 l-right-0 l-bottom-0 l-margin-auto l-flex l-align-center l-justify-center">
        <button
          type="button"
          class="l-width-1-5 l-width-min-max l-after l-aspect-ratio-100 l-flex l-align-center l-justify-center b-radius-100-pc bg-background-light t-foreground-base js-modal-trigger"
          aria-haspopup="dialog"
          aria-controls="${modalId}"
          aria-label="Play ${embedTitle}"
        >
          <span class="l-width-100-pc l-height-100-pc l-flex l-svg">
            ${controlSvg('play')}
          </span>
        </button>
      </div>
      <div class="o-modal t-light l-fixed l-top-0 l-left-0 l-width-100-vw l-height-100-vh l-flex l-align-center l-justify-center" id="${modalId}" role="dialog" aria-modal="true" aria-label="${embedTitle}">
        <div class="o-modal__overlay bg-foreground-base l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc e-transition"></div>
        <div class="o-modal__window l-flex l-flex-column l-flex-row-l l-align-center l-justify-center l-z-index-1 e-transition outline-snug">
          <div class="o-modal__media">
            <div class="l-width-100-pc l-height-100-pc l-relative bg-foreground-base t-background-light">
              <iframe id="i-${modalId}" class="l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc" data-src="${externalLink}" title="Video player" allow="autoplay" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="o-modal__close l-absolute l-top-0 l-right-0 l-z-index-1 l-width-xl l-height-xl l-width-2xl-m l-height-2xl-m l-flex l-align-center l-justify-center t-background-light"
          aria-label="Close modal"
        >
          <span class="l-width-m l-height-m l-svg">
            ${closeSvg()}
          </span>
        </button>
      </div>
    `
  }

  /* Z index */

  classes += ` l-z-index-${embedOutput ? 'modal' : '1'}`

  /* Output */

  return {
    start: `<div class="${classes}">`,
    end: `${embedOutput}</div>`
  }
}

/**
 * Output single card and cards container
 *
 * @type {object} {
 *  @prop {function} render
 *  @prop {function} renderCard
 * }
 */

const cards = {
  render (content) {
    const cardsContainer = container({
      args: {
        tag: 'Unordered List',
        layout: 'Row',
        gap: '40px',
        classes: 'l-gap-margin-xl-v-s'
      }
    })

    return (
      cardsContainer.start +
      content +
      cardsContainer.end
    )
  },
  renderCard (args) {
    return _card(args)
  }
}

/* Exports */

module.exports = { card, cards }
