/**
 * Svg - Social
 */

/* Imports */

import type { SocialSvgType, SocialSvgArgs } from './SocialTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg social icon.
 *
 * @param {SocialSvgArgs} [args]
 * @return {string} SVGElement
 */
const SocialSvg = (args?: SocialSvgArgs): string => {
  /* Args */

  const {
    width = '2xs',
    height = '2xs',
    type = 'instagram',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = `svg-social-${type}`
  const paths: Record<SocialSvgType, string> = {
    facebook: 'M15 .14v3.18H13.1c-1.48 0-1.75.7-1.75 1.73v2.27h3.52l-.47 3.56h-3.05V20H7.68v-9.12H4.6V7.32h3.07V4.7c0-3.04 1.86-4.7 4.58-4.7 1.3 0 2.41.1 2.74.14',
    instagram: 'M13.33 10a3.34 3.34 0 0 0-6.66 0 3.34 3.34 0 0 0 6.66 0m1.8 0a5.12 5.12 0 1 1-10.25.01A5.12 5.12 0 0 1 15.13 10m1.4-5.34c0 .67-.53 1.2-1.2 1.2a1.2 1.2 0 1 1 0-2.4c.67 0 1.2.54 1.2 1.2M10 1.8c-1.46 0-4.58-.12-5.9.4-.45.18-.8.4-1.14.76-.36.35-.58.69-.76 1.14-.52 1.32-.4 4.44-.4 5.9s-.12 4.58.4 5.9c.18.45.4.8.76 1.14.35.36.69.58 1.14.76 1.32.52 4.44.4 5.9.4s4.58.12 5.9-.4c.45-.18.8-.4 1.14-.76.36-.35.58-.69.76-1.14.52-1.32.4-4.44.4-5.9s.12-4.58-.4-5.9a3 3 0 0 0-.76-1.14 3 3 0 0 0-1.14-.76c-1.32-.52-4.44-.4-5.9-.4M20 10c0 1.38.01 2.75-.07 4.13-.07 1.6-.44 3.02-1.61 4.19s-2.6 1.54-4.2 1.61c-1.37.08-2.74.07-4.12.07s-2.75.01-4.13-.07c-1.6-.07-3.02-.44-4.19-1.61s-1.54-2.6-1.61-4.2C-.01 12.76 0 11.39 0 10S0 7.25.07 5.87c.07-1.6.44-3.02 1.61-4.19S4.28.14 5.88.07C7.24-.01 8.61 0 10 0s2.75-.01 4.13.07c1.6.07 3.02.44 4.19 1.61s1.54 2.6 1.61 4.2c.08 1.37.07 2.74.07 4.12',
    imdb: 'M0 13.75h2.08v-7.5H0zM6.53 6.25l-.47 3.5-.29-1.9q-.12-.92-.24-1.6H2.92v7.5h1.76L4.7 8.8l.74 4.95H6.7l.7-5.06.01 5.06h1.77v-7.5zM10 13.75v-7.5h3.25c.74 0 1.33.6 1.33 1.32v4.86c0 .73-.6 1.32-1.33 1.32zm2.43-6.15a1 1 0 0 0-.47-.07v4.92q.45 0 .56-.16.1-.17.1-.92v-2.9q0-.52-.03-.66a.3.3 0 0 0-.16-.21M18.51 8.13h.14c.74 0 1.35.58 1.35 1.3v3.01c0 .72-.6 1.31-1.35 1.31h-.14c-.46 0-.86-.22-1.1-.55l-.13.45h-1.86v-7.4h1.99v2.4c.26-.31.65-.52 1.1-.52m-.42 3.66V10q0-.45-.06-.58c-.04-.09-.2-.14-.3-.14-.12 0-.29.04-.32.12v3.01c.04.09.2.13.31.13s.28-.04.31-.13q.06-.13.06-.63',
    youtube: 'm7.94 12.59 5.4-2.8-5.4-2.81zM10 2.97c4.2 0 7 .2 7 .2.39.04 1.25.04 2 .85 0 0 .62.6.8 1.98.21 1.62.2 3.24.2 3.24v1.52s.01 1.62-.2 3.23c-.18 1.38-.8 2-.8 2-.75.78-1.61.78-2 .83 0 0-2.8.21-7 .21-5.2-.04-6.8-.2-6.8-.2-.44-.08-1.45-.06-2.2-.85 0 0-.62-.61-.8-1.99C0 12.38 0 10.76 0 10.76V9.24S-.01 7.62.2 6c.18-1.38.8-1.98.8-1.98.75-.8 1.61-.8 2-.85 0 0 2.8-.2 7-.2'
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

export { SocialSvg }
