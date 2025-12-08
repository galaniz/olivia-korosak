/**
 * Svg - Types
 */

/* Imports */

import type { ConfigSize } from '../config/configTypes.js'

/**
 * @typedef {object} SvgArgs
 * @prop {ConfigGeometry} [width='2xs']
 * @prop {ConfigGeometry} [height='2xs']
 * @prop {string} [classes]
 */
export interface SvgArgs {
  width?: ConfigSize
  height?: ConfigSize
  classes?: string
}
