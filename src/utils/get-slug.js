/**
 * Utils: slug with base from slug base and parents
 * 
 * @param {object} args {
 *  @param {string} id
 *  @param {string} slug
 *  @param {integer} page
 *  @param {string} contentType
 *  @param {boolean} returnParents
 * }
 * @return {string/object}
 */

/* Imports */

const { slugData } = require('../vars/data')

/* Recurse to get ascendents */

const _getParentSlug = (id = '', p = []) => {
  if (slugData.parents?.[id]) {
    p.unshift(slugData.parents[id])

    _getParentSlug(slugData.parents[id].id, p)
  }
}

/* Function */

const getSlug = ({
  id = '',
  slug = '',
  page = 0,
  contentType = 'page',
  returnParents = false
}) => {
  /* Index */

  if (slug === '/') {
    return ''
  }

  /* Slug base */

  const slugBase = slugData.bases[contentType]

  /* Parents */

  let p = []
  let pp = []

  _getParentSlug(contentType === 'page' ? id : slugBase.archiveId, p)

  if (p.length) {
    pp = p

    p = p.map(item => item.slug)

    p = `${p.join('/')}/`
  } else {
    p = ''
  }

  /* Slug */

  const s = `${p}${slugBase.slug}${slugBase.slug ? '/' : ''}${slug}${page ? `/?page=${page}` : ''}`

  /* Parents and slug return */

  if (returnParents) {
    if (slugBase?.slug) {
      pp.push({
        ...slugBase,
        contentType: 'page',
        id: slugBase.archiveId
      })
    }

    return {
      slug: s,
      parents: pp
    }
  }

  /* Slug return */

  return s
}

/* Exports */

module.exports = getSlug
