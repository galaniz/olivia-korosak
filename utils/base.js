/**
 * Base variables and functions
 */

/* Meta data by content type */

const meta = {
  page: {
    slugBase: '/'
  },
  project: {
    slugBase: '/projects/'
  },
  track: {
    slugBase: '/tracks/'
  },
  projectType: {
    slugBase: '/projects/types/'
  },
  genre: {
    slugBase: '/tracks/genres/'
  }
}

/* Return slug with base from meta data */

const getSlug = (contentType = 'page', slug = '') => {
  const slugBase = meta[contentType].slugBase

  return slugBase + slug
}

/* Return absolute url */

const getPermalink = (slug = '') => {
  const env = process.env.NODE_ENV
  let url = 'http://localhost:8080'

  if (env === 'production') {
    url = 'https://oliviakorosak.netlify.app'
  }

  if (env === 'preview') {
    url = 'https://preview-oliviakorosak.netlify.app'
  }

  return url + slug
}

/* Exports */

module.exports = {
  meta,
  getSlug,
  getPermalink
}
