/**
 * Contentful utilities
 */

/* Imports */

const { AssetCache } = require('@11ty/eleventy-fetch')
const safeJsonStringify = require('safe-json-stringify')
const contentful = require('contentful')

/* Client */

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

/* Fetch data */

const getContentfulData = async (key, params = {}) => {
  if (!key) {
    throw new Error('No key specified to get Contentful data')
  }

  const cache = new AssetCache(key, '/tmp/.cache/')

  console.log('HALLO', cache)

  /* Check if the cache is fresh within the last day */

  if (cache.isCacheValid('1d')) {
    return cache.getCachedValue()
  }

  /* Fetch new data */

  let data = await contentfulClient.getEntries(params)

  data = JSON.parse(safeJsonStringify(data, null, 2))

  await cache.save(data, 'json')

  return data
}

/* Exports */

module.exports = {
  getContentfulData,
  contentfulClient
}
