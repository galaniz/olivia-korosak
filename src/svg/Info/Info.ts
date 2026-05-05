/**
 * Svg - Info
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg info icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const InfoSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-info'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M10.06 14.17a.6.6 0 0 0 .63-.63V9.77q0-.25-.19-.43a.6.6 0 0 0-.44-.17.6.6 0 0 0-.62.62v3.77q0 .25.19.43.18.18.43.18M10 7.63q.3 0 .49-.2.2-.18.2-.47a.7.7 0 0 0-.2-.5.7.7 0 0 0-.49-.21q-.3 0-.49.2a.7.7 0 0 0-.2.5q0 .3.2.49.2.18.49.18m0 10.7a8.5 8.5 0 0 1-5.94-2.4A8.45 8.45 0 0 1 1.66 10a8.4 8.4 0 0 1 2.4-5.9A8.3 8.3 0 0 1 10 1.66 8.3 8.3 0 0 1 18.33 10a8.3 8.3 0 0 1-2.41 5.94 8.4 8.4 0 0 1-5.92 2.4m0-1.25q2.91 0 5-2.08a6.8 6.8 0 0 0 2.08-5q0-2.91-2.08-5a6.8 6.8 0 0 0-5-2.08Q7.09 2.92 5 5a6.8 6.8 0 0 0-2.08 5q0 2.91 2.08 5a6.8 6.8 0 0 0 5 2.08" fill="currentcolor" />
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

export { InfoSvg }
