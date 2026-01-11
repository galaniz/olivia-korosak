/**
 * Components - Footer
 */

/* Imports */

import type { SocialSvgType } from '../../svg/Social/SocialTypes.js'
import { getYear } from '@alanizcreative/formation-static/utils/year/year.js'
import { navigationsInstance } from '../Navigation/Navigations.js'
import { config } from '../../config/config.js'
import { Logo } from '../../objects/Logo/Logo.js'
import { SocialSvg } from '../../svg/Social/Social.js'

/**
 * Output footer.
 *
 * @param {string} currentLink
 * @param {string|string[]} [currentType]
 * @return {string} HTMLElement
 */
const Footer = (currentLink: string, currentType?: string | string[]): string => {
  /* List */
  
  const listOutput = navigationsInstance?.getOutput('footer', {
    currentLink,
    currentType,
    listClass: 'flex wrap justify-center gap-2xs gap-s-l list-none e-line-in',
    listAttr: 'role="list"',
    linkClass: 'text-m',
    linkAttr: 'data-rich'
  }, 1) ?? ''

  /* Social */

  const socialOutput = navigationsInstance?.getOutput('social', {
    currentLink,
    currentType,
    listClass: 'flex wrap justify-center gap-2xs list-none',
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

  /* Output */

  return /* html */`
    <footer class="mt-auto b-top b-dull">
      <div class="container flex col align-center justify-center gap-m pt-2xl pb-xl pb-2xl-m">
        ${Logo({ size: 's' })}
        <div class="flex wrap align-center justify-center gap-s">
          ${listOutput ? `<nav aria-label="Primary">${listOutput}</nav>` : ''}
          ${socialOutput ? `<nav aria-label="Social">${socialOutput}</nav>` : ''}
        </div>
        <span class="text-center text-s">&copy; ${getYear()} ${config.title}. All Rights Reserved.</span>
      </div>
    </footer>
  `
}

/* Exports */

export { Footer }
