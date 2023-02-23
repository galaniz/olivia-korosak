/**
 * Utils - get contentful credentials
 */

/* Imports */

const { envData } = require('../vars/data')

/**
 * Function - get space, access token and host information
 * 
 * @return {object}
 */

const getContentfulCredentials = () => {
  const space = envData.ctfl.spaceId
  let accessToken = envData.ctfl.cpaToken
  let host = 'preview.contentful.com'

  if (envData.prod) {
    accessToken = envData.ctfl.cdaToken
    host = 'cdn.contentful.com'
  }

  return {
    space,
    accessToken,
    host
  }
}

/* Exports */

module.exports = getContentfulCredentials
