/**
 * Components - Navigations
 */

/* Imports */

import type { NavigationLocations } from './NavigationTypes.js'
import type { RenderNavigation } from '@alanizcreative/formation-static/render/renderTypes.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { Navigation } from '@alanizcreative/formation-static/components/Navigation/Navigation.js'

/**
 * Navigations instance.
 *
 * @type {Navigation|null}
 */
let navigationsInstance: Navigation<NavigationLocations> | null = null

/**
 * Instantiate navigation class.
 *
 * @type {RenderNavigation}
 * @return {void}
 */
const Navigations: RenderNavigation = (args): void => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return
  }

  const { navigations, items } = args

  /* Navs and items required */

  if (!isArrayStrict(navigations) || !isArrayStrict(items)) {
    return
  }

  /* Navigation instance */

  navigationsInstance = new Navigation({ navigations, items })

  /* Output */

  return
}

/* Exports */

export {
  Navigations,
  navigationsInstance
}
