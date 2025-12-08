/**
 * Objects - Info
 */

/* Imports */

import type { InfoArgs } from './InfoTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { InfoSvg } from '../../svg/Info/Info.js'

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
        <p class="text-${hasTitle ? 's' : 'm wt-medium'} lead-open m-0">
          ${text}
        </p>
      </div>
    `
  }

  if (!textOutput) {
    return ''
  }

  /* Output */

  return /* html */`
    <div class="info-${isErrorSummary ? 'error' : type} bg-diagonal flex gap-3xs px-3xs py-3xs b-radius-s w-full outline-none">
      ${InfoSvg({
        width: 's',
        height: 'm',
        classes: 'w-m-m'
      })}
      <p class="text-l wt-medium sharp m-0 py-5xs">
        ${text}
      </p>
    </div>
  `
}

/* Exports */

export { Info }




<div class="o-form-error__summary w-full none outline-none" tabindex="-1">
  <div class="info-negative bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
    <div class="flex gap-3xs">
      <div>
        <div class="w-s h-m w-m-m l-svg">
          ${errorSvg()}
        </div>
      </div>
      <div>
        <h2 class="">There is a problem</h2>
        <ul class="flex col pt-5xs pb-4xs mb-4xs-all m-0-last text-m-flex lead-base list-none e-underline-all" role="list"></ul>
      </div>
    </div>
  </div>
</div>



<div class="o-form-result__negative w-full none outline-none" role="alert" tabindex="-1">
  <div class="info-negative bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
    <div class="flex gap-3xs">
      <div>
        <div class="w-s h-m w-m-m l-svg">
          ${errorSvg()}
        </div>
      </div>
      <div>
        <h2 class=""></h2>
        <p class="text-m-flex pb-5xs e-underline-all"></p>
      </div>
    </div>
  </div>
</div>



<div class="o-form-result__positive w-full none outline-none" role="alert" tabindex="-1">
  <div class="info-positive bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
    <div class="flex gap-3xs">
      <div>
        <div class="w-s h-m w-m-m l-svg">
          ${checkSvg()}
        </div>
      </div>
      <div>
        <h2 class=""></h2>
        <p class="o-form-result__secondary text-m-flex pb-5xs e-underline-all"></p>
      </div>
    </div>
  </div>
</div>







<div class="audio-error m-auto none" tabindex="-1">
  <div class="info-negative bg-diagonal pl-4xs pr-4xs pt-4xs pb-4xs b-radius-s">
    <div class="flex gap-4xs">
      <div>
        <div class="w-xs h-s l-svg">
          ${errorSvg()}
        </div>
      </div>
      <div>
        <p class="text-s wt-medium lead-base valign-middle m-0 pt-5xs pb-5xs e-underline">Sorry, there is a problem with the service. Download track <a href="" class="audio-update" data-update="textContent:title,href:url" data-rich></a>.</p>
      </div>
    </div>
  </div>
</div>

