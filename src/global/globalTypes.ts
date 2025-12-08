/**
 * Global - Types
 */

/* Imports */

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
 * @prop {RenderItem[]} [similar]
 * @prop {RenderItem[]} [project]
 * @prop {RenderItem[]} [projectType]
 * @prop {RenderItem[]} [genre]
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
  similar?: RenderItem[]
  project?: RenderItem[]
  projectType?: RenderItem[]
  genre?: RenderItem[]
}
