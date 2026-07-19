/**
 * Components - Navigation Types
 */

/**
 * @typedef {'Primary'|'Footer'|'Social'} NavigationsLocations
 */
export type NavigationLocations = 'Primary' | 'Footer' | 'Social'

/**
 * @typedef {object} NavigationPrimaryArgs
 * @prop {string} [currentLink]
 * @prop {string|string[]} [currentType]
 * @prop {boolean} [preview=false]
 */
export interface NavigationPrimaryArgs {
  currentLink?: string
  currentType?: string | string[]
  preview?: boolean
}
