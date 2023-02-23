/**
 * Utils - get permalink
 */

/* Imports */

const { envData } = require('../vars/data')

/**
 * Function - get absolute or relative url
 *
 * @param {string} slug
 * @param {boolean} trailingSlash
 * @return {string}
 */

const getPermalink = (slug = '', trailingSlash = true) => {
  let url = '/'

  if (envData.prod) {
    url = envData.urls.prod
  }

  return `${url}${slug}${slug && trailingSlash ? '/' : ''}`
}

/* Exports */

module.exports = getPermalink
