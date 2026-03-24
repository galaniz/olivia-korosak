/**
 * Objects - Navigation Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { NavigationLocations } from '../../components/Navigation/NavigationTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} NavigationArgs
 * @prop {NavigationLocations} [location]
 */
export interface NavigationArgs {
  location?: NavigationLocations
}

/**
 * @typedef {object} NavigationProps
 * @extends {RenderFunctionArgs}
 * @prop {NavigationArgs} args
 * @prop {Item} [itemData]
 */
export interface NavigationProps extends RenderFunctionArgs {
  args: NavigationArgs
  itemData?: Item
}
