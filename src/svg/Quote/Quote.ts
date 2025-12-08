/**
 * Svg - Quote
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg quote icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const QuoteSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-quote'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M0 10.83q0-2.64 1.68-5.71A17 17 0 0 1 6.02 0l1 1.04a11 11 0 0 0-2.05 2.49 5.5 5.5 0 0 0-.73 2.78q1.94 0 3.09 1.14 1.15 1.1 1.15 3.18 0 1.04-.36 1.89-.37.8-1 1.39A4 4 0 0 1 4.24 15a4 4 0 0 1-3.04-1.24Q0 12.52 0 10.83m11.52 0q0-2.64 1.67-5.71A17 17 0 0 1 17.54 0l1 1.04a11 11 0 0 0-2.05 2.49 5.5 5.5 0 0 0-.73 2.78q1.94 0 3.09 1.14Q20 8.55 20 10.63q0 1.04-.37 1.89-.36.8-1 1.39A4 4 0 0 1 15.77 15a4 4 0 0 1-3.04-1.24q-1.2-1.24-1.2-2.93" fill="currentcolor" />
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

export { QuoteSvg }
