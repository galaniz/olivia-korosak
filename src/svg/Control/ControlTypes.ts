/**
 * Svg - Control Types
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'

/**
 * @typedef {'play'|'pause'|'prev'|'next'} ControlSvgType
 */
export type ControlSvgType = 'play' | 'pause' | 'prev' | 'next'

/**
 * @typedef {object} ControlSvgArgs
 * @extends {SvgArgs}
 * @prop {ControlSvgType} [type='play']
 */
export interface ControlSvgArgs extends SvgArgs {
  type?: ControlSvgType
}
