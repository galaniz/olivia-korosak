/**
 * Svg - Arrow
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg arrow down icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const ArrowSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-arrow'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M9.3 16.02V2.98q0-.2.12-.34.13-.15.33-.14a.47.47 0 0 1 .48.48v13.06l1.98-1.98a.4.4 0 0 1 .31-.12.46.46 0 0 1 .48.46q0 .18-.15.33l-2.66 2.69a1 1 0 0 1-.21.14.6.6 0 0 1-.45 0 1 1 0 0 1-.2-.14l-2.68-2.7a.5.5 0 0 1-.15-.31q0-.18.15-.33t.35-.14.31.12z" fill="currentcolor" />
    `
  })

  /* Classes */

  const classesArr = [
    `w-${width}`,
    `h-${height}`
  ]

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  /* Output */

  return /* html */`
    <svg
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      role="img"
      class="${classesArr.join(' ')}"
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { ArrowSvg }
