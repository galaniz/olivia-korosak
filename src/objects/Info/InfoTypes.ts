/**
 * Objects - Info Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean} [template=false]
 * @prop {'error'|'error-summary'|'success'|'neutral'|'summary'|'embed'} [type='neutral']
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean
  type?: 'error' | 'error-summary' | 'success' | 'neutral' | 'summary' | 'embed'
}
