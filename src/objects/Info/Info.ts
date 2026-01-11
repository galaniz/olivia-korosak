/**
 * Objects - Info
 */

/* Imports */

import type { InfoArgs } from './InfoTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configVars } from '../../config/config.js'
import { InfoSvg } from '../../svg/Info/Info.js'
import { CheckmarkSvg } from '../../svg/Checkmark/Checkmark.js'
import { ErrorSvg } from '../../svg/Error/Error.js'

/**
 * Output info message.
 *
 * @param {InfoArgs} args
 * @return {string} HTMLDivElement
 */
const Info = (args: InfoArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    title,
    text,
    template = false,
    type = 'neutral'
  } = args

  /* Types */

  const isError = type === 'error'
  const isSuccess = type === 'success'
  const isErrorSummary = type === 'error-summary'
  const isEmbed = type === 'embed'
  const isAlert = isError || isSuccess

  /* Text */

  const hasTitle = isStringStrict(title)
  let textOutput = ''

  if (hasTitle) {
    textOutput += `
      <h2 class="text-l wt-medium m-0 pt-5xs">
        ${title}
      </h2>
    `
  }

  if (isStringStrict(text)) {
    textOutput = `
      <div>
        ${textOutput}
        <p class="text-m-flex pb-5xs e-line-all">
          ${text}
        </p>
      </div>
    `
  }

  if (isErrorSummary) {
    textOutput = `
      <div>
        ${textOutput}
        <ul class="flex col pt-5xs pb-4xs gap-4xs text-m-flex lead-base list-none e-line-all" role="list"></ul>
      </div>
    `
  }

  if (!textOutput) {
    return ''
  }

  /* Icon */

  const Icon = isError || isErrorSummary ? ErrorSvg : isSuccess ? CheckmarkSvg : InfoSvg

  /* Styles */

  addStyle('objects/Info/Info')

  /* Attributes */

  let attrs = ''

  if (template) {
    attrs = ' tabindex="-1"' + (isAlert ? ' role="alert"' : '')
  }

  /* Classes */

  let classes = `info-${isErrorSummary ? 'error' : type} bg-diagonal flex gap-3xs px-3xs py-3xs w-full outline-none`

  if (isEmbed) {
    classes += ' absolute inset-0 h-full col justify-center'
  } else {
    classes += ' b-radius-s'
  }

  /* Output */

  const output = /* html */`
    <div class="${classes}"${attrs}>
      ${Icon({
        width: 's',
        height: 'm',
        classes: 'w-m-m'
      })}
      ${textOutput}
    </div>
  `

  /* Template */

  const templateId = `tmpl-info-${type}`

  if (template) {
    configVars.template.set(templateId, output)
  }

  /* Result */

  return template ? templateId : output
}

/* Exports */

export { Info }
