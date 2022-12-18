/**
 * Contentful data
 */

/* Imports */

const contentful = require('contentful')
const { getSlug, getPermalink, getFile, parents } = require('../utils/base')
const { setNavigationItems, setNavigations, outputArgs } = require('../utils/navigation')

/* Config */

const env = process.env

const config = {
  space: env.CTFL_SPACE_ID,
  accessToken: env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (env.NODE_ENV === 'production' || env.NODE_ENV === 'preview') {
  config.accessToken = process.env.CTFL_CDA_TOKEN
  config.host = 'cdn.contentful.com'
}

const client = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  host: config.host
})

/* Store navigation data */

const navigationItems = {}

/* Get content + navigations */

module.exports = async () => {
  try {
    /* Navigation data */

    outputArgs.main = {
      navWrap: false,
      listClass: 'c-nav__list l-relative l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden',
      listAttr: 'role="list"',
      itemClass: 'c-nav__item',
      itemAttr: 'data-overflow-group="0"',
      linkClass: 'c-nav__link t-m t-line-height-130-pc l-inline-flex l-relative l-after l-padding-top-5xs l-padding-bottom-5xs'
    }

    outputArgs.footer = {
      navLabel: 'Main',
      listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs l-gap-margin-s-l t-list-style-none',
      listAttr: 'role="list"',
      linkClass: 't-s'
    }

    outputArgs.social = {
      navLabel: 'Social',
      listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs t-list-style-none',
      listAttr: 'role="list"',
      linkClass: 'l-flex l-align-center l-justify-center l-width-l l-height-l b-radius-100-pc b-all',
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

    const navigationItem = await client.getEntries({
      content_type: 'navigationItem'
    })

    setNavigationItems(navigationItem.items, navigationItems)

    const navigation = await client.getEntries({
      content_type: 'navigation'
    })

    /* Content data */

    const content = {}
    const contentData = []

    content.page = await client.getEntries({
      content_type: 'page'
    })

    content.project = await client.getEntries({
      content_type: 'project'
    })

    content.track = await client.getEntries({
      content_type: 'track'
    })

    content.projectType = await client.getEntries({
      content_type: 'projectType'
    })

    content.genre = await client.getEntries({
      content_type: 'genre'
    })

    /* Loop through for to store parents */

    content.page.items.forEach(item => {
      const {
        slug = '',
        parent = false
      } = item.fields

      if (parent) {
        parents[slug] = parent.fields.slug
      }
    })

    /* */

    for (const contentType in content) {
      content[contentType].items.forEach(item => {
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

        const navigations = {
          main: false,
          footer: false,
          social: false
        }

        setNavigations(navigation.items, navigations, navigationItems, itemFields.permalink)

        itemFields.navigations = navigations

        /* Push data */

        contentData.push(itemFields)
      })
    }

    /* Output */

    return {
      data: contentData
    }
  } catch (error) {
    console.log(error.message)
  }
}
