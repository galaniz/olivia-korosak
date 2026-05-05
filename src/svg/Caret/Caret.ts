/**
 * Svg - Caret
 */

/* Imports */

import type { CaretSvgType, CaretSvgArgs } from './CaretTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg caret icon.
 *
 * @param {CaretSvgArgs} [args]
 * @return {string} SVGElement
 */
const CaretSvg = (args?: CaretSvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    type = 'down',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = `svg-caret-${type}`
  const paths: Record<CaretSvgType, string> = {
    down: 'm16.08 7.61-5.74 5.74a1 1 0 0 1-.16.12l-.18.03-.18-.03a1 1 0 0 1-.16-.12L3.92 7.61a.6.6 0 0 1-.18-.46q0-.27.18-.45.2-.2.46-.2.27 0 .47.2L10 11.85l5.15-5.15a.6.6 0 0 1 .47-.2q.27.02.45.2.2.2.2.46 0 .27-.19.45',
    up: 'm3.92 12.39 5.74-5.74a1 1 0 0 1 .16-.12L10 6.5q.1 0 .18.03t.16.12l5.74 5.74q.18.18.18.46 0 .27-.18.45a.6.6 0 0 1-.46.2.6.6 0 0 1-.47-.2L10 8.15 4.85 13.3a.6.6 0 0 1-.47.2.6.6 0 0 1-.45-.2.6.6 0 0 1-.2-.46q0-.27.19-.45',
    left: 'm12.39 16.08-5.74-5.74a1 1 0 0 1-.12-.16L6.5 10q0-.1.03-.18a1 1 0 0 1 .12-.16l5.74-5.74a.6.6 0 0 1 .46-.18q.27 0 .45.18.2.2.2.46 0 .27-.2.47L8.15 10l5.15 5.15q.2.2.2.47-.02.27-.2.45a.6.6 0 0 1-.46.2.6.6 0 0 1-.45-.19',
    right: 'm7.61 3.92 5.74 5.74q.09.07.12.16.03.07.03.18t-.03.18a1 1 0 0 1-.12.16l-5.74 5.74a.6.6 0 0 1-.46.18.6.6 0 0 1-.45-.18.6.6 0 0 1-.2-.46q0-.27.2-.47L11.85 10 6.7 4.85a.6.6 0 0 1-.2-.47q.02-.27.2-.45.2-.2.46-.2.27 0 .45.19'
  }

  configVars.svg.set(id, {
    viewBox,
    output: `<path d="${paths[type]}" fill="currentcolor" />`
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

export { CaretSvg }
