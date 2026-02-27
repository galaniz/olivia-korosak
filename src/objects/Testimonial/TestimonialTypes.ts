/**
 * Objects - Testimonial Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} TestimonialArgs
 * @prop {string} [quote]
 * @prop {string} [title]
 * @prop {string} [info]
 */
export interface TestimonialArgs {
  quote?: string
  title?: string
  info?: string
}

/**
 * @typedef {object} TestimonialProps
 * @extends {RenderFunctionArgs}
 * @prop {TestimonialArgs} args
 * @prop {Item} [itemData]
 */
export interface TestimonialProps extends RenderFunctionArgs {
  args: TestimonialArgs
  itemData?: Item
}
