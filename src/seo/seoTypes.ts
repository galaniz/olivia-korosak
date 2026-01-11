/**
 * Seo - Types
 */

/**
 * @typedef {object} SeoSchemaBreadcrumb
 * @prop {'ListItem'} '@type'
 * @prop {number} position
 * @prop {string} name
 * @prop {string} [item]
 */
export interface SeoSchemaBreadcrumb {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

/**
 * @typedef {Map<string, Array<*>>} SeoSchema
 * @prop {SeoSchemaBreadcrumb[]} [breadcrumbs]
 */
export type SeoSchema = Map<string, unknown[]> & Map<'breadcrumbs', SeoSchemaBreadcrumb[]>

/**
 * @typedef {object} SeoSitemapItem
 * @prop {string} loc - Absolute entry url.
 * @prop {string} lastMod - Last modified date of the entry.
 * @prop {string} imageLoc - Absolute featured image url.
 */
export interface SeoSitemapItem {
  loc: string
  lastMod: string
  imageLoc?: string
}
