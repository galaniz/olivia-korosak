/**
 * Contentful data
 */

/* Imports */

const contentfulClient = require('../utils/contentful-client')
const setData = require('../utils/set-data')

/* Get content + navigations */

module.exports = async () => {
  try {
    /* Navigation data */

    let navs = []
    let navItems = []

    const navigations = await contentfulClient.getEntries({
      content_type: 'navigation'
    })

    if (navigations?.items) {
      navs = navigations.items
    }

    const navigationItems = await contentfulClient.getEntries({
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

    const pages = await contentfulClient.getEntries({
      content_type: 'page',
      include: 10
    })

    if (pages?.items) {
      content.page = pages.items
    }

    /* Projects */

    const projects = await contentfulClient.getEntries({
      content_type: 'project'
    })

    if (projects?.items) {
      content.project = projects.items
    }

    /* Tracks */

    const tracks = await contentfulClient.getEntries({
      content_type: 'track'
    })

    if (tracks?.items) {
      content.track = tracks.items
    }

    /* Project types */

    const projectTypes = await contentfulClient.getEntries({
      content_type: 'projectType'
    })

    if (projectTypes?.items) {
      content.projectType = projectTypes.items
    }

    /* Genres */

    const genres = await contentfulClient.getEntries({
      content_type: 'genre'
    })

    if (genres?.items) {
      content.genre = genres.items
    }

    /* Output */

    const d = await setData({
      content,
      navs,
      navItems
    })

    return {
      data: d
    }
  } catch (error) {
    console.log(error.message)
  }
}
