/**
 * Contentful data
 */

/* Imports */

const EleventyFetch = require('@11ty/eleventy-fetch')
const resolveResponse = require('contentful-resolve-response')
const store = require('./store.json')
const setData = require('../utils/set-data')
const { getContentfulUrl } = require('../utils/contentful')

/* Get content + navigations */

module.exports = async (eleventyData) => {
  /* Serverless data */

  const serverlessData = eleventyData?.serverlessData?.query && eleventyData?.serverlessData?.path ? eleventyData.serverlessData : false

  console.log('SERVERLESS_DATA', serverlessData)

  /* Contentful queries */

  const fetchArgs = {
    duration: '1d',
    type: 'json'
  }

  try {
    /* Navigation data */

    let navs = []
    let navItems = []

    const navigations = await EleventyFetch(
      getContentfulUrl({
        params: {
          content_type: 'navigation'
        }
      }),
      fetchArgs
    )

    if (navigations?.items) {
      navs = resolveResponse(navigations)
    }

    const navigationItems = await EleventyFetch(
      getContentfulUrl({
        params: {
          content_type: 'navigationItem'
        }
      }),
      fetchArgs
    )

    if (navigationItems?.items) {
      navItems = resolveResponse(navigationItems)
    }

    /* Content data */

    const content = {
      page: [],
      project: [],
      track: [],
      projectType: [],
      genre: []
    }

    let entry = false

    if (serverlessData) {
      if (store?.[serverlessData.path]) {
        const item = store[serverlessData.path]

        const id = item.id
        const type = item.contentType

        entry = await EleventyFetch(
          getContentfulUrl({
            params: {
              'sys.id': id,
              include: 2
            }
          }),
          fetchArgs
        )

        if (entry?.items) {
          content[type] = resolveResponse(entry)
        }
      }
    }

    if (!serverlessData || !entry) {
      /* Pages */

      const pages = await EleventyFetch(
        getContentfulUrl({
          params: {
            content_type: 'page',
            include: 2
          }
        }),
        fetchArgs
      )

      if (pages?.items) {
        content.page = resolveResponse(pages)
      }

      /* Projects */

      const projects = await EleventyFetch(
        getContentfulUrl({
          params: {
            content_type: 'project'
          }
        }),
        fetchArgs
      )

      if (projects?.items) {
        content.project = resolveResponse(projects)
      }

      /* Tracks */

      const tracks = await EleventyFetch(
        getContentfulUrl({
          params: {
            content_type: 'track'
          }
        }),
        fetchArgs
      )

      if (tracks?.items) {
        content.track = resolveResponse(tracks)
      }

      /* Project types */

      const projectTypes = await EleventyFetch(
        getContentfulUrl({
          params: {
            content_type: 'projectType'
          }
        }),
        fetchArgs
      )

      if (projectTypes?.items) {
        content.projectType = resolveResponse(projectTypes)
      }

      /* Genres */

      const genres = await EleventyFetch(
        getContentfulUrl({
          params: {
            content_type: 'genre'
          }
        }),
        fetchArgs
      )

      if (genres?.items) {
        content.genre = resolveResponse(genres)
      }
    }

    /* Output */

    const data = await setData({
      content,
      navs,
      navItems,
      serverlessData
    })

    console.log('DATA', data.index.length, data.archive.length, content)

    return data
  } catch (error) {
    console.log('Error getting Contentful and/or setting data: ', error)

    return {
      index: [],
      archive: []
    }
  }
}
