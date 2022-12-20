/**
 * Contentful data
 */

/* Imports */

const contentful = require('contentful')
const { setData } = require('../utils/process')

/* Config */

const env = process.env
const context = env.CONTEXT

const config = {
  space: env.CTFL_SPACE_ID,
  accessToken: env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (context === 'production' || context === 'staging') {
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

    if (Object.getOwnPropertyDescriptor(navigations, 'items')) {
      navs = navigations.items
    }

    const navigationItems = await client.getEntries({
      content_type: 'navigationItem'
    })

    if (Object.getOwnPropertyDescriptor(navigationItems, 'items')) {
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
      content_type: 'page'
    })

    if (Object.getOwnPropertyDescriptor(pages, 'items')) {
      content.page = pages.items
    }

    /* Projects */

    const projects = await client.getEntries({
      content_type: 'project'
    })

    if (Object.getOwnPropertyDescriptor(projects, 'items')) {
      content.project = projects.items
    }

    /* Tracks */

    const tracks = await client.getEntries({
      content_type: 'track'
    })

    if (Object.getOwnPropertyDescriptor(tracks, 'items')) {
      content.track = tracks.items
    }

    /* Project types */

    const projectTypes = await client.getEntries({
      content_type: 'projectType'
    })

    if (Object.getOwnPropertyDescriptor(projectTypes, 'items')) {
      content.projectType = projectTypes.items
    }

    /* Genres */

    const genres = await client.getEntries({
      content_type: 'genre'
    })

    if (Object.getOwnPropertyDescriptor(genres, 'items')) {
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
