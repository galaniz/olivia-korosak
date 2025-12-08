/**
 * Layouts - Container Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type {
  ConfigTag,
  ConfigTagLabel,
  ConfigContainer,
  ConfigContainerLabel,
  ConfigPaddingLabel,
  ConfigGapLabel,
  ConfigJustifyLabel,
  ConfigAlignLabel
} from '../../config/configTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type {
  ContainerArgs as FormationContainerArgs
} from '@alanizcreative/formation-static/layouts/Container/ContainerTypes.js'

/**
 * @typedef {ConfigTag|ConfigTagLabel} ContainerTag
 */
export type ContainerTag = ConfigTag | ConfigTagLabel

/**
 * @typedef {ConfigContainer|ConfigContainerLabel} ContainerMaxWidth
 */
export type ContainerMaxWidth = ConfigContainer | ConfigContainerLabel

/**
 * @typedef {object} ContainerArgs
 * @extends {FormationContainerArgs}
 * @prop {ContainerTag} [tag='Div']
 * @prop {ContainerMaxWidth} [maxWidth]
 * @prop {'Block'|'Column'|'Row'} [layout='Block']
 * @prop {ConfigPaddingLabel} [paddingTop]
 * @prop {ConfigPaddingLabel} [paddingTopLarge]
 * @prop {ConfigPaddingLabel} [paddingBottom]
 * @prop {ConfigPaddingLabel} [paddingBottomLarge]
 * @prop {ConfigGapLabel} [gap]
 * @prop {ConfigGapLabel} [gapLarge]
 * @prop {ConfigJustifyLabel} [justify]
 * @prop {ConfigAlignLabel} [align]
 * @prop {string} [classes] - Custom classes. Back end option.
 */
export interface ContainerArgs extends FormationContainerArgs<ContainerTag, ContainerMaxWidth> {
  layout?: 'Block' | 'Column' | 'Row'
  paddingTop?: ConfigPaddingLabel
  paddingTopLarge?: ConfigPaddingLabel
  paddingBottom?: ConfigPaddingLabel
  paddingBottomLarge?: ConfigPaddingLabel
  gap?: ConfigGapLabel
  gapLarge?: ConfigGapLabel
  justify?: ConfigJustifyLabel
  align?: ConfigAlignLabel
  classes?: string
}

/**
 * @typedef {object} ContainerProps
 * @extends {RenderFunctionArgs}
 * @prop {ContainerArgs} args
 * @prop {Item} [itemData]
 */
export interface ContainerProps extends RenderFunctionArgs  {
  args: ContainerArgs
  itemData?: Item
}
