/**
 * Objects - Card Types
 */

/* Imports */

import type { RenderFunctionArgs, RenderRichText } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { ConfigGapLabel } from '../../config/configTypes.js'
import type { Color, Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} CardArgs
 * @prop {InternalLink} [internalLink]
 * @prop {string} [externalLink]
 * @prop {ConfigGapLabel} [gap]
 * @prop {ConfigGapLabel} [gapLarge]
 * @prop {boolean} [overlay=false]
 * @prop {boolean} [embed=false]
 * @prop {string} [embedTitle]
 * @prop {RenderRichText[]} [embedText]
 * @prop {Color} [colorFrom] - Background gradient. Back end option.
 */
export interface CardArgs {
  internalLink?: InternalLink
  externalLink?: string
  gap?: ConfigGapLabel
  gapLarge?: ConfigGapLabel
  overlay?: boolean
  embed?: boolean
  embedTitle?: string
  embedText?: RenderRichText[]
  colorFrom?: Color
}

/**
 * @typedef {object} CardProps
 * @extends {RenderFunctionArgs}
 * @prop {CardArgs} args
 * @prop {Item} [itemData]
 */
export interface CardProps extends RenderFunctionArgs {
  args: CardArgs
  itemData?: Item
}
