/**
 * Components - Layout Types
 */

/* Imports */

import type { RenderLayoutArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} LayoutArgs
 * @extends {RenderLayoutArgs}
 * @prop {Item} itemData
 */
export interface LayoutArgs extends RenderLayoutArgs {
  itemData: Item
}
