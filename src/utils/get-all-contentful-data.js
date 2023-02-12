/**
 * Utils: get all contentful data
 *
 * @param {object} serverlessData
 * @param {function} getContentfulData
 * @return {object/boolean}
 */

/* Imports */

const slugsJson = require('../json/slugs.json')

/* Function */

const getAllContentfulData = async (serverlessData = {}, getContentfulData) => {
  try {
    /* Get contentful data function required */

    if (!getContentfulData) {
      return false
    }

    /* Navigation data */

    let navs = []
    let navItems = []

    const navigations = await getContentfulData(
      'init_contentful_navigations',
      {
        content_type: 'navigation'
      }
    )

    if (navigations?.items) {
      navs = navigations.items
    }

    const navigationItems = await getContentfulData(
      'init_contentful_navigation_items',
      {
        content_type: 'navigationItem'
      }
    )

    if (navigationItems?.items) {
      navItems = navigationItems.items
    }

    /* Content data */

    const content = {
      project: [],
      track: [],
      projectType: [],
      genre: [],
      page: []
    }

    let entry = false

    if (serverlessData) {
      if (slugsJson?.[serverlessData.path]) {
        const item = slugsJson[serverlessData.path]

        const id = item.id
        const contentType = item.contentType

        entry = await getContentfulData(
          `serverless_${id}`,
          {
            'sys.id': id,
            include: 10
          }
        )

        if (entry?.items) {
          content[contentType] = entry.items
        }
      }
    }

    if (!serverlessData || !entry) {
      /* Pages */

      const pages = await getContentfulData(
        'init_contentful_pages',
        {
          content_type: 'page',
          include: 10
        }
      )

      if (pages?.items) {
        content.page = pages.items
      }

      /* Projects */

      const projects = await getContentfulData(
        'init_contentful_projects',
        {
          content_type: 'project'
        }
      )

      if (projects?.items) {
        content.project = projects.items
      }

      /* Tracks */

      const tracks = await getContentfulData(
        'init_contentful_tracks',
        {
          content_type: 'track'
        }
      )

      if (tracks?.items) {
        content.track = tracks.items
      }

      /* Project types */

      const projectTypes = await getContentfulData(
        'init_contentful_project_types',
        {
          content_type: 'projectType'
        }
      )

      if (projectTypes?.items) {
        content.projectType = projectTypes.items
      }

      /* Genres */

      const genres = await getContentfulData(
        'init_contentful_genres',
        {
          content_type: 'genre'
        }
      )

      if (genres?.items) {
        content.genre = genres.items
      }
    }

    /* Output */

    return {
      content,
      navs,
      navItems
    }
  } catch (error) {
    console.error('Error getting all Contentful data: ', error)

    return false
  }
}

/* Exports */

module.exports = getAllContentfulData