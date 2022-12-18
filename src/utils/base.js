/**
 * Base variables and functions
 */

/* Imports */

const fs = require('fs')

/* Store parent items for slug generation */

const parents = {}

/* Meta data by content type */

const meta = {
  page: {
    slugBase: ''
  },
  project: {
    slugBase: 'projects'
  },
  track: {
    slugBase: 'tracks'
  },
  projectType: {
    slugBase: 'types'
  },
  genre: {
    slugBase: 'genres'
  }
}

/* Return slug with base from meta data and parents */

const getSlug = (contentType = 'page', slug = '') => {
  const slugBase = meta[contentType].slugBase

  let p = []

  getParentSlug(contentType === 'page' ? slug : slugBase, p)

  if (p.length) {
    p = `${p.join('/')}/`
  } else {
    p = ''
  }

  return `${p}${slugBase}/${slug}`
}

const getParentSlug = (slug = '', p = []) => {
  if (Object.getOwnPropertyDescriptor(parents, slug)) {
    const parent = parents[slug]

    p.unshift(parent)

    getParentSlug(parent, p)
  }
}

/* Return absolute url */

const getPermalink = (slug = '', asset = false) => {
  const context = process.env.CONTEXT

  let url = 'http://localhost:8080'

  if (context === 'production') {
    url = 'https://oliviakorosak.netlify.app'
  }

  if (context === 'preview') {
    url = 'https://preview--oliviakorosak.netlify.app'
  }

  if (asset && context === 'deploy-preview') {
    url = '.'
  }

  return `${url}${slug}/`
}

/* Get file as string */

const getFile = (path = '') => {
  const fileContent = fs.readFileSync(path, { encoding: 'utf8' })

  return fileContent
}

/* Exports */

module.exports = {
  parents,
  meta,
  getSlug,
  getPermalink,
  getFile
}
