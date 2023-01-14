/**
 * Posts output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Imports */

const escape = require('validator/lib/escape.js')
const { getSlug, getPermalink } = require('../utils/functions')
const { getContentfulData } = require('../utils/contentful')
const { optionValues } = require('../utils/constants')
const container = require('./container')
const column = require('./column')
const card = require('./card')
const image = require('./image')
const content = require('./content')
const richText = require('./rich-text')
const tracks = require('./tracks')

/* Output card */

const _renderCard = (item, headingLevel) => {
  const {
    title = '',
    heroImage = false,
    type
  } = item.fields

  /* Store */

  let output = ''
  let types = ''
  let text = ''

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
      gap: '15px'
    }),
    content: content({
      gap: '5px',
      gapLarge: '10px',
      richTextStyles: false,
      classes: 'l-flex l-flex-column l-flex-grow-1'
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

  /* Text from project types */

  if (type) {
    types = type.map(t => {
      const projectTypeTitle = t?.fields?.title || ''
      const projectTypeSlug = t?.fields?.slug || ''

      if (!projectTypeSlug) {
        return {
          nodeType: 'text',
          value: ''
        }
      }

      const projectTypePermalink = getPermalink(
        getSlug({
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

    const typesLength = types.length

    for (let i = 0; i < typesLength; i++) {
      if (i !== typesLength - 1) {
        types.splice(i + 1, 0, {
          nodeType: 'text',
          value: ', '
        })
      }
    }

    text = richText({
      type: 'paragraph',
      content: types,
      parents,
      classes: 't-xs l-relative l-margin-top-auto'
    })
  }

  /* Image */

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

  /* Output */

  output += (
    containers.content.start +
    heading +
    text +
    containers.content.end
  )

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
    type = 'Project', // optionValues.posts.type
    display = 1,
    headingLevel = 'Heading Three', // optionValues.posts.headingLevel
    pagination = false,
    filters = [],
    include = []
  } = args

  /* Normalize options */

  type = optionValues.posts.type[type]
  headingLevel = optionValues.posts.headingLevel[headingLevel]

  /* Type required */

  if (!type) {
    return ''
  }

  /* Layout */

  const layout = optionValues.posts.layout[type]

  /* Current for pagination */

  let current = 1
  let paginationFilters = ''

  /* Query prep */

  let key = `posts_${pageData.sys.id}_${type}_${display}`

  const queryArgs = {
    content_type: type,
    limit: display,
    include: 10
  }

  if (type === 'project' || type === 'track') {
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

      /* Tracks */

      if (layout === 'tracks') {
        const tracksArgs = {
          items,
          contentType: type
        }

        if (include.length) {
          include.forEach(inc => {
            if (inc === 'projects') {
              tracksArgs.includeProjects = true
            }

            if (inc === 'genres') {
              tracksArgs.includeGenres = true
            }
          })
        }

        output.push(tracks(tracksArgs))
      }

      /* Cards */

      items.forEach(item => {
        let itemOutput = ''

        if (layout === 'card') {
          itemOutput = _renderCard(item, headingLevel)
        }

        if (itemOutput) {
          output.push(itemOutput)
        }
      })
    }

    /* Pagination data and output */

    const total = p.total
    const totalPages = Math.ceil(total / display)

    let paginationOutput = ''
    let prevPaginationFilters = paginationFilters
    let nextPaginationFilters = paginationFilters
    let currentPaginationFilters = paginationFilters

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

      pageData.fields.archive = true

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
