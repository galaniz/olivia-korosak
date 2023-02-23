/**
 * Utils - get contentful data eleventy
 */

/* Imports */

const safeJsonStringify = require('safe-json-stringify')
const resolveResponse = require('contentful-resolve-response')
const getContentfulCredentials = require('./get-contentful-credentials')
const { AssetCache } = require('@11ty/eleventy-fetch')
const { envData } = require('../vars/data')

/**
 * Function - fetch data from cache if available
 *
 * @param {string} key
 * @param {object} params
 * @return {object}
 */

const getContentfulDataEleventy = async (key, params = {}) => {
  try {
    if (!key) {
      throw new Error('No key')
    }

    /* Import fetch module */

    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

    /* Cache is only local */

    let cache

    if (envData.eleventy.cache) {
      cache = new AssetCache(key)

      /* Check if the cache is fresh within the last day */

      if (cache.isCacheValid('1d')) {
        return cache.getCachedValue()
      }
    }

    /* Credentials */

    const credentials = getContentfulCredentials()
    const { space, accessToken, host } = credentials

    /* Fetch new data */

    let url = `https://${host}/spaces/${space}/environments/master/entries?access_token=${accessToken}`

    Object.keys(params).forEach(p => {
      url += `&${p}=${params[p]}`
    })

    const resp = await fetch(url)

    const data = await resp.json()

    if (data?.items) {
      data.items = resolveResponse(data)
    }

    if (envData.eleventy.cache && cache) {
      await cache.save(JSON.parse(safeJsonStringify(data, null, 2)), 'json')
    }

    return data
  } catch (error) {
    console.error('Error fetching Contentful data - 11ty: ', error)

    return {}
  }
}

/* Exports */

module.exports = getContentfulDataEleventy
