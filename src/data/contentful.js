/**
 * Contentful data
 */

/* Imports */

const contentful = require('contentful')
const { setData } = require('../utils/set-data')

/* Config */

const env = process.env
const context = env.CONTEXT

const config = {
  space: env.CTFL_SPACE_ID,
  accessToken: env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (context === 'production' || context === 'branch-deploy') {
  config.accessToken = process.env.CTFL_CDA_TOKEN
  config.host = 'cdn.contentful.com'
}

const client = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  host: config.host
})

/* Get content + navigations */

module.exports = async () => {
  try {
    /* Navigation data */

    let navs = []
    let navItems = []

    const navigations = await client.getEntries({
      content_type: 'navigation'
    })

    if (navigations?.items) {
      navs = navigations.items
    }

    const navigationItems = await client.getEntries({
      content_type: 'navigationItem'
    })

    if (navigationItems?.items) {
      navItems = navigationItems.items
    }

    /* Content data */

    const content = {
      page: [],
      project: [],
      track: [],
      projectType: [],
      genre: []
    }

    /* Pages */

    const pages = await client.getEntries({
      content_type: 'page',
      include: 10
    })

    if (pages?.items) {
      content.page = pages.items
    }

    /* Projects */

    const projects = await client.getEntries({
      content_type: 'project'
    })

    if (projects?.items) {
      content.project = projects.items
    }

    /* Tracks */

    const tracks = await client.getEntries({
      content_type: 'track'
    })

    if (tracks?.items) {
      content.track = tracks.items
    }

    /* Project types */

    const projectTypes = await client.getEntries({
      content_type: 'projectType'
    })

    if (projectTypes?.items) {
      content.projectType = projectTypes.items
    }

    /* Genres */

    const genres = await client.getEntries({
      content_type: 'genre'
    })

    if (genres?.items) {
      content.genre = genres.items
    }

    /* Output */

    return {
      data: setData({
        content,
        navs,
        navItems
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}
