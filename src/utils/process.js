/**
 * Base process data for output
 */

/* Imports */

const Navigation = require('./navigation')

const {
  getSlug,
  getPermalink,
  getFile
} = require('./base')

const { slugParents } = require('./constants')

/* Nav instance */

let nav

/* Set content item fields */

const setItem = (item = {}, contentType = 'page') => {
  /* Set defaults */

  const itemFields = Object.assign({
    title: '',
    slug: '',
    parent: false,
    heroTitle: '',
    heroImage: false,
    heroText: '',
    content: [],
    colorFrom: '',
    colorTo: '',
    metaDescription: '',
    metaImage: false
  }, item.fields)

  /* Permalink */

  itemFields.slug = getSlug(contentType, itemFields.slug)
  itemFields.permalink = getPermalink(itemFields.slug)

  /* Navigations */

  const current = itemFields.permalink

  itemFields.navigations = {
    main: nav.getOutput(
      'main',
      current,
      {
        listClass: 'c-nav__list l-relative l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden l-padding-top-4xs l-padding-bottom-4xs outline-snug',
        listAttr: 'role="list"',
        itemClass: 'c-nav__item',
        itemAttr: 'data-overflow-group="0"',
        linkClass: 'c-nav__link t-m t-line-height-130-pc l-inline-flex l-relative l-after l-padding-top-5xs l-padding-bottom-5xs'
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs l-gap-margin-s-l t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't'
      }
    ),
    social: {
      left: nav.getOutput(
        'social',
        current,
        {
          listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
          listAttr: 'role="list"',
          linkClass: 'l-flex l-align-center l-justify-center l-width-l l-height-l b-radius-100-pc b-all e-transition e-b-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="l-flex l-width-2xs l-height-2xs l-svg">
                ${getFile(`./src/assets/svg/${t}.svg`)}
              </div>
            `

            output.html += icon
          }
        }
      ),
      center: nav.getOutput(
        'social',
        current,
        {
          listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs t-list-style-none',
          listAttr: 'role="list"',
          linkClass: 'l-flex l-align-center l-justify-center l-width-l l-height-l b-radius-100-pc b-all e-transition e-b-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="l-flex l-width-2xs l-height-2xs l-svg">
                ${getFile(`./src/assets/svg/${t}.svg`)}
              </div>
            `

            output.html += icon
          }
        }
      )
    }
  }

  /* Output */

  return itemFields
}

/* Set content and navigation output */

const setData = ({ content = {}, navs = [], navItems = [] }) => {
  /* Store navigations and items */

  nav = new Navigation({
    navs,
    items: navItems
  })

  /* Store content data */

  const data = []

  /* Loop through pages first to set parent slugs */

  content.page.forEach(item => {
    const {
      slug = '',
      parent = false
    } = item.fields

    if (parent) {
      slugParents[slug] = parent.fields.slug
    }
  })

  /* Loop through all content types */

  for (const contentType in content) {
    content[contentType].forEach(item => {
      data.push(setItem(item, contentType))
    })
  }

  /* Output */

  return data
}

/* Exports */

module.exports = {
  setData
}
