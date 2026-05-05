/**
 * Svg - Close
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg close icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const CloseSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-close'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="m10 10.88-4.37 4.37a.6.6 0 0 1-.88 0 .6.6 0 0 1 0-.87L9.13 10 4.75 5.63a.6.6 0 0 1 0-.88.6.6 0 0 1 .88 0L10 9.13l4.38-4.38a.6.6 0 0 1 .87 0 .6.6 0 0 1 0 .88L10.88 10l4.37 4.38a.6.6 0 0 1 0 .87.6.6 0 0 1-.87 0z" fill="currentcolor" />
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

export { CloseSvg }
