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
 */
export interface NavigationPrimaryArgs {
  currentLink?: string
  currentType?: string | string[]
}
