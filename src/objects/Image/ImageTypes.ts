/**
 * Objects - Image Types
 */

/* Imports */

import type {
  RenderFunctionArgs,
  RenderFile,
  RenderRichText
} from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigAspectRatioLabel } from '../../config/configTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} ImageArgs
 * @prop {RenderFile} [image]
 * @prop {ConfigAspectRatioLabel} [aspectRatio]
 * @prop {number} [maxWidth]
 * @prop {number} [viewportWidth=80]
 * @prop {string} [sizes]
 * @prop {RenderRichText[]} [caption]
 * @prop {boolean} [lazy=true]
 * @prop {string} [classes]
 */
export interface ImageArgs {
  image?: RenderFile
  aspectRatio?: ConfigAspectRatioLabel
  maxWidth?: number
  viewportWidth?: number
  sizes?: string
  caption?: RenderRichText[]
  lazy?: boolean
  classes?: string
}

/**
 * @typedef {object} ImageProps
 * @extends {RenderFunctionArgs}
 * @prop {ImageArgs} args
 * @prop {Item} [itemData]
 */
export interface ImageProps extends RenderFunctionArgs {
  args: ImageArgs
  itemData?: Item
}
