/**
 * Objects - Info Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean|string} [template=false]
 * @prop {'error'|'error-summary'|'success'|'neutral'} [type='neutral']
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean | string
  type?: 'error' | 'error-summary' | 'success' | 'neutral'
}
