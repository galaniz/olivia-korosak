/**
 * Contentful data
 */

/* Setup */

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

/* Get pages */

module.exports = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'page'
    })

    const pages = response.items

    pages.map(function (page) {
      const fields = page.fields

      const {
        slug = '',
        parent = false
      } = fields

      if (parent) {
        fields.slug = `${parent.fields.slug}/${slug}`
      }

      return fields
    })

    return pages
  } catch (error) {
    console.log(error.message)
  }
}
