/**
 * Render - form
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { enumNamespace } = require('../vars/enums')
const { scriptData } = require('../vars/data')
const errorSvg = require('./svg/error')
const checkSvg = require('./svg/check')
const loader = require('./loader')

/**
 * Function - output form wrapper
 *
 * @param {object} args {
 *  @prop {string} subject
 *  @prop {string} submitLabel
 *  @prop {string} successTitle
 *  @prop {string} successText
 * }
 * @param {string} id
 * @return {object}
 */

const form = ({ args = {}, id }) => {
  const {
    submitLabel = 'Send',
    successTitle = '',
    successText = ''
  } = args

  /* Id required */

  if (!id) {
    return {
      start: '',
      end: ''
    }
  }

  /* Add to script data */

  if (!scriptData?.id && successTitle) {
    scriptData[`form-${id}`] = {
      successMessage: {
        primary: successTitle,
        secondary: successText
      }
    }
  }

  scriptData.sendUrl = '/ajax/'

  /* Honeypot */

  const honeypotId = `h-${uuidv4()}`
  const honeypotName = `${enumNamespace}_asi`
  const honeypot = `
    <div class="o-form__field col-12" data-asi>
      <label class="o-form__label" for="${honeypotId}">Website</label>
      <input type="url" name="${honeypotName}" id="${honeypotId}" autocomplete="off" class="js-input">
    </div>
  `

  /* Output */

  const start = `
    <form id="${id}" class="o-form js-send-form" method="post" novalidate>
      <div class="flex col row-l wrap align-end-l gap-s gap-m-m">
        <div class="o-form-error__summary w-full none outline-none" tabindex="-1">
          <div class="info-negative bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                <div class="w-s h-m w-m-m">
                  ${errorSvg()}
                </div>
              </div>
              <div>
                <h2 class="text-l wt-medium m-0 pt-5xs pb-5xs">There is a problem</h2>
                <ul class="o-form-error__list flex col pb-4xs mb-4xs-all m-0-last text-m-flex lead-base list-none e-line-all" role="list"></ul>
              </div>
            </div>
          </div>
        </div>
  `

  const end = `
        ${honeypot}
        <div class="o-form-result__negative w-full none outline-none" role="alert" tabindex="-1">
          <div class="info-negative bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                <div class="w-s h-m w-m-m">
                  ${errorSvg()}
                </div>
              </div>
              <div>
                <h2 class="o-form-result__primary text-l wt-medium m-0 pt-5xs"></h2>
                <p class="o-form-result__secondary text-m-flex pb-5xs e-line-all"></p>
              </div>
            </div>
          </div>
        </div>
        <div data-type="submit">
          <div class="pt-4xs">
            <button class="button b-radius-s e-trans-quad bg-background-light sharp button-l js-submit" type="submit">
              ${loader()}
              <span>${submitLabel}</span>
            </button>
          </div>
        </div>
        <div class="o-form-result__positive w-full none outline-none" role="alert" tabindex="-1">
          <div class="info-positive bg-diagonal pl-3xs pr-3xs pt-3xs pb-3xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                <div class="w-s h-m w-m-m">
                  ${checkSvg()}
                </div>
              </div>
              <div>
                <h2 class="o-form-result__primary text-l wt-medium m-0 pt-5xs"></h2>
                <p class="o-form-result__secondary text-m-flex pb-5xs e-line-all"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  `

  return {
    start,
    end
  }
}

/* Exports */

module.exports = form
