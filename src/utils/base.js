/**
 * Base functions
 */

/* Imports */

const fs = require('fs')
const { slugParents, slugBases, urls } = require('./constants')

/* Get slug helper */

const _getParentSlug = (slug = '', p = []) => {
  if (Object.getOwnPropertyDescriptor(slugParents, slug)) {
    const parent = slugParents[slug]

    p.unshift(parent)

    _getParentSlug(parent, p)
  }
}

/* Return slug with base from slug base and parents */

const getSlug = (contentType = 'page', slug = '') => {
  if (slug === '/') {
    return ''
  }

  const slugBase = slugBases[contentType]

  let p = []

  _getParentSlug(contentType === 'page' ? slug : slugBase, p)

  if (p.length) {
    p = `${p.join('/')}/`
  } else {
    p = ''
  }

  return `${p}${slugBase}${slugBase ? '/' : ''}${slug}`
}

/* Return absolute url */

const getPermalink = (slug = '') => {
  const context = process.env.CONTEXT

  let url = urls.local

  if (context === 'production') {
    url = urls.production
  }

  if (context === 'staging') {
    url = urls.staging
  }

  if (context === 'deploy-preview') {
    url = '/'
  }

  return `${url}${slug}${slug ? '/' : ''}`
}

/* Get file as string */

const getFile = (path = '') => {
  const fileContent = fs.readFileSync(path, { encoding: 'utf8' })

  return fileContent
}

/* Exports */

module.exports = {
  getSlug,
  getPermalink,
  getFile
}
