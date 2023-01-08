/**
 * Contentful utilities
 */

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

const getContentfulUrl = ({ entry = '', params = {} }) => {
  let url = `https://${host}/spaces/${space}/environments/master/entries`

  if (entry) {
    url += `/${entry}`
  }

  url += `?access_token=${accessToken}`

  for (const p in params) {
    url += `&${p}=${params[p]}`
  }

  console.log('URL', url)

  return url
}

/* Exports */

module.exports = {
  getContentfulUrl
}
