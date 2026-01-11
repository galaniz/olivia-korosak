/**
 * Objects - Embed Types
 */

/* Imports */

import type { RenderFunctionArgs, RenderRichText } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {'loader'|'error'} EmbedTemplate
 */
export type EmbedTemplate = 'loader' | 'error'

/**
 * @typedef {object} EmbedArgs
 * @prop {string} [link]
 * @prop {string} [title]
 * @prop {RenderRichText[]} [text]
 */
export interface EmbedArgs {
  link?: string
  title?: string
  text?: RenderRichText[]
}

/**
 * @typedef {object} EmbedProps
 * @extends {RenderFunctionArgs}
 * @prop {EmbedArgs} args
 * @prop {Item} [itemData]
 * @prop {Item[]} [children]
 */
export interface EmbedProps extends RenderFunctionArgs {
  args: EmbedArgs
  itemData?: Item
  children?: Item[]
}
