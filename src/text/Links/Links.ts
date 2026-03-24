/**
 * Text - Links
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'

/**
 * Output comma separated links.
 *
 * @param {Item[]|InternalLink[]} [items]
 * @param {string} [classes]
 * @return {string}
 */
const Links = (items: Item[] | InternalLink[], classes?: string): string => {
  const output: string[] = []
  const linkClasses = `current${isStringStrict(classes) ? ` ${classes}` : ''}`

  items.forEach(item => {
    const { title, slug } = item

    if (!isStringStrict(title) || !isStringStrict(slug)) {
      return
    }

    const link = getLink({ ...item, slug })

    output.push(`<a href="${link}" class="${linkClasses}" data-rich>${title}</a>`)
  })

  return output.join(', ')
}

/* Exports */

export { Links }
