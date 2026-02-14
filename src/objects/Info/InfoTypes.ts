/**
 * Objects - Info Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean|string} [template=false]
 * @prop {'error'|'success'|'neutral'|'summary'} [type='neutral']
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean | string
  type?: 'error' | 'success' | 'neutral' | 'summary'
}
