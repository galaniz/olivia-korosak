/**
 * Contentful utilities
 */

/* Imports */

const safeJsonStringify = require('safe-json-stringify')
const resolveResponse = require('contentful-resolve-response')
const { envData } = require('./variables')

/* Client */

const space = envData.ctfl.spaceId
let accessToken = envData.ctfl.cpaToken
let host = 'preview.contentful.com'

if (envData.prod) {
  accessToken = envData.ctfl.cdaToken
  host = 'cdn.contentful.com'
}

console.log('CONTEXT', envData, host)

/* Fetch data */

const getContentfulData = async (key, params = {}) => {
  if (!key) {
    throw new Error('No key specified to get Contentful data')
  }

  // const cache = new AssetCache(key, envData.dev ? '.cache' : '/tmp/.cache/')

  /* Check if the cache is fresh within the last day */

  /*if (cache.isCacheValid('1d')) {
    return cache.getCachedValue()
  }*/

  /* Fetch new data */

  try {
    let url = `https://${host}/spaces/${space}/environments/master/entries?access_token=${accessToken}`

    Object.keys(params).forEach(p => {
      url += `&${p}=${params[p]}`
    })

    const resp = await fetch(url)
  
    let data = await resp.json()

    if (data?.items) {
      data.items = resolveResponse(data)
    }

    const json = JSON.parse(safeJsonStringify(data, null, 2))

    // await cache.save(json, 'json')

    return json
  } catch (error) {
    console.error('Error fetching Contentful data: ', error)

    return {}
  }
}

/* Exports */

module.exports = {
  getContentfulData
}
