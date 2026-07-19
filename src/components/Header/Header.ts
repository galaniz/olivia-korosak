/**
 * Components - Header
 */

import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { NavigationPrimary } from '../Navigation/NavigationPrimary.js'
import { SkipLink } from '../SkipLink/SkipLink.js'

/**
 * Output header.
 *
 * @param {string} currentLink
 * @param {string|string[]} [currentType]
 * @param {boolean} [preview=false]
 * @return {string} HTMLElement
 */
const Header = (currentLink: string, currentType?: string | string[], preview: boolean = false): string => {
  /* Navigation required */

  const navigation = NavigationPrimary({
    currentLink,
    currentType,
    preview
  })

  if (!isStringStrict(navigation)) {
    return ''
  }

  /* Output */

  return /* html */`
    <header class="header">
      ${SkipLink()}
      ${navigation}
    </header>
  `
}

/* Exports */

export { Header }
