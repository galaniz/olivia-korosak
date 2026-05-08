/**
 * Objects - Collapsible
 */

/* Imports */

import type { CollapsibleArgs } from './CollapsibleTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { addStyle, addScript } from '@alanizcreative/formation-static/scripts/scripts.js'
import { CaretSvg } from '../../svg/Caret/Caret.js'

/**
 * Output collapsible section.
 *
 * @param {CollapsibleArgs} args
 * @return {string} HTMLElement
 */
const Collapsible = (args: CollapsibleArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    label,
    content,
    classes
  } = args

  /* Label and content required */

  if (!isStringStrict(label) || !isStringStrict(content)) {
    return ''
  }

  /* Scripts and styles */

  addStyle('objects/Collapsible/Collapsible')
  addScript('objects/Collapsible/CollapsibleClient')

  /* Output */

  return /* html */`
    <ok-collapsible
      class="collapsible block${isStringStrict(classes) ? ` ${classes}` : ''}"
      duration="400"
    >
      <button
        type="button"
        class="collapsible-toggle w-s h-s flex align-center justify-center"
        aria-label="${label}"
        data-collapsible-toggle
      >
        ${CaretSvg({
          type: 'down',
          width: 'xs',
          height: 'xs',
          classes: 'collapsible-icon sharp e-trans'
        })}
      </button>
      <div class="collapsible-panel e-trans outline-tight" data-collapsible-panel>
        ${content}
      </div>
    </ok-collapsible>
  `
}

/* Exports */

export { Collapsible }
