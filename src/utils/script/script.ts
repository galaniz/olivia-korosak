/**
 * Utils - Script
 */

/* Imports */

import { scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
import { config } from '../../config/config.js'

/**
 * Script meta value.
 *
 * @param {boolean} [wrap=true] Wrap in script tag.
 * @return {string}
 */
const getScriptMeta = (wrap: boolean = true): string => {
  const ns = config.namespace
  const meta = JSON.stringify(scripts.meta)

  if (wrap) {
    return `<script id="${ns}-script">var namespace = '${ns}';var ${ns} = ${meta};</script>`
  }

  return meta
}

/* Exports */

export { getScriptMeta }
