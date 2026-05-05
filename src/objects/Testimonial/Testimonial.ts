/**
 * Objects - Testimonial
 */

/* Imports */

import type { TestimonialProps } from './TestimonialTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { QuoteSvg } from '../../svg/Quote/Quote.js'

/**
 * Output testimonial quote.
 *
 * @param {TestimonialProps} props
 * @return {string} HTMLElement
 */
const Testimonial = (props: TestimonialProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    quote,
    title,
    info
  } = args

  /* Quote and title required */

  if (!isStringStrict(quote) || !isStringStrict(title)) {
    return ''
  }

  /* Info */

  let infoOutput = ''

  if (isStringStrict(info)) {
    infoOutput = `<p class="text-s lead-base pt-5xs muted">${info}</p>`
  }

  /* Output */

  return /* html */`
    <figure class="flex col h-full">
      ${QuoteSvg({ width: 'l', height: 'm', classes: 'dull' })}
      <blockquote class="pt-2xs pb-3xs">
        <p class="text-quote sharp">${quote}</p>
      </blockquote>
      <figcaption class="mt-auto">
        <p class="text-m wt-medium lead-base">${title}</p>
        ${infoOutput}
      </figcaption>
    </figure>
  `
}

/* Exports */

export { Testimonial }
