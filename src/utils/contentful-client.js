/**
 * Contentful client
 */

/* Imports */

const contentful = require('contentful')

/* Variables */

const env = process.env
const context = env.CONTEXT
const space = env.CTFL_SPACE_ID

let accessToken = env.CTFL_CPA_TOKEN
let host = 'preview.contentful.com'

if (context === 'production' || context === 'branch-deploy') {
  accessToken = env.CTFL_CDA_TOKEN
  host = 'cdn.contentful.com'
}

const contentfulClient = contentful.createClient({
  space,
  accessToken,
  host
})

/* Exports */

module.exports = contentfulClient
