/**
 * Utils - get comma links
 */

/* Imports */

const getPermalink = require('./get-permalink')
const getSlug = require('./get-slug')

/**
 * Function - output comma separated links
 *
 * @private
 * @param {array<object>} items
 * @param {string} contentType
 * @return {string} HTML
 */

const getCommaLinks = (items = [], contentType = '') => {
  const links = []
 
  if (items.length) {
    items.forEach(item => {
      if (item.fields === undefined) {
        return;
      }

      const {
        title = '',
        slug = ''
      } = item.fields

      const permalink = getPermalink(
        getSlug({
          id: item.sys.id,
          contentType,
          slug
        })
      )

      links.push(`<a href="${permalink}" class="current" data-rich>${title}</a>`)
    })
  } else {
    return ''
  }

  return links.join(', ')
}

/* Exports */

module.exports = getCommaLinks
