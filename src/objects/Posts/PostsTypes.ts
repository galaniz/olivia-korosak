/**
 * Objects - Posts Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ParentArgs } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { ConfigContentTypeLabel, ConfigHeadingLabel, ConfigHeadingLevel } from '../../config/configTypes.js'
import type { PaginationServerlessData } from '../../components/Pagination/PaginationTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} PostsArgs
 * @prop {ConfigContentTypeLabel[]} [contentTypes=['Project']]
 * @prop {number} [display=12]
 * @prop {ConfigHeadingLabel} [headingLevel='Heading Three']
 * @prop {boolean} [pagination=false]
 * @prop {string[]} [filters]
 * @prop {'date'|'rand'} [order='date']
 * @prop {boolean} [exclude=false]
 */
export interface PostsArgs {
  contentTypes?: ConfigContentTypeLabel[]
  display?: number
  headingLevel?: ConfigHeadingLabel
  pagination?: boolean
  filters?: string[]
  order?: 'date' | 'rand'
  exclude?: boolean
}

/**
 * @typedef {object} PostsProps
 * @extends {RenderFunctionArgs}
 * @prop {PostsArgs} args
 * @prop {Item} [itemData]
 */
export interface PostsProps extends RenderFunctionArgs {
  args: PostsArgs
  itemData?: Item
}

/**
 * @typedef {'string'|'data'} PostsReturnKind
 */
export type PostsReturnKind = 'string' | 'data'

/**
 * @typedef {string|PaginationServerlessData} PostsReturnType
 */
export type PostsReturnType<R extends PostsReturnKind> = R extends 'data' ? PaginationServerlessData : string

/**
 * @typedef {object} PostsItemArgs
 * @prop {Item} post
 * @prop {string} primaryContentType
 * @prop {string} [contentType]
 * @prop {ConfigHeadingLevel} [headingLevel='h3']
 * @prop {string} [archive]
 * @prop {ParentArgs[]} [parents]
 */
export interface PostsItemArgs {
  post: Item
  primaryContentType: string
  contentType?: string
  headingLevel?: ConfigHeadingLevel
  archive?: string
  parents?: ParentArgs[]
}
