/**
 * Contentful data
 */

/* Setup */

const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
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
