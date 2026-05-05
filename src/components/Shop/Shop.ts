/**
 * Components - Shop
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { configVars } from '../../config/config.js'
import Stripe from 'stripe'

/**
 * Product items to render.
 *
 * @type {Item[]}
 */
const shopProducts: Item[] = []

/**
 * Output Stripe products.
 *
 * @param {Item} itemData
 * @return {Promise<string>}
 */
const Shop = async (/*itemData: Item*/): Promise<string> => {
  /* Token required */

  if (!configVars.stripe) {
    return ''
  }

  const stripe = new Stripe(configVars.stripe)

  /* Products */

  await stripe.products.list({
    limit: 12,
    expand: [
      'data.default_price'
    ]
  })

  /*
  for (const product of products.data) {
  }
  */

  return ''
}

/* Exports */

export {
  Shop,
  shopProducts
}
