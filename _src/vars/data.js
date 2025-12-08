/**
 * Vars - data
 */

/**
 * Terms data for posts content
 *
 * @type {object}
 */

const termData = {
  projectType: {
    field: 'projectType',
    contentType: 'Project',
    display: 16,
    include: [],
    count: {
      title: 'Projects',
      singular: 'Project'
    }
  },
  genre: {
    field: 'genre',
    contentType: 'Track',
    display: 10,
    include: ['projects'],
    count: {
      title: 'Tracks',
      singular: 'Track'
    }
  }
}

/**
 * Archive data
 *
 * @type {object}
 */

const archiveData = {
  ids: {}, // Page archive ids by content type
  counts: {} // Posts archive counts
}

/* Export */

module.exports = {
  slugData,
  termData,
  navData,
  scriptData,
  archiveData,
  jsonFileData,
  envData
}
