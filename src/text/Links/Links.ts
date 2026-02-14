/**
 * Text - Links
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getPermalink, getSlug } from '@alanizcreative/formation-static/utils/link/link.js'

/**
 * Output comma separated links.
 *
 * @param {Item[]|InternalLink[]} [items]
 * @return {string}
 */
const Links = (items: Item[] | InternalLink[]): string => {
  const output: string[] = []

  items.forEach(item => {
    const { title, slug } = item

    if (!isStringStrict(title) || !isStringStrict(slug)) {
      return
    }

    const link = getPermalink(getSlug({ ...item, slug }))

    output.push(`<a href="${link}" class="current" data-rich>${title}</a>`)
  })

  return output.join(', ')
}

/* Exports */

export { Links }
