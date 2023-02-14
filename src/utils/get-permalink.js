/**
 * Utils: get absolute url
 *
 * @param {string} slug
 * @param {boolean} trailingSlash
 * @return {string}
 */

/* Imports */

const { envData } = require('../vars/data')

/* Function */

const getPermalink = (slug = '', trailingSlash = true) => {
  let url = '/'

  if (envData.prod) {
    url = envData.urls.prod
  }

  return `${url}${slug}${slug && trailingSlash ? '/' : ''}`
}

/* Exports */

module.exports = getPermalink
