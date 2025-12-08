/**
 * Store
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Archive labels.
 *
 * @type {Store}
 */
const storeArgs: Partial<Store> = {
  archiveMeta: {
    project: {
      plural: 'Projects',
      singular: 'Project'
    },
    track: {
      plural: 'Tracks',
      singular: 'Track'
    }
  }
}

/* Exports */

export { storeArgs }
