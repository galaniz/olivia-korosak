/**
 * Render - cards
 */

/* Imports */

const { getSlug, getPermalink } = require('../utils')
const { enumOptions } = require('../vars/enums')
const { archiveData, termData } = require('../vars/data')
const container = require('./container')
const column = require('./column')
const image = require('./image')
const gradients = require('./gradients')
const content = require('./content')
const richText = require('./rich-text')

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
    cardTo,
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
      to: cardTo?.value || '#534e5f',
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
 *  @param {string} gap
 *  @param {string} gapLarge
 * }
 * @return {object}
 */

const card = ({ args = {} }) => {
  let {
    gap = 'None', // enumOptions.gap
    gapLarge = 'None' // enumOptions.gap
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

  /* Output */

  return {
    start: `<div class="${classes}">`,
    end: '</div>'
  }
}

/**
 * 
 */

const cards = {
  render(content) {
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
  renderCard(args) {
    return _card(args)
  }
}

/* Exports */

module.exports = { card, cards }
