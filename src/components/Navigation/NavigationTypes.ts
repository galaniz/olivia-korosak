/**
 * Components - Navigation Types
 */

/**
 * @typedef {object} NavigationPrimaryArgs
 * @prop {string} [currentLink]
 * @prop {string|string[]} [currentType]
 */
export interface NavigationPrimaryArgs {
  currentLink?: string
  currentType?: string | string[]
}

/**
 * @typedef {'Main'|'Footer'|'Social'} NavigationsLocations
 */
export type NavigationLocations = 'Main' | 'Footer' | 'Social'
