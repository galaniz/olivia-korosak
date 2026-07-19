/**
 * Utils - Attributes
 */

import { config } from '../../config/config.js'

/**
 * Convert attributes to string and optional Contentful preview attributes.
 *
 * @param {string[]} attr
 * @param {boolean} [preview=false]
 * @param {string} [entryId]
 * @param {string} [fieldId]
 * @param {string} [offset=false]
 * @return {string}
 */
const getAttr = (
  attr: string[],
  preview: boolean = false,
  entryId?: string,
  fieldId?: string,
  offset: boolean = false
): string => {
  const newAttr = [...attr]

  if (preview && entryId && fieldId) {
    newAttr.push(
      `data-contentful-entry-id="${entryId}"`,
      `data-contentful-field-id="${fieldId}"`,
      `data-contentful-space="${config.cms.space}"`,
      `data-contentful-environment="${config.cms.env}"`
    )

    if (offset) {
      newAttr.push('data-contentful-offset')
    }
  }

  return newAttr.join(' ')
}

/* Exports */

export { getAttr }
