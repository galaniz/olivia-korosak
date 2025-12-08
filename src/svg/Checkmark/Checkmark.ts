/**
 * Svg - Checkmark
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg checkmark icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const CheckmarkSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-checkmark'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M8.77 11.9 6.73 9.85a.66.66 0 0 0-.94.02q-.2.21-.2.48 0 .28.2.46l2.54 2.54a.6.6 0 0 0 .88 0l5-5a.6.6 0 0 0 .18-.45.7.7 0 0 0-.2-.46.6.6 0 0 0-.47-.21.7.7 0 0 0-.5.2zM10 18.33a8.5 8.5 0 0 1-5.94-2.4A8.45 8.45 0 0 1 1.66 10a8.4 8.4 0 0 1 2.4-5.9A8.3 8.3 0 0 1 10 1.66 8.3 8.3 0 0 1 18.33 10a8.3 8.3 0 0 1-2.41 5.94 8.4 8.4 0 0 1-5.92 2.4m0-1.25q3.02 0 5.05-2.03A6.9 6.9 0 0 0 17.08 10q0-3.02-2.03-5.05A6.9 6.9 0 0 0 10 2.92q-3.02 0-5.05 2.03A6.9 6.9 0 0 0 2.92 10q0 3.02 2.03 5.05A6.9 6.9 0 0 0 10 17.08" fill="currentcolor" />
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

export { CheckmarkSvg }
