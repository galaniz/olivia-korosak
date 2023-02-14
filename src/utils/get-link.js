/**
 * Utils: get link from external and internal options
 *
 * @param {object} internalLink
 * @param {string} externalLink
 * @return {string/object}
 */

/* Imports */

const getPermalink = require('./get-permalink')
const getSlug = require('./get-slug')

/* Function */

const getLink = (internalLink, externalLink = '') => {
  if (externalLink) {
    return externalLink
  } else if (internalLink) {
    const contentType = internalLink.sys.contentType.sys.id
    const internalFields = Object.assign({ slug: '' }, internalLink.fields)

    return getPermalink(getSlug({
      contentType,
      id: internalLink.sys.id,
      slug: internalFields.slug
    }))
  }
}

/* Exports */

module.exports = getLink
