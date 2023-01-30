/**
 * Posts output
 *
 * @param {object} args {
 *  @param {string} contentType
 *  @param {integer} display
 *  @param {string} headingLevel
 *  @param {boolean} pagination
 *  @param {array} filters
 *  @param {array} include
 *  @param {string} archiveType
 * }
 */

/* Imports */

const escape = require('validator/lib/escape.js')
const { getSlug, getPermalink } = require('../_utils/functions')
const { getContentfulData } = require('../_utils/contentful')
const { optionValues, archiveCounts, termData } = require('../_utils/variables')
const container = require('./container')
const column = require('./column')
const card = require('./card')
const image = require('./image')
const gradients = require('./gradients')
const content = require('./content')
const richText = require('./rich-text')
const tracks = require('./tracks')

/* Output card */

const _renderCard = ({
  item,
  headingLevel,
  contentType,
  includeProjectTypes = false,
  isTerm = false
}) => {
  const {
    title = '',
    slug = '',
    heroImage = false,
    cardFrom,
    cardTo,
    projectType
  } = item.fields

  /* Store */

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
      tag: 'List Item',
      widthSmall: '1/2',
      widthMedium: '1/3',
      widthLarge: '1/4',
      classes: 'l-flex l-flex-column'
    }),
    card: card({
      gap: heroImage ? '15px' : 'none'
    }),
    content: content({
      gap: '5px',
      gapLarge: '10px',
      richTextStyles: false,
      classes: contentClasses
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
    const count = archiveCounts[slug] || 0
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
    output += image(
      {
        image: heroImage
      },
      [
        {
          type: 'card'
        }
      ]
    )
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

/* Function */

const posts = async (args = {}, parents = [], pageData = {}, serverlessData) => {
  let {
    contentType = 'Project', // optionValues.posts.contentType
    display = 1,
    headingLevel = 'Heading Three', // optionValues.posts.headingLevel
    pagination = false,
    filters = [],
    include = [],
    archiveType
  } = args

  /* Normalize options */

  contentType = optionValues.posts.contentType[contentType]
  headingLevel = optionValues.posts.headingLevel[headingLevel]

  /* Type required */

  if (!contentType) {
    return ''
  }

  /* Archive type */

  archiveType = archiveType || contentType

  /* Layout */

  const layout = optionValues.posts.layout[contentType]

  /* Current for pagination */

  let current = 1
  let paginationFilters = ''

  /* Query prep */

  let key = `posts_${pageData.sys.id}_${contentType}_${display}`

  const queryArgs = {
    content_type: contentType,
    limit: display,
    include: 10
  }

  if (contentType === 'project' || contentType === 'track') {
    queryArgs.order = '-fields.date'
  }

  if (filters.length) {
    filters.forEach(filter => {
      const f = filter.split(':')

      if (f.length === 2) {
        queryArgs[f[0]] = f[1]
      }
    })
  }

  if (serverlessData) {
    if (serverlessData?.query?.page) {
      current = parseInt(escape(serverlessData.query.page))

      if (current) {
        key += `_${current}`
        queryArgs.skip = display * (current - 1)
      }
    }

    if (serverlessData?.query?.filters) {
      paginationFilters = `filters=${serverlessData.query.filters}`
      key += `_${paginationFilters}`

      try {
        const urlFilters = decodeURI(serverlessData.query.filters).split('|')

        if (urlFilters.length) {
          urlFilters.forEach(filter => {
            const filterArray = filter.split(',')

            if (filterArray.length) {
              const prop = filterArray[0]
              const value = filterArray[1]

              queryArgs[prop] = escape(value)
            }
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  /* Query and output */

  try {
    const p = await getContentfulData(
      key,
      queryArgs
    )

    let output = []

    if (p?.items) {
      const items = p.items

      /* Include */

      let includeProjects = false
      let includeGenres = false
      let includeProjectTypes = false

      if (include.length) {
        include.forEach(inc => {
          if (inc === 'projects') {
            includeProjects = true
          }

          if (inc === 'genres') {
            includeGenres = true
          }

          if (inc === 'project-types') {
            includeProjectTypes = true
          }
        })
      }

      /* Check if term */

      const isTerm = !!termData?.[contentType] || false

      /* Tracks */

      if (layout === 'tracks') {
        const tracksArgs = {
          items,
          contentType,
          includeProjects,
          includeGenres
        }

        output.push(await tracks(tracksArgs))
      }

      /* Cards */

      items.forEach(item => {
        let itemOutput = ''

        if (layout === 'card') {
          itemOutput = _renderCard({
            item,
            headingLevel,
            contentType,
            includeProjectTypes,
            isTerm
          })
        }

        if (itemOutput) {
          output.push(itemOutput)
        }
      })
    } else {
      // NO CONTENT
    }

    /* Pagination data and output */

    const total = p.total
    const totalPages = Math.ceil(total / display)

    let paginationOutput = ''
    let prevPaginationFilters = paginationFilters
    let nextPaginationFilters = paginationFilters
    let currentPaginationFilters = paginationFilters

    if (pagination) {
      archiveCounts[archiveType] = total
    }

    if (paginationFilters) {
      if (current > 2) {
        prevPaginationFilters = `&${prevPaginationFilters}`
      } else {
        prevPaginationFilters = `?${prevPaginationFilters}`
      }

      nextPaginationFilters = `&${paginationFilters}`

      if (current === 1) {
        currentPaginationFilters = `?${currentPaginationFilters}`
      } else {
        currentPaginationFilters = `&${currentPaginationFilters}`
      }
    }

    if (pagination && totalPages > 1) {
      /* Pagination data for head */

      if (current === 1) {
        pageData.fields.pagination = {
          current,
          next: current + 1,
          nextFilters: nextPaginationFilters,
          currentFilters: currentPaginationFilters
        }

        pageData.fields.metaTitle = pageData.fields.title
      } else {
        pageData.fields.metaTitle = `${pageData.fields.title} | Page ${current} of ${totalPages}`

        pageData.fields.pagination = {
          current,
          next: current + 1 <= totalPages ? current + 1 : 0,
          prev: current - 1,
          nextFilters: nextPaginationFilters,
          prevFilters: prevPaginationFilters,
          currentFilters: currentPaginationFilters
        }
      }

      /* Pagination output */

      const classes = 'l-height-s l-width-s l-height-m-s l-width-m-s l-flex l-align-center l-justify-center t-weight-medium t-m b-radius-s t-background-light'

      /* Containing output */

      paginationOutput += '<nav class="l-padding-top-xl l-padding-top-2xl-m" aria-label="Pagination">'
      paginationOutput += '<ol class="t-list-style-none l-flex l-justify-center l-gap-margin-4xs l-gap-margin-3xs-s t-number-normal" role="list">'

      /* Loop variables */

      const max = 4
      const half = 2
      const center = totalPages > max
      const limit = center ? max : totalPages - 1

      let start = 1

      if (center) {
        start = current < 4 ? 1 : current - half
      }

      if (start > totalPages - limit) {
        start = totalPages - limit
      }

      let length = start + limit

      if (length > totalPages) {
        length = totalPages
      }

      /* Max width */

      let totalListItems = length + 2 // 2 for prev and next buttons

      if (center && current >= limit) {
        totalListItems += 1
      }

      if (center && current < totalPages - half) {
        totalListItems += 1
      }

      const maxWidth = ` style="max-width:calc(${Math.round(100 / totalListItems)}vw - ${(130 / totalListItems / 16).toFixed(2)}rem)"`

      /* Prev */

      const prevIcon = ''

      let prevLink = `<span class="${classes} b-all"${maxWidth}>${prevIcon}</span>`

      if (current > 1) {
        prevLink = `
          <a
            class="${classes} b-all e-transition e-b-solid"
            href="${pageData.fields.basePermalink}${current > 2 ? `?page=${current - 1}` : ''}${prevPaginationFilters}"
            aria-label="Previous page"
            ${maxWidth}
          >
            ${prevIcon}
          </a>
        `
      }

      paginationOutput += `<li>${prevLink}</li>`

      /* Ellipsis */

      if (center && current >= limit) {
        paginationOutput += `<li aria-hidden="true"><span class="${classes} b-all"${maxWidth}>&hellip;</span></li>`
      }

      /* Items loop */

      for (let i = start; i <= length; i++) {
        let content = ''

        if (i === current) {
          content = `
            <span class="${classes} bg-background-light-35"${maxWidth}>
              <span class="a11y-visually-hidden">Current page </span>
              ${i}
            </span>
          `
        } else {
          const link = i === 1 ? pageData.fields.basePermalink : `${pageData.fields.basePermalink}?page=${i}`

          let currPaginationFilters = paginationFilters

          if (paginationFilters) {
            if (i === 1) {
              currPaginationFilters = `?${currPaginationFilters}`
            } else {
              currPaginationFilters = `&${currPaginationFilters}`
            }
          }

          content = `
            <a class="${classes} b-all e-transition e-b-solid" href="${link}${currPaginationFilters}"${maxWidth}>
              <span class="a11y-visually-hidden">Page </span>
              ${i}
            </a>
          `
        }

        paginationOutput += `<li class="l-relative">${content}</li>`
      }

      /* Ellipsis */

      if (center && current < totalPages - half) {
        paginationOutput += `<li aria-hidden="true"><span class="${classes} b-all"${maxWidth}>&hellip;</span></li>`
      }

      /* Next */

      const nextIcon = ''

      let nextLink = `<span class="${classes} b-all"${maxWidth}>${nextIcon}</span>`

      if (current < totalPages) {
        nextLink = `
          <a
            class="${classes} b-all e-transition e-b-solid"
            href="${pageData.fields.basePermalink}?page=${current + 1}${nextPaginationFilters}"
            aria-label="Next page"
            ${maxWidth}
          >
            ${nextIcon}
          </a>
        `
      }

      paginationOutput += `<li>${nextLink}</li>`

      /* Containing output */

      paginationOutput += '</ol>'
      paginationOutput += '</nav>'
    }

    /* Output */

    output = output.length ? output.join('') : ''

    if (layout === 'card') {
      const insertContainer = container({
        tag: 'Unordered List',
        layout: 'Row',
        gap: '40px',
        classes: 'l-gap-margin-xl-v-s'
      })

      output = (
        insertContainer.start +
        output +
        insertContainer.end +
        paginationOutput
      )
    }

    if (layout === 'tracks') {
      output = output + paginationOutput
    }

    return output
  } catch (e) {
    console.error(e)

    return ''
  }
}

/* Exports */

module.exports = posts
