/**
 * Contentful client
 */

/* Imports */

const contentful = require('contentful')

/* Variables */

const env = process.env
const context = env.CONTEXT

const config = {
  space: env.CTFL_SPACE_ID,
  accessToken: env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (context === 'production' || context === 'branch-deploy') {
  config.accessToken = process.env.CTFL_CDA_TOKEN
  config.host = 'cdn.contentful.com'
}

const contentfulClient = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  host: config.host
})

/* Exports */

module.exports = contentfulClient
