/**
 * Render - posts
 */

/* Imports */

const escape = require('validator/lib/escape.js')
const { enumOptions } = require('../vars/enums')
const { archiveData, termData, slugData } = require('../vars/data')
const { cards } = require('./cards')
const tracks = require('./tracks')
const info = require('./info')
const caretSvg = require('./svg/caret')

/**
 * Function - output posts
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {number} display
 *  @prop {string} headingLevel
 *  @prop {boolean} pagination
 *  @prop {array<string>} filters
 *  @prop {array<string>} include
 *  @prop {string} archiveType
 *  @prop {boolean} nothingFoundText
 *  @prop {number} columns
 *  @prop {string} order
 * }
 * @param {object} pageData
 * @param {function} getContentfulData
 * @return {string} - HTML
 */

const posts = async ({
  args = {},
  pageData = {},
  serverlessData,
  getContentfulData
}) => {
  let {
    contentType = 'Project', // enumOptions.posts.contentType
    display,
    headingLevel = 'Heading Three', // enumOptions.posts.headingLevel
    pagination = false,
    filters = [],
    include = [],
    archiveType,
    nothingFoundText = true, // Display nothing found message
    columns = 4, // Card layout
    order = 'date'
  } = args

  /* Normalize options */

  contentType = enumOptions.posts.contentType[contentType]
  headingLevel = enumOptions.posts.headingLevel[headingLevel]

  /* Type required */

  if (!contentType) {
    return ''
  }

  /* Archive type */

  archiveType = archiveType || contentType

  /* Layout */

  const layout = enumOptions.posts.layout[contentType]

  /* Current for pagination */

  let current = 1
  let paginationFilters = ''

  /* Query prep */

  let key = `posts_${pageData.sys.id}_${contentType}_${display}`

  const queryArgs = {
    content_type: contentType,
    include: 10
  }

  if (display) {
    queryArgs.limit = display
  }

  if ((contentType === 'project' || contentType === 'track') && order === 'date') {
    queryArgs.order = '-fields.date'
  }

  if ((contentType === 'projectType' || contentType === 'genre')) {
    queryArgs.order = '-fields.order'
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
      } catch (error) {
        console.error('Error setting serverless filters: ', error)
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
          itemOutput = cards.renderCard({
            item,
            headingLevel,
            contentType,
            includeProjectTypes,
            isTerm,
            columns
          })
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

    if (pagination) {
      archiveData.counts[archiveType] = total
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

      const prevIcon = `
        <span class="l-flex l-width-2xs l-height-2xs l-width-xs-m l-height-xs-m l-svg">
          ${caretSvg('left')}
        </span>
      `

      let prevLink = `<span class="${classes} b-all e-opacity-30"${maxWidth}>${prevIcon}</span>`

      if (current > 1) {
        prevLink = `
          <a
            class="${classes} b-all e-transition e-border-solid js-pt-link"
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
            <a class="${classes} b-all e-transition e-border-solid js-pt-link" href="${link}${currPaginationFilters}"${maxWidth}>
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

      const nextIcon = `
        <span class="l-flex l-width-2xs l-height-2xs l-width-xs-m l-height-xs-m l-svg">
          ${caretSvg('right')}
        </span>
      `

      let nextLink = `<span class="${classes} b-all e-opacity-30"${maxWidth}>${nextIcon}</span>`

      if (current < totalPages) {
        nextLink = `
          <a
            class="${classes} b-all e-transition e-border-solid js-pt-link"
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

    if (output && layout === 'card') {
      output = cards.render(output) + paginationOutput
    }

    if (output && layout === 'tracks') {
      output = output + paginationOutput
    }

    if (!output && nothingFoundText) {
      return info(`Looks like no ${slugData.bases[contentType].title.toLowerCase()} were found.`)
    }

    return output
  } catch (error) {
    console.error('Error querying and/or outputting posts: ', error)

    return ''
  }
}

/* Exports */

module.exports = posts
