/**
 * Objects - Social
 */

/* Imports */

import type { SocialSvgType } from '../../svg/Social/SocialTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { navigationsInstance } from '../../components/Navigation/Navigations.js'
import { SocialSvg } from '../../svg/Social/Social.js'

/**
 * Output social links.
 *
 * @param {string} [classes] 
 * @return {string} HTMLUListElement
 */
const Social = (classes?: string): string => {
  return navigationsInstance?.getOutput('Social', {
    listClass: `flex wrap gap-2xs list-none${isStringStrict(classes) ? ` ${classes}` : ''}`,
    listAttr: 'role="list"',
    linkClass: 'flex align-center justify-center w-l h-l relative b-radius-full b-all e-trans e-border',
    filterBeforeLinkText: ({ output }) => {
      output.ref += '<span class="a-hide-vis">'
    },
    filterAfterLinkText: ({ item, output }) => {
      const { title } = item

      output.ref += '</span>'
      output.ref += SocialSvg({ type: title.toLowerCase() as SocialSvgType })
    }
  }, 1) ?? ''
}

/* Exports */

export { Social }
