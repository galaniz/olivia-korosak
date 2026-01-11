/**
 * Svg - Types
 */

/* Imports */

import type { ConfigSize } from '../config/configTypes.js'

/**
 * @typedef {object} SvgArgs
 * @prop {ConfigSize|'full'} [width='2xs']
 * @prop {ConfigSize|'full'} [height='2xs']
 * @prop {string} [classes]
 */
export interface SvgArgs {
  width?: ConfigSize | 'full'
  height?: ConfigSize | 'full'
  classes?: string
}
