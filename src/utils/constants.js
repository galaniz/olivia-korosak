/**
 * Base constants
 */

/* Parent items for slug generation */

const slugParents = {}

/* Content type bases for slug generation */

const slugBases = {
  page: '',
  project: 'projects',
  track: 'tracks',
  projectType: 'types',
  genre: 'genres'
}

/* Urls for permalink generation */

const urls = {
  local: 'http://localhost:8080/',
  production: 'https://oliviakorosak.netlify.app/',
  staging: 'https://staging--oliviakorosak.netlify.app/'
}

/* Exports */

module.exports = {
  slugParents,
  slugBases,
  urls
}
