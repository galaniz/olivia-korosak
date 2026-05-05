/**
 * Svg - Control
 */

/* Imports */

import type { ControlSvgType, ControlSvgArgs } from './ControlTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg media control icon.
 *
 * @param {ControlSvgArgs} [args]
 * @return {string} SVGElement
 */
const ControlSvg = (args?: ControlSvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    type = 'play',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = `svg-control-${type}`
  const paths: Record<ControlSvgType, string> = {
    play: 'M8.1 14.13a.5.5 0 0 1-.5.02.5.5 0 0 1-.27-.45V6.2q0-.3.26-.45.25-.15.51.02L14 9.53q.23.15.23.42t-.23.42z',
    pause: 'M8.53 13.86q-.15.14-.36.14c-.21 0-.27-.05-.36-.14a.5.5 0 0 1-.14-.34V6.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.48v7.02q0 .21-.15.36m4 0q-.15.14-.36.14c-.21 0-.27-.05-.36-.14s-.14-.21-.14-.34V6.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.48v7.02q0 .21-.15.36',
    prev: 'M6.17 14a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5m7.38-.55-4.38-3.03a.5.5 0 0 1-.24-.42q0-.27.24-.42l4.38-3.03a.5.5 0 0 1 .52-.04q.26.15.26.44v6.1q0 .28-.26.43a.44.44 0 0 1-.52-.03',
    next: 'M13.83 14a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5m-7.38-.55a.44.44 0 0 1-.52.03q-.26-.15-.26-.43v-6.1q0-.3.26-.44.27-.14.52.04l4.38 3.03q.24.15.24.42t-.24.42z'
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

export { ControlSvg }
