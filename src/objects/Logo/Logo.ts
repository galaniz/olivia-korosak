/**
 * Objects - Logo
 */

/* Imports */

import type { LogoArgs } from './LogoTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { config } from '../../config/config.js'
import { LogoSvg } from '../../svg/Logo/Logo.js'

/**
 * Output logo link.
 *
 * @param {LogoArgs} [args]
 * @return {string} HTMLAnchorElement
 */
const Logo = (args?: LogoArgs): string => {
  /* Args */

  const {
    size,
    classes
  } = isObjectStrict(args) ? args : {}

  /* Output */

  return /* html */`
    <a class="inline-flex${isStringStrict(classes) ? ` ${classes}` : ''}" href="${getPermalink()}">
      <span class="a-hide-vis">${config.title} Home</span>
      ${LogoSvg(`logo${size ? `-${size}` : ''}`)}
    </a>
  `
}

/* Exports */

export { Logo }
