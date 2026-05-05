/**
 * Objects - Navigation
 */

/* Imports */

import type { NavigationProps } from './NavigationTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { Social } from '../Social/Social.js'

/**
 * Output navigation inline (only social).
 *
 * @param {NavigationProps} props
 * @return {string} HTMLUListElement
 */
const Navigation = (props: NavigationProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Social location required */

  const { location } = args

  if (location !== 'Social') {
    return ''
  }

  /* Output */

  return Social()
}

/* Exports */

export { Navigation }
