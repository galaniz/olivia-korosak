/**
 * Contentful data
 */

/* Config */

const contentful = require('contentful')

const config = {
  space: process.env.CTFL_SPACE_ID,
  accessToken: process.env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (process.env.NODE_ENV === 'production') {
  config.accessToken = process.env.CTFL_CDA_TOKEN
  config.host = 'cdn.contentful.com'
}

const client = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  host: config.host
})

/* Meta data */

const meta = {
  page: {
    slugBase: '/'
  },
  project: {
    slugBase: '/projects/'
  },
  track: {
    slugBase: '/tracks/'
  },
  projectType: {
    slugBase: '/projects/types/'
  },
  genre: {
    slugBase: '/tracks/genres/'
  }
}

/* Get content */

module.exports = async () => {
  try {
    const content = {}
    const data = []

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

    /* NAVIGATION 
    
    content.genre = await client.getEntries({
      content_type: 'navigation'
    })

    // recurse to create tree
    
    */

    for (const contentType in content) {
      const slugBase = meta[contentType].slugBase

      content[contentType].items.forEach(item => {
        const {
          title = '',
          slug = '',
          featuredMedia = false,
          heroType = 'minimal',
          type = false,
          project = false,
          genre = false,
          audio = false
        } = item.fields

        let { sections } = item.fields

        if (sections) {
          sections = sections.map(section => {
            const {
              internalTitle = '',
              alignment = 'Top',
              justification = 'Left',
              gap = 'None',
              paddingTop = 'None',
              paddingBottom = 'None',
              column = []
            } = section.fields

            return {
              internalTitle,
              alignment,
              justification,
              gap,
              paddingTop,
              paddingBottom,
              column
            }
          })
        }

        data.push({
          title,
          slug: slugBase + slug,
          contentType,
          featuredMedia,
          heroType,
          type,
          project,
          genre,
          audio,
          sections
        })
      })
    }

    return data
  } catch (error) {
    console.log(error.message)
  }
}
