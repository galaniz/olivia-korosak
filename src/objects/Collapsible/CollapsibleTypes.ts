/**
 * Objects - Collapsible Types
 */

/**
 * @typedef {object} CollapsibleArgs
 * @prop {string} label
 * @prop {string} content
 * @prop {string} [classes]
 */
export interface CollapsibleArgs {
  label: string
  content: string
  classes?: string
}
