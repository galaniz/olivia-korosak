/**
 * Seo - Sitemap
 */

/* Imports */

import type { SeoSitemapItem } from './seoTypes.js'
import type { Item } from '../global/globalTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Sitemap objects by content type.
 *
 * @type {Map<string, SeoSitemapItem[]>}
 */
const seoSitemap: Map<string, SeoSitemapItem[]> = new Map()

/**
 * Append to sitemap.
 *
 * @param {Item} itemData
 * @return {boolean}
 */
const setSeoSitemapItem = (itemData: Item): boolean => {
  const { contentType, baseUrl, updatedAt, heroImage } = itemData

  if (!isStringStrict(contentType) || !isStringStrict(baseUrl) || !isStringStrict(updatedAt)) {
    return false
  }

  if (!seoSitemap.has(contentType)) {
    seoSitemap.set(contentType, [])
  }

  const seoImage = heroImage?.url
  const seoSitemapData: SeoSitemapItem = {
    loc: baseUrl,
    lastMod: updatedAt
  }

  if (isStringStrict(seoImage)) {
    seoSitemapData.imageLoc = seoImage
  }

  seoSitemap.get(contentType)?.push(seoSitemapData)

  return true
}

/* Exports */

export {
  seoSitemap,
  setSeoSitemapItem
}
