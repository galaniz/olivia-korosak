/**
 * Components - Breadcrumbs
 */

/* Imports */

import type { Item } from '../../global/globalTypes.ts'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { getLink, getSlug } from '@alanizcreative/formation-static/utils/link/link.js'

/**
 * Output breadcrumbs navigation.
 *
 * @param {Item} itemData
 * @return {string} HTMLElement
 */
const Breadcrumbs = (itemData: Item): string => {
  /* Data required */

  if (!isObjectStrict(itemData)) {
    return ''
  }

  const {
    id,
    slug,
    contentType,
    title
  } = itemData

  /* Title and slug required */

  if (!title || !slug) {
    return ''
  }

  /* Parents required */

  const { parents } = getSlug({
    id,
    slug,
    contentType,
    itemData
  }, true)

  const parentsCount = parents.length

  if (!parentsCount) {
    return ''
  }

  /* Trail */

  const lastIndex = parentsCount - 1
  const breadcrumbs = parents.map((item, i) => {
    const { title: itemTitle } = item

    return `
      <li${i < lastIndex ? ' class="none block-m"' : ''}>
        <a href="${getLink(item)}" class="text-s lead-base" data-rich>${itemTitle}</a>
        <span class="text-s lead-base px-4xs" aria-hidden="true">&sol;</span>
      </li>
    `
  })

  /* Output */

  return /* html */`
    <nav aria-label="Breadcrumb">
      <ol class="flex list-none e-line-in e-line-thin" role="list">
        ${breadcrumbs.join('')}
        <li class="relative text-s lead-base wt-medium clamp-1">
          ${title}
          <span class="a-hide-vis"> (current page)</span>
        </li>
      </ol>
    </nav>
  `
}

/* Exports */

export { Breadcrumbs }
