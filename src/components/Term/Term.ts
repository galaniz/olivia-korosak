/**
 * Components - Term
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'

/**
 * Term page template.
 *
 * @param {Item} itemData
 * @return {Item}
 */
const Term = (itemData: Item): Item => {
  return {
    ...itemData,
    hero: {
      type: 'minimal'
    },
    content: [
      {
        renderType: 'container',
        tag: 'Section',
        layout: 'Column',
        maxWidth: '1300px',
        paddingBottom: '80px',
        paddingBottomLarge: '120px',
        content: [
          {
            renderType: 'posts',
            headingLevel: 'Heading Two'
          }
        ]
      }
    ]
  }
}

/* Exports */

export { Term }
