/**
 * Components - Media Audio Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { Parent } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} MediaAudioTracksArgs
 * @prop {Item[]} items
 * @prop {Set<string>} [itemContains]
 * @prop {string} [contentType='page']
 * @prop {boolean} [pagination=false]
 * @prop {Parent[]} [parents]
 */
export interface MediaAudioTracksArgs {
  items: Item[]
  itemContains?: Set<string>
  contentType?: string
  pagination?: boolean
  parents?: Parent[]
}

/**
 * @typedef {object} MediaAudioTrack
 * @prop {string} title
 * @prop {string} link
 * @prop {string} url
 */
export interface MediaAudioTrack {
  title: string
  link: string
  url: string
}
