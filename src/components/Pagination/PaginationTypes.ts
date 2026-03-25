/**
 * Components - Pagination Types
 */

/* Imports */

import type { RenderServerlessData } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigContentType } from '../../config/configTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} PaginationArgs
 * @prop {string} output
 * @prop {number} total
 * @prop {number} current
 * @prop {ConfigContentType} archiveType
 * @prop {Item} itemData
 * @prop {RenderServerlessData} [serverlessData]
 * @prop {Object<string, string>} [filters]
 */
export interface PaginationArgs {
  output: string
  total: number
  current: number
  archiveType: ConfigContentType
  itemData: Item
  serverlessData?: RenderServerlessData
  filters?: Record<string, string>
}

/**
 * @typedef {'string'|'data'} PaginationReturnKind
 */
export type PaginationReturnKind = 'string' | 'data'

/**
 * @typedef {string|PaginationServerlessData} PaginationReturnType
 */
export type PaginationReturnType<R extends PaginationReturnKind> =
  R extends 'data' ? PaginationServerlessData : string

/**
 * @typedef {object} PaginationServerlessData
 * @prop {string} nav
 * @prop {string} entries
 * @prop {string} script
 * @prop {string} title
 * @prop {string} canonical
 * @prop {string} prev
 * @prop {string} next
 */
export interface PaginationServerlessData {
  nav: string
  entries: string
  script: string
  title: string
  canonical: string
  prev: string
  next: string
}
