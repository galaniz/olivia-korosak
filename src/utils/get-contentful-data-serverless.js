/**
 * Utils: get contentful data - serverless
 *
 * @param {string} key
 * @param {object} params
 * @return {object}
 */

/* Imports */

const resolveResponse = require('contentful-resolve-response')
const getContentfulCredentials = require('./get-contentful-credentials')

/* Function */

const getContentfulDataServerless = async (key, params = {}) => {
  try {
    if (!key) {
      throw new Error('No key')
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

    return data
  } catch (error) {
    console.error('Error fetching Contentful data - serverless: ', error)

    return {}
  }
}

/* Exports */

module.exports = getContentfulDataServerless
