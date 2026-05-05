/**
 * Store
 */

/* Imports */

import type { StoreArgs, StoreExtended, StoreExtra } from './storeTypes.js'
import type { Item } from '../global/globalTypes.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { getStoreItem, setStoreItem } from '@alanizcreative/formation-static/store/store.js'

/**
 * Terms counts and archive labels.
 *
 * @type {StoreArgs}
 */
const storeArgs: StoreArgs = {
  counts: {},
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

/**
 * Add term counts to store.
 *
 * @param {Item} data
 * @return {void}
 */
const storeCounts = (data: Item[]): void => {
  if (!isArrayStrict(data)) {
    return
  }

  const counts: StoreExtra['counts'] = {}

  data.forEach(item => {
    const { projectType, genre } = item
    const terms = [
      ...(projectType || []),
      ...(genre || [])
    ]

    if (isArrayStrict(terms)) {
      terms.forEach(term => {
        const id = term.id as string
        const count = counts[id]

        if (!count) {
          counts[id] = 1
        } else {
          counts[id] = count + 1
        }
      })
    }
  })

  setStoreItem('counts', counts)
}

/**
 * Term count from store.
 *
 * @param {string} id
 * @return {number}
 */
const getStoreCount = (id: string): number => {
  const counts = getStoreItem<StoreExtended, 'counts'>('counts')
  return counts[id] || 0
}

/* Exports */

export {
  storeArgs,
  storeCounts,
  getStoreCount
}
