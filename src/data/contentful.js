/**
 * Contentful data
 */

/* Imports */

const { getSlug } = require('../utils/base')
const { setNavigationItems, setNavigations } = require('../utils/navigation')
const contentful = require('contentful')

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

const navigations = {
  main: false,
  footer: false,
  social: false
}

/* Get content + navigations */

module.exports = async () => {
  try {
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

    for (const contentType in content) {
      content[contentType].items.forEach(item => {
        const itemFields = Object.assign({
          title: '',
          slug: '',
          featuredMedia: false,
          heroType: 'minimal',
          type: false,
          project: false,
          genre: false,
          audio: false,
          sections: []
        }, item.fields)

        itemFields.slug = getSlug(contentType, itemFields.slug)

        if (itemFields.sections.length) {
          itemFields.sections = itemFields.sections.map(section => {
            return Object.assign({
              internalTitle: '',
              alignment: 'Top',
              justification: 'Left',
              gap: 'None',
              paddingTop: 'None',
              paddingBottom: 'None',
              column: []
            }, section.fields)
          })
        }

        contentData.push(itemFields)
      })
    }

    /* Navigation data */

    const navigationItem = await client.getEntries({
      content_type: 'navigationItem'
    })

    setNavigationItems(navigationItem.items, navigationItems)

    const navigation = await client.getEntries({
      content_type: 'navigation'
    })

    setNavigations(navigation.items, navigations, navigationItems)

    /* Output */

    return {
      data: contentData,
      navigations
    }
  } catch (error) {
    console.log(error.message)
  }
}
