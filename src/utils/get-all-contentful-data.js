/**
 * Utils - get all contentful data
 */

/* Imports */

const slugsJson = require('../json/slugs.json')

/**
 * Function - fetch data from all content types or single entry if serverless
 *
 * @param {object} serverlessData
 * @param {object} previewData
 * @param {function} getContentfulData
 * @return {object|boolean}
 */

const getAllContentfulData = async (serverlessData, previewData, getContentfulData) => {
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

    /* Content data and redirects */

    const content = {
      project: [],
      track: [],
      projectType: [],
      genre: [],
      page: []
    }

    let redirects = []
    let entry = false

    if (serverlessData || previewData) {
      let contentType = ''
      let id = ''

      if (serverlessData) {
        if (slugsJson?.[serverlessData.path]) {
          const item = slugsJson[serverlessData.path]

          contentType = item.contentType
          id = item.id
        }
      }

      if (previewData) {
        id = previewData.id
        contentType = previewData.contentType
      }

      if (id) {
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

    if ((!serverlessData && !previewData) || !entry) {
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

      /* Redirects */

      const redirect = await getContentfulData(
        'init_contentful_redirects',
        {
          content_type: 'redirect'
        }
      )

      if (redirect?.items) {
        redirects = redirect.items
      }
    }

    /* Output */

    return {
      content,
      navs,
      navItems,
      redirects
    }
  } catch (error) {
    console.error('Error getting all Contentful data: ', error)

    return false
  }
}

/* Exports */

module.exports = getAllContentfulData
