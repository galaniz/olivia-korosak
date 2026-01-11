/**
 * Store - Types
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * @typedef {object} StoreExtra
 * @prop {Object<string, number>} counts - Term ID and number of associated entries.
 */
export interface StoreExtra {
  counts: Record<string, number>
}

/**
 * Extra store items.
 */
export type StoreExtended = Store & StoreExtra

/**
 * Combined store args.
 */
export type StoreArgs = Partial<Store> & StoreExtra
