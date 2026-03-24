/**
 * Components - Media Audio Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ParentArgs } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} MediaAudioTracksArgs
 * @prop {Item[]} items
 * @prop {Set<string>} [itemContains]
 * @prop {string} [contentType='page']
 * @prop {ParentArgs[]} [parents]
 */
export interface MediaAudioTracksArgs {
  items: Item[]
  itemContains?: Set<string>
  contentType?: string
  parents?: ParentArgs[]
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
