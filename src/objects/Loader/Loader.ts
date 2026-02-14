/**
 * Objects - Loader
 */

/* Imports */

import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configVars } from '../../config/config.js'

/**
 * Output loading animation.
 *
 * @return {string}
 */
const Loader = (): string => {
  /* Styles */

  addStyle('objects/Loader/Loader')

  /* Add to template */

  const loaderId = 'tmpl-loader'

  configVars.template.set(loaderId, /* html */`
    <span
      class="loader top-0 left-0 right-0 bottom-0 flex align-center justify-center e-trans b-radius-s sharp"
      tabindex="-1"
      aria-label="Loading"
    >
      <span class="h-s flex align-center justify-center no-motion-hide">
        <span class="loader-bar loader-bar-1"></span>
        <span class="loader-bar loader-bar-2"></span>
        <span class="loader-bar loader-bar-3"></span>
        <span class="loader-bar loader-bar-4"></span>
        <span class="loader-bar loader-bar-5"></span>
      </span>
      <span class="text-m-flex wt-medium none no-motion-show">Loading</span>
    </span>
  `)

  return loaderId
}

/* Exports */

export { Loader }
