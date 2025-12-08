/**
 * Layouts - Column Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type {
  ConfigTag,
  ConfigTagLabel,
  ConfigColumn,
  ConfigColumnLabel,
  ConfigAlignLabel,
  ConfigJustifyLabel
} from '../../config/configTypes.js'
import type { ColumnArgs as FormationColumnArgs } from '@alanizcreative/formation-static/layouts/Column/ColumnTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {ConfigTag|ConfigTagLabel} ContainerTag
 */
export type ColumnTag = ConfigTag | ConfigTagLabel

/**
 * @typedef {ConfigColumn|ConfigColumnLabel} ColumnWidth
 */
export type ColumnWidth = ConfigColumn | ConfigColumnLabel

/**
 * @typedef {object} ColumnArgs
 * @extends {FormationColumnArgs}
 * @prop {ColumnTag} [tag='Div']
 * @prop {ColumnWidth} [width='1/1']
 * @prop {ColumnWidth} [widthSmall]
 * @prop {ColumnWidth} [widthMedium]
 * @prop {ColumnWidth} [widthLarge]
 * @prop {ConfigJustifyLabel} [justify]
 * @prop {ConfigAlignLabel} [align]
 * @prop {string} [classes] - Custom classes. Back end option.
 */
export interface ColumnArgs extends FormationColumnArgs<ColumnTag, ColumnWidth> {
  justify?: ConfigJustifyLabel
  align?: ConfigAlignLabel
  classes?: string
}

/**
 * @typedef {object} ColumnProps
 * @extends {RenderFunctionArgs}
 * @prop {ColumnArgs} args
 * @prop {Item} [itemData]
 */
export interface ColumnProps extends RenderFunctionArgs  {
  args: ColumnArgs
  itemData?: Item
}
