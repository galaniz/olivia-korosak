/**
 * Vars: slug, term, nav, script, archive and env data objects
 */

/* Slug data for link and json file generation */

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

/* Terms data for posts content */

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

/* Nav data for json storage */

const navData = {}

/* Script data for front end */

const scriptData = {}

/* Archive data */

const archiveData = {
  ids: {}, // Page archive ids by content type
  counts: {} // Posts archive counts
}

/* Data to store in json files */

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

/* Env/context data */

const envData = {
  dev: true,
  prod: false,
  eleventyCache: false,
  urls: {
    dev: '/',
    prod: 'https://oliviakorosak.com/'
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
  scriptData,
  archiveData,
  jsonFileData,
  envData
}
