/**
 * Components - Header
 */

/* Imports */

import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { NavigationPrimary } from '../Navigation/NavigationPrimary.js'
import { SkipLink } from '../SkipLink/SkipLink.js'

/**
 * Output header.
 *
 * @param {string} currentLink
 * @param {string|string[]} [currentType]
 * @return {string} HTMLElement
 */
const Header = (currentLink: string, currentType?: string | string[]): string => {
  /* Navigation required */

  const navigation = NavigationPrimary({
    currentLink,
    currentType
  })

  if (!isStringStrict(navigation)) {
    return ''
  }

  /* Output */

  return /* html */`
    <header>
      ${SkipLink()}
      ${navigation}
    </header>
  `
}

/* Exports */

export { Header }
