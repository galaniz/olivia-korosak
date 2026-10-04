/**
 * Text - Content Types
 */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type {
  ConfigTextLabel,
  ConfigHeadingLabel,
  ConfigGapLabel,
  ConfigTextAlignLabel
} from '../../config/configTypes.js'

/**
 * @typedef {object} ContentArgs
 * @prop {string} [id]
 * @prop {string} [field]
 * @prop {ConfigTextLabel} [textStyle='Extra Large']
 * @prop {ConfigHeadingLabel} [headingStyle]
 * @prop {ConfigTextAlignLabel} [align='Left']
 * @prop {ConfigGapLabel} [gap]
 * @prop {ConfigGapLabel} [gapLarge]
 * @prop {boolean} [richTextStyles=true]
 * @prop {string} [classes] - Custom classes. Back end option.
 */
export interface ContentArgs {
  id?: string
  field?: string
  textStyle?: ConfigTextLabel
  headingStyle?: ConfigHeadingLabel
  align?: ConfigTextAlignLabel
  gap?: ConfigGapLabel
  gapLarge?: ConfigGapLabel
  richTextStyles?: boolean
  classes?: string
}

/**
 * @typedef {object} ContentProps
 * @extends {RenderFunctionArgs}
 * @prop {ContentArgs} args
 * @prop {Item} [itemData]
 */
export interface ContentProps extends RenderFunctionArgs {
  args: ContentArgs
  itemData?: Item
}
