/**
 * Objects - Info Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean} [template=false]
 * @prop {'error'|'error-summary'|'success'|'neutral'|'summary'} [type='neutral']
 * @prop {'s'} [size]
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean
  type?: 'error' | 'error-summary' | 'success' | 'neutral' | 'summary'
  size?: 's'
}
