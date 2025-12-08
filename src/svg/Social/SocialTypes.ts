/**
 * Svg - Social Types
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'

/**
 * @typedef {'facebook'|'instagram'|'imdb'|'youtube'} SocialSvgType
 */
export type SocialSvgType = 'facebook' | 'instagram' | 'imdb' | 'youtube'

/**
 * @typedef {object} SocialSvgArgs
 * @extends {SvgArgs}
 * @prop {SocialSvgType} [type='instagram']
 */
export interface SocialSvgArgs extends SvgArgs {
  type?: SocialSvgType
}
