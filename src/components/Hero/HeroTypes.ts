/**
 * Components - Hero Types
 */

/* Imports */

import type { RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ButtonArgs } from '../../objects/Button/ButtonTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} HeroArgs
 * @extends {Item}
 * @prop {string} [contentType='page']
 * @prop {string} [archive]
 * @prop {'media-text'|'minimal'|'profile'|'error'} [type='media-text']
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {RenderFile} [image]
 * @prop {HeroAction} [action]
 */
export interface HeroArgs extends Item {
  contentType?: string
  archive?: string
  type?: 'media-text' | 'minimal' | 'profile' | 'error'
  title?: string
  text?: string
  image?: RenderFile
  action?: ButtonArgs
}
