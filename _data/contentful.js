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

/* Get content */

module.exports = async () => {
  try {
    const content = {}
    const data = []

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
      type: {
        slugBase: '/projects/types/'
      },
      genre: {
        slugBase: '/tracks/genres/'
      }
    }

    content.page = await client.getEntries({
      content_type: 'page'
    })

    /*content.project = await client.getEntries({
      content_type: 'project'
    })

    content.track = await client.getEntries({
      content_type: 'track'
    })

    content.type = await client.getEntries({
      content_type: 'type'
    })

    content.genre = await client.getEntries({
      content_type: 'genre'
    })*/

    for (const type in content) {
      const items = content[type].items
      const slugBase = meta[type].slugBase

      items.map(i => {
        const fields = i.fields

        const { slug = '' } = fields

        fields.slug = slugBase + slug + '/index.html'
        fields.contentType = type

        console.log("SLUG", fields.slug)

        data.push(fields)

        return fields
      })
    }

    console.log("DATA", data)

    return data
  } catch (error) {
    console.log(error.message)
  }
}
