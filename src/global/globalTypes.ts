/**
 * Global - Types
 */

/* Imports */

import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderItem, RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} Color
 * @prop {string} value
 */
export interface Color {
  value: string
}

/**
 * @typedef {object} Item
 * @extends {RenderItem}
 * @prop {string} [heroTitle]
 * @prop {string} [heroText]
 * @prop {RenderFile} [heroImage]
 * @prop {string} [date]
 * @prop {number} [order]
 * @prop {Color} [colorFrom]
 * @prop {RenderFile} [audio]
 * @prop {string} [audioDuration]
 * @prop {Item[]} [similar]
 * @prop {Item[]} [project]
 * @prop {InternalLink[]} [projectType]
 * @prop {InternalLink[]} [genre]
 */
export interface Item extends RenderItem {
  heroTitle?: string
  heroText?: string
  heroImage?: RenderFile
  date?: string
  order?: number
  colorFrom?: Color
  audio?: RenderFile
  audioDuration?: string
  similar?: Item[]
  project?: Item[]
  projectType?: InternalLink[]
  genre?: InternalLink[]
}
