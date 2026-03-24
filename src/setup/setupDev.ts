/**
 * Setup - Dev
 */

/* Imports */

import type { Filters } from '@alanizcreative/formation-static/filters/filtersTypes.js'
import type { RenderAllData, RenderData, RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'
import type { StoreExtra } from '../store/storeTypes.js'
import { resolve } from 'node:path'
import { getContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { isObject } from '@alanizcreative/formation-static/utils/object/object.js'
import { readFile } from 'node:fs/promises'
import { getPath } from '@alanizcreative/formation-static/utils/path/path.js'
import { isArray } from '@alanizcreative/formation-static/utils/array/array.js'
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'

/**
 * Keyv cache for dev environment.
 *
 * @param {Filters} filters
 * @return {Promise<void>}
 */
const initDevCache = async (filters: Partial<Filters>): Promise<void> => {
  /* eslint-disable */
  // @ts-ignore - modules may not be installed in build context
  const { default: Keyv } = await import('keyv')
  // @ts-ignore - modules may not be installed in build context
  const Kv = await import('keyv-file')

  const cache = new Keyv({
    namespace: 'ok',
    store: new Kv.KeyvFile({
      filename: resolve('./.cache/data.json'),
      writeDelay: 100 // Delay for write batching
    })
  })

  filters.cacheData = async (cacheData, { key, type = 'get' }) => {
    if (type === 'get') {
      const [pre, , id] = key.split('_')
      const hasId = pre === 'dev' && !!id

      let cacheKey = key

      if (hasId) {
        cacheKey = key.replace('dev_', 'all_').replace(`_${id}`, '')
      }

      const cached = await cache.get(cacheKey) as { data: RenderData; timestamp: number } | undefined

      if (cached?.timestamp && (Date.now() - cached.timestamp) < 24 * 60 * 60 * 1000) { // 1 day
        return hasId ? { items: [cached.data.items.find(item => item.id === id) as RenderItem] } : cached.data
      }
    }

    if (type === 'set' && isObject(cacheData)) {
      // @ts-ignore - modules may not be installed in build context
      const { default: safeJsonStringify } = await import('safe-json-stringify')

      await cache.set(key, {
        data: JSON.parse(safeJsonStringify(cacheData)),
        timestamp: Date.now()
      })
    }

    return cacheData
  }
  /* eslint-enable */
}

/**
 * Data based on esbuild dev request paths.
 *
 * @param {string[]} [devPaths]
 * @return {Promise<RenderAllData>}
 */
const getDevData = async (devPaths: string[] = []): Promise<RenderAllData> => {
  const slugsContents = await readFile(getPath('slugs', 'store'), 'utf8')
  const parentsContents = await readFile(getPath('parents', 'store'), 'utf8')
  const archiveMetaContents = await readFile(getPath('archiveMeta', 'store'), 'utf8')
  const navigationsContents = await readFile(getPath('navigations', 'store'), 'utf8')
  const navigationItemsContents = await readFile(getPath('navigationItems', 'store'), 'utf8')
  const countsContents = await readFile(getPath('counts', 'store'), 'utf8')
  const slugs = JSON.parse(slugsContents) as Store['slugs']
  const parents = JSON.parse(parentsContents) as Store['parents']
  const archiveMeta = JSON.parse(archiveMetaContents) as Store['archiveMeta']
  const navigations = JSON.parse(navigationsContents) as Store['navigations']
  const navigationItems = JSON.parse(navigationItemsContents) as Store['navigationItems']
  const counts = JSON.parse(countsContents) as StoreExtra['counts']

  setStoreItem('parents', parents)
  setStoreItem('archiveMeta', archiveMeta)
  setStoreItem('slugs', slugs)
  setStoreItem('counts', counts)

  const allData: RenderAllData = {
    navigation: navigations,
    navigationItem: navigationItems,
    content: {
      page: []
    }
  }

  for (const path of devPaths) {
    const pathInfo = slugs[path]

    if (!pathInfo) {
      continue
    }

    const [id, contentType] = pathInfo
    const key = `dev_${contentType}_${id}`
    const data = await getContentfulData(key, { id, contentType })
    const { items } = data

    if (isArray(items)) {
      if (allData.content[contentType] == null) {
        allData.content[contentType] = []
      }

      allData.content[contentType] = [
        ...allData.content[contentType],
        ...items
      ]
    }
  }

  /* Output */

  return allData
}

/* Exports */

export {
  initDevCache,
  getDevData
}
