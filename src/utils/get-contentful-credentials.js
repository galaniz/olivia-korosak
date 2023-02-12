/**
 * Utils: get contentful credentials
 * 
 * @return {object}
 */

/* Imports */

const { envData } = require('../vars/data')

/* Function */

const getContentfulCredentials = () => {
  const space = envData.ctfl.spaceId
  let accessToken = envData.ctfl.cpaToken
  let host = 'preview.contentful.com'

  if (envData.prod) {
    accessToken = envData.ctfl.cdaToken
    host = 'cdn.contentful.com'
  }

  console.log('HOST', host)

  return {
    space,
    accessToken,
    host
  }
}

/* Exports */

module.exports = getContentfulCredentials
