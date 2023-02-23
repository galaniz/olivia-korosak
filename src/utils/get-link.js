/**
 * Utils - get link
 */

/* Imports */

const getPermalink = require('./get-permalink')
const getSlug = require('./get-slug')

/**
 * Function - get permalink from external or internal source
 *
 * @param {object} internalLink
 * @param {string} externalLink
 * @return {string|object}
 */

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
