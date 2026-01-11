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

const posts = async ({
  args = {},
  pageData = {},
  serverlessData,
  getContentfulData
}) => {
  
  /* Archive type */

  archiveType = archiveType || contentType

  /* Layout */

  const layout = enumOptions.posts.layout[contentType]



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

      const classes = 'h-s w-s h-m-s w-m-s flex align-center justify-center wt-medium text-l b-radius-s'

      /* Containing output */

      paginationOutput += '<nav class="pt-xl pt-2xl-m" aria-label="Pagination">'
      paginationOutput += '<ol class="list-none flex justify-center gap-4xs gap-3xs-s num-normal" role="list">'

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
        <span class="flex w-2xs h-2xs w-xs-m h-xs-m">
          ${caretSvg('left')}
        </span>
      `

      let prevLink = `<span class="${classes} b-all b-dull faded"${maxWidth}>${prevIcon}</span>`

      if (current > 1) {
        prevLink = `
          <a
            class="${classes} b-all e-trans e-border"
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
            <span class="${classes} bg-faded"${maxWidth}>
              <span class="a-hide-vis">Current page </span>
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
            <a class="${classes} b-all e-trans e-border" href="${link}${currPaginationFilters}"${maxWidth}>
              <span class="a-hide-vis">Page </span>
              ${i}
            </a>
          `
        }

        paginationOutput += `<li class="relative">${content}</li>`
      }

      /* Ellipsis */

      if (center && current < totalPages - half) {
        paginationOutput += `<li aria-hidden="true"><span class="${classes} b-all"${maxWidth}></span></li>`
      }

      /* Next */

      const nextIcon = `
        <span class="flex w-2xs h-2xs w-xs-m h-xs-m">
          ${caretSvg('right')}
        </span>
      `

      let nextLink = `<span class="${classes} b-all b-dull faded"${maxWidth}>${nextIcon}</span>`

      if (current < totalPages) {
        nextLink = `
          <a
            class="${classes} b-all e-trans e-border"
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
