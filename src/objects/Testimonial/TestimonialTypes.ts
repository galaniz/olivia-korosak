/**
 * Objects - Testimonial Types
 */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} TestimonialArgs
 * @prop {string} [id]
 * @prop {string} [field]
 * @prop {string} [quote]
 * @prop {string} [title]
 * @prop {string} [info]
 */
export interface TestimonialArgs {
  id?: string
  field?: string
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
