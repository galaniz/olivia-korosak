/**
 * Objects - Table
 */

/* Imports */

import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'

/**
 * Output stylized table.
 *
 * @param {string} content
 * @return {string} HTMLDivElement
 */
const Table = (content: string): string => {
  /* Content required */

  if (!isStringStrict(content)) {
    return ''
  }

  /* Styles */

  addStyle('object/Table/Table')

  /* Output */

  return `<div class="table overflow-hidden">${content}</div>`
}

/* Exports */

export { Table }
