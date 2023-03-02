/**
 * Utils - get slug
 */

/* Imports */

const { slugData } = require('../vars/data')

/**
 * Function - recurse to get ascendents
 *
 * @private
 * @param {string} id
 * @param {array<object>} p
 * @return {number}
 */

const _getParentSlug = (id = '', p = []) => {
  if (slugData.parents?.[id]) {
    p.unshift(slugData.parents[id])

    _getParentSlug(slugData.parents[id].id, p)
  }
}

/**
 * Function - get slug with base from slug base and parents
 *
 * @param {object} args {
 *  @prop {string} id
 *  @prop {string} slug
 *  @prop {number} page
 *  @prop {string} contentType
 *  @prop {boolean} returnParents
 * }
 * @return {string|object}
 */

const getSlug = ({
  id = '',
  slug = '',
  page = 0,
  contentType = 'page',
  returnParents = false
}) => {
  /* Index */

  if (slug === 'index') {
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
