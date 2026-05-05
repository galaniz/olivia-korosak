/**
 * Svg - Caret Types
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'

/**
 * @typedef {'down'|'up'|'left'|'right'} CaretSvgType
 */
export type CaretSvgType = 'down' | 'up' | 'left' | 'right'

/**
 * @typedef {object} CaretSvgArgs
 * @extends {SvgArgs}
 * @prop {CaretSvgType} [type='down']
 */
export interface CaretSvgArgs extends SvgArgs {
  type?: CaretSvgType
}
