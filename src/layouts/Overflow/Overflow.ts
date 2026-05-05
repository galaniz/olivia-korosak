/**
 * Layouts - Overflow
 */

/* Imports */

import {
  addStyle,
  addScript
} from '@alanizcreative/formation-static/scripts/scripts.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Output horizontal overflow element.
 *
 * @param {string} content
 * @param {'mask'|'gradient'} [style=mask]
 * @return {string} HTMLElement
 */
const Overflow = (content: string): string => {
  /* Content required */

  if (!isStringStrict(content)) {
    return ''
  }

  /* Styles and scripts */

  addStyle('layouts/Overflow/Overflow')
  addScript('layouts/Overflow/OverflowClient')

  /* Output */

  return /* html */`
    <ok-overflow
      class="overflow block overflow-x-auto overscroll-none w-full b-all"
      direction="horizontal"
    >
      ${content}
    </ok-overflow>
  `
}

/* Exports */

export { Overflow }
