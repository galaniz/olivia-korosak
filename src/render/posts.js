/**
 * Posts output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Imports */

const { optionValues } = require('../utils/constants')
const contentfulClient = require('../utils/contentful-client')
const container = require('./container')
const column = require('./column')
const card = require('./card')
const image = require('./image')
const content = require('./content')
const richText = require('./rich-text')

/* Function */

const posts = async (args = {}, parents = [], pageData = {}) => {
  let {
    type = 'Project', // optionValues.posts.type
    display = 1,
    headingLevel = 'Heading Three', // optionValues.posts.headingLevel
    pagination = false,
    filters = []
  } = args

  /* Normalize options */

  type = optionValues.posts.type[type]
  headingLevel = optionValues.posts.headingLevel[headingLevel]

  /* Type required */

  if (!type) {
    return {
      output: '',
      archives: []
    }
  }

  /* Layout */

  const layout = optionValues.posts.layout[type]

  /* Query */

  const queryArgs = {
    content_type: type,
    limit: display
  }

  if (pageData?.fields?.pagination?.filters) {
    filters = filters.concat(pageData.fields.pagination.filters)
  }

  if (filters.length) {
    filters.forEach(filter => {
      const f = filter.split(':')

      if (f.length === 2) {
        queryArgs[f[0]] = f[1]
      }
    })
  }

  const p = await contentfulClient.getEntries(queryArgs)

  /* Query output */

  let output = []

  if (p?.items) {
    const items = p.items

    items.forEach(item => {
      const {
        title = '',
        heroImage = false
      } = item.fields

      /* Item output */

      let itemOutput = ''

      if (layout === 'card') {
        const containers = {
          column: column({
            tag: 'List Item',
            widthSmall: '1/2',
            widthMedium: '1/3',
            widthLarge: '1/4'
          }),
          content: content({
            gap: '15px'
          }),
          card: card({
            gap: '5px',
            gapLarge: '10px'
          })
        }

        itemOutput += image(
          {
            image: heroImage
          },
          [
            {
              type: 'card'
            }
          ]
        )

        itemOutput += (
          containers.content.start +
          richText(
            headingLevel,
            [
              {
                nodeType: 'text',
                value: title
              }
            ],
            [
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
          ) +
          containers.content.end
        )

        itemOutput = (
          containers.column.start +
          containers.card.start +
          itemOutput +
          containers.card.end +
          containers.column.end
        )
      }

      if (itemOutput) {
        output.push(itemOutput)
      }
    })
  }

  /* Pagination data */

  const pages = []
  const total = p.total
  const totalPages = Math.round(total / display)

  if (pagination && !pageData?.fields?.pagination && totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1) {
        pageData.fields.pagination = {
          current: i,
          next: i + 1
        }

        continue
      }

      /* Copy item */

      const pageDataCopy = structuredClone(pageData)

      /* Add data */

      pageDataCopy.fields.metaTitle = `${pageDataCopy.fields.title} | Page ${i} of ${totalPages}`

      pageDataCopy.fields.pagination = {
        current: i,
        next: i + 1 <= totalPages ? i + 1 : 0,
        prev: i - 1,
        filters: [
          `skip:${display * (i - 1)}`
        ]
      }

      pages.push(pageDataCopy)
    }
  }

  /* Pagination output */

  let paginationOutput = ''

  if (pagination && pageData?.fields?.pagination && totalPages > 1) {
    const current = pageData.fields.pagination.current

    paginationOutput += '<nav aria-label="Pagination">'
    paginationOutput += '<ol class="t-list-style-none l-flex" role="list">'

    for (let i = 1; i <= totalPages; i++) {
      let content = ''

      if (i === current) {
        content = `
          <span>
            <span class="a11y-visually-hidden">Current page </span>
            ${i}
          </span>
        `
      } else {
        const link = i === 1 ? pageData.fields.basePermalink : `${pageData.fields.basePermalink}page/${i}`

        content = `
          <a href="${link}">
            <span class="a11y-visually-hidden">Page </span>
            ${i}
          </a>
        `
      }

      paginationOutput += `<li class="l-relative">${content}</li>`
    }

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
      className: 'l-gap-margin-xl-v-s'
    })

    output = (
      insertContainer.start +
      output +
      insertContainer.end +
      paginationOutput
    )
  }

  return {
    output,
    pages
  }
}

/* Exports */

module.exports = posts
