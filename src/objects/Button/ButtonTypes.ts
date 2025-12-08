/**
 * Objects - Button Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigJustifyLabel, ConfigPaddingLabel } from '../../config/configTypes.js'

/**
 * @typedef {object} ButtonArgs
 * @prop {string} [title]
 * @prop {InternalLink} [internalLink]
 * @prop {string} [externalLink]
 * @prop {string} [link]
 * @prop {'Main'|'Secondary'|'Icon'} [type='Main']
 * @prop {'Large'} [size]
 * @prop {ConfigJustifyLabel} [justify]
 * @prop {ConfigPaddingLabel} [paddingTop]
 * @prop {ConfigPaddingLabel} [paddingBottom]
 */
export interface ButtonArgs {
  title?: string
  internalLink?: InternalLink
  externalLink?: string
  link?: string
  type?: 'Main' | 'Secondary' | 'Icon'
  size?: 'Large'
  justify?: ConfigJustifyLabel
  paddingTop?: ConfigPaddingLabel
  paddingBottom?: ConfigPaddingLabel
}

/**
 * @typedef {object} ButtonProps
 * @extends {RenderFunctionArgs}
 * @prop {ButtonArgs} args
 * @prop {Item} [itemData]
 */
export interface ButtonProps extends RenderFunctionArgs {
  args: ButtonArgs
  itemData?: Item
}
