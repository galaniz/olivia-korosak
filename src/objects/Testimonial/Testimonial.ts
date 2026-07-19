/**
 * Objects - Testimonial
 */

import type { TestimonialProps } from './TestimonialTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getAttr } from '../../utils/attr/attr.js'
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

  const { args, previewData } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    id,
    quote,
    title,
    info
  } = args

  /* Quote and title required */

  if (!isStringStrict(quote) || !isStringStrict(title)) {
    return ''
  }

  /* Preview */

  const isPreview = !!previewData

  /* Info */

  let infoOutput = ''

  if (isStringStrict(info)) {
    infoOutput = `
      <p ${getAttr(['class="text-s lead-base pt-5xs muted"'], isPreview, id, 'info')}>
        ${info}
      </p>
    `
  }

  /* Output */

  return /* html */`
    <figure class="flex col h-full">
      ${QuoteSvg({ width: 'l', height: 'm', classes: 'dull' })}
      <blockquote class="pt-2xs pb-3xs">
        <p ${getAttr(['class="text-quote sharp"'], isPreview, id, 'quote')}>
          ${quote}
        </p>
      </blockquote>
      <figcaption class="mt-auto">
        <p ${getAttr(['class="text-m wt-medium lead-base"'], isPreview, id, 'title')}>
          ${title}
        </p>
        ${infoOutput}
      </figcaption>
    </figure>
  `
}

/* Exports */

export { Testimonial }
