/**
 * Vars - data
 */

/**
 * Slug data for link and json file generation
 *
 * @type {object}
 */

const slugData = {
  parents: {}, // Parent items for slug generation
  bases: { // Content type bases for slug generation
    page: {
      slug: '',
      title: '',
      singular: ''
    },
    project: {
      slug: 'projects',
      title: 'Projects',
      singular: 'Project',
      archiveId: ''
    },
    track: {
      slug: 'tracks',
      title: 'Tracks',
      singular: 'Track',
      archiveId: ''
    },
    projectType: {
      slug: 'types',
      title: 'Types',
      singular: 'Type',
      archiveId: ''
    },
    genre: {
      slug: 'genres',
      title: 'Genres',
      singular: 'Genre',
      archiveId: ''
    }
  }
}

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
 * Nav data for json storage
 *
 * @type {object}
 */

const navData = {}

/**
 * Duration data for json storage
 *
 * @type {object}
 */

const durationsData = {}

/**
 * Script data for front end
 *
 * @type {object}
 */

const scriptData = {}

/**
 * Archive data
 *
 * @type {object}
 */

const archiveData = {
  ids: {}, // Page archive ids by content type
  counts: {} // Posts archive counts
}

/**
 * Data to store in json files
 *
 * @type {object}
 */

const jsonFileData = {
  slugs: {
    data: '',
    name: 'slugs.json'
  },
  slugParents: {
    data: '',
    name: 'slug-parents.json'
  },
  archiveIds: {
    data: '',
    name: 'archive-ids.json'
  },
  archiveCounts: {
    data: '',
    name: 'archive-counts.json'
  },
  durations: {
    data: '',
    name: 'durations.json'
  },
  navData: {
    data: '',
    name: 'nav-data.json'
  }
}

/**
 * Env/context data
 *
 * @type {object}
 */

const envData = {
  dev: true,
  prod: false,
  urls: {
    dev: '/',
    prod: 'https://oliviakorosak.com/'
  },
  eleventy: {
    cache: false
  },
  smtp2go: {
    apiKey: ''
  },
  ctfl: {
    spaceId: '',
    cpaToken: '',
    cdaToken: ''
  }
}

/* Export */

module.exports = {
  slugData,
  termData,
  navData,
  durationsData,
  scriptData,
  archiveData,
  jsonFileData,
  envData
}
