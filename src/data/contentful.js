/**
 * Contentful data
 */

/* Imports */

const { getContentfulData } = require('../utils/contentful')
const slugsJson = require('./slugs.json')
const setData = require('../utils/set-data')

/* Get content + navigations */

module.exports = async (eleventyData) => {
  /* Serverless data */

  const serverlessData = eleventyData?.serverlessData?.query && eleventyData?.serverlessData?.path ? eleventyData.serverlessData : false

  /* Contentful queries */

  try {
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

    const data = await setData({
      content,
      navs,
      navItems,
      serverlessData
    })

    return data
  } catch (error) {
    console.log('Error getting Contentful and/or setting data: ', error)

    return {
      index: [],
      archive: []
    }
  }
}
